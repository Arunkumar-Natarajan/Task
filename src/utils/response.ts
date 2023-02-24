export const sendSuccessResponse = (
  req: any,
  res: any,
  status: number,
  message: string,
  data: object | void
) => {
  console.log(
    "Success Resposne sent => ",
    req.path,
    " data => ",
    JSON.stringify(data)
  );
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const sendErrorResponse = (
  req: any,
  res: any,
  status: number,
  message: string,
  data: object | void
) => {
  return res.status(status).json({
    status,
    message,
    data,
  });
};

export const internalServerError = (
  req: any,
  res: any,
  status: number,
  err: any
) => {
  return res.status(status).json({
    status,
    message: err.message,
  });
};
