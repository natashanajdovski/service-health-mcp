import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { CheckHttpEndpointTool } from './tools/check-http.js';

/**
 * Service Health MCP Server
 * 
 * This server provides universal service health checking capabilities to AI assistants through MCP.
 * It's designed to be the first comprehensive service health monitoring MCP server.
 * 
 * Based on architecture patterns from successful MCP servers like:
 * - AWS MCP Server (enterprise patterns)
 * - FastMCP (clean architecture) 
 * - Prometheus MCP (monitoring best practices)
 */
class ServiceHealthMCPServer {
  private server: Server;
  private checkHttpTool: CheckHttpEndpointTool;

  constructor() {
    // Initialize the MCP server with metadata
    this.server = new Server(
      {
        name: 'service-health-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {}, // We provide tools (functions Claude can call)
        },
      }
    );

    // Initialize our tools
    this.checkHttpTool = new CheckHttpEndpointTool();

    // Set up the server handlers
    this.setupHandlers();
  }

  /**
   * Set up MCP protocol handlers
   * These are the standard MCP methods that clients can call
   */
  private setupHandlers(): void {
    
    /**
     * Handler for tools/list - tells Claude what tools are available
     * This is called when Claude wants to know what it can do
     */
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          CheckHttpEndpointTool.getDefinition(),
          // Future tools will be added here:
          // - check_database_connection
          // - check_service_health
          // - get_health_summary
        ],
      };
    });

    /**
     * Handler for tools/call - executes a specific tool
     * This is called when Claude wants to actually use a tool
     */
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'check_http_endpoint':
              const result = await this.checkHttpTool.execute(args as any || {});            return {
              content: [
                {
                  type: 'text',
                  text: result,
                },
              ],
            };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error executing tool '${name}': ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  /**
   * Start the MCP server
   * This connects the server to Claude via stdio transport
   */
  async start(): Promise<void> {
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await this.server.connect(transport);
    
    // Log that we're ready (this appears in the MCP client logs)
    console.error('Service Health MCP Server started successfully! 🚀');
    console.error('Available tools:');
    console.error('  - check_http_endpoint: Check if HTTP/HTTPS endpoints are healthy');
    console.error('');
    console.error('Try asking Claude: "Check if google.com is healthy"');
  }
}

/**
 * Error handling for the server process
 * This ensures graceful shutdowns and proper error reporting
 */
process.on('SIGINT', async () => {
  console.error('\nReceived SIGINT, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error('\nReceived SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

/**
 * Start the server
 * This is the entry point when the server is run
 */
async function main() {
  try {
    const server = new ServiceHealthMCPServer();
    await server.start();
  } catch (error) {
    console.error('Failed to start Service Health MCP Server:', error);
    process.exit(1);
  }
}

// Force run the main function
main().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});