export class Logger {
    static error(where, what) {
        console.error(`🔴️ ${where}: ${what}`);
     }

     static exception(where, what) {
        console.error(`🔴️ ${where}: ${what}`);
     }
 }