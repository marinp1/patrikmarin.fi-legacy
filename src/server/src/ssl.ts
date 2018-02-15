import { Request, Response, NextFunction } from 'express';

export function getACMEChallenge() {
  
  const name = process.env.SSL_FILE_NAME;
  const value = process.env.SSL_FILE_CONTENT;

  if (!!name && !!value) {
    return {
      name,
      value,
    }
  }

  return undefined;

}

// https://stackoverflow.com/a/23894573
export function forceSSL(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};