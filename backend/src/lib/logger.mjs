export class Logger {
    static e(where, what) {
        console.error(`E ${where}: ${what}`);
     }

     static w(where, what) {
        console.warn(`W ${where}: ${what}`);
     }
 }