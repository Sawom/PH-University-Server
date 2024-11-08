// throw new Error diye only error msg send kora zay but error status code send kora zay na.
  // er jnno Error class k extend kore 1ta super class korlam 'AppError' nam e.
class AppError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string, stack = "") {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;