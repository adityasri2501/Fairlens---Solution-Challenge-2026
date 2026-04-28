"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleLogin = (role) => {
    setUser({
      id: "demo-id",
      email: `${role.toLowerCase()}@demo.com`,
      name: `Demo ${role.replace("_", " ")}`,
      role: role,
      createdAt: new Date()
    });
    const basePath = role === 'COMPLIANCE_OFFICER' ? 'compliance' : role.toLowerCase().replace("_", "-");
    router.push(`/${basePath}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Sign in to FairLens</h2>
          <p className="mt-2 text-slate-600">Select a demo role to continue</p>
        </div>
        <div className="space-y-4 mt-8">
          <Button className="w-full" onClick={() => handleLogin('DATA_SCIENTIST')}>
            Login as Data Scientist
          </Button>
          <Button className="w-full" variant="outline" onClick={() => handleLogin('COMPLIANCE_OFFICER')}>
            Login as Compliance Officer
          </Button>
          <Button className="w-full" variant="secondary" onClick={() => handleLogin('PRODUCT_MANAGER')}>
            Login as Product Manager
          </Button>
          <Button className="w-full" variant="ghost" onClick={() => handleLogin('REVIEWER')}>
            Login as Human Reviewer
          </Button>
        </div>
      </div>
    </div>
  );
}
