import React, { useRef, useEffect, memo } from "react";
import { AiFillStar } from "react-icons/ai";

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();

  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className="flex items-center gap-2 text-sm md:text-base text-gray-500">
      <div className="w-1/6 md:w-1/12 flex items-center gap-1 text-sm md:text-base justify-center">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>

      <div className="w-3/5 md:w-3/6">
        <div className="w-full h-[4px] md:h-[6px] bg-gray-200 rounded-md relative">
          <div ref={percentRef} className="absolute inset-0 bg-red-500"></div>
        </div>
      </div>

      <div className="w-1/5 md:w-1/6 flex justify-end text-xs md:text-sm text-gray-400">
        {`${ratingCount || 0} Đánh giá`}
      </div>
    </div>
  );
};

export default memo(Votebar);
