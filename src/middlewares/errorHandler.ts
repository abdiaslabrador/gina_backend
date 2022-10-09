import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

function handleErrors(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void {
   let errorHandler = {
    expressValidator: (resp: Response) => {
      let errors: any = []
      if( error["errors"] )
      { errors = error["errors"]}
       res.status(403).json({ errorName: error.name, errors : errors  });
    },
    JsonWebTokenError: (resp: Response) => {
      error["msg"] ? "" : (error["msg"] = "Error de token");
       res.status(403).json({ errorName: error.name, msg: error["msg"] });
    },
    default: (resp: Response, ) => {
      res.status(500).json({errorName: "500", msg: "Error en el servidor"});
    },
  };

  let handler: Function = errorHandler[error.name] || errorHandler.default;
  handler(res)
}

export { handleErrors };
