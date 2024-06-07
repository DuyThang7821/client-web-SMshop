import React, { useEffect, useState } from "react";
import payment from "assets/payment.svg";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { Congrat, Paypal } from "components";
import WithBaseComponent from "hocs/withBaseComponent";
import { getCurrent } from "store/user/asyncActions";

const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  return (
    <div className="p-8 py-8 grid grid-cols-1 md:grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full md:col-span-4 flex justify-center items-center">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col gap-6 md:col-span-6 justify-center">
        <h2 className="text-3xl mb-6 font-bold text-center md:text-left">
          THANH TOÁN ĐƠN HÀNG CỦA BẠN
        </h2>
        <div className="flex flex-col gap-6">
          <div>
            <table className="table-auto">
              <thead>
                <tr className="border bg-gray-200">
                  <th className="text-left p-2">Sản phẩm</th>
                  <th className="text-center p-2">Số lượng</th>
                  <th className="text-right p-2">Giá tiền</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((el) => (
                  <tr className="border" key={el._id}>
                    <td className="text-left p-2">{el.title}</td>
                    <td className="text-center p-2">{el.quantity}</td>
                    <td className="text-right p-2">
                      {formatMoney(el.price) + " VND"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Tổng tiền: </span>
                <span className="text-main font-bold text-2xl">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0
                  )
                )} VND`}</span>
              </span>
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Địa chỉ: </span>
                <span className="text-main font-bold text-2xl">
                  {current?.address}
                </span>
              </span>
            </div>
            <div className="w-full mx-auto mt-5">
              <Paypal
                payload={{
                  products: currentCart,
                  total: Math.round(
                    +currentCart?.reduce(
                      (sum, el) => +el?.price * el.quantity + sum,
                      0
                    ) / 23500
                  ),
                  address: current?.address,
                }}
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +currentCart?.reduce(
                    (sum, el) => +el?.price * el.quantity + sum,
                    0
                  ) / 23500
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithBaseComponent(Checkout);
