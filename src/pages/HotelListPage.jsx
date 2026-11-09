import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

import {
  deleteHotel,
  toggleFavorite,
  setCurrentPage,
  showNotification,
} from "../store/hotelSlice";

import HotelFilter from "../components/HotelFilter";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";

function HotelListPage() {
  const { items, filters, pagination, favorites } = useSelector(
    (state) => state.hotels
  );

  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const [deleteId, setDeleteId] = useState(null);

  
  const filteredHotels = useMemo(() => {
    const term = filters.searchTerm.toLowerCase();

    return items.filter((hotel) => {
      const matchSearch =
        hotel.title.toLowerCase().includes(term) ||
        (hotel.locationName || "").toLowerCase().includes(term);

      const matchLocation =
        filters.location === "" ||
        hotel.locationName === filters.location;

      const matchMin =
        filters.minPrice === "" ||
        hotel.price >= Number(filters.minPrice);

      const matchMax =
        filters.maxPrice === "" ||
        hotel.price <= Number(filters.maxPrice);

      const matchFav =
        !filters.onlyFavorites || favorites.includes(hotel.id);

      return (
        matchSearch &&
        matchLocation &&
        matchMin &&
        matchMax &&
        matchFav
      );
    });
  }, [items, filters, favorites]);

 
  const totalPages = Math.ceil(
    filteredHotels.length / pagination.itemsPerPage
  );

  
  useEffect(() => {
    if (pagination.currentPage > totalPages && totalPages > 0) {
      dispatch(setCurrentPage(totalPages));
    }
  }, [totalPages, pagination.currentPage, dispatch]);

  const start =
    (pagination.currentPage - 1) * pagination.itemsPerPage;

  const pageHotels = filteredHotels.slice(
    start,
    start + pagination.itemsPerPage
  );

  
  function confirmDelete() {
    dispatch(deleteHotel(deleteId));

    dispatch(
      showNotification({
        type: "success",
        message: "Hotel deleted successfully",
      })
    );

    setDeleteId(null);
  }

  return (
    <div className="hotel-page">
      <Helmet>
        <title>Browse Hotels | NESTLY</title>
        <meta
          name="description"
          content="Browse and search hotels. Compare prices and find your perfect stay."
        />
      </Helmet>

      <div className="container hotel-page-layout">

        
        <main className="results">

  <div className="listing-toolbar">
    <div className="listing-heading">
      <h2>Explore Hotels</h2>
      <span>
        <b>{filteredHotels.length}</b> hotels found
      </span>
    </div>

    <HotelFilter />
  </div>

         
          {pageHotels.length === 0 ? (
            <p className="empty">
              No hotels found. Try changing your search or filters.
            </p>
          ) : (
            <div className="hotel-list">
              {pageHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  role={role}
                  isFavorite={favorites.includes(hotel.id)}
                  onDelete={setDeleteId}
                  onToggleFavorite={(id) =>
                    dispatch(toggleFavorite(id))
                  }
                />
              ))}
            </div>
          )}

          
          <Pagination
            currentPage={pagination.currentPage}
            totalItems={filteredHotels.length}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={(page) =>
              dispatch(setCurrentPage(page))
            }
          />
        </main>
      </div>

      
      <ConfirmModal
        isOpen={deleteId !== null}
        message="Are you sure you want to delete this hotel?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}

export default HotelListPage;
