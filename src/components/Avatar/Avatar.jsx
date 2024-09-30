import React from "react";

const Avatar = ({ fullName }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const lastName = nameParts[nameParts.length - 1] !== null ? nameParts[nameParts.length - 1] : nameParts[0];
    return lastName.charAt(0).toUpperCase();
  };

  const style = {
    backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    borderRadius: "50%",
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    height: "100%",
    fontWeight: "bold",
    fontSize: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const avatar = getInitials(fullName);
  return (
    <div className="avatar-name" style={style}>
      {avatar}
    </div>
  );
};

export default Avatar;
