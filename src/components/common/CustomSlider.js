import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "..";

const CustomSlider = ({ products, activedTab, normal }) => {
  // Cài đặt slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Số lượng hiển thị slide trên một dòng
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Kích thước màn hình từ 1024px trở xuống
        settings: {
          slidesToShow: 2, // Hiển thị 2 slide trên một dòng
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Kích thước màn hình từ 768px trở xuống
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide trên một dòng
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
              normal={normal}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
