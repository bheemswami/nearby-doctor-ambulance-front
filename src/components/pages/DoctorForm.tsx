import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDoctorByIdRequest,
  getDoctorByIdClear,
  addDoctorRequest,
  addDoctorClear,
  updateDoctorRequest,
  updateDoctorClear,
} from "../../store/slices/doctorSlice";
import Endpoints from '../../config/Endpoints.js';
import AppWrapper from "../layout/AppWrapper";
import Loader from "../common/Loader";
import LocationAutocomplete from "../common/LocationAutocomplete";

const DoctorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getDoctorByIdLoading,
    getDoctorByIdData,
    addDoctorLoading,
    addDoctorData,
    updateDoctorLoading,
    updateDoctorData,
  } = useSelector((state: any) => state.doctor);

  // FORM STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");

  // FORM ERRORS
  const [errors, setErrors] = useState<any>({});

  // -------------------------------
  // Validation
  // -------------------------------
  const validateForm = () => {
    const newErrors: any = {};

    if (!name.trim()) newErrors.name = "Doctor name is required.";
    if (!experience) newErrors.experience = "Experience is required.";
    if (experience && isNaN(Number(experience)))
      newErrors.experience = "Experience must be a number.";

    if (latitude && isNaN(Number(latitude)))
      newErrors.latitude = "Latitude must be a number.";

    if (longitude && isNaN(Number(longitude)))
      newErrors.longitude = "Longitude must be a number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------------------
  // Load doctor in edit mode
  // -------------------------------
  const getDoctorInfo = () => {
    dispatch(getDoctorByIdRequest({ id }));
  };

  useEffect(() => {
    if (id) getDoctorInfo();
  }, [id]);

  // -------------------------------
  // Handle Image Upload + Preview
  // -------------------------------
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  // -------------------------------
  // Submit Form (FormData)
  // -------------------------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("specialization", specialization);
    formData.append("experience", experience);
    formData.append("uploaded_image", uploadedImage);

    if (image) {
      formData.append("image", image);
    }

    if (id) {
      formData.append("id", String(id));
      dispatch(updateDoctorRequest(formData));
    } else {
      dispatch(addDoctorRequest(formData));
    }
  };

  // -------------------------------
  // Handle Edit Data Loading
  // -------------------------------
  useEffect(() => {
    if (!getDoctorByIdLoading && getDoctorByIdData) {
      setName(getDoctorByIdData.name || "");
      setDescription(getDoctorByIdData.description || "");
      setLocation(getDoctorByIdData.location || "");

      // For edit mode — show existing image
      if (getDoctorByIdData.image) {
        setPreview(getDoctorByIdData.image);
        setUploadedImage(getDoctorByIdData.image);
      }

      setLatitude(String(getDoctorByIdData.latitude || ""));
      setLongitude(String(getDoctorByIdData.longitude || ""));
      setSpecialization(getDoctorByIdData.specialization || "");
      setExperience(String(getDoctorByIdData.experience || ""));
    }
  }, [getDoctorByIdLoading, getDoctorByIdData]);

  // -------------------------------
  // Redirect on Add / Update Success
  // -------------------------------
  useEffect(() => {
    if (!addDoctorLoading && addDoctorData) navigate("/doctors");
  }, [addDoctorLoading, addDoctorData]);

  useEffect(() => {
    if (!updateDoctorLoading && updateDoctorData) navigate("/doctors");
  }, [updateDoctorLoading, updateDoctorData]);

  // Clear redux on unmount
  useEffect(() => {
    return () => {
      dispatch(getDoctorByIdClear());
      dispatch(addDoctorClear());
      dispatch(updateDoctorClear());
    };
  }, []);

  return (
  <AppWrapper>

    {/* Page Header */}
    <div className="bg-white p-5 rounded-xl shadow-sm mb-8 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {id ? "Edit Doctor" : "Add Doctor"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {id ? "Update doctor details below." : "Fill the form to add a new doctor."}
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
      {getDoctorByIdLoading && <Loader text="Loading doctor..." />}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* SECTION TITLE */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Doctor Information
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Doctor Name *
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter doctor name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Description
          </label>
          <textarea
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Specialization & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Specialization
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="Cardiology, Orthopedic, etc."
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Experience (Years) *
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="5"
            />
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
            )}
          </div>
        </div>

        {/* Location Section */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Location Details
        </h2>

        {/* Location Input (AutoComplete) */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Location
          </label>

          <LocationAutocomplete
            location={location}
            setLocation={setLocation}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>

        {/* IMAGE SECTION */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Doctor Image
        </h2>

        <div className="flex items-center gap-6">

          {/* Preview Box */}
          <div className="w-28 h-28 bg-gray-100 border rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
            {preview ? (
              <img
                src={Endpoints.baseUrl + preview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <p className="text-gray-400 text-xs">No Image</p>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block text-sm"
            />
            <p className="text-xs mt-1 text-gray-500">Upload JPG/PNG image</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">

          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-white font-medium transition flex items-center gap-2
              ${
                addDoctorLoading ||
                updateDoctorLoading ||
                getDoctorByIdLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            disabled={
              addDoctorLoading ||
              updateDoctorLoading ||
              getDoctorByIdLoading
            }
          >
            {addDoctorLoading || updateDoctorLoading
              ? "Please wait..."
              : id
              ? "Update Doctor"
              : "Save Doctor"}
          </button>
        </div>
      </form>
    </div>
  </AppWrapper>
);

};

export default DoctorForm;
