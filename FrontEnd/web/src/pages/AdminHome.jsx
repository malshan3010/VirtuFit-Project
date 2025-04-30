import React from "react";
import "tailwindcss/tailwind.css";

const AdminHome = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Spline Design */}
      <iframe
        src="https://my.spline.design/lines-31e00305fd3d71c5bf0a066a7b8bb99a/"
        frameBorder="0"
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full"
        title="Spline Design"
      ></iframe>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
        <h1 className="text-4xl font-bold mb-4">Welcome to Administration</h1>
        <p className="text-lg mb-6">Manage from one platform....</p>
      </div>
    </div>
  );
};

export default AdminHome;
