import { iconsImgs } from "../../utils/images";
import "./TopNav.scss";
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo-ecommerce.png";
import { SidebarContext } from "../../context/sidebarContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/slices/notificationSlice";
import Notification from "../Notification/Notification";
import useSocket from "../../hook/useSocket";

const TopNav = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch = useDispatch();
  const [listNotifi, setListNotifi] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0); // State để quản lý số lượng thông báo chưa đọc
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  const token = localStorage.getItem("token");

  // Fetch notifications from the API
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Update local listNotifi whenever notifications from Redux change
  useEffect(() => {
    if (notifications) {
      setListNotifi(notifications);
    }
  }, [notifications]);

  // Handle WebSocket notifications
  const handleNotification = (data) => {
    setListNotifi((prev) => [...prev, data]); // Add new notification from WebSocket
    setUnreadCount((prev) => prev + 1); // Tăng số lượng thông báo chưa đọc
  };

  const connected = useSocket(
    "/topic/admin/notification",
    token,
    handleNotification
  );

  const handleChangeOpen = () => {
    setIsNotification(!isNotification); // Toggle notification panel
    setUnreadCount(0); // Reset số lượng thông báo chưa đọc khi mở bảng thông báo
  };

  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="Menu Icon" />
        </button>
        <div className="content-top-title">
          <Link to="/">
            <img style={{ width: "240px" }} src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="content-top-btns">
        <button type="button" className="search-btn content-top-btn">
          <img src={iconsImgs.search} alt="Search Icon" />
        </button>
        <button
          className="notification-btn content-top-btn"
          onClick={handleChangeOpen}
        >
          <img src={iconsImgs.bell} alt="Notification Icon" />
          {unreadCount > 0 && (
            <span className="notification-btn-count">{unreadCount}</span> // Hiển thị số lượng thông báo chưa đọc
          )}
        </button>
      </div>

      {/* Render notifications when WebSocket is connected and notifications panel is open */}
      {isNotification && <Notification notifications={listNotifi} />}
    </div>
  );
};

export default TopNav;
