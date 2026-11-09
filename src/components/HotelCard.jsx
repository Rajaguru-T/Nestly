
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";

const fallbackImg = "https://placehold.co/300x200?text=No+Image";

function HotelCard({ hotel, role, isFavorite, onDelete, onToggleFavorite }) {
  const navigate = useNavigate();

  function handleEdit(e) {
    e.stopPropagation();
    navigate("/hotel/edit/" + hotel.id);
  }

  function handleDelete(e) {
    e.stopPropagation();
    onDelete(hotel.id);
  }

  function handleFavorite(e) {
    e.stopPropagation();
    onToggleFavorite(hotel.id);
  }

  function handleView(e) {
    e.stopPropagation();
    navigate("/hotel/" + hotel.id);
  }

  return (
    <div className="hotel-card" onClick={() => navigate("/hotel/" + hotel.id)}>
      <div className="hotel-image">
        <img
          src={hotel.imageUrl || fallbackImg}
          alt={hotel.title + " hotel photo"}
          onError={(e) => (e.currentTarget.src = fallbackImg)}
        />
      </div>

      <div className="hotel-info">
        <h3>{hotel.title}</h3>
        <p className="location">📍 {hotel.locationName}</p>

        <Stars rating={hotel.rating} />

        <p className="hotel-desc">{hotel.description}</p>
      </div>

      <div className="hotel-side">
        <div className="hotel-price">
          <span className="price-badge">₹{hotel.price} / Per Day</span>
         
        </div>

        <div className="card-buttons">
          <button className="btn btn-primary small" onClick={handleView}>
            View
          </button>

          {role === "user" && (
            <button
              className={"btn small fav-btn" + (isFavorite ? " fav-active" : "")}
              onClick={handleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          )}

          {role === "admin" && (
            <>
              <button className="btn btn-outline small" onClick={handleEdit}>
                Edit
              </button>

              <button className="btn btn-danger small" onClick={handleDelete}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
