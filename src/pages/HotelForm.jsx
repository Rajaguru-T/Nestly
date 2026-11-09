import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { addHotel, updateHotel, showNotification } from "../store/hotelSlice";

function HotelForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  
  const existing = useSelector((state) => state.hotels.items.find((h) => String(h.id) === id));

  const [form, setForm] = useState({
    title: existing ? existing.title : "",
    locationName: existing ? existing.locationName : "",
    rating: existing ? existing.rating : "",
    description: existing ? existing.description : "",
    latitude: existing ? existing.latitude : "",
    longitude: existing ? existing.longitude : "",
    price: existing ? existing.price : "",
  });
  const [image, setImage] = useState(existing ? existing.imageUrl : "");
  const [imageError, setImageError] = useState("");
  const [touched, setTouched] = useState({});

  if (isEdit && !existing) {
    return (
      <div className="container not-found">
        <h2>Hotel not found</h2>
        <Link to="/" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

 
  function validate() {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    else if (form.title.trim().length < 3) errors.title = "Title must be at least 3 characters";

    if (!form.locationName.trim()) errors.locationName = "Location name is required";

    if (form.rating === "") errors.rating = "Rating is required";
    else if (Number(form.rating) < 1 || Number(form.rating) > 5) errors.rating = "Rating must be between 1 and 5";

    if (!form.description.trim()) errors.description = "Description is required";
    else if (form.description.trim().length < 20) errors.description = "Description must be at least 20 characters";

    if (form.latitude === "") errors.latitude = "Latitude is required";
    else if (Number(form.latitude) < -90 || Number(form.latitude) > 90) errors.latitude = "Latitude must be between -90 and 90";

    if (form.longitude === "") errors.longitude = "Longitude is required";
    else if (Number(form.longitude) < -180 || Number(form.longitude) > 180) errors.longitude = "Longitude must be between -180 and 180";

    if (form.price === "") errors.price = "Price is required";
    else if (Number(form.price) <= 0) errors.price = "Price must be greater than 0";

    if (!image) errors.image = "Please upload an image";
    return errors;
  }

  const errors = validate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleImage(e) {
    const file = e.target.files[0];
    setTouched({ ...touched, image: true });
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be smaller than 2MB");
      return;
    }
    setImageError("");
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    setTouched({ title: true, locationName: true, rating: true, description: true, latitude: true, longitude: true, price: true, image: true });
    if (Object.keys(errors).length > 0 || imageError) return;

    const data = {
      title: form.title.trim(),
      locationName: form.locationName.trim(),
      rating: Number(form.rating),
      description: form.description.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      price: Number(form.price),
      imageUrl: image,
    };

    if (isEdit) {
      dispatch(updateHotel({ ...data, id: existing.id }));
      dispatch(showNotification({ type: "success", message: "Hotel updated successfully" }));
    } else {
      dispatch(addHotel(data));
      dispatch(showNotification({ type: "success", message: "Hotel created successfully" }));
    }
    navigate("/");
  }

  return (
    <div className="container form-page">
      <Helmet><title>{isEdit ? "Edit Hotel" : "Add New Hotel"} | Stays Hub</title></Helmet>

      <form className="hotel-form" onSubmit={handleSubmit} noValidate>
        <h2>{isEdit ? "Edit Hotel" : "Add New Hotel"}</h2>

        <label htmlFor="image">Hotel Image</label>
        <input id="image" type="file" accept="image/*" onChange={handleImage} />
        {image && <img className="preview" src={image} alt="Hotel preview" />}
        {(imageError || (touched.image && errors.image)) && (
          <p className="error-text">{imageError || errors.image}</p>
        )}

        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={form.title} onChange={handleChange} onBlur={handleBlur} />
        {touched.title && errors.title && <p className="error-text">{errors.title}</p>}

        <div className="two-cols">
          <div>
            <label htmlFor="locationName">Location name (city)</label>
            <input id="locationName" name="locationName" placeholder="eg. Trichy" value={form.locationName} onChange={handleChange} onBlur={handleBlur} />
            {touched.locationName && errors.locationName && <p className="error-text">{errors.locationName}</p>}
          </div>
          <div>
            <label htmlFor="rating">Rating (1 to 5)</label>
            <input id="rating" name="rating" type="number" step="0.1" min="1" max="5" value={form.rating} onChange={handleChange} onBlur={handleBlur} />
            {touched.rating && errors.rating && <p className="error-text">{errors.rating}</p>}
          </div>
        </div>

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="4" value={form.description} onChange={handleChange} onBlur={handleBlur} />
        {touched.description && errors.description && <p className="error-text">{errors.description}</p>}

        <div className="two-cols">
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input id="latitude" name="latitude" type="number" step="any" value={form.latitude} onChange={handleChange} onBlur={handleBlur} />
            {touched.latitude && errors.latitude && <p className="error-text">{errors.latitude}</p>}
          </div>
          <div>
            <label htmlFor="longitude">Longitude</label>
            <input id="longitude" name="longitude" type="number" step="any" value={form.longitude} onChange={handleChange} onBlur={handleBlur} />
            {touched.longitude && errors.longitude && <p className="error-text">{errors.longitude}</p>}
          </div>
        </div>

        <label htmlFor="price">Price per night ($)</label>
        <input id="price" name="price" type="number" step="any" value={form.price} onChange={handleChange} onBlur={handleBlur} />
        {touched.price && errors.price && <p className="error-text">{errors.price}</p>}

        <div className="form-buttons">
          <Link to="/" className="btn btn-light">Cancel</Link>
          <button type="submit" className="btn btn-primary">{isEdit ? "Save Changes" : "Create Hotel"}</button>
        </div>
      </form>
    </div>
  );
}

export default HotelForm;
