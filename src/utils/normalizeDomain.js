export const stripUrl = url => {
   let strippedUrl = url.replace(/https?:\/\/(.*)/g, '$1');
   strippedUrl = strippedUrl.replace(/(.*)\/$/g, '$1');
   return strippedUrl;
}
export const getDomainFromRequest = url => url.replace(/https?.*available\/(.*)/g, '$1');