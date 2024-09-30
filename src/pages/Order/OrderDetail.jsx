import React, { useEffect } from "react";
import "./OrderDetail.scss";
import { orders } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { acceptOrder, fetchOrderById } from "../../redux/slices/orderSlice";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useSelector((state) => state.orders.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const handleConfirm = () => {
    dispatch(acceptOrder(id));
    toast.success("Xác nhận đơn hàng thành công");
  };
  return (
    <div className="order-detail">
      <h1>Chi Tiết Đơn Hàng</h1>

      <div className="order-info">
        <h2>Thông Tin Người Nhận</h2>
        <p>
          <strong>Tên:</strong> {order?.address?.recipientName}
        </p>
        <p>
          <strong>Số Điện Thoại:</strong> {order?.address?.phone}
        </p>
        <p>
          <strong>Địa Chỉ:</strong>{" "}
          {`${order?.address?.addressDetail}, ${order?.address?.ward}, ${order?.address?.district}, ${order?.address?.city}`}
        </p>
      </div>

      <div className="order-status">
        <h2>Thông Tin Đơn Hàng</h2>
        <p>
          <strong>Phương Thức Thanh Toán:</strong> {order?.paymentMethod}
        </p>
        <p>
          <strong>Trạng Thái:</strong> {order?.status}
        </p>
        <p>
          <strong>Tổng Tiền:</strong> {order?.total?.toLocaleString()} VND
        </p>
        <p>
          <strong>Ngày Tạo:</strong>{" "}
          {new Date(order?.createdAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="order-items">
        <h2 style={{marginBottom:"10px"}}>Sản Phẩm Trong Đơn Hàng</h2>
        <table className="items-table">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Attribute</th>
              <th>Số Lượng</th>
              <th>Đơn Giá</th>
              <th>Tổng Cộng</th>
            </tr>
          </thead>
          <tbody>
            {order?.orderItems?.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>
                  {Object.entries(item.varProduct.attribute).map(
                    ([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong> {value || "N/A"}
                      </div>
                    )
                  )}
                </td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()} VND</td>
                <td>{(item.quantity * item.price).toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-action">
        <button className="btn-confirm" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="btn-exit" onClick={() => navigate(-1)}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
