import { NextFunction, Request, RequestHandler, Response } from "express";

const middlewareHandler =
  (middlewares: RequestHandler[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Request : ", {
      // url: req.url,
      path: req.path,
      body: req.body,
      query: req.query,
      param: req.params,
    });
    const executeMiddleware = (index: number) => {
      if (index < middlewares.length) {
        middlewares[index](req, res, (err?: any) => {
          if (err) {
            return next(err);
          }
          executeMiddleware(index + 1); // Move to the next middleware
        });
      } else {
        next();
      }
    };

    executeMiddleware(0); // Start executing the middleware chain
  };

export default middlewareHandler;
