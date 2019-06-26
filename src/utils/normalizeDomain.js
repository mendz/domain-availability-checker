export const stripDomainFromURL = url => {
   let domain = '';
   // 1. Check if URL function supported
   if (URL) {
      domain = new URL(url).hostname;
   } else {
      // 2. Remove the https prefix
      let strippedUrl = url.replace(/https?:\/\/(.*)/g, '$1');
      // 3. Get the domain from the URL
      domain = strippedUrl.split('/')[0];
   }
   return domain;
}

// extract the domain from the server request
export const getDomainFromRequest = url => url.replace(/https?.*available\/(.*)/g, '$1');