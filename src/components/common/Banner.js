import React, { memo } from "react";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src="https://t4.ftcdn.net/jpg/03/20/46/13/360_F_320461388_5Snqf6f2tRIqiWlaIzNWrCUm1Ocaqhfm.jpg"
        alt="banner"
        className="w-full object-cover sm:h-[200px] md:h-[300px] lg:h-[400px] xl:h-[500px]"
      />
    </div>
  );
};

export default memo(Banner);
