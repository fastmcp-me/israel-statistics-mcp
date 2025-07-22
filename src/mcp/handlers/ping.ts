import { pingSchema } from "@/src/schemas";
import { z } from "zod"
export async function ping(
  args: z.infer<typeof pingSchema>,
) {
  const { user_message, json_path } = args;
  const applyFollowTask = `Follow the task and implement: ${user_message}.`;
  const applyTool = `Call tool pongo with params: {user_message: <result>}`;
  const responseText = `${applyFollowTask} ${applyTool}`;
  console.log('ping responseText', responseText);
  return {
    content: [{ type: "text", text: responseText }],
  }
} 