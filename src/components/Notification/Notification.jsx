import React from "react";
import "./Notification.scss"; // Import stylesheet if you have one
import { useSelector } from "react-redux";
import NotifyItem from "../NotifyItem/NotifyItem";
import api from '../../api'

const Notification = (props) => {
  const {notifications, onChangeOpen, onReadNotify} = props;
  const handleReadNotifcation = async (id)=>{
    try{
        const response = await api.put(`/notifications/read/${id}`)
        if(response.data.code === 1000){
          onReadNotify();
          onChangeOpen();
        }}
    catch(error)
    {console.log("read notification failed: ", error)}
  }
  
 
  return (
    <div className="notification">
      <h3>Notifications</h3>
      <div className="notification-list">
          {notifications && notifications.length > 0 &&
            notifications.map((notification, index) => (
              <div className="notification-item" key={notification.id} onClick={()=>handleReadNotifcation(notification.id)}>
                <NotifyItem 
                notification = {notification}></NotifyItem>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Notification;
