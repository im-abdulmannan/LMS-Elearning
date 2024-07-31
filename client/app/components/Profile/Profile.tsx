import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SidebarProfile from "./SidebarProfile";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState<any>([]);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) => data.courses.find((course: any) => userCourse.id === course.id))
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data, user.courses]);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-[#f5f5f5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000012] rounded-[5px] shadow-md dark:shadow-sm mt-20 mb-20 sticky ${
          scroll ? "top-[120px]" : "top-8"
        } left-8`}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          logoutHandler={logoutHandler}
          avatar={avatar}
        />
      </div>
      <div className="w-full h-full bg-transparent mt-20">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
        {active === 2 && <ChangePassword />}
        {active === 3 && (
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-[35px]">
              {courses &&
                courses.map((item: any, index: number) => {
                  <CourseCard
                    item={item}
                    key={index}
                    // user={user}
                    isProfile={true}
                  />;
                })}
            </div>
            {courses.length === 0 && (
              <h1 className="text-center text-[18px] font-Poppins">
                You don&apos;t have any purchased courses!
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
