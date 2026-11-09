
import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetFilters } from "../store/hotelSlice";

function HotelFilter() {
  const filters = useSelector((state) => state.hotels.filters);
  const items = useSelector((state) => state.hotels.items);
  const role = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();

 
  const locations = [
    ...new Set(items.map((hotel) => hotel.locationName).filter(Boolean)),
  ].sort();

  return (
    <div className="hotel-filters">

     
      <div className="filter-control">
        <label htmlFor="location-filter">Location</label>

        <select
          id="location-filter"
          value={filters.location}
          onChange={(e) =>
            dispatch(
              setFilter({
                key: "location",
                value: e.target.value,
              })
            )
          }
        >
          <option value="">All locations</option>

          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      
      <div className="filter-control">
        <label htmlFor="min-price">Min price</label>

        <input
          id="min-price"
          type="number"
          min="0"
          placeholder="₹ 0"
          value={filters.minPrice}
          onChange={(e) =>
            dispatch(
              setFilter({
                key: "minPrice",
                value: e.target.value,
              })
            )
          }
        />
      </div>

      
      <div className="filter-control">
        <label htmlFor="max-price">Max price</label>

        <input
          id="max-price"
          type="number"
          min="0"
          placeholder="₹ 10000"
          value={filters.maxPrice}
          onChange={(e) =>
            dispatch(
              setFilter({
                key: "maxPrice",
                value: e.target.value,
              })
            )
          }
        />
      </div>

      
      <button
        type="button"
        className="filter-reset-btn"
        onClick={() => dispatch(resetFilters())}
      >
        Reset
      </button>

     
      {role === "user" && (
        <label className="filter-favorite">
          <input
            type="checkbox"
            checked={filters.onlyFavorites}
            onChange={(e) =>
              dispatch(
                setFilter({
                  key: "onlyFavorites",
                  value: e.target.checked,
                })
              )
            }
          />

          <span>Favorites only</span>
        </label>
      )}
    </div>
  );
}

export default HotelFilter;
