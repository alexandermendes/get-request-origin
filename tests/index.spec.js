import { getRequestOrigin } from '../src';

describe('Server', () => {
  describe.each([
    'url',
    'originalUrl',
  ])('%s', (key) => {
    it('returns the current URL', async () => {
      const req = { [key]: 'http://example.com/page' };

      expect(getRequestOrigin(req)).toBe('http://example.com');
    });
  });

  describe('host header', () => {
    it('respects the host header', async () => {
      const req = {
        url: 'http://example.com/page',
        headers: {
          host: 'host.com'
        }
      };

      expect(getRequestOrigin(req)).toBe('http://host.com');
    });

    it('respects the host header with a port', async () => {
      const req = {
        url: 'http://example.com/page',
        headers: {
          host: 'host.com:1234'
        }
      };

      expect(getRequestOrigin(req)).toBe('http://host.com:1234');
    });

    it('respects the secure property', async () => {
      const req = {
        url: '/page',
        secure: true,
        headers: {
          host: 'host.com'
        }
      };

      expect(getRequestOrigin(req)).toBe('https://host.com');
    });

    it('respects the encrypted connection property', async () => {
      const req = {
        url: '/page',
        connection: {
          encrypted: true,
        },
        headers: {
          host: 'host.com'
        }
      };

      expect(getRequestOrigin(req)).toBe('https://host.com');
    });
  });
});
