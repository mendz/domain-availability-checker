import * as Sentry from '@sentry/browser';
import { version } from '../../package.json';

function initSentry() {
   if (process.env.NODE_ENV === 'production') {
      console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
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

function reportFeedback() {
   if (process.env.NODE_ENV === 'production') {
      const report = Sentry.showReportDialog({
         eventId: '@SentrySdk.LastEventId'
      });

      if (!report) {
         throw new Error('There is no internet connection');
      }
   } else {
      alert('Network Error');
   }
}

export default initSentry;
export {
   throwError,
   reportFeedback
}