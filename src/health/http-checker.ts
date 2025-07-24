 import axios, { AxiosResponse } from 'axios';

// This defines what a health check result looks like
export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'warning';
  responseTime: number;
  statusCode?: number;
  message: string;
  details?: {
    url: string;
    timestamp: string;
    error?: string;
  };
}

// This defines the options for checking an HTTP endpoint
export interface HttpCheckOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  timeout?: number;
  expectedStatus?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP Health Checker - The core logic for checking if websites/APIs are healthy
 * This is inspired by how enterprise monitoring tools work
 */
export class HttpHealthChecker {
  
  /**
   * Check if an HTTP endpoint is healthy
   * This is the main function that does the actual health checking
   */
  async checkEndpoint(options: HttpCheckOptions): Promise<HealthCheckResult> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();
    
    // Set default values (this is a best practice from professional MCP servers)
    const {
      url,
      method = 'GET',
      timeout = 10000, // 10 seconds default timeout
      expectedStatus = 200,
      headers = {}
    } = options;

    try {
      // Validate the URL first (prevent invalid requests)
      if (!this.isValidUrl(url)) {
        return {
          status: 'unhealthy',
          responseTime: 0,
          message: 'Invalid URL provided',
          details: {
            url,
            timestamp,
            error: 'URL validation failed'
          }
        };
      }

      // Make the HTTP request
      const response: AxiosResponse = await axios({
        method,
        url,
        timeout,
        headers: {
          'User-Agent': 'Service-Health-MCP/1.0.0',
          ...headers
        },
        // Don't throw errors for 4xx/5xx status codes - we want to handle them
        validateStatus: () => true
      });

      const responseTime = Date.now() - startTime;

      // Determine health status based on response
      const status = this.determineHealthStatus(response.status, expectedStatus);
      
      return {
        status,
        responseTime,
        statusCode: response.status,
        message: this.getStatusMessage(status, response.status, responseTime),
        details: {
          url,
          timestamp
        }
      };

    } catch (error) {
      // Handle network errors, timeouts, etc.
      const responseTime = Date.now() - startTime;
      
      return {
        status: 'unhealthy',
        responseTime,
        message: this.getErrorMessage(error),
        details: {
          url,
          timestamp,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Validate if a URL is properly formatted
   * This prevents our server from making invalid requests
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Determine if the endpoint is healthy based on status code
   * This logic is based on standard HTTP monitoring practices
   */
  private determineHealthStatus(actualStatus: number, expectedStatus: number): 'healthy' | 'unhealthy' | 'warning' {
    if (actualStatus === expectedStatus) {
      return 'healthy';
    }
    
    // 2xx status codes are generally healthy even if not exactly what we expected
    if (actualStatus >= 200 && actualStatus < 300) {
      return 'warning'; // It's working, but not exactly as expected
    }
    
    // Everything else is unhealthy
    return 'unhealthy';
  }

  /**
   * Generate human-readable status messages
   * This makes the results easy for AI and humans to understand
   */
  private getStatusMessage(status: string, statusCode: number, responseTime: number): string {
    switch (status) {
      case 'healthy':
        return `Endpoint is healthy (${statusCode}) - ${responseTime}ms response time`;
      case 'warning':
        return `Endpoint responding (${statusCode}) but status differs from expected - ${responseTime}ms response time`;
      case 'unhealthy':
        return `Endpoint is unhealthy (${statusCode}) - ${responseTime}ms response time`;
      default:
        return `Unknown status - ${responseTime}ms response time`;
    }
  }

  /**
   * Convert errors into readable messages
   * This helps with debugging when things go wrong
   */
  private getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ENOTFOUND') {
        return 'Endpoint not found - DNS resolution failed';
      }
      if (error.code === 'ECONNREFUSED') {
        return 'Connection refused - endpoint may be down';
      }
      if (error.code === 'ETIMEDOUT') {
        return 'Request timed out - endpoint may be slow or unresponsive';
      }
      return `Network error: ${error.message}`;
    }
    
    return error instanceof Error ? error.message : 'Unknown error occurred';
  }
}
