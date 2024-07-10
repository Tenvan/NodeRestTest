import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import clc = require('cli-color');

@Injectable()
export class CustomLoggerService implements LoggerService {
  // #region Properties (1)

  private readonly logger: winston.Logger;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor() {
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
              colors: {
                info: 'blue',
                error: 'red',
                warn: 'yellow',
                debug: 'green',
              },
            }),
            winston.format.timestamp(),
            winston.format.printf(({ level, message, timestamp }) => {
              return `${clc.yellowBright(timestamp)} ${level}: ${message}`;
            }),
            // winston.format.json(),
          ),
        }),
        // Hier können Sie weitere Transports hinzufügen, z.B. eine Datei
        new winston.transports.File({
          filename: 'logs/combined.log',
          format: winston.format.json(),
        }),
      ],
    });
  }

  // #endregion Constructors (1)

  // #region Public Methods (5)

  public debug(message: string) {
    this.logger.debug(message);
  }

  public error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  public log(message: string) {
    this.logger.info(message);
  }

  public verbose(message: string) {
    this.logger.verbose(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }

  // #endregion Public Methods (5)
}
