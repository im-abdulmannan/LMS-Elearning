import { useState } from "react";
import DashboardWidgets from "../../components/Admin/Widgets/DashboardWidgets";
import DashboardHeader from "./DashboardHeader";


type Props = {
  isDashboard?: boolean;
};

const AdminDashboardHero = ({isDashboard}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
      {
        isDashboard && (
          <DashboardWidgets open={open} />
        )
      }
    </div>
  );
};

export default AdminDashboardHero;
