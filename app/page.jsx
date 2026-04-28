import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900">
          Welcome to <span className="text-blue-600">FairLens</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl">
          The enterprise-grade platform to automatically detect algorithmic bias, apply mitigation techniques, and generate regulatory-compliant audit reports.
        </p>
        <div className="flex space-x-4">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="text-lg px-8">Request Demo</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
