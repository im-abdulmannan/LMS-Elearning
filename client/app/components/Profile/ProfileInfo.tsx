import { styles } from "@/app/styles/style";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import avatarDefault from "../../../public/assets/Profile.png";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: React.FC<Props> = ({ user, avatar }) => {
  const [name, setName] = React.useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateUser, { isSuccess: success, error: updateUserError }] =
    useUpdateUserMutation();
  const [loadUser, setLoadUser] = React.useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };

  React.useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateUserError) {
      console.log(error);
    }
    if(success) {
      toast.success("User updated successfully")
    }
  }, [error, isSuccess, success, updateUserError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await updateUser({
        name: name,
        email: user.email,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            alt="Profile Photo"
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#30bbb2ca] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="w-[100%] pt-2">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                readOnly
                id="email"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={user && user.email}
              />
            </div>
            <br />
            <input
              type="submit"
              className="w-full 800px:w-[250px] h-[40px] border border-[cyan] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
