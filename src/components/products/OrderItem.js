import SelectQuantity from "components/common/SelectQuantity";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { updateCart } from "store/user/userSlice";
import WithBaseComponent from "hocs/withBaseComponent";

const OrderItem = ({
  dispatch,
  color,
  dfQuantity = 1,
  price,
  title,
  thumbnail,
  pid,
}) => {
  const [quantity, setQuantity] = useState(() => dfQuantity);

  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };

  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };

  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);

  return (
    <div className="w-full border-b mx-auto font-bold py-3 grid grid-cols-1 md:grid-cols-10">
      <div className="md:col-span-6 w-full md:w-auto">
        <div className="flex gap-2 px-4 py-3">
          <img src={thumbnail} alt="thumb" className="w-28 h-28 object-cover" />
          <div className="flex flex-col items-start gap-1">
            <span className="font-bold text-sm">{title}</span>
            <span className="text-xs font-main">{color}</span>
          </div>
        </div>
      </div>
      <div className="md:col-span-1 w-full md:w-auto flex justify-center items-center">
        <SelectQuantity
          quantity={quantity}
          handleQuantity={handleQuantity}
          handleChangeQuantity={handleChangeQuantity}
        />
      </div>
      <div className="md:col-span-3 w-full md:w-auto flex justify-center items-center mt-4">
        <span className="text-lg">{formatMoney(price * quantity)} VND</span>
      </div>
    </div>
  );
};

export default WithBaseComponent(OrderItem);
