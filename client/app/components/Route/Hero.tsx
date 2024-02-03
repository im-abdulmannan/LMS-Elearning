import Link from "next/link";
import { FC } from "react";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-[95%] m-auto flex justify-center items-center h-[80vh] 800px:h-[100vh] translate-y-0 opacity-100 transition-all duration-1000 ease-in-out">
      <div className="w-[90%] 800px:w-[80%]">
        <h1 className="font-extrabold text-[25px] leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center text-black dark:text-white font-Poppins 800px:!leading-[60px]">
          Unleash your inner <span className="text-gradient">programming</span>{" "}
          <br />
          <span className="text-gradient">genius</span> with our community.
        </h1>
        <div className="pt-2"></div>
        <div className="w-full text-center">
          <p className="800px:block hidden font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#000000c6] dark:text-[#A3B3BC] mt-5 mb-10">
            Empower your programming journey with ELearning <br /> dedicated
            community and comprehensive resources.
          </p>
          <p className="800px:hidden block font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[25px] font-normal text-[#000000c6] dark:text-[#A3B3BC] mt-5 mb-10">
            Empower your programming journey with ELearning dedicated community
            and comprehensive resources.
          </p>
          <div className="flex w-full justify-center font-Poppins font-[600]">
            <Link href="/courses">
              <div className="text-black dark:text-white flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold">
                Explore Courses
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
