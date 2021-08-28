/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/node'
import { Severity, LoggerConfig, CoralogixLogger, Log } from 'coralogix-logger'
import getRequestId from '../getRequestId'

CoralogixLogger.configure(
  new LoggerConfig({
    applicationName: 'application_name',
    privateKey: 'private_key',
    subsystemName: 'enviroment',
  })
)

const logger = new CoralogixLogger('Logger')

export default {
  // Send warning log to Coralogix
  warn: (data: string): void => {
    const text = { data, request_id: getRequestId() }

    console.log(text)

    logger.addLog(
      new Log({
        severity: Severity.warning,
        className: 'ConsoleLogger',
        methodName: 'logger',
        text,
      })
    )
  },

  // Send error log to Coralogix
  error: (data: string): void => {
    const text = { data, request_id: getRequestId() }

    console.log(text)

    logger.addLog(
      new Log({
        severity: Severity.error,
        className: 'ConsoleLogger',
        methodName: 'logger',
        text,
      })
    )

    Sentry.setTag('request_id', getRequestId())
    Sentry.captureException(data)
  },

  // Send information log to Coralogix
  info: (data: string): void => {
    const text = { data, request_id: getRequestId() }

    console.log(text)

    logger.addLog(
      new Log({
        severity: Severity.info,
        className: 'ConsoleLogger',
        methodName: 'logger',
        text,
      })
    )
  },

  // Transform object in string with json stringify
  beautify: (data: any): string => JSON.stringify(data, undefined, 2),
}
