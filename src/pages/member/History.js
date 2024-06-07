import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { CustomSelect, Pagination } from "components";
import InputForm from "components/inputs/inputForm";
import WithBaseComponent from "hocs/withBaseComponent";
import moment from "moment";
import { apiGetUserOrders } from "apis";
import { statusOrders } from "ultils/contants";
import { useForm } from "react-hook-form";

const History = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();

  const status = watch("status");

  const fetchOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-3xl font-bold py-4 border-b border-b-blue-800">
        LỊCH SỬ MUA HÀNG
      </header>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              placeholder="Tìm kiếm sản phẩm bằng tên hoặc thương hiệu..."
            />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-center py-2 bg-sky-900 text-white border-white">
            <th>ID</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>

        <tbody>
          {orders?.map((el, idx) => (
            <tr className="border-b" key={el._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center py-2">
                <div className="max-h-[200px] overflow-auto">
                  {el.products?.map((item) => (
                    <div className="flex items-center gap-2" key={item._id}>
                      <img
                        src={item.thumbnail}
                        alt="thumb"
                        className="w-8 h-8 rounded-md object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-main text-sm">{item.title}</span>
                        <span className="flex items-center text-xs gap-2">
                          <span>So luong:</span>
                          <span className="text-main">{item.quantity}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="text-center py-2">{el.total + "💲"}</td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt)?.format("DD/MM/YYYY")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default WithBaseComponent(History);
