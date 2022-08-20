import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
function init() {
    Sentry.init({
        dsn: "https://a4a93e6e1a384bf1b8ce909cabf62fc9@o1366921.ingest.sentry.io/6667236",
        integrations: [new BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}
function log(error) {
    Sentry.captureException(error);
}

export default { init, log }