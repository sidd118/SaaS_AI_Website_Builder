import { useTRPC } from "@/trpc/client";

const Page = () => {
  const trpc = useTRPC();
  trpc.hello.queryOptions({text: "Hello"});


  return (
    <div>Page</div>
  )
}

export default Page