import { NextFunction, Request, RequestHandler, Response } from "express";

// Higher-order function to create a middleware chain handler
const middlewareHandler =
  (middlewares: RequestHandler[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Request : ", { body: req.body, headers: req.headers });
    const executeMiddleware = (index: number) => {
      if (index < middlewares.length) {
        middlewares[index](req, res, (err?: any) => {
          if (err) {
            return next(err); // Pass error to the next error-handling middleware
          }
          executeMiddleware(index + 1); // Move to the next middleware
        });
      } else {
        next(); // All middlewares in the chain have executed, proceed to the route handler
      }
    };

    executeMiddleware(0); // Start executing the middleware chain
  };

export default middlewareHandler;
