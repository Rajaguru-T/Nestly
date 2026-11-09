
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole } from "../store/authSlice";
import { setFilter } from "../store/hotelSlice";

function Navbar() {
  const role = useSelector((state) => state.auth.role);
  const searchTerm = useSelector((state) => state.hotels.filters.searchTerm);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditingHotel = location.pathname.startsWith("/hotel/edit/");

  function handleRoleChange(e) {
    dispatch(setRole(e.target.value));
    navigate("/");
  }

  function handleSearch(e) {
    dispatch(setFilter({ key: "searchTerm", value: e.target.value }));
    navigate("/");
  }

  return (
    <header className="site-header">
      <div className="container header-inner">

        <Link to="/" className="brand">
          <span className="brand-name">NESTLY</span>
          <span className="brand-tagline">Find your perfect stay</span>
        </Link>

        <input
          className="nav-search"
          type="text"
          placeholder="Search hotels or destinations..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="nav-actions">
          {role === "admin" && !isEditingHotel && (
            <Link to="/hotel/add" className="add-hotel-btn">
              + Add Hotel
            </Link>
          )}

          <label className="role-label">
            <span>Role:</span>
            <select value={role} onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
