import * as url from 'url';

export function getRedisClient(REDIS_URL: string, expiration: number = 120) {
  const redisUrl = url.parse(REDIS_URL);
  
  const client = require('express-redis-cache')({
    expire: expiration,
    host: redisUrl.hostname,
    port: redisUrl.port,
    auth_pass: redisUrl.auth ? redisUrl.auth.split(':')[1] : undefined,
  });

  return client;
}
