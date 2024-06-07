import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "assets/logo.png";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import WithBaseComponent from "hocs/withBaseComponent";
import { showCart } from "store/app/appSlice";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;

const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);

  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);

  return (
    <div className="w-full md:w-main flex flex-col md:flex-row justify-between h-auto md:h-[110px] py-4 md:py-[35px] items-center space-y-4 md:space-y-0">
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          alt="logo"
          className="w-[150px] md:w-[234px] object-contain"
        />
      </Link>

      <div className="flex flex-col md:flex-row text-xs md:text-[14px] items-center md:items-start space-y-4 md:space-y-0">
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className="flex items-center cursor-pointer justify-center gap-2 px-2 md:px-6 border-r md:border-none"
            >
              <BsHandbagFill color="red" size={25} />
              <span>{`${current?.cart?.length || 0} sản phẩm`}</span>
            </div>

            <div
              id="profile"
              onClick={() => setIsShowOption((prev) => !prev)}
              className="flex items-center cursor-pointer justify-center px-2 md:px-6 gap-2 relative rounded-md"
            >
              <FaUserCircle size={25} />
              <span>Tài khoản</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-md flex-col flex py-2 absolute top-full left-0 md:left-[16px] bg-gray-100 border min-w-[150px] text-center"
                >
                  <Link
                    className="w-full p-2 hover:bg-sky-500"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Trang cá nhân
                  </Link>
                  {+current.role === 1945 && (
                    <Link
                      className="w-full p-2 hover:bg-sky-500"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Trang quản lí
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="w-full p-2 hover:bg-sky-500"
                  >
                    Đăng xuất
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default WithBaseComponent(memo(Header));
