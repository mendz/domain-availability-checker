import * as Sentry from '@sentry/browser';
import { version } from '../../package.json';

function initSentry() {
   if (process.env.NODE_ENV === 'production') {
      Sentry.init({
         dsn: "https://6b862531cc6b4c46bad00b3e86a9752f@sentry.io/1498890",
         release: version
      });
   }
}

function throwError(event, data) {
   Sentry.withScope(scope => {
      scope.setExtras({
         type: event,
         ...data
      });
      scope.setLevel('warning');
      Sentry.captureException(new Error(event));
   });
}

export default initSentry;
export {
   throwError
}