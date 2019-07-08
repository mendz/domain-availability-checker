import * as Sentry from '@sentry/browser';

function initSentry() {
   Sentry.init({ dsn: "https://6b862531cc6b4c46bad00b3e86a9752f@sentry.io/1498890" });
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