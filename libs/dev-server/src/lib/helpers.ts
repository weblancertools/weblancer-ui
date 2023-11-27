import { exec } from 'child_process';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { noop } from 'lodash';

export function run(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      console.log(stdout);
      resolve(stdout);
    });
  });
}

export function getBody<T>(req: Request, res: Response): T {
  const bodyParserMiddleware = bodyParser.json();
  const parsedBody = bodyParserMiddleware(req, res, noop);

  return parsedBody as T;
}
