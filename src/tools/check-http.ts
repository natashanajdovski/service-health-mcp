import { z } from 'zod';
import { HttpHealthChecker, HttpCheckOptions } from '../health/http-checker.js';
import { SecureUrlSchema } from '../security/url-validator.js';


// This defines what inputs Claude can send to your tool
// Zod is used by professional MCP servers for input validation
const CheckHttpEndpointSchema = z.object({
  url: SecureUrlSchema
    .describe('The URL to check (e.g., https://google.com)'),
  
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE'])
    .optional()
    .default('GET')
    .describe('HTTP method to use'),
    
  timeout: z.number()
    .min(1000, 'Timeout must be at least 1 second')
    .max(30000, 'Timeout cannot exceed 30 seconds')
    .optional()
    .default(10000)
    .describe('Request timeout in milliseconds'),
    
  expectedStatus: z.number()
    .min(100)
    .max(599)
    .optional()
    .default(200)
    .describe('Expected HTTP status code'),
    
  headers: z.record(z.string())
    .optional()
    .describe('Optional HTTP headers to include')
});

// TypeScript type derived from the schema
type CheckHttpEndpointParams = z.infer<typeof CheckHttpEndpointSchema>;

/**
 * HTTP Endpoint Health Check Tool
 * This is what Claude will actually call when asked to check endpoint health
 */
export class CheckHttpEndpointTool {
  private healthChecker: HttpHealthChecker;

  constructor() {
    this.healthChecker = new HttpHealthChecker();
  }

  /**
   * Tool definition - this tells MCP what this tool does
   * This format is based on successful MCP servers like AWS and Prometheus
   */
static getDefinition() {
  console.error('🔧 DEBUG: getDefinition() called!');
  return {
    name: 'check_http_endpoint',
    description: 'Check if an HTTP/HTTPS endpoint is healthy and responsive. ' +
                'This tool will test connectivity, measure response time, and validate status codes. ' +
                'Perfect for monitoring APIs, websites, and web services.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          description: 'The URL to check (e.g., https://google.com)'
        },
        method: {
          type: 'string',
          enum: ['GET', 'POST', 'PUT', 'DELETE'],
          default: 'GET',
          description: 'HTTP method to use'
        },
        timeout: {
          type: 'number',
          minimum: 1000,
          maximum: 30000,
          default: 10000,
          description: 'Request timeout in milliseconds'
        },
        expectedStatus: {
          type: 'number',
          minimum: 100,
          maximum: 599,
          default: 200,
          description: 'Expected HTTP status code'
        },
        headers: {
          type: 'object',
          additionalProperties: { type: 'string' },
          description: 'Optional HTTP headers to include'
        }
      },
      required: ['url']
    }
  };
}
  /**
   * Execute the health check
   * This is the function that runs when Claude calls your tool
   */
  async execute(params: CheckHttpEndpointParams): Promise<string> {
    try {
      // Validate the input parameters
      const validatedParams = CheckHttpEndpointSchema.parse(params);
      
      // Convert to the format our health checker expects
      const checkOptions: HttpCheckOptions = {
        url: validatedParams.url,
        method: validatedParams.method,
        timeout: validatedParams.timeout,
        expectedStatus: validatedParams.expectedStatus,
        headers: validatedParams.headers
      };

      // Perform the actual health check
      const result = await this.healthChecker.checkEndpoint(checkOptions);

      // Format the response in a way that's helpful for Claude and users
      return this.formatHealthCheckResponse(result);

    } catch (error) {
      // Handle validation errors or unexpected issues
      if (error instanceof z.ZodError) {
        const issues = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
        return `❌ Input validation failed: ${issues}`;
      }
      
      return `❌ Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Format the health check result into a readable response
   * This makes the output clear and actionable for both AI and humans
   */
  private formatHealthCheckResponse(result: any): string {
    const statusEmoji: Record<string, string> = {
      healthy: '✅',
      warning: '⚠️',
      unhealthy: '❌'
    };
    const emoji = statusEmoji[result.status] || '❓';

    const response = [
      `${emoji} **Health Check Result**`,
      ``,
      `**URL:** ${result.details?.url}`,
      `**Status:** ${result.status.toUpperCase()}`,
      `**Response Time:** ${result.responseTime}ms`,
    ];

    if (result.statusCode) {
      response.push(`**HTTP Status:** ${result.statusCode}`);
    }

    response.push(`**Message:** ${result.message}`);

    if (result.details?.error) {
      response.push(`**Error Details:** ${result.details.error}`);
    }

    response.push(`**Checked At:** ${result.details?.timestamp}`);

    // Add interpretation to help users understand the results
    response.push('', '**Interpretation:**');
    if (result.status === 'healthy') {
      response.push('🎉 The endpoint is working perfectly! No issues detected.');
    } else if (result.status === 'warning') {
      response.push('⚠️ The endpoint is responding but may need attention. Check if this is expected behavior.');
    } else {
      response.push('🚨 The endpoint has issues and may be down or misconfigured. Investigation needed.');
    }

    return response.join('\n');
  }
}
