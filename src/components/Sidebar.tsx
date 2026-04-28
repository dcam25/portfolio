"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MessageSquare, User, Briefcase, Mail, Moon, Sun, Menu, X, Monitor, Github } from "lucide-react";
import Link from "next/link";
import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function Sidebar() {
  const { isOpen, toggle } = useSidebarStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggle}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background/80 backdrop-blur rounded-md border"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"
          } transition-all duration-300 ease-in-out fixed md:relative z-40 h-full bg-[#f9f9f9] dark:bg-[#202123] flex flex-col border-r border-border shrink-0`}
      >
        <div className="p-4 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
              AI
            </span>
            Portfolio
          </Link>
          <button onClick={toggle} className="md:hidden p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 mt-6 px-3 space-y-1 overflow-y-auto">
          <Link href="/" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
            <MessageSquare className="w-4 h-4" />
            Chat
          </Link>
          <Link href="/about" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
            <User className="w-4 h-4" />
            About
          </Link>
          <Link href="/projects" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
            <Briefcase className="w-4 h-4" />
            Projects
          </Link>
          <Link href="/contact" className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-sm font-medium">
            <Mail className="w-4 h-4" />
            Contact
          </Link>
        </nav>

        <div className="p-4 border-t border-border flex flex-col gap-2">
          <p className="px-2 text-xs text-muted-foreground font-medium mb-1">Theme</p>
          <div className="flex bg-black/5 dark:bg-white/5 rounded-lg p-1 min-h-[36px]">
            {mounted && (
              <>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 flex justify-center py-1.5 rounded-md ${theme === 'light' ? 'bg-white dark:bg-background shadow-sm' : 'text-foreground/60'}`}
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("system")}
                  className={`flex-1 flex justify-center py-1.5 rounded-md ${theme === 'system' ? 'bg-white dark:bg-background shadow-sm' : 'text-foreground/60'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 flex justify-center py-1.5 rounded-md ${theme === 'dark' ? 'bg-white dark:bg-background shadow-sm' : 'text-foreground/60'}`}
                >
                  <Moon className="w-4 h-4" />
                </button>
              </>
            )}
            {!mounted && (
              <div className="flex-1 flex justify-center animate-pulse py-1.5">
                <div className="w-4 h-4 bg-foreground/20 rounded-full" />
              </div>
            )}
          </div>

          {/* <a
            href="https://github.com/dcam25"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a> */}
        </div>
      </div>
    </>
  );
}
