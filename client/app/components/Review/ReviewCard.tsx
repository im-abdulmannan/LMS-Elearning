import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import { FC } from "react";

type Props = {
  item: any;
};

const ReviewCard: FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max pb-4 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-slate-700] rounded-lg p-3 shadow-inner">
      <div className="flex w-full">
        <Image
          src={item.avatar}
          height={50}
          width={50}
          className="w-[50px] h-[50px] rounded-full object-cover"
          alt=""
        />
        <div className="800px:flex justify-between w-full hidden">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-white">
              {item.Profession}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>
        {/* For Mobile */}
        <div className="800px:hidden justify-between w-full flex flex-col">
          <div className="pl-4">
            <h5 className="text-[20px] text-black dark:text-white">
              {item.name}
            </h5>
            <h6 className="text-[16px] text-black dark:text-white">
              {item.Profession}
            </h6>
          </div>
          <Ratings rating={item.rating} />
        </div>
      </div>
      <p className="pt-2 px-2 font-Poppins text-black dark:text-white">
        {item.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
