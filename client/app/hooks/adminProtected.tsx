import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

interface AdminProtectedProps {
  children: ReactNode;
}

export const AdminProtected = ({ children }: AdminProtectedProps) => {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    const isAdmin = user.role === "admin";
    return isAdmin ? children : redirect("/");
  }
};
