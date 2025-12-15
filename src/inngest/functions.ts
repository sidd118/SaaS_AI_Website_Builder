import { createAgent, openai } from '@inngest/agent-kit';
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event }) => {

    const codeWriterAgent = createAgent({
      name: 'Code writer',
      system:
        'You are an expert Next.Js developer. You write readable, maintainable code. You write simple React & Next code snippets',
      model: openai({ model: 'gpt-4o' }),
    });


    const { output } = await codeWriterAgent.run(
      'Write a button component code',
    );

    return { output };
  },
);