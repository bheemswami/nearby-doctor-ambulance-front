import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import DoctorList from "./components/pages/DoctorList";
import DoctorForm from "./components/pages/DoctorForm";
import AmbulanceList from "./components/pages/AmbulanceList";
import AmbulanceForm from "./components/pages/AmbulanceForm";
import NearbyMap from "./components/pages/NearbyMap";

function App() {

   return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Doctors */}
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/add" element={<DoctorForm />} />
        <Route path="/doctors/edit/:id" element={<DoctorForm />} />

        {/* Ambulance */}
        <Route path="/ambulance" element={<AmbulanceList />} />
        <Route path="/ambulance/add" element={<AmbulanceForm />} />
        <Route path="/ambulance/edit/:id" element={<AmbulanceForm />} />

        <Route path="/nearby" element={<NearbyMap />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
