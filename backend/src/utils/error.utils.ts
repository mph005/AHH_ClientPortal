// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  errors?: any[];

  constructor(message: string, statusCode: number, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    
    // Set prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Helper function to create various API errors
export const createError = {
  badRequest: (message: string = 'Bad Request', errors?: any[]) => {
    return new ApiError(message, 400, errors);
  },
  
  unauthorized: (message: string = 'Unauthorized') => {
    return new ApiError(message, 401);
  },
  
  forbidden: (message: string = 'Forbidden') => {
    return new ApiError(message, 403);
  },
  
  notFound: (message: string = 'Resource not found') => {
    return new ApiError(message, 404);
  },
  
  internal: (message: string = 'Internal Server Error') => {
    return new ApiError(message, 500);
  },
};

// Helper function for async route handlers
export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 