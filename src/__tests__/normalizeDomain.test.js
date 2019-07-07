import { stripDomainFromURL, getDomainFromRequest } from '../utils/normalizeDomain';
import { DEV_API, PROD_API } from '../axios/axios-domains';

describe('normalize domain functions', () => {
   it('should return domain without dots or http', () => {
      const mockLongUrl = 'https://jestjs.io/docs/en/tutorial-react';
      const domainOfLongUrl = stripDomainFromURL(mockLongUrl);
      expect(domainOfLongUrl).toBe('jestjs.io');

      const mockShortUrl = 'https://github.com/';
      const domainOfShortUrl = stripDomainFromURL(mockShortUrl);
      expect(domainOfShortUrl).toBe('github.com');
   });

   it('should return the domain name from the API get request', () => {
      const mockEndpoint = 'available/github.com';

      const domainFromDevCall = getDomainFromRequest(`${DEV_API}${mockEndpoint}`);
      expect(domainFromDevCall).toBe('github.com');

      const domainFromProdCall = getDomainFromRequest(`${PROD_API}${mockEndpoint}`);
      expect(domainFromProdCall).toBe('github.com');
   });
});
