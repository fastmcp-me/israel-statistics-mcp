import { pongSchema } from "@/src/schemas"
import { z } from "zod"

export async function pong(args: z.infer<typeof pongSchema>) {
  const { user_message } = args
  const applyFollowTask = `Review the response: ${user_message}.`
  const applyTool = `Call tool pingo with params: {user_message: <result>}`
  const responseText = `${applyFollowTask} ${applyTool}`
  console.log("pong responseText", responseText)
  return {
    content: [{ type: "text", text: responseText }],
  }
}
