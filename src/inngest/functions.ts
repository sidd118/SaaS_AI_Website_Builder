import { Sandbox } from '@e2b/code-interpreter';
import { createAgent, openai } from '@inngest/agent-kit';
import { inngest } from "./client";
import { getSandbox } from './utils';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },

  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("vibe-nextjs-sidd-test");
      return sandbox.sandboxId;
    })

    const codeWriterAgent = createAgent({
      name: 'Code writer',
      system:
        'You are an expert Next.Js developer. You write readable, maintainable code. You write simple React & Next code snippets',
      model: openai({ model: 'gpt-4o' }),
    });


    const { output } = await codeWriterAgent.run(
      'Write a button component code',
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = await sandbox.getHost(3000);
      return `https://${host}`;
    })

    return { output, sandboxUrl };
  },
);