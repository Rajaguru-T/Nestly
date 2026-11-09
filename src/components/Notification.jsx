import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../store/hotelSlice";

function Notification() {
  const { isOpen, type, message } = useSelector((state) => state.hotels.notification);
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => dispatch(hideNotification()), 3000);
    return () => clearTimeout(timer);
  }, [isOpen, message, dispatch]);

  if (!isOpen) return null;

  return (
    <div className={"toast toast-" + type} role="alert">
      {message}
      <button className="toast-close" onClick={() => dispatch(hideNotification())}>×</button>
    </div>
  );
}

export default Notification;
