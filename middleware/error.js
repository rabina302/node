const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = error.message;
    console.log(err.stack.red);

//MOngose bad objectId
if(err.name === 'CastError'){
    const message = `Bootcamp not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
}

// Mongoose duplicate error
if( err.code === 11000){
    const message = 'Duplicate field value entered'
    error = new ErrorResponse(message, 400);
}

// Mongoose Validation error
if(err.name === 'ValidationError'){
    const message = object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
 
}
 
    res.status(error.statusCode || 500).json({
        success : false,
        error : error.message || 'server error'
    });
}
module.exports = errorHandler;