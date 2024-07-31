import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationsStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const audioRef = useRef(
    new Audio(
      "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
    )
  );

  const playNotificationSound = () => {
    audioRef.current.play().catch((err) => {
      console.error("Error: ", err);
    })
  }

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }

    if (isSuccess) {
      refetch();
    }
    audioRef.current.load();
  }, [data, isSuccess, refetch]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, [refetch]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationsStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length > 0}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>

          {notifications &&
            notifications.map((item: any, index: number) => (
              <>
                <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
                  <div className="w-full flex items-center justify-between p-2">
                    <p className="text-black dark:text-white">{item.title}</p>
                    <p
                      className="text-black dark:text-white cursor-pointer"
                      onClick={() => handleNotificationStatusChange(item._id)}
                    >
                      Mark as read
                    </p>
                  </div>
                  <p className="px-2 text-black dark:text-white">
                    {item.message}
                  </p>
                  <p className="p-2 text-black dark:text-white text-[14px]">
                    {format(item.createdAt)}
                  </p>
                </div>
              </>
            ))}

          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              deleniti illo nemo voluptas numquam sit iure repellat
              consequuntur!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              5 days ago
            </p>
          </div>

          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Question Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="px-2 text-black dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              deleniti illo nemo voluptas numquam sit iure repellat
              consequuntur!
            </p>
            <p className="p-2 text-black dark:text-white text-[14px]">
              5 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
