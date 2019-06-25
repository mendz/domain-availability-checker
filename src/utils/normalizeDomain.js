export const stripUrl = url => {
   // 1. Remove the https prefix
   let strippedUrl = url.replace(/https?:\/\/(.*)/g, '$1');
   // 2. Get the domain from the URL
   strippedUrl = strippedUrl.split('/')[0];
   return strippedUrl;
}

// extract the domain from the server request
export const getDomainFromRequest = url => url.replace(/https?.*available\/(.*)/g, '$1');