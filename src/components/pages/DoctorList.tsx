import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorsRequest, getDoctorsClear, deleteDoctorRequest } from "../../store/slices/doctorSlice";
import AppWrapper from "../layout/AppWrapper";
import Loader from "../common/Loader";
import NoRecordFound from "../common/NoRecordFound";
import Pagination from "../common/Pagination";
import Endpoints from '../../config/Endpoints.js';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/solid";

const DoctorList = () => {
  const dispatch = useDispatch();
  
  const limit = 10;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { getDoctorsLoading, getDoctorsData, deleteDoctorLoading, deleteDoctorData } = useSelector((state: any) => state.doctor);

  const loadDoctors = (pageNum = 1) => {
    dispatch(getDoctorsRequest({ page: pageNum, limit }));
    setPage(pageNum);
  };

  useEffect(() => {
    loadDoctors(1);
  }, []);

  useEffect(() => {
    if (!getDoctorsLoading && getDoctorsData) {
      console.log('--getDoctorsData--',{getDoctorsData});
      setData(getDoctorsData.data || []);
      setTotal(getDoctorsData.total || 0);
    }
  }, [getDoctorsLoading, getDoctorsData]);

  console.log({deleteDoctorLoading, deleteDoctorData});
  useEffect(() => {
    if (!deleteDoctorLoading && deleteDoctorData) {
      console.log('--deleteDoctorData--',{deleteDoctorData});
      dispatch(getDoctorsClear());
      loadDoctors(page);
    }
  }, [deleteDoctorLoading, deleteDoctorData]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete doctor?")) return;

    dispatch(deleteDoctorRequest({ id }));
  }

  const renderDoctorList = () => {
    if (getDoctorsLoading) {
      return (
        <tr>
          <td colSpan={9} className="p-6 text-center">
            <Loader text="Loading doctors..." />
          </td>
        </tr>
      );
    }

    if (!getDoctorsLoading && data.length === 0) {
      return (
        <tr>
          <td colSpan={9} className="p-6 text-center">
            <NoRecordFound text="No doctors found." />
          </td>
        </tr>
      );
    }

    return data.map((val: any, key: number) => (
      <tr
        key={val.id}
        className="hover:bg-gray-50 transition cursor-pointer"
      >
        <td className="p-4 font-medium text-gray-700">
          {(page - 1) * limit + (key + 1)}.
        </td>

        <td className="p-4">
          {val.image ? (
            <img
              src={Endpoints.baseUrl + val.image}
              className="w-20 h-20 object-cover rounded-lg shadow-sm border"
              alt="doctor"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border p-2 text-center">
              No Image
            </div>
          )}
        </td>

        <td className="p-4 font-semibold text-gray-800">{val.name}</td>
        <td className="p-4 text-gray-600">{val.description}</td>
        <td className="p-4 text-gray-600">{val.location}</td>
        <td className="p-4 text-gray-600">{val.specialization}</td>
        <td className="p-4 text-gray-600">{val.experience} yrs</td>
        <td className="p-4 text-gray-500">{val.created_at}</td>

        <td className="p-4 text-right space-x-2">

          {/* Edit Button */}
          <Link
            to={`/doctors/edit/${val.id}`}
            className="inline-block px-3 py-1.5 rounded-md bg-blue-400 hover:bg-yellow-500 
            text-white shadow transition-all duration-200"
          >
            <PencilIcon className="w-4 h-4 text-white drop-shadow" />
          </Link>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(val.id)}
            className="inline-block px-3 py-1.5 rounded-md bg-red-500 hover:bg-red-600 
            text-white shadow transition-all duration-200"
          >
            <TrashIcon className="w-4 h-4 text-white drop-shadow" />
          </button>
        </td>
      </tr>

    ));
  };

  return (
    <AppWrapper>

      {/* Header Section */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

          {/* Title + Subtitle */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage doctor records.
            </p>
          </div>

          {/* Add Button */}
          <Link
            to="/doctors/add"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white 
            rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5 text-white" />
            Add Doctor
          </Link>
        </div>
      </div>

      {/* Table Wrapper */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-700 sticky top-0 z-10 shadow-sm">
            <tr className="text-left">
              <th className="p-4">S.No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Location</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {renderDoctorList()}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={(p) => loadDoctors(p)}
        />
      </div>
    </AppWrapper>
  );

};

export default DoctorList;
