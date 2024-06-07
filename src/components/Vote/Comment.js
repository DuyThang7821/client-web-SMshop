import React, { memo } from "react";
import avatar from "assets/avatarDefault.jpg";
import moment from "moment";
import { renderStarFromNumber } from "../../ultils/helpers";

const Comment = ({
  image = avatar,
  name = "Anonymous",
  updatedAt,
  comment,
  star,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-none">
        <img
          src={image}
          alt="avatar"
          className="w-10 h-10 md:w-[25px] md:h-[25px] object-cover rounded-full"
        />
      </div>

      <div className="flex flex-col flex-auto">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm md:text-base">{name}</h3>
          <span className="text-xs italic">{moment(updatedAt)?.fromNow()}</span>
        </div>

        <div className="flex flex-col gap-2 pl-4 text-xs md:text-sm mt-4 border border-gray-300 py-2 bg-gray-100">
          <span className="flex items-center gap-1">
            <span className="font-semibold">Đánh giá:</span>
            <span className="flex items-center gap-1">
              {renderStarFromNumber(star)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
          </span>

          <span className="flex gap-1">
            <span className="font-semibold">Phản hồi:</span>
            <span>{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
