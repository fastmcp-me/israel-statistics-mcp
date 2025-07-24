import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

import { getIndexData } from "./mcp/handlers/getIndexData"
import { getIndexTopics } from "./mcp/handlers/getIndexTopics"
import { getCatalogChapters } from "./mcp/handlers/getCatalogChapters"
import { getChapterTopics } from "./mcp/handlers/getChapterTopics"
import { getSubjectCodes } from "./mcp/handlers/getSubjectCodes"
import { getIndexCalculator } from "./mcp/handlers/getIndexCalculator"
import {
  getMainIndices,
  getMainIndicesByPeriod,
} from "./mcp/handlers/getMainIndices"
import { getAllIndices } from "./mcp/handlers/getAllIndices"
import {
  getIndexDataSchema,
  getIndexTopicsSchema,
  getCatalogChaptersSchema,
  getChapterTopicsSchema,
  getSubjectCodesSchema,
  getIndexCalculatorSchema,
  getMainIndicesSchema,
  getMainIndicesByPeriodSchema,
  getAllIndicesSchema,
} from "./schemas/request.schema"

async function main() {
  console.error("[MCP] Starting israel-statistics-mcp MCP server...")

  const server = new McpServer(
    {
      name: "israel-statistics-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        logging: {},
        resources: {},
        tools: {
          listChanged: false,
        },
      },
    }
  )

  // Security configuration
  const MAX_CONCURRENT_OPERATIONS = 5
  let activeOperations = 0

  // Wrapper function to enforce rate limiting
  function withRateLimit<T extends any[], R>(fn: (...args: T) => Promise<R>) {
    return async (...args: T): Promise<R> => {
      if (activeOperations >= MAX_CONCURRENT_OPERATIONS) {
        throw new Error(
          "Too many concurrent operations. Please try again later."
        )
      }

      activeOperations++
      try {
        return await fn(...args)
      } finally {
        activeOperations--
      }
    }
  }

  // Register tools
  server.registerTool(
    "get_index_topics",
    {
      description: "Get index topics from Israel Statistics API",
      inputSchema: getIndexTopicsSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getIndexTopics(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )
  server.registerTool(
    "get_index_data",
    {
      description: "Get index data from Israel Statistics API",
      inputSchema: getIndexDataSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getIndexData(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  // Register catalog tools
  server.registerTool(
    "get_catalog_chapters",
    {
      description: "Get list of index chapters from Israel Statistics API",
      inputSchema: getCatalogChaptersSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getCatalogChapters(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_chapter_topics",
    {
      description:
        "Get topics for a specific chapter from Israel Statistics API",
      inputSchema: getChapterTopicsSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getChapterTopics(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_subject_codes",
    {
      description:
        "Get index codes for a specific subject/topic from Israel Statistics API",
      inputSchema: getSubjectCodesSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getSubjectCodes(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_index_calculator",
    {
      description:
        "Calculate price linkage using Israel Statistics API index calculator",
      inputSchema: getIndexCalculatorSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getIndexCalculator(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_main_indices",
    {
      description:
        "Get main indices by different bases from Israel Statistics API",
      inputSchema: getMainIndicesSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getMainIndices(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_main_indices_by_period",
    {
      description:
        "Get main indices filtered by period from Israel Statistics API",
      inputSchema: getMainIndicesByPeriodSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getMainIndicesByPeriod(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  server.registerTool(
    "get_all_indices",
    {
      description:
        "Get all indices by different bases with optional chapter filtering from Israel Statistics API",
      inputSchema: getAllIndicesSchema.shape,
    },
    withRateLimit(async (args) => {
      const result = await getAllIndices(args)
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result),
          },
        ],
      }
    })
  )

  console.error("[MCP] All 8 tools registered successfully")

  // Create stdio transport
  const transport = new StdioServerTransport()
  console.error("[MCP] Created stdio transport")

  // Connect the server to the transport
  await server.connect(transport)
  console.error("[MCP] Server connected to stdio transport")

  // The server will now handle requests via stdin/stdout
  console.error("[MCP] MCP server ready for requests")
}

// Handle errors and ensure proper shutdown
process.on("SIGINT", () => {
  console.error("[MCP] Received SIGINT, shutting down...")
  process.exit(0)
})

process.on("SIGTERM", () => {
  console.error("[MCP] Received SIGTERM, shutting down...")
  process.exit(0)
})

main().catch((error) => {
  console.error("[MCP] Fatal error:", error)
  process.exit(1)
})
