import { parse as parseUrl } from 'url';

const parseOrigin = (url) => {
  const { protocol, hostname, port } = parseUrl(url);

  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
};

/**
 * Get the URL origin from a Node request object.
 */
export const getRequestOrigin = (req) => {
  const url = req.originalUrl || req.url;
  const { host } = req.headers || {};

  if (typeof host !== 'string') {
    return parseOrigin(url);
  }

  const { protocol: urlProtocol } = parseUrl(url);

  const isSecure = req.secure || (req.connection || {}).encrypted;
  const fallbackProtocol = isSecure ? 'https:' : 'http:';
  const protocol = urlProtocol || fallbackProtocol;

  return parseOrigin(`${protocol}//${host}`);
};
