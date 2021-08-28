import httpContext from 'express-http-context'

const getRequestId = (): string => {
  return httpContext.get('requestId')
}

export default getRequestId
