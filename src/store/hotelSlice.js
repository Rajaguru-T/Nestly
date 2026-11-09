import { createSlice } from "@reduxjs/toolkit";



const seedHotels = [
  { id: 1, locationName: "Chennai", rating: 4.5, title: "Marina Bay Residency", description: "Modern hotel near Marina Beach with comfortable rooms, complimentary breakfast, free Wi-Fi and easy access to Chennai city attractions.", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", latitude: 13.0500, longitude: 80.2824, price: 20000, createdAt: "2026-01-10" },
  { id: 2, locationName: "Coimbatore", rating: 4.6, title: "Western Ghats Grand Hotel", description: "Comfortable city hotel in Coimbatore featuring spacious rooms, a multi-cuisine restaurant, parking and convenient access to shopping areas.", imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600", latitude: 11.0168, longitude: 76.9558, price: 10000, createdAt: "2026-01-12" },
  { id: 3, locationName: "Madurai", rating: 4.7, title: "Meenakshi Heritage Inn", description: "Traditional-style accommodation near the famous Meenakshi Amman Temple, offering clean rooms, local cuisine and warm hospitality.", imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", latitude: 9.9195, longitude: 78.1193, price: 8000, createdAt: "2026-01-15" },
  { id: 4, locationName: "Ooty", rating: 4.8, title: "Nilgiri Hills Retreat", description: "A peaceful hill station stay surrounded by beautiful Nilgiri landscapes, featuring cosy rooms, garden views and a relaxing atmosphere.", imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600", latitude: 11.4064, longitude: 76.6932, price: 12000, createdAt: "2026-01-18" },
  { id: 5, locationName: "Kodaikanal", rating: 4.6, title: "Pine Forest Lake Resort", description: "A scenic getaway near Kodaikanal Lake with mountain views, comfortable accommodation and easy access to popular sightseeing spots.", imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600", latitude: 10.2381, longitude: 77.4892, price: 20000, createdAt: "2026-01-20" },
  { id: 6, locationName: "Rameswaram", rating: 4.4, title: "Pamban Ocean View Stay", description: "A relaxing coastal hotel in Rameswaram with comfortable rooms, sea views and convenient access to Ramanathaswamy Temple and Pamban Bridge.", imageUrl: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=600", latitude: 9.2876, longitude: 79.3129, price: 10000, createdAt: "2026-01-25" },
  { id: 7, locationName: "Pondicherry", rating: 4.8, title: "White Town Seaside Resort", description: "A charming coastal stay near Promenade Beach featuring elegant rooms, French-inspired architecture, a rooftop restaurant and relaxing sea views.", imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600", latitude: 11.9342, longitude: 79.8356, price: 15000, createdAt: "2026-02-01" },
  { id: 8, locationName: "Thanjavur", rating: 4.5, title: "Chola Heritage Residency", description: "A comfortable heritage-inspired hotel near the Brihadeeswarar Temple, offering traditional hospitality, spacious rooms and authentic South Indian food.", imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600", latitude: 10.7870, longitude: 79.1378, price: 11000, createdAt: "2026-02-05" },
  { id: 9, locationName: "Yercaud", rating: 4.6, title: "Emerald Valley Hill Resort", description: "A peaceful hill resort surrounded by greenery, offering beautiful valley views, comfortable cottages and easy access to Yercaud Lake.", imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600", latitude: 11.7753, longitude: 78.2090, price: 5000, createdAt: "2026-02-08" }
];




function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch (e) {
    return [];
  }
}

function loadHotels() {
  try {
    const saved = localStorage.getItem("hotels_v2");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.log("could not read localStorage");
  }
  return seedHotels;
}

const initialState = {
  items: loadHotels(),
  filters: { searchTerm: "", location: "", minPrice: "", maxPrice: "", onlyFavorites: false },
  favorites: loadFavorites(),
  pagination: { currentPage: 1, itemsPerPage: 6 },
  notification: { isOpen: false, type: "success", message: "" },
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel(state, action) {
      const newHotel = { ...action.payload, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) };
      state.items.unshift(newHotel);
    },
    updateHotel(state, action) {
      const index = state.items.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) state.items[index] = { ...state.items[index], ...action.payload };
    },
    deleteHotel(state, action) {
      state.items = state.items.filter((h) => h.id !== action.payload);
    },
    setFilter(state, action) {
      const { key, value } = action.payload;
      state.filters[key] = value;
      state.pagination.currentPage = 1; 
    },
    resetFilters(state) {
      state.filters = { searchTerm: "", location: "", minPrice: "", maxPrice: "", onlyFavorites: false };
      state.pagination.currentPage = 1;
    },
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload;
    },
    showNotification(state, action) {
      state.notification = { isOpen: true, type: action.payload.type, message: action.payload.message };
    },
    hideNotification(state) {
      state.notification.isOpen = false;
    },
  },
});

export const { addHotel, updateHotel, deleteHotel, setFilter, resetFilters, toggleFavorite, setCurrentPage, showNotification, hideNotification } = hotelSlice.actions;
export default hotelSlice.reducer;
