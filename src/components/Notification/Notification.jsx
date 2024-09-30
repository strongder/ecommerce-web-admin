import React from "react";
import "./Notification.scss"; // Import stylesheet if you have one
import { useSelector } from "react-redux";

const Notification = ({notifications}) => {
  console.log(notifications);
 
  return (
    <div className="notification">
      <h3>Notifications</h3>
      <div className="notification-list">
        <ul>
          {notifications && notifications.length > 0 &&
            notifications.map((notification, index) => (
              <div className="notification-item" key={notification.id}>
                <div className="title">{notification.title}</div>
                <p className="message">{notification.message}</p>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
