import { DateTime } from 'luxon';
import { createLogger, format, transports } from 'winston';

import Env from '@/utils/env';

const Logger = createLogger({
  level: Env.LOG_LEVEL ?? 'debug',
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.errors({ stack: true, colorize: true, prettyPrint: true }),
    format.printf(({ timestamp, level, message }) => {
      return `${DateTime.fromISO(timestamp as string).toFormat(
        'yyyy-MM-dd HH:mm:ss'
      )} ${level}${message}`;
    })
  ),
  defaultMeta: {
    service: '_winston_logger_',
  },
});

export default Logger;
