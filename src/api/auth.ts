import { AxiosResponse } from "axios";
import client from "./client";
import {
  APIResponse,
  CheckDuplicateParam,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
} from "./types";

const signup = (
  request: SignUpRequest
): Promise<AxiosResponse<APIResponse<LoginResponse>>> =>
  client.post("/api/v1/users/register", request);

const login = (
  request: LoginRequest
): Promise<AxiosResponse<APIResponse<LoginResponse>>> =>
  client.post("api/v1/users/login", request);

const checkDuplicate = (param: keyof CheckDuplicateParam, value: string) =>
  client.get("/api/v1/users/duplicate", {
    params: { [param]: value },
  });

export { checkDuplicate, login, signup };
