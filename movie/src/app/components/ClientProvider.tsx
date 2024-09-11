"use client"; // Ensures this is treated as a Client Component

import { useSelector } from "react-redux";
import { RootState } from "../store/index"; // Import the correct RootState

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const isAdminLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIN);
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIN);

  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  return <>{children}</>;
}
