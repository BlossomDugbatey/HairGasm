// custom class AppError to accept the error message and the status code
class AppError extends Error {

    // the class constructor to initialize the message and the status code of the AppError class
    constructor(message, statusCode) {
  
      // since we are extending the Error class we have to pass in the message to the constructor of the super class 'Error'.
      super(message);
  
      // the this keyword is used to access the instance variable of the class
      this.statusCode = statusCode;
  
      //check if the statusCode starts with 4, then we believe the request failed. Example is a 404 error.
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  
  
      this.isOperational = true;
  
      // call the captureStackTrace on the super class to attach formatted call stack to the AppError object
      // in order to know the type of error we are getting. 
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  