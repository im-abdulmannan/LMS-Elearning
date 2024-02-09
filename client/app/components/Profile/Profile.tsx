import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { FC, useState } from "react";
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
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

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
      </div>
    </div>
  );
};

export default Profile;
