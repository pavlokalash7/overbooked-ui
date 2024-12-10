import { type NextFunction, type Request, type Response } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

import Env from '@/utils/env';

const Errorhandler = (
  error: ZodError | Error,
  _request: Request,
  response: Response,
  next: NextFunction
): void => {
  // we can use the logger for storing more detailed logs from here
  switch (true) {
    case error instanceof ZodError: {
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }));
      response
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .send({ message: 'Validation error', errors: formattedErrors });
      break;
    }

    default:
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message:
          Env.NODE_ENV === 'development'
            ? error.message
            : 'Internal server error',
      });
      next();
  }
};

export default Errorhandler;
