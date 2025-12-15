'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  
  const trpc = useTRPC();
  const invoke = useMutation(trpc.invokeInngest.mutationOptions({
    onSuccess: () => {
      toast.success("Background Job Started")
    }
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({email: "hello@sidd.com"})}>Invoke Background Job</Button>
    </div>
  )
}

export default Page