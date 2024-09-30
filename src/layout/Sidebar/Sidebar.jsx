import { useEffect, useState, useContext } from "react";
import { iconsImgs, personsImgs } from "../../utils/images";
import { navigationLinks } from "../../data/data";
import "./Sidebar.css";
import { logout } from "../../redux/slices/authSlice";
import { SidebarContext } from "../../context/sidebarContext";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarClass("sidebar-change");
    } else {
      setSidebarClass("");
    }
  }, [isSidebarOpen]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className={`sidebar ${sidebarClass}`}>
      <div className="user-info">
        <div className="info-img img-fit-cover">
          <img src={personsImgs.person_two} alt="profile" />
        </div>
        <span className="info-name">alice-doe</span>
      </div>

      <nav className="navigation">
        <ul className="nav-list">
          {navigationLinks.map((navigationLink) => (
            <li className="nav-item" key={navigationLink.id}>
              <Link
                to={navigationLink.to}
                className={`nav-link ${
                  navigationLink.id === activeLinkIdx ? "active" : ""
                }`}
                onClick={() => setActiveLinkIdx(navigationLink.id)} // Cập nhật activeLinkIdx khi liên kết được nhấp
              >
                <img
                  src={navigationLink.image}
                  className="nav-link-icon"
                  alt={navigationLink.title}
                />
                <span className="nav-link-text">{navigationLink.title}</span>
              </Link>
            </li>
          ))}

          <li className="nav-item" onClick={handleLogout}>
            <Link className={`nav-link `}>
              <img
                src={iconsImgs.logout}
                className="nav-link-icon"
                alt={"Logout"}
              />
              <span className="nav-link-text">{"logout"}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
