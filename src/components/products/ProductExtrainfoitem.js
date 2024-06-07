import React, { memo } from "react";

const ProductExtraInfoItem = ({ icon, title, sub }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center p-3 gap-4 mb-2.5 border">
      <span className="p-2 bg-gray-800 rounded-full flex items-center justify-center text-white">
        {icon}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className="font-medium">{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfoItem);
