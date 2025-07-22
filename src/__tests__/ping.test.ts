import { describe, expect, it } from "vitest"

import { ping } from "../mcp/handlers/ping"

describe("ping handler", () => {
  it("should return a response with the expected format", async () => {
    const result = await ping({
      user_message: "test message",
      json_path: "https://example.com/data.json",
    })

    expect(result).toHaveProperty("content")
    expect(Array.isArray(result.content)).toBe(true)
    expect(result.content[0]).toHaveProperty("type", "text")
    expect(result.content[0]).toHaveProperty("text")
    expect(typeof result.content[0].text).toBe("string")
  })

  it("should include the user message in the response", async () => {
    const testMessage = "Hello, this is a test"
    const result = await ping({
      user_message: testMessage,
    })

    expect(result.content[0].text).toContain(testMessage)
  })
})
