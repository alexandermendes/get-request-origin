import { parse as parseUrl } from 'url';
import { IncomingMessage } from 'http';

type Request = IncomingMessage & {
  originalUrl?: string;
  secure?: boolean;
  connection?: IncomingMessage['connection'] & {
    encrypted?: boolean;
  }
}

const parseOrigin = (url: string) => {
  const { protocol, hostname, port } = parseUrl(url);

  return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
};

/**
 * Get the URL origin from a Node request object.
 */
export const getRequestOrigin = (req: Request) => {
  const url = req.originalUrl || req.url;
  const { host } = req.headers || {};

  if (typeof host !== 'string' && url) {
    return parseOrigin(url);
  }

  const urlProtocol = url ? parseUrl(url).protocol : null;

  const isSecure = req.secure || (req.connection || {}).encrypted;
  const fallbackProtocol = isSecure ? 'https:' : 'http:';
  const protocol = urlProtocol || fallbackProtocol;

  return parseOrigin(`${protocol}//${host}`);
};
