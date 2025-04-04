import pino, { type Logger } from 'pino'

let logger: Logger

if (typeof window === 'undefined') {
  // SSR
  logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
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
        return method.apply(this, inputArgs)
      },
    },
    ...(process.env.NEXT_PUBLIC_APP_ENV === 'local' && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    }),
  })
} else {
  // CSR
  logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'trace',
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
