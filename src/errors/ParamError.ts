class ParamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    this.message = message
  }
}

export default ParamError
