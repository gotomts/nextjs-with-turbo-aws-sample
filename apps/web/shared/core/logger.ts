import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';
import pino, { type Logger } from 'pino'

let logger: Logger

const cloudWatchLogs = new CloudWatchLogs({ region: 'ap-northeast-1' }); // リージョンを指定

const logGroupName = 'nextjs-with-turbo-aws-sample/application'; // ロググループ名
const logStreamName = 'stream'; // ログストリーム名

// const createLogStream = async () => {
//   try {
//     await cloudWatchLogs.createLogStream({ logGroupName, logStreamName });
//   } catch (error) {
//     console.error('Error creating log stream:', error);
//   }
// };

const logToCloudWatch = async (message: string) => {
  const params = {
    logGroupName,
    logStreamName,
    logEvents: [
      {
        message,
        timestamp: Date.now(),
      },
    ],
  };

  try {
    await cloudWatchLogs.putLogEvents(params);
  } catch (error) {
    console.error('Error sending log to CloudWatch:', error);
  }
};

if (typeof window === 'undefined') {
  // SSR
  logger = pino({
    // level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
    level: 'info',
    formatters: {
      level(label: string) {
        return {
          level: label,
        }
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    hooks: {
      logMethod(inputArgs, method) {
        const message = inputArgs.join(' ')
        if (process.env.NODE_ENV === 'production') {
          // createLogStream()
          // logToCloudWatch(message)
        }
        return method.apply(this, inputArgs)
      },
    },
    // ...(process.env.NEXT_PUBLIC_APP_ENV === 'local' && {
    //   transport: {
    //     target: 'pino-pretty',
    //     options: {
    //       colorize: true,
    //     },
    //   },
    // }),
  })

  
} else {
  // CSR
  logger = pino({
    // level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
    level: 'info',
    formatters: {
      level(label: string) {
        return {
          level: label,
        }
      },
    },
    browser: {
      asObject: true,
      write: {
        fetal: function (o: object) {
          console.error(`${JSON.stringify(o)}`)
        },
        error: function (o: object) {
          console.error(`${JSON.stringify(o)}`)
        },
        warn: function (o: object) {
          console.warn(`${JSON.stringify(o)}`)
        },
        info: function (o: object) {
          console.info(`${JSON.stringify(o)}`)
        },
        debug: function (o: object) {
          console.debug(`${JSON.stringify(o)}`)
        },
        trace: function (o: object) {
          console.trace(`${JSON.stringify(o)}`)
        },
      },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  })
}

export { logger }
