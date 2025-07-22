import { z } from "zod"

const jsonSchema = z.object({
  json_path: z.string().optional().describe("URL of the JSON file to use"),
  user_message: z.string().describe("Respond with user request"),
})

export const pongSchema = jsonSchema

export const pingSchema = z
  .object({
    number_of_loops: z.number().optional().describe("Number of loops to run"),
  })
  .extend(jsonSchema.shape)
