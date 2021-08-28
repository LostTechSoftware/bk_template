/* eslint-disable no-useless-escape */
function validatorJson(data: string): boolean {
  return /^[\],:{}\s]*$/.test(
    data
      .replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  )
}

export default validatorJson
