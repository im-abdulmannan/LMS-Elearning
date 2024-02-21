"use client";

import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import Headings from "../../../utils/Heading";

type Props = {};

const page = ({params}: any) => {
    const id = params.id;
  return (
    <div>
      <Headings
        title="ELearning Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux,AI/ML"
      />
      <div className="flex min-h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
