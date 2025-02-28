import React from "react";

const MainLayout = ({ children, width = "sm:w-90" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className={`bg-gray-100 p-8 rounded-lg shadow-lg w-auto ${width}`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
