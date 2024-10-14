import { iconsImgs } from "../../data/images";
import "./TopNav.scss";
import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/logo-ecommerce.png";
import { SidebarContext } from "../../context/sidebarContext";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/slices/notificationSlice";
import Notification from "../Notification/Notification";
import useSocket from "../../hook/useSocket";
import { getUnreadNotification } from "../../services/notificationService";

const TopNav = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const [isNotification, setIsNotification] = useState(false);
  const dispatch = useDispatch();
  const notifyRef = useRef(null); // Sử dụng useRef để làm chức năng đóng mở notify
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

  useEffect(() => {
    const fetchUnreadNotification = async () => {
      const unread = await getUnreadNotification();
      console.log(unread);
      setUnreadCount(unread);
    };
    fetchUnreadNotification();
  }, []);

  // Update local listNotifi whenever notifications from Redux change
  useEffect(() => {
    if (notifications) {
      setListNotifi(notifications);
    }
  }, [notifications]);

  const handleReadNotifcation = () => {
    setUnreadCount((prev) => (prev > 0 ? prev - 1 : 0));
  };
  // Handle WebSocket notifications
  const handleFetchNotificationSocket = (data) => {
    setListNotifi((prev) => [...prev, data]); // Add new notification from WebSocket
    setUnreadCount((prev) => prev + 1); // Tăng số lượng thông báo chưa đọc
  };

  const connected = useSocket(
    "/topic/admin/notification",
    token,
    handleFetchNotificationSocket
  );

  const handleChangeOpen = () => {
    setIsNotification(!isNotification); // Toggle notification panel
    if (notifyRef.current) {
      notifyRef.current.classList.toggle("active"); // Sử dụng useRef để đóng/mở bảng thông báo
    }
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
      {isNotification && (
        <Notification
          notifications={listNotifi}
          onChangeOpen={handleChangeOpen}
          onReadNotify = {handleReadNotifcation}
          ref={notifyRef}
        />
      )}
    </div>
  );
};

export default TopNav;
