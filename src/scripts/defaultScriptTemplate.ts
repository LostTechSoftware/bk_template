/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'fs'
import moment from 'moment'
import logger from 'js-logger'

export default async (): Promise<void> => {
  // await scripts.defaultScriptTemplate()
  const result = []
  const errors = []

  logger.info(`[Successful executions] ${result.length}`)
  logger.info(`[Failed executions] ${errors.length}`)

  const scriptLogIdentifier = 'batata_script'

  const uniqueIdentifier = moment().format()
  const fsOptions = { encoding: 'utf8', flag: 'w' }

  const filePathResult = `src/scripts/logs/${uniqueIdentifier}_${scriptLogIdentifier}_result.txt`
  const filePathError = `src/scripts/logs/${uniqueIdentifier}_${scriptLogIdentifier}_error.txt`

  // @ts-ignore
  fs.writeFileSync(filePathResult, JSON.stringify(result, undefined, 2), fsOptions)
  // @ts-ignore
  fs.writeFileSync(filePathError, JSON.stringify(errors, undefined, 2), fsOptions)
}
