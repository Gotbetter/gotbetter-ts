import client from "./client";
import {
  APIResponse,
  CheckDuplicateParam,
  SignUpRequest,
  SignUpResponse,
} from "./types";

const signup = (request: SignUpRequest): Promise<APIResponse<SignUpResponse>> =>
  client.post("/api/v1/users/register", request);

const checkDuplicate = (param: keyof CheckDuplicateParam, value: string) =>
  client.get("/api/v1/users/duplicate", {
    params: { [param]: value },
  });

export { checkDuplicate, signup };
