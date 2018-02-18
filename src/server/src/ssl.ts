import { Request, Response, NextFunction } from 'express';

interface IChallenge {
  name: string;
  value: string;
}

export function getACMEChallenge(): IChallenge[] | undefined {
  
  const configurations = process.env.SSL_CONFIGURATIONS;

  if (!configurations) {
    return undefined;
  }

  return JSON.parse(configurations);

}

// https://stackoverflow.com/a/23894573
export function forceSSL(req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}
