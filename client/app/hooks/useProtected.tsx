import { redirect } from "next/navigation";
import { ReactNode } from "react";
import UserAuth from "./userAuth";

interface ProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect("/");
}
