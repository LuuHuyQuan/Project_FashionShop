// Logger utility - Safe logging for development and production

type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = import.meta.env.DEV;

  /**
   * Log only in development mode
   */
  dev(...args: any[]): void {
    if (this.isDevelopment) {
      console.log('[DEV]', ...args);
    }
  }

  /**
   * Log info messages
   */
  info(...args: any[]): void {
    if (this.isDevelopment) {
      console.info('[INFO]', ...args);
    }
  }

  /**
   * Log warnings (always logged)
   */
  warn(...args: any[]): void {
    console.warn('[WARN]', ...args);
  }

  /**
   * Log errors (always logged)
   */
  error(...args: any[]): void {
    console.error('[ERROR]', ...args);

    // In production, you might want to send errors to a logging service
    if (!this.isDevelopment) {
      this.sendToLoggingService('error', args);
    }
  }

  /**
   * Debug logging (only in development)
   */
  debug(...args: any[]): void {
    if (this.isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  }

  /**
   * Log API requests
   */
  api(method: string, url: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[API] ${method} ${url}`, data || '');
    }
  }

  /**
   * Log API responses
   */
  apiResponse(method: string, url: string, status: number, data?: any): void {
    if (this.isDevelopment) {
      const statusColor = status >= 200 && status < 300 ? '✅' : '❌';
      console.log(`[API] ${statusColor} ${method} ${url} - ${status}`, data || '');
    }
  }

  /**
   * Send errors to logging service (placeholder for production)
   */
  private sendToLoggingService(_level: LogLevel, _args: any[]): void {
    // TODO: Implement integration with logging service
    // Examples: Sentry, LogRocket, Datadog, etc.
    // 
    // Example with Sentry:
    // import * as Sentry from '@sentry/react';
    // Sentry.captureException(new Error(args.join(' ')));
  }

  /**
   * Performance timing
   */
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(`[TIME] ${label}`);
    }
  }

  /**
   * End performance timing
   */
  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(`[TIME] ${label}`);
    }
  }

  /**
   * Group logs
   */
  group(label: string): void {
    if (this.isDevelopment) {
      console.group(label);
    }
  }

  /**
   * End group logs
   */
  groupEnd(): void {
    if (this.isDevelopment) {
      console.groupEnd();
    }
  }

  /**
   * Table display (useful for arrays of objects)
   */
  table(data: any): void {
    if (this.isDevelopment) {
      console.table(data);
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export default
export default logger;
