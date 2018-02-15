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