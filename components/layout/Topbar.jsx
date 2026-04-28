"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { Bell, UserCircle } from "lucide-react";

export function Topbar() {
  const { user } = useAuthStore();

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="font-semibold text-slate-800">
        Dashboard
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-slate-900">{user?.name}</span>
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full inline-block">
              {user?.role.replace("_", " ")}
            </span>
          </div>
          <UserCircle className="w-8 h-8 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
