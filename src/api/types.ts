type SignUpRequest = {
  username: string;
  password: string;
  nickname: string;
};
type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type SignUpResponse = {
  id: number;
  username: string;
  nickname: string;
};

type CheckDuplicateParam = {
  username?: string;
  nickname?: string;
};

type APIResponse<T> = {
  data: T;
};

export {
  SignUpRequest,
  LoginRequest,
  SignUpResponse,
  LoginResponse,
  APIResponse,
  CheckDuplicateParam,
};
