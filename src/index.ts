import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { pong } from "./mcp/handlers/pong";
import { ping } from "./mcp/handlers/ping";
import { pongSchema, pingSchema } from "./schemas";

async function main() {
  console.error("[MCP] Starting israel-statistics-mcp MCP server...");

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
  );

  // Security configuration
  const MAX_CONCURRENT_OPERATIONS = 5;
  let activeOperations = 0;

  // Wrapper function to enforce rate limiting
  function withRateLimit<T extends any[], R>(fn: (...args: T) => Promise<R>) {
    return async (...args: T): Promise<R> => {
      if (activeOperations >= MAX_CONCURRENT_OPERATIONS) {
        throw new Error("Too many concurrent operations. Please try again later.");
      }

      activeOperations++;
      try {
        return await fn(...args);
      } finally {
        activeOperations--;
      }
    };
  }



  server.registerTool(
    "pingo",
    {
      description: "Respond to the user prompt",
      inputSchema: pingSchema.shape,
    },
    async (args) => {
      const result = await ping(args);
      return {
        content: result.content.map((c) => ({
          type: "text" as const,
          text: c.text || "",
        }))
      };
    }
  );

  server.registerTool(
    "pongo",
    {
      description: "Respond to the user prompt",
      inputSchema: pongSchema.shape,
    },
    async (args) => {
      const result = await pong(args);
      return {
        content: result.content.map((c) => ({
          type: "text" as const,
          text: c.text || "",
        }))
      };
    }
  );


  console.error("[MCP] Tools registered successfully");

  // Create stdio transport
  const transport = new StdioServerTransport();
  console.error("[MCP] Created stdio transport");

  // Connect the server to the transport
  await server.connect(transport);
  console.error("[MCP] Server connected to stdio transport");

  // The server will now handle requests via stdin/stdout
  console.error("[MCP] MCP server ready for requests");
}

// Handle errors and ensure proper shutdown
process.on('SIGINT', () => {
  console.error("[MCP] Received SIGINT, shutting down...");
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error("[MCP] Received SIGTERM, shutting down...");
  process.exit(0);
});

main().catch((error) => {
  console.error("[MCP] Fatal error:", error);
  process.exit(1);
});