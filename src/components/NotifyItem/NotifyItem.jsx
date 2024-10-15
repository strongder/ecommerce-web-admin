import React, { useEffect, useState } from "react";
import "./NotifyItem.scss"; // Thêm dòng này để import SCSS
import { useDispatch } from "react-redux";
import api from "../../api";
import { useNavigate } from "react-router-dom";
const NotifyItem = (props) => {
  const notifyItem = props.notification;
  const [order, setOrder] = useState({});
  const naviagte = useNavigate();
  const handleFetchOrderById = async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.result);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailNotify = () => {
    naviagte(`/orders/${notifyItem?.data}`);
  };

  useEffect(() => {
    if (notifyItem.type === "ORDER") {
      handleFetchOrderById(notifyItem?.data);
    }
  }, [notifyItem]);

  return (
    <div className="notify-item" onClick={handleDetailNotify}>
      <div className="notify-image">
        {order.orderItems && (
          <img src={order?.orderItems[0]?.image} alt={""} className="image" />
        )}
      </div>
      <div className="content">
        <h3 className="notify-title">{notifyItem.title}</h3>
        <p className="notify-message">{notifyItem.message}</p>
      </div>
    </div>
  );
};

export default NotifyItem;
