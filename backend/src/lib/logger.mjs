export class Logger {
    static error(where, what) {
        console.error(`[error] ${where}: ${what}`);
     }

     static exception(where, what) {
        console.error(`[exception] ${where}: ${what}`);
     }
 }