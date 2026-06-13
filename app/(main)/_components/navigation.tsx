"use client";

import { ChevronsLeft,Menu, Plus, PlusCircle, Search, Settings, Trash} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useUser } from "@clerk/nextjs";
import {UserItem} from "./UserItem"
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useQuery,useMutation } from "convex/react";
import { DocumentList } from "./DocumentList";
import { api } from "@/convex/_generated/api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Item } from "./Item";
import { TrashBox } from "./trash-box";

export const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const create = useMutation(api.documents.create);  
  const router = useRouter();

  const isResizingRef = useRef(false);

  const sidebarRef = useRef<HTMLElement | null>(null);
  const navbarRef = useRef<HTMLDivElement | null>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.left = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    isResizingRef.current = true;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(false);
    setIsResetting(true);

    const width = isMobile ? "100%" : "240px";

    sidebarRef.current.style.width = width;
    navbarRef.current.style.left = isMobile ? "100%" : "240px";
    navbarRef.current.style.width = isMobile
      ? "0"
      : "calc(100% - 240px)";

    setTimeout(() => setIsResetting(false), 300);
  };

  const collapse = () => {
    if (!sidebarRef.current || !navbarRef.current) return;

    setIsCollapsed(true);
    setIsResetting(true);

    sidebarRef.current.style.width = "0";
    navbarRef.current.style.left = "0";
    navbarRef.current.style.width = "100%";

    setTimeout(() => setIsResetting(false), 300);
  };

  const handleCreate = () => {
    const promise = create({ title: "Untitled" })
      .then((documentId) => router.push(`/documents/${documentId}`))

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note."
    });
  };


  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all duration-300 ease-in-out"
        )}
      >
        {/* collapse button */}
        <div
          role="button"
          onClick={collapse}
          className="h-6 w-6 text-muted-foreground rounded-sm absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition"
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div className="p-4">
          <p>Action items</p>
          <UserItem/>
          <Item 
            isSearch
            onClick={()=>{
                
            }}
            label="Search"
            icon={Search}
          />
          <Item 
            onClick={()=>{

            }}
            label="Settings"
            icon={Settings}
          />
          <Item 
            onClick={handleCreate}
            label="new page"
            icon={PlusCircle}
          />
        </div>

        <div className="mt-4 p-4">
          <div className="mt-4">
          <DocumentList />
          <Item
            onClick={handleCreate}
            icon={Plus}
            label="Add a page"
          />
          <Popover>
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>
        </div>

        {/* resize handle */}
        <div
          onMouseDown={handleMouseDown}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out"
        )}
      >
        {/* mobile open button */}
        {isCollapsed && (
          <nav className="p-2">
           <Menu
            role="button"
            onClick={resetWidth}
            className="h-6 w-6 text-muted-foreground hover:text-black transition"
            />
          </nav>
        )}
      </div>
    </>
  );
};