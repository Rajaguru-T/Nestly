import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MapView from "../components/MapView";
import Stars from "../components/Stars";
import { toggleFavorite } from "../store/hotelSlice";

function HotelDetailPage() {
  const { id } = useParams();
  const hotel = useSelector((state) => state.hotels.items.find((h) => String(h.id) === id));
  const role = useSelector((state) => state.auth.role);
  const isFavorite = useSelector((state) => state.hotels.favorites.includes(Number(id)));
  const dispatch = useDispatch();

  if (!hotel) {
    return (
      <div className="container not-found">
        <Helmet><title>Hotel not found | Stays Hub</title></Helmet>
        <h2>404 - Hotel not found</h2>
        <p>The hotel you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className="container detail">
      <Helmet>
        <title>{hotel.title} - Book Now</title>
        <meta property="og:title" content={hotel.title} />
        <meta property="og:description" content={hotel.description.slice(0, 150)} />
        <meta property="og:image" content={hotel.imageUrl} />
      </Helmet>

      <Link to="/" className="back-link">&larr; Back to listings</Link>

      <img className="hero-img" src={hotel.imageUrl} alt={hotel.title + " main photo"} />

      <div className="detail-head">
        <div>
          <h1>{hotel.title}</h1>
          <p className="location">📍 {hotel.locationName}</p>
          <Stars rating={hotel.rating} />
        </div>
        <span className="price-badge big">₹{hotel.price}/ Per Day </span>
      </div>

      <p className="detail-desc">{hotel.description}</p>

      <p className="coords">
        <b>Latitude:</b> {hotel.latitude} &nbsp;&nbsp; <b>Longitude:</b> {hotel.longitude}
      </p>

      {role === "user" && (
        <button
          className={"btn fav-btn" + (isFavorite ? " fav-active" : "")}
          onClick={() => dispatch(toggleFavorite(hotel.id))}
        >
          {isFavorite ? "♥ Saved to favorites" : "♡ Add to favorites"}
        </button>
      )}

      {role === "admin" && (
        <Link to={"/hotel/edit/" + hotel.id} className="btn btn-outline">Edit this hotel</Link>
      )}

      <h3>Location</h3>
      <MapView lat={Number(hotel.latitude)} lng={Number(hotel.longitude)} />
    </div>
  );
}

export default HotelDetailPage;
