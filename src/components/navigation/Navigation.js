import React, { memo } from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full h-[48px] py-2 border-y text-sm flex items-center justify-between lg:justify-start lg:w-main">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "px-2 lg:pr-12 hover:text-main text-main flex items-center"
              : "px-2 lg:pr-12 hover:text-main flex items-center"
          }
        >
          <span className="block lg:hidden">{el.icon}</span>
          <span className="hidden lg:block">{el.value}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Navigation);
