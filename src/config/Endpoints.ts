// API Base URLs
export const baseUrl = "http://localhost:4000";
export const apiUrl = `${baseUrl}/api`;

// Doctor Endpoints
export const getDoctors = `${apiUrl}/doctors`;
export const getDoctorById = (id: number | string) => `${apiUrl}/doctors/${id}`;
export const addDoctor = `${apiUrl}/doctors/add`;
export const updateDoctor = `${apiUrl}/doctors/update`;
export const deleteDoctor = (id: number | string) => `${apiUrl}/doctors/delete/${id}`;

// Ambulance Endpoints
export const getAmbulances = `${apiUrl}/ambulances`;
export const getAmbulanceById = (id: number | string) => `${apiUrl}/ambulances/${id}`;
export const addAmbulance = `${apiUrl}/ambulances/add`;
export const updateAmbulance = `${apiUrl}/ambulances/update`;
export const deleteAmbulance = (id: number | string) => `${apiUrl}/ambulances/delete/${id}`;

// Common Endpoints
export const nearbySearch = `${apiUrl}/common/nearby-search`;
export const dashboardStats = `${apiUrl}/common/dashboard-stats`;
export const seedRecords = `${apiUrl}/common/seed-records`;

// Default export (optional)
const Endpoints = {
  baseUrl,
  apiUrl,

  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,

  getAmbulances,
  getAmbulanceById,
  addAmbulance,
  updateAmbulance,
  deleteAmbulance,

  nearbySearch,
  dashboardStats,
  seedRecords,
};

export default Endpoints;
