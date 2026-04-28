"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export function RoleGuard({ children, allowedRoles }) {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        const rolePath = user.role.toLowerCase().replace("_", "-");
        router.push(`/${rolePath}`);
      } else {
        setAuthorized(true);
      }
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || !authorized) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <>{children}</>;
}
