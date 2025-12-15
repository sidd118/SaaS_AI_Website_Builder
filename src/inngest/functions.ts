import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("downloading...", "15s");

    await step.sleep("transcripting...", "10s");

    await step.sleep("ai summarization...", "5s");

    return { message: `Hello ${event.data.email}!` };
  },
);