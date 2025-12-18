'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  
  const [value, setValue] = useState("");
  const trpc = useTRPC();

  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions())

  const createMessage = useMutation(trpc.messages.create.mutationOptions({
    onSuccess: () => {
      toast.success("Message Started")
    }
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Input className="mb-4" placeholder="Enter Prompt" value= {value} onChange={(e) => setValue(e.target.value)}></Input>

      <Button 
        disabled={createMessage.isPending} 
        onClick={() => createMessage.mutate({prompt: value})}
      >
        Invoke Background Job
      </Button>

      <div>
        {JSON.stringify(messages)}
      </div>

    </div>
  )
}

export default Page