"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { useConvexAuth } from "convex/react";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ThemeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";
import {
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export const Navbar = () => {
  const scrolled = useScrollTop(100);
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 dark:bg-[#1F1F1F] ${
        scrolled
          ? "bg-white/80 dark:bg-[#1F1F1F]/80 backdrop-blur-md shadow-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            About
          </Link>

          <ThemeToggle />

          {isLoading ? (
            <Spinner size="sm" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/documents">
                  <button className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
                    Enter Notes
                  </button>
                </Link>
                <UserButton />
              </div>
            ) : (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                  Log In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-96 border-t bg-white dark:bg-[#1F1F1F]"
            : "max-h-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-600"
          >
            About
          </Link>

          <ThemeToggle />

          {isLoading ? (
            <div className="flex justify-center py-2">
              <Spinner size="sm" />
            </div>
          ) : isAuthenticated ? (
            <UserButton />
          ) : (
            <div className="flex flex-col gap-2">
              <SignInButton mode="modal">
                <button className="w-full px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">
                  Log In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="w-full px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};