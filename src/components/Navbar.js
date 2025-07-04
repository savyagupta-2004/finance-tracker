"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full border-b shadow-sm bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">Savya Gupta</span>

        {/* Desktop links */}
        <nav className="hidden md:flex gap-6">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">About</Button>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="space-y-4 p-6">
            <div className="text-xl font-bold">Menu</div>
            <Button variant="ghost" className="w-full justify-start">
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              About
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
