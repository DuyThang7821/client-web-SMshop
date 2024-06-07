import React, { useEffect, useState, memo } from "react";
import { ProductCard } from "..";
import { apiGetProducts } from "../../apis";

const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response?.success) setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full md:w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-main">
        SẢN PHẨM NỔI BẬT
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px] ">
        {products?.map((el) => (
          <ProductCard key={el._id} pid={el._id} image={el.thumb} {...el} />
        ))}
      </div>
    </div>
  );
};

export default memo(FeatureProducts);
