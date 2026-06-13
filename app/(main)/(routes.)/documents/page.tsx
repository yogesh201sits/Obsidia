"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner";

const DocumentPage = () => {
    const { user, isLoaded } = useUser();
    const create = useMutation(api.documents.create);
    const onCreate = ()=>{
        const promise = create({title:"Untitled"});
        toast.promise(promise,{
            loading:"Creating a new note...",
            success:"New note created",
            error:"Failed to create new note"
        })
    }
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <Image
        src="/empty.png"
        alt="Empty page"
        width={300}
        height={300}
        className="rounded-lg dark:hidden"
      />

      <Image
        src="/empty-dark.png"
        alt="Empty page dark"
        width={300}
        height={300}
        className="rounded-lg hidden dark:block"
      />

      <h2 className="text-lg font-medium">
        {isLoaded ? `Welcome to ${user?.firstName ?? "User"}` : "Loading..."}&apos; Obsidia
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle/>
        Create a note
      </Button>
    </div>
  );
};

export default DocumentPage;