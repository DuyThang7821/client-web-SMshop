import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../ultils/icons";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from "sweetalert2";
const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/${path.LOGIN}`);
  };

  return (
    <div className="h-[58px] p-2 md:p-4 w-full bg-blue-700 flex items-center justify-center">
      <div className="w-full md:w-main flex items-center justify-between text-sm md:text-md text-white">
        {/* Hiển thị đoạn chữ trên màn hình PC */}
        <span className="hidden md:block text-center md:text-left">
          ĐẶT HÀNG ONLINE HOẶC LIÊN HỆ CHO CHÚNG TÔI: 0826257475
        </span>
        <div className="flex flex-1 items-center justify-between md:justify-end gap-2 md:gap-4 text-xs md:text-sm">
          {isLoggedIn && current ? (
            <>
              {/* Hiển thị tên người dùng và nút logout trên màn hình mobile */}
              <span className="block md:hidden">{`Chào mừng, ${current?.lastname} ${current?.firstname}`}</span>
              <span
                onClick={handleLogout}
                className="block md:hidden cursor-pointer hover:rounded-full hover:bg-gray-200 hover:text-main p-1 md:p-2"
              >
                <AiOutlineLogout size={18} />
              </span>
              {/* Hiển thị tên người dùng và nút logout trên màn hình PC */}
              <span className="hidden md:block">{`Chào mừng, ${current?.lastname} ${current?.firstname}`}</span>
              <span
                onClick={handleLogout}
                className="hidden md:block cursor-pointer hover:rounded-full hover:bg-gray-200 hover:text-main p-1 md:p-2"
              >
                <AiOutlineLogout size={18} />
              </span>
            </>
          ) : (
            <div className="flex-1 flex justify-center md:justify-end">
              <Link className="hover:text-yellow-300" to={`/${path.LOGIN}`}>
                Đăng nhập hoặc tạo tài khoản
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
