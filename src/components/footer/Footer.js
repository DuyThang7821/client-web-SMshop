import React, { memo } from "react";
import icons from "../../ultils/icons";

const { MdEmail } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-auto w-full bg-blue-700 flex flex-col items-center justify-center py-4">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between px-4 lg:px-0">
          <div className="flex flex-col flex-1 mb-4 lg:mb-0">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center w-full lg:w-auto">
            <input
              type="text"
              placeholder="Email Address"
              className="p-4 pr-0 rounded-l-full w-full bg-gray-100 outline-none text-black-800
            placeholder:text-sm placeholder:text-gray-800 placeholder:italic"
            />
            <div className="h-[56px] w-[56px] bg-gray-600 rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-auto w-full bg-gray-800 flex items-center justify-center text-white text-[13px] py-8">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row px-4 lg:px-0">
          <div className="flex-2 flex flex-col gap-2 mb-4 lg:mb-0">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              Về chúng tôi
            </h3>
            <span>
              <span>Địa chỉ: </span>
              <span className="opacity-70">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span>Số điện thoại: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">tadathemes@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2 mb-4 lg:mb-0">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              THÔNG TIN
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 mb-4 lg:mb-0">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              HỖ TRỢ
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
