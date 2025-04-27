import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      this.logger.error(
        'Validation Error Details:',
        JSON.stringify(exceptionResponse, null, 2),
      );

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        errors: exceptionResponse,
      });
      return;
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      this.logger.error(
        'HTTP Exception:',
        JSON.stringify(exceptionResponse, null, 2),
      );

      response.status(status).json({
        statusCode: status,
        message: exception.message,
        error: exceptionResponse,
      });
      return;
    }

    // Para erros não tratados
    this.logger.error('Unhandled Exception:', exception);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: exception,
    });
  }
}
