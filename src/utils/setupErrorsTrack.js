import * as Sentry from '@sentry/browser';
import { isProduction } from './checks';
import { version } from '../../package.json';

function initSentry() {
   if (isProduction()) {
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

// FIXME: find a better way to implement this
async function reportFeedback() {
   if (isProduction()) {
      const eventId = await Sentry.captureException('User Feedback', () => { });
      const report = await Sentry.showReportDialog({ eventId });
      // if there is no internet connection the report will be undefined
      if (!report) {
         return 'There is no internet connection';
      }
      return true;
   } else {
      // for development
      return 'Report an issue';
   }
}

export default initSentry;
export {
   throwError,
   reportFeedback
}