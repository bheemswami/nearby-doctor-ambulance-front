import {
  UserGroupIcon,
  TruckIcon,
  GlobeAltIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

type Props = {
  stats: any;
};

export default function DashboardStats({
  stats,
}: Props) {
  const statsDic = [
  {
    title: "Total Doctors",
    value: stats?.totalDoctors || 0,
    icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
    color: "bg-blue-50",
  },
  {
    title: "Total Ambulances",
    value: stats?.totalAmbulances || 0,
    icon: <TruckIcon className="w-8 h-8 text-red-600" />,
    color: "bg-red-50",
  },
  {
    title: "Total Records",
    value: stats?.totalRecords || 0,
    icon: <ClipboardDocumentListIcon className="w-8 h-8 text-emerald-600" />,
    color: "bg-emerald-50",
  },
  {
    title: "Nearby Doctors",
    value: stats?.totalNearbyDoctors || 0,
    icon: <MapPinIcon className="w-8 h-8 text-blue-600" />,
    color: "bg-blue-50",
  },
  {
    title: "Nearby Ambulances",
    value: stats?.totalNearbyAmbulances || 0,
    icon: <MapPinIcon className="w-8 h-8 text-red-600" />,
    color: "bg-red-50",
  },
  {
    title: "Total Nearby",
    value: stats?.totalNearbyRecords || 0,
    icon: <GlobeAltIcon className="w-8 h-8 text-purple-600" />,
    color: "bg-purple-50",
  },
];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {statsDic.map((s, i) => (
        <div
          key={i}
          className={`flex items-center gap-4 p-5 rounded-xl shadow-sm border border-gray-200 transition hover:shadow-lg ${s.color}`}
        >
          <div className="p-3 bg-white shadow rounded-full">{s.icon}</div>
          <div>
            <p className="text-gray-600 text-sm">{s.title}</p>
            <h2 className="text-2xl font-bold mt-1">{s.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
