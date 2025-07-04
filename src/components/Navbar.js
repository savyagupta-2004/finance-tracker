"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b shadow-sm bg-white dark:bg-black">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-2xl font-bold text-primary">Savya Gupta</span>

        {/* Desktop links */}
        <nav className="hidden md:flex gap-6">
          <a href="#budget">
            <Button variant="ghost">Budget</Button>
          </a>
          <a href="#transaction">
            <Button variant="ghost">Transaction</Button>
          </a>
          <a href="#analysis">
            <Button variant="ghost">Analysis</Button>
          </a>
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="space-y-4 p-6">
            <SheetTitle>Menu</SheetTitle>

            <a href="#budget">
              <Button variant="ghost" className="w-full justify-start">
                Budget
              </Button>
            </a>
            <a href="#transaction">
              <Button variant="ghost" className="w-full justify-start">
                Transaction
              </Button>
            </a>
            <a href="#analysis">
              <Button variant="ghost" className="w-full justify-start">
                Analysis
              </Button>
            </a>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
