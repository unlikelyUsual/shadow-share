import { Response } from "express";

export default class ErrorHandler {
  static handleError(response: Response, error: Error) {
    return response.json({ message: error.message });
  }
}
