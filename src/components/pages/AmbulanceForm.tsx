import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAmbulanceByIdRequest,
  getAmbulanceByIdClear,
  addAmbulanceRequest,
  addAmbulanceClear,
  updateAmbulanceRequest,
  updateAmbulanceClear,
} from "../../store/slices/ambulanceSlice.js";
import Endpoints from '../../config/Endpoints.js';
import AppWrapper from "../layout/AppWrapper";
import Loader from "../common/Loader";
import LocationAutocomplete from "../common/LocationAutocomplete";

const AmbulanceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    getAmbulanceByIdLoading,
    getAmbulanceByIdData,
    addAmbulanceLoading,
    addAmbulanceData,
    updateAmbulanceLoading,
    updateAmbulanceData,
  } = useSelector((state: any) => state.ambulance);

  // FORM STATES
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");

  // FORM ERRORS
  const [errors, setErrors] = useState<any>({});

  // -------------------------------
  // Validation
  // -------------------------------
  const validateForm = () => {
    const newErrors: any = {};

    if (!name.trim()) newErrors.name = "Ambulance name is required.";
    if (latitude && isNaN(Number(latitude)))
      newErrors.latitude = "Latitude must be a number.";

    if (longitude && isNaN(Number(longitude)))
      newErrors.longitude = "Longitude must be a number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getAmbulanceInfo = () => {
    dispatch(getAmbulanceByIdRequest({ id }));
  };

  useEffect(() => {
    if (id) getAmbulanceInfo();
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

    formData.append("title", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("vehicle_number", vehicleNumber);
    formData.append("driver_name", driverName);
    formData.append("uploaded_image", uploadedImage);

    if (image) {
      formData.append("image", image);
    }

    if (id) {
      formData.append("id", String(id));
      dispatch(updateAmbulanceRequest(formData));
    } else {
      dispatch(addAmbulanceRequest(formData));
    }
  };

  // -------------------------------
  // Handle Edit Data Loading
  // -------------------------------
  useEffect(() => {
    if (!getAmbulanceByIdLoading && getAmbulanceByIdData) {
      setName(getAmbulanceByIdData.title || "");
      setDescription(getAmbulanceByIdData.description || "");
      setLocation(getAmbulanceByIdData.location || "");

      // For edit mode — show existing image
      if (getAmbulanceByIdData.image) {
        setPreview(getAmbulanceByIdData.image);
        setUploadedImage(getAmbulanceByIdData.image);
      }

      setLatitude(String(getAmbulanceByIdData.latitude || ""));
      setLongitude(String(getAmbulanceByIdData.longitude || ""));
      setVehicleNumber(getAmbulanceByIdData.vehicle_number || "");
      setDriverName(String(getAmbulanceByIdData.driver_name || ""));
    }
  }, [getAmbulanceByIdLoading, getAmbulanceByIdData]);

  // -------------------------------
  // Redirect on Add / Update Success
  // -------------------------------
  useEffect(() => {
    if (!addAmbulanceLoading && addAmbulanceData) {
      navigate("/ambulance");
    }
  }, [addAmbulanceLoading, addAmbulanceData]);

  useEffect(() => {
    if (!updateAmbulanceLoading && updateAmbulanceData) {
      navigate("/ambulance");
    }
  }, [updateAmbulanceLoading, updateAmbulanceData]);

  // Clear redux on unmount
  useEffect(() => {
    return () => {
      dispatch(getAmbulanceByIdClear());
      dispatch(addAmbulanceClear());
      dispatch(updateAmbulanceClear());
    };
  }, []);

  return (
  <AppWrapper>

    {/* Page Header */}
    <div className="bg-white p-5 rounded-xl shadow-sm mb-8 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {id ? "Edit Ambulance" : "Add Ambulance"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {id
              ? "Update ambulance information below."
              : "Fill out the form to register a new ambulance."}
          </p>
        </div>
      </div>
    </div>

    {/* Form Card */}
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">

      {getAmbulanceByIdLoading && <Loader text="Loading ambulance..." />}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ----------- Section: Basic Information ----------- */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Ambulance Information
        </h2>

        {/* Ambulance Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Ambulance Name *
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 
            focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Emergency LifeCare Ambulance"
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
            className="w-full border rounded-lg px-3 py-2 
            focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description about ambulance services"
          />
        </div>

        {/* Vehicle & Driver - Two Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Vehicle Number */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Vehicle Number
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2
              focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="RJ07 XX 1234"
            />
          </div>

          {/* Driver Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Driver Name
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 
              focus:ring-2 focus:ring-emerald-300 focus:border-emerald-500 transition"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder="Driver full name"
            />
          </div>
        </div>

        {/* ----------- Section: Location ----------- */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Location Details
        </h2>

        {/* Location Autocomplete */}
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

          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Latitude/Longitude (hidden) */}
        <div className="grid grid-cols-2 gap-4 hidden">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={latitude}
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={longitude}
              readOnly
            />
          </div>
        </div>

        {/* ----------- Section: Image Upload ----------- */}
        <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Ambulance Image
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

          {/* File Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="block text-sm"
            />
            <p className="text-xs mt-1 text-gray-500">
              Upload ambulance photo (JPG, PNG)
            </p>
          </div>
        </div>

        {/* ----------- Buttons ----------- */}
        <div className="flex justify-end gap-4 pt-6">

          {/* Cancel */}
          <button
            type="button"
            onClick={() => navigate("/ambulance")}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-white font-medium transition flex items-center gap-2
              ${
                addAmbulanceLoading ||
                updateAmbulanceLoading ||
                getAmbulanceByIdLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            disabled={
              addAmbulanceLoading ||
              updateAmbulanceLoading ||
              getAmbulanceByIdLoading
            }
          >
            {addAmbulanceLoading || updateAmbulanceLoading
              ? "Please wait..."
              : id
              ? "Update Ambulance"
              : "Save Ambulance"}
          </button>

        </div>

      </form>
    </div>
  </AppWrapper>
);

};

export default AmbulanceForm;
