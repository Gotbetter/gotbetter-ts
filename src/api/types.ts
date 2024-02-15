type SignUpRequest = {
  username: string;
  password: string;
  nickname: string;
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

export { SignUpRequest, SignUpResponse, APIResponse, CheckDuplicateParam };
