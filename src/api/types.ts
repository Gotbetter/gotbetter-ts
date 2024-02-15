type SignUpRequest = {
  userId: string;
  password: string;
  nickname: string;
};

type SignUpResponse = {
  id: number;
  userId: string;
  nickname: string;
};

type CheckDuplicateParam = {
  userId?: string;
  nickname?: string;
};

type APIResponse<T> = {
  data: T;
};

export { SignUpRequest, SignUpResponse, APIResponse, CheckDuplicateParam };
