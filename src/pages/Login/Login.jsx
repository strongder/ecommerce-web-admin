import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-ecommerce.png";
import background from "../../assets/images/background.jpg";
import "./Login.scss";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../../hook/useSocket";
import { login } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi gửi form mặc định
    try {
      const action = await dispatch(login(form));
      if (login.fulfilled.match(action)) {
        setIsLogin(true);
        toast.success("Login successfully");
      }
    } catch (error) {
      toast.error("Email or password is incorrect");
    }
  };
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);
  

  return (
    <div className="login">
      <div className="row">
        <div className="col-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="col-image">
          <img src={background} alt="Background" />
        </div>
        <div className="col-form">
          <div className="social-login">
            <p className="lead">Login</p>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Email address"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            <div className="form-options">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
