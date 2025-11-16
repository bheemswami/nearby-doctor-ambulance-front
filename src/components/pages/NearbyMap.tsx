// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { nearbySearchRequest, nearbySearchClear } from "../../store/slices/commonSlice";
import AppWrapper from "../layout/AppWrapper";
import Loader from "../common/Loader";

// Default marker fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const doctorIcon = new L.Icon({
  iconUrl: "/icons/doctor.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const ambulanceIcon = new L.Icon({
  iconUrl: "/icons/ambulance.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

const userIcon = new L.Icon({
  iconUrl: "/icons/user.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Fly To
const FlyToLocation = ({ lat, lng }: any) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.flyTo([lat, lng], 14, { duration: 1 });
  }, [lat, lng]);
  return null;
};

const NearbyMap = () => {
  const dispatch = useDispatch();
  const { nearbySearchLoading, nearbySearchData } = useSelector((state: any) => state.common);

  const [loading, setLoading] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [coords, setCoords] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [searchText, setSearchText] = useState("");

  const [route, setRoute] = useState<any>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    locateUser();
    return () => {
      dispatch(nearbySearchClear());
    }
  }, []);

  useEffect(() => {
    if (!nearbySearchLoading && nearbySearchData) {
      setResults(nearbySearchData || []);
    }
  }, [nearbySearchLoading, nearbySearchData]);

  // Fetch providers
  const fetchNearby = async (lat: number, lng: number) => {
    setLoading(false);
    dispatch(nearbySearchRequest({ lat, lng, radius: 5000, limit:50 }));
  };

  // Locate User
  const locateUser = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setCoords({ lat, lng });
        fetchNearby(lat, lng);
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  // Filtering
  useEffect(() => {
    let filteredData = results;

    setSelected(null);

    if (filter !== "all") {
      filteredData = filteredData.filter((i) =>{
        console.log('--filter--',{s:i.type == filter, type:i.type, filter});
       return i.type && i.type.toString().trim().toLowerCase() === filter.toLowerCase()
    });
      console.log({filter, searchText, filteredData});

    }

    if (searchText) {
      filteredData = filteredData.filter((i) =>
        (i.name || i.title).toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [results, filter, searchText]);

console.log('--filtered', filtered);
  // Fit bounds automatically
  useEffect(() => {
    if (!mapRef.current || filtered.length === 0) return;

    const bounds = filtered.map((i) => [
      i.location.coordinates[1],
      i.location.coordinates[0],
    ]);

    mapRef.current.fitBounds(bounds, { padding: [40, 40] });
  }, [filtered]);

  // Fetch Route from OSRM
  const fetchRoute = async (dest: any) => {
    if (!coords) return;

    setRouteLoading(true);  // Start loading

    const start = `${coords.lng},${coords.lat}`;
    const end = `${dest.location.coordinates[0]},${dest.location.coordinates[1]}`;

    const url = `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`;

    try {
      const res = await fetch(url);
      const json = await res.json();

      const routeCoords = json.routes[0].geometry.coordinates.map((p: any) => [
        p[1],
        p[0],
      ]);

      setRoute(routeCoords);

      setSelected({
        ...dest,
        distance: (json.routes[0].distance / 1000).toFixed(2),
        duration: Math.round(json.routes[0].duration / 60),
      });

    } catch (e) {
      console.error("Route Fetch Error:", e);
    }

    setRouteLoading(false);  // Stop loading
  };


  // Auto refresh every 10s
  useEffect(() => {
    // const i = setInterval(() => {
    //   if (coords) {
    //     fetchNearby(coords.lat, coords.lng);
    //   }
    // }, 10000);

    // return () => clearInterval(i);
  }, [coords]);

  return (
    <AppWrapper>
      <div className="flex flex-col gap-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nearby Search</h1>
          <button
            onClick={locateUser}
            className="px-4 py-2 bg-emerald-600 text-white rounded"
          >
            📍 Search Nearby
          </button>
        </div>
        {/* Hint for Interviewer */}
<p className="text-md text-gray-500 italic bg-yellow-50 border border-yellow-200 p-2 rounded mt-2">
  Note: For testing purposes, all doctor and ambulance records are displayed.
</p>

        {/* Filters + Search */}
        <div className="flex gap-4 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="doctor">Doctors</option>
            <option value="ambulance">Ambulances</option>
          </select>

          <input
            type="text"
            placeholder="Search name"
            className="border px-3 py-2 rounded flex-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Loading */}
        {(nearbySearchLoading || loading) && <Loader text="Scanning nearby providers..." />}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Sidebar List */}
          <div className="bg-white shadow rounded-lg p-4 h-[80vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-3">
              Providers ({filtered.length})
            </h2>

            {filtered.map((item: any) => (
              <div
                key={item._id}
                onClick={() => !routeLoading && fetchRoute(item)}
                className={`p-3 mb-2 rounded border cursor-pointer relative
                  ${selected?._id === item._id ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:bg-gray-50"}
                  ${routeLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {routeLoading && selected?._id === item._id && (
                  <div className="absolute right-3 top-3 text-xs text-emerald-700 animate-pulse">
                    Loading...
                  </div>
                )}
                <div className="font-bold">
                  {item.name || item.title}
                </div>
                <div className="text-sm text-gray-600 uppercase">
                  {item.type}
                </div>
                {selected?._id === item._id && selected.distance && (
                  <div className="text-xs text-emerald-700">
                    {selected.distance} km • {selected.duration} mins
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <MapContainer
              center={[28.0229, 73.3119]}
              zoom={13}
              scrollWheelZoom={true}
              whenCreated={(map) => (mapRef.current = map)}
              className="h-[80vh] w-full rounded-lg shadow relative"
            >
              {routeLoading && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-sm">
                  Calculating route...
                </div>
              )}
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* Fly to user */}
              {coords && <FlyToLocation lat={coords.lat} lng={coords.lng} />}

              {/* User Marker */}
              {coords && (
                <Marker position={[coords.lat, coords.lng]} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>
              )}

              {/* Route Polyline */}
              {route && (
                <Polyline positions={route} color="blue" weight={5} />
              )}

              {/* Cluster Group */}
              <MarkerClusterGroup chunkedLoading>
                {filtered.map((item: any) => (
                  <Marker
                    key={item._id}
                    icon={(item.type === "doctor" ? doctorIcon : ambulanceIcon) as L.Icon}
                    position={[
                      item.location.coordinates[1],
                      item.location.coordinates[0],
                    ]}
                  >
                    <Popup>
                      <div className="font-bold">
                        {item.name || item.title}
                      </div>

                      <div className="text-xs text-gray-600 uppercase">
                        {item.type}
                      </div>

                      <div className="text-xs text-gray-500">
                        {item.address || "Unknown"}
                      </div>

                      {selected?._id === item._id && selected.distance && (
                        <div className="text-xs text-emerald-700 mt-1">
                          {selected.distance} km • {selected.duration} mins
                        </div>
                      )}

                      <button
                        onClick={() => fetchRoute(item)}
                        className="mt-2 px-3 py-1 bg-emerald-600 text-white rounded text-xs"
                      >
                        Navigate
                      </button>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default NearbyMap;
