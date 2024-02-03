import { redirect } from "next/navigation";
import { ReactNode } from "react";
import userAuth from "./userAuth";

interface ProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = userAuth();

  return isAuthenticated ? children : redirect("/");
}
