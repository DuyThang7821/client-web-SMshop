import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  Breadcrumb,
  Product,
  SearchItem,
  InputSelect,
  Pagination,
} from "../../components";
import { apiGetProducts } from "../../apis";
import { sorts } from "../../ultils/contants";
import Masonry from "react-masonry-css";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const fetchProductsByCategory = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiGetProducts(queries);
    if (response?.success) setProducts(response);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    for (let i of params) queries[i[0]] = i[1];
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }

    delete queries.to;
    delete queries.from;

    const q = { ...priceQuery, ...queries };
    fetchProductsByCategory(q);
    window.scrollTo(0, 0);
  }, [params]);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);
  return (
    <div className="w-full">
      <div className="h-[81px] bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-screen-lg px-4">
          <h3 className="font-semibold uppercase text-center">{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mt-8 flex flex-wrap justify-between border p-4">
        <div className="w-full lg:w-3/5 xl:w-4/5 flex flex-col gap-3 px-4">
          <span className="font-semibold text-sm">Lọc</span>
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
        <div className="w-full lg:w-2/5 xl:w-1/5 flex flex-col gap-3 px-4 mt-3">
          <span className="font-semibold text-sm">Tìm kiếm</span>
          <div className="w-full">
            <InputSelect
              value={sort}
              options={sorts}
              changeValue={changeValue}
              className="w-full" // Thêm class để cố định kích thước của InputSelect
            />
          </div>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto mt-8">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((el) => (
            <Product key={el._id} pid={el._id} productData={el} normal={true} />
          ))}
        </Masonry>
      </div>
      <div className="max-w-screen-lg mx-auto mt-10 p-2">
        <Pagination totalCount={products?.counts} />
      </div>
    </div>
  );
};
export default Products;
