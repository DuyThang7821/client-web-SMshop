import React, { memo } from "react";
import usePagination from "../../hooks/usePagination";
import { PagiItem } from "..";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const start = Math.min((currentPage - 1) * pageSize + 1, totalCount);
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <span className="text-sm italic md:mb-0 mb-2">
        {+params.get("page")
          ? `Show products ${range()} of ${totalCount}`
          : `Show products ${Math.min(totalCount, 1)} - ${Math.min(
              +process.env.REACT_APP_LIMIT,
              totalCount
            )} of ${totalCount}`}
      </span>
      <div className="flex items-center">
        <div className="flex flex-wrap gap-2">
          {pagination?.map((el) => (
            <PagiItem key={el}>{el}</PagiItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination);
