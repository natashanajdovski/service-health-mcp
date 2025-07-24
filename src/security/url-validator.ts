 import { z } from 'zod';
import { URL } from 'url';

/**
 * Security-focused URL validator to prevent SSRF attacks
 * This prevents checking internal networks, localhost, and cloud metadata services
 */
export class SecureUrlValidator {
  
  // Blocked IP ranges and hostnames for security
  private static readonly BLOCKED_PATTERNS = [
    // Localhost variations
    /^localhost$/i,
    /^127\./,
    /^0\.0\.0\.0$/,
    
    // Private network ranges (RFC 1918)
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
    /^192\.168\./,
    
    // Link-local addresses
    /^169\.254\./,
    /^fe80:/i,
    
    // Cloud metadata services (AWS, Azure, GCP)
    /^169\.254\.169\.254$/,
    /^metadata\.google\.internal$/i,
    
    // Other potentially dangerous patterns
    /^0x/,  // Hex IP addresses
    /^\[/,  // IPv6 localhost variations
  ];
  
  private static readonly ALLOWED_PORTS = [
    80,   // HTTP
    443,  // HTTPS
    8080, // Common HTTP alternate (for public testing services)
    8443, // Common HTTPS alternate
  ];

  /**
   * Validates that a URL is safe for external health checking
   * Throws an error if the URL could be used for SSRF attacks
   */
  static validateUrl(urlString: string): string {
    let parsedUrl: URL;
    
    try {
      parsedUrl = new URL(urlString);
    } catch (error) {
      throw new Error('Invalid URL format');
    }

    // Only allow HTTP/HTTPS protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Only HTTP and HTTPS protocols are allowed');
    }

    // Extract hostname for validation
    const hostname = parsedUrl.hostname.toLowerCase();
    
    // Check against blocked patterns
    for (const pattern of this.BLOCKED_PATTERNS) {
      if (pattern.test(hostname)) {
        throw new Error(`Access to internal networks and localhost is not allowed: ${hostname}`);
      }
    }

    // Validate port if specified
    if (parsedUrl.port) {
      const port = parseInt(parsedUrl.port, 10);
      if (!this.ALLOWED_PORTS.includes(port)) {
        throw new Error(`Port ${port} is not allowed. Allowed ports: ${this.ALLOWED_PORTS.join(', ')}`);
      }
    }

    // Additional IPv4 validation
    if (this.isIPv4(hostname)) {
      this.validateIPv4Address(hostname);
    }

    return urlString;
  }

  /**
   * Check if a hostname is an IPv4 address
   */
  private static isIPv4(hostname: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(hostname);
  }

  /**
   * Validate IPv4 addresses to prevent additional bypass attempts
   */
  private static validateIPv4Address(ip: string): void {
    const parts = ip.split('.').map(part => parseInt(part, 10));
    
    // Check for invalid IP parts
    for (const part of parts) {
      if (part < 0 || part > 255) {
        throw new Error(`Invalid IP address: ${ip}`);
      }
    }

    // Additional private network checks using numeric values
    const [a, b, c, d] = parts;
    
    // Class A private: 10.0.0.0/8
    if (a === 10) {
      throw new Error(`Private network access not allowed: ${ip}`);
    }
    
    // Class B private: 172.16.0.0/12
    if (a === 172 && b >= 16 && b <= 31) {
      throw new Error(`Private network access not allowed: ${ip}`);
    }
    
    // Class C private: 192.168.0.0/16
    if (a === 192 && b === 168) {
      throw new Error(`Private network access not allowed: ${ip}`);
    }
    
    // Loopback: 127.0.0.0/8
    if (a === 127) {
      throw new Error(`Loopback address access not allowed: ${ip}`);
    }
    
    // Link-local: 169.254.0.0/16
    if (a === 169 && b === 254) {
      throw new Error(`Link-local address access not allowed: ${ip}`);
    }

    // Multicast and reserved ranges
    if (a >= 224) {
      throw new Error(`Multicast/reserved address access not allowed: ${ip}`);
    }
  }
}

// Enhanced Zod schema with security validation
export const SecureUrlSchema = z.string()
  .url('Must be a valid URL')
  .refine((url) => {
    try {
      SecureUrlValidator.validateUrl(url);
      return true;
    } catch (error) {
      throw new z.ZodError([{
        code: 'custom',
        path: ['url'],
        message: error instanceof Error ? error.message : 'URL validation failed'
      }]);
    }
  }, 'URL failed security validation');
