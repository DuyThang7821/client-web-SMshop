import React, { memo } from "react";
import { renderStarFromNumber, formatMoney } from "../../ultils/helpers";
import WithBaseComponent from "hocs/withBaseComponent";
import path from "ultils/path";

const ProductCard = ({
  price,
  totalRatings,
  title,
  image,
  pid,
  navigate,
  category,
}) => {
  return (
    <div
      onClick={(e) => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/3 px-2 mb-4"
    >
      <div className="flex flex-col border rounded-sm overflow-hidden">
        <div className="flex justify-center">
          <img src={image} alt="products" className="w-48 h-48 object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold line-clamp-2 text-center">
            {title}
          </h3>
          <div className="flex items-center justify-center gap-1">
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div>
          <p className="text-sm text-center">{formatMoney(price)} VND</p>
        </div>
      </div>
    </div>
  );
};

export default WithBaseComponent(memo(ProductCard));
