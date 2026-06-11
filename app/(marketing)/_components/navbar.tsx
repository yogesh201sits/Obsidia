"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ThemeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  const scrolled = useScrollTop(100);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full dark:bg-[#1F1F1F] z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-blue-600 transition-colors">
             <ThemeToggle/>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 border-t bg-white/95" : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            About
          </a>
          <a href="#" className="hover:text-blue-600">
            <ThemeToggle/>
          </a>
        </div>
      </div>
    </nav>
  );
};