import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAmbulancesRequest,
  getAmbulancesClear,
  deleteAmbulanceRequest,
} from "../../store/slices/ambulanceSlice.js";

import AppWrapper from "../layout/AppWrapper";
import Loader from "../common/Loader";
import NoRecordFound from "../common/NoRecordFound";
import Pagination from "../common/Pagination";
import Endpoints from "../../config/Endpoints";
import { displayDate } from "../../utils/TimeHelper.js";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const AmbulanceList = () => {
  const dispatch = useDispatch();

  const limit = 10;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const {
    getAmbulancesLoading,
    getAmbulancesData,
    deleteAmbulanceLoading,
    deleteAmbulanceData,
  } = useSelector((state: any) => state.ambulance);

  const loadAmbulances = (pageNum = 1) => {
    dispatch(getAmbulancesRequest({ page: pageNum, limit }));
    setPage(pageNum);
  };

  useEffect(() => {
    loadAmbulances(1);
  }, []);

  useEffect(() => {
    if (!getAmbulancesLoading && getAmbulancesData) {
      setData(getAmbulancesData.data || []);
      setTotal(getAmbulancesData.total || 0);
    }
  }, [getAmbulancesLoading, getAmbulancesData]);

  useEffect(() => {
    if (!deleteAmbulanceLoading && deleteAmbulanceData) {
      dispatch(getAmbulancesClear());
      loadAmbulances(page);
    }
  }, [deleteAmbulanceLoading, deleteAmbulanceData]);

  const handleDelete = (id: string) => {
    if (!confirm("Delete Ambulance?")) return;
    dispatch(deleteAmbulanceRequest({ id }));
  };

  /* Render Rows */
  const renderAmbulanceList = () => {
    if (getAmbulancesLoading) {
      return (
        <tr>
          <td colSpan={9} className="p-6 text-center">
            <Loader text="Loading ambulances..." />
          </td>
        </tr>
      );
    }

    if (!getAmbulancesLoading && data.length === 0) {
      return (
        <tr>
          <td colSpan={9} className="p-6 text-center">
            <NoRecordFound text="No ambulance records found." />
          </td>
        </tr>
      );
    }

    return data.map((val: any, key: number) => (
      <tr key={val.id} className="hover:bg-gray-50 transition cursor-pointer">

        <td className="p-4 font-medium text-gray-700">
          {(page - 1) * limit + (key + 1)}.
        </td>

        <td className="p-4">
          {val.image ? (
            <img
              src={Endpoints.baseUrl + val.image}
              className="w-20 h-20 object-cover rounded-lg shadow-sm border"
              alt="Ambulance"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border p-2 text-center">
              No Image
            </div>
          )}
        </td>

        <td className="p-4 font-semibold text-gray-800">{val.title}</td>
        <td className="p-4 text-gray-600">{val.description}</td>
        <td className="p-4 text-gray-600">{val.location}</td>
        <td className="p-4 text-gray-600">{val.vehicle_number}</td>
        <td className="p-4 text-gray-600">{val.driver_name}</td>
        <td className="p-4 text-gray-500">{displayDate(val.created_at)}</td>

        <td className="p-4 text-right space-x-2">

          {/* Edit */}
          <Link
            to={`/ambulance/edit/${val.id}`}
            className="inline-block px-3 py-1.5 rounded-md bg-blue-400 hover:bg-blue-500 
            text-white shadow transition-all duration-200"
          >
            <PencilIcon className="w-4 h-4 text-white drop-shadow" />
          </Link>

          {/* Delete */}
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

      {/* Header Section (Same as Doctors) */}
      <div className="bg-white p-5 rounded-xl shadow-sm mb-8 border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Ambulances</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage ambulance records.
            </p>
          </div>

          <Link
            to="/ambulance/add"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white 
            rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5 text-white" />
            Add Ambulance
          </Link>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700 sticky top-0 z-10 shadow-sm">
            <tr className="text-left">
              <th className="p-4">S.No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Location</th>
              <th className="p-4">Vehicle Number</th>
              <th className="p-4">Driver Name</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {renderAmbulanceList()}
          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={(p) => loadAmbulances(p)}
        />
      </div>

    </AppWrapper>
  );
};

export default AmbulanceList;
