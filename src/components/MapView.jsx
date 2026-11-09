import { useState } from "react";


function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function MapView({ lat, lng }) {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.015}%2C${lat - 0.015}%2C${lng + 0.015}%2C${lat + 0.015}&layer=mapnik&marker=${lat}%2C${lng}`;

  function handleDistance() {
    setError("");
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const km = getDistanceKm(pos.coords.latitude, pos.coords.longitude, lat, lng);
        setDistance(km);
        setLoading(false);
      },
      () => {
        setError("Could not get your location. Please allow location access.");
        setLoading(false);
      }
    );
  }

  return (
    <div className="map-box">
      <iframe title="Hotel location map" src={mapUrl} loading="lazy"></iframe>
      <button className="btn btn-primary" onClick={handleDistance} disabled={loading}>
        {loading ? "Getting location..." : "Calculate Distance From My Location"}
      </button>
      {distance !== null && (
        <p className="distance">
          Distance: <b>{distance.toFixed(1)} km</b> ({(distance * 0.621371).toFixed(1)} miles)
        </p>
      )}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default MapView;
