class ErrorHandler extends Error {
  constructor(message:any, statusCode:number) {
    super(message);
    statusCode
  }
}

export default ErrorHandler;
