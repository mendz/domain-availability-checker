export const stripUrl = url => url.replace(/https?:\/\/(.*)/g, '$1');
export const getDomainFromRequest = url => url.replace(/https?.*available\/(.*)/g, '$1');