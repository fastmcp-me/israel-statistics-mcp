import { describe, it, expect } from "vitest"
import { getIndexTopics } from "../mcp/handlers/getIndexTopics"
import { getMainIndices } from "../mcp/handlers/getMainIndices"

describe("Israel Statistics MCP Handlers", () => {
  it("should fetch index topics from JSON API", async () => {
    const result = await getIndexTopics({
      lang: "en",
      pagesize: 2,
    })

    expect(result).toHaveProperty("topics")
    expect(result).toHaveProperty("summary")
    expect(Array.isArray(result.topics)).toBe(true)
    expect(result.topics.length).toBeGreaterThan(0)
    expect(result.topics[0]).toHaveProperty("chapterId")
    expect(result.topics[0]).toHaveProperty("chapterName")
    expect(result.summary).toContain("Found")
  })

  it("should fetch main indices from XML API", async () => {
    const result = await getMainIndices({
      lang: "en",
      pagesize: 2,
    })

    expect(result).toHaveProperty("indices")
    expect(result).toHaveProperty("updateDate")
    expect(result).toHaveProperty("summary")
    expect(Array.isArray(result.indices)).toBe(true)
    expect(result.indices.length).toBeGreaterThan(0)

    const firstIndex = result.indices[0]
    expect(firstIndex).toHaveProperty("code")
    expect(firstIndex).toHaveProperty("name")
    expect(firstIndex).toHaveProperty("percent")
    expect(firstIndex).toHaveProperty("year")
    expect(firstIndex).toHaveProperty("month")
    expect(firstIndex).toHaveProperty("indices")
    expect(Array.isArray(firstIndex.indices)).toBe(true)
    expect(typeof firstIndex.percent).toBe("number")
  })
})
