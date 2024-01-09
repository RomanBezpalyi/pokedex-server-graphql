type ErrorData = {
  message: string;
};

export interface CustomError extends Error {
  data?: ErrorData[];
  code?: number;
}
