// server/middleware/errorHandler.js

/**
 * Global Error Handler Middleware
 * @param {Error} err - The error object passed by Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
    // Determine status code (default to 500, but preserve status set earlier)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode);

    // Log the full error stack to the server console for debugging
    console.error(`ERROR ${statusCode}: ${err.message}`);
    console.error(err.stack); 

    // Send a structured JSON response to the client
    res.json({
        message: err.message,
        // Only include stack trace in development mode for security reasons
        stack: process.env.NODE_ENV === 'production' ? null : err.stack 
    });
};

/**
 * 404 Not Found Middleware
 */
const notFound = (req, res, next) => {
    // Create a new Error object indicating the requested path wasn't found
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // Pass the error to the global errorHandler
    next(error); 
};

module.exports = {
    errorHandler,
    notFound,
};