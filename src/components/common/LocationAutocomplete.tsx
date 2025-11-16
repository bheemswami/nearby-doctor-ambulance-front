import { useState } from "react";

interface Props {
  location: string;
  setLocation: (v: string) => void;
  setLatitude: (v: string) => void;
  setLongitude: (v: string) => void;
}

const LocationAutocomplete = ({
  location,
  setLocation,
  setLatitude,
  setLongitude,
}: Props) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchSuggestions(query: string) {
    setLocation(query);

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Location fetch failed", err);
    }

    setLoading(false);
  }

  const selectLocation = (item: any) => {
    setLocation(item.display_name);
    setLatitude(item.lat);
    setLongitude(item.lon);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Search location..."
        value={location}
        onChange={(e) => fetchSuggestions(e.target.value)}
      />

      {loading && (
        <div className="absolute left-0 right-0 bg-white shadow p-2 text-sm">
          Searching...
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white shadow rounded max-h-60 overflow-auto z-10">
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => selectLocation(item)}
              className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
