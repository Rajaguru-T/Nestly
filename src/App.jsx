import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import HotelForm from "./pages/HotelForm";

// only admin can open add / edit pages
function AdminRoute({ children }) {
  const role = useSelector((state) => state.auth.role);
  if (role !== "admin") return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <>
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<HotelListPage />} />
        <Route path="/hotel/add" element={<AdminRoute><HotelForm /></AdminRoute>} />
        <Route path="/hotel/edit/:id" element={<AdminRoute><HotelForm /></AdminRoute>} />
        <Route path="/hotel/:id" element={<HotelDetailPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
