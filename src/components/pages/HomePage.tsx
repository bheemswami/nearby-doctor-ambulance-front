import { useEffect, useState } from "react";
import {
  UserGroupIcon,
  TruckIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dashboardStatsRequest, dashboardStatsClear, seedRecordsRequest, seedRecordsClear } from "../../store/slices/commonSlice";
import DashboardStats from "../DashboardStats";
import AppWrapper from "../layout/AppWrapper";
import ModalBox from "../common/ModalBox";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dashboardStatsLoading, dashboardStatsData, seedRecordsLoading, seedRecordsData } = useSelector(
    (state: any) => state.common
  );

  const [stats, setStats] = useState<any[]>([]);
  const [coords, setCoords] = useState<any>(null);
  const [modal, setModal] = useState({
    visible: false,
    type: "confirm",
    title: "",
    message: "",
  });

  const fetchDashboardStats = () => {
    dispatch(
      dashboardStatsRequest({ lat: coords?.lat || 0, lng: coords?.lng || 0 })
    );
  };

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        alert("Location permission denied");
        setCoords({ lat: 0, lng: 0 });
      }
    );
  };

  const runSeed = async () => {
    setModal({
      visible: true,
      type: "confirm",
      title: "Reset & Seed Database?",
      message: "This will delete existing data and load fresh demo records.",
    });
  
  };
  const confirmSeed = () => {
    setModal((prevState) => ({ ...prevState, visible: false }));
    dispatch(seedRecordsRequest());
  };

  useEffect(() => {
    locateUser();
    return () => {
      dispatch(dashboardStatsClear());
      dispatch(seedRecordsClear());
    };
  }, []);

  useEffect(() => {
    if (!dashboardStatsLoading && dashboardStatsData) {
      setStats(dashboardStatsData || []);
    }
  }, [dashboardStatsLoading, dashboardStatsData]);

  useEffect(() => {
    fetchDashboardStats();
  }, [coords]);

  useEffect(() => {
    if (!seedRecordsLoading && seedRecordsData) {
      setModal({
        visible: true,
        type: "success",
        title: "Seed Completed 🎉",
        message: "Demo data has been repopulated successfully.",
      });
    }
  }, [seedRecordsLoading, seedRecordsData]);

  return (
    <AppWrapper>
      <main className="flex-1 max-w-6xl mx-auto">

        {/* Welcome Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
            Welcome 👋
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Manage emergency medical services efficiently & quickly
          </p>
        </div>


        {/* Stats Section */}
        <div className="mt-6">
          <DashboardStats stats={stats} />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {/* Doctors */}
          <button
            onClick={() => navigate("/doctors")}
            className="bg-white hover:bg-blue-50 shadow-md hover:shadow-xl transition-all duration-200 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 hover:-translate-y-1"
          >
            <UserGroupIcon className="w-16 h-16 text-blue-600 drop-shadow" />
            <h3 className="mt-5 text-2xl font-semibold">Doctors</h3>
            <p className="text-gray-500 mt-2 text-sm">
              View and manage all doctors
            </p>
          </button>

          {/* Ambulances */}
          <button
            onClick={() => navigate("/ambulance")}
            className="bg-white hover:bg-red-50 shadow-md hover:shadow-xl transition-all duration-200 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 hover:-translate-y-1"
          >
            <TruckIcon className="w-16 h-16 text-red-600 drop-shadow" />
            <h3 className="mt-5 text-2xl font-semibold">Ambulances</h3>
            <p className="text-gray-500 mt-2 text-sm">
              View and manage all ambulances
            </p>
          </button>

          {/* Nearby */}
          <button
            onClick={() => navigate("/nearby")}
            className="bg-white hover:bg-purple-50 shadow-md hover:shadow-xl transition-all duration-200 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200 sm:col-span-2 lg:col-span-1 hover:-translate-y-1"
          >
            <MapPinIcon className="w-16 h-16 text-purple-600 drop-shadow" />
            <h3 className="mt-5 text-2xl font-semibold">Search Nearby</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Find nearest doctors & ambulances
            </p>
          </button>
        </div>

        {/* DEMO Seed Button */}
        <button
          onClick={runSeed}
          className="mt-10 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white 
            rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
        >
          {seedRecordsLoading ? 'Please wait... ' : 'Run Demo Seed'}
        </button>

        <p className="text-gray-500 text-sm mt-2 italic">
          (For demo only. Click to reset & repopulate sample data.)
        </p>
        <ModalBox
          visible={modal.visible}
          type={modal.type as any}
          title={modal.title}
          message={modal.message}
          onConfirm={
            modal.type === "confirm"
              ? confirmSeed
              : () => setModal((m) => ({ ...m, visible: false }))
          }
          onCancel={() => setModal((m) => ({ ...m, visible: false }))}
        />
      </main>
    </AppWrapper>
  );
};

export default HomePage;
