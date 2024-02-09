import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

/* eslint-disable jsx-a11y/role-supports-aria-props */
type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-2xl 800px:text-3xl font-Poppins text-center font-[500] text-black pb-2 dark:text-white ">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="old-password"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your old password
            </label>
            <input
              type="password"
              name=""
              id="old-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="new-password"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your new password
            </label>
            <input
              type="password"
              name=""
              id="new-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label
              htmlFor="confirm-password"
              className="block pb-2 text-black dark:text-white"
            >
              Enter your confirm password
            </label>
            <input
              type="password"
              name=""
              id="confirm-password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <input
              type="submit"
              className="!w-[95%] 800px:w-[250px] h-[40px] border border-[cyan] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
