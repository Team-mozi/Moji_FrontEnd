import { api } from '../api'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    socialLogin: build.mutation<SocialLoginApiResponse, SocialLoginApiArg>({
      query: (queryArg) => ({
        url: `/api/users/social-login`,
        method: 'POST',
        body: queryArg.socialLoginRequest,
      }),
    }),
    register: build.mutation<RegisterApiResponse, RegisterApiArg>({
      query: (queryArg) => ({
        url: `/api/users/register`,
        method: 'POST',
        body: queryArg.registerRequest,
      }),
    }),
    updateUserNickname: build.mutation<
      UpdateUserNicknameApiResponse,
      UpdateUserNicknameApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/nickname`,
        method: 'POST',
        body: queryArg.nicknameRequest,
      }),
    }),
    logout: build.mutation<LogoutApiResponse, LogoutApiArg>({
      query: () => ({ url: `/api/users/logout`, method: 'POST' }),
    }),
    login: build.mutation<LoginApiResponse, LoginApiArg>({
      query: (queryArg) => ({
        url: `/api/users/login`,
        method: 'POST',
        body: queryArg.loginRequest,
      }),
    }),
    sendVerificationEmail: build.mutation<
      SendVerificationEmailApiResponse,
      SendVerificationEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/email-verifications/send`,
        method: 'POST',
        body: queryArg.emailVerificationRequest,
      }),
    }),
    confirmVerificationEmail: build.mutation<
      ConfirmVerificationEmailApiResponse,
      ConfirmVerificationEmailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/users/email-verifications/confirm`,
        method: 'POST',
        body: queryArg.emailVerificationConfirmRequest,
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: (queryArg) => ({
        url: `/api/users/delete`,
        method: 'DELETE',
        body: queryArg.userDeleteRequest,
      }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as UserApi }
export type SocialLoginApiResponse =
  /** status 200 OK */ ApiResponseLoginResponse
export type SocialLoginApiArg = {
  socialLoginRequest: SocialLoginRequest
}
export type RegisterApiResponse =
  /** status 200 OK */ ApiResponseRegisterResponse
export type RegisterApiArg = {
  registerRequest: RegisterRequest
}
export type UpdateUserNicknameApiResponse =
  /** status 200 OK */ ApiResponseUserResponse
export type UpdateUserNicknameApiArg = {
  nicknameRequest: NicknameRequest
}
export type LogoutApiResponse = /** status 200 OK */ ApiResponseVoid
export type LogoutApiArg = void
export type LoginApiResponse = /** status 200 OK */ ApiResponseLoginResponse
export type LoginApiArg = {
  loginRequest: LoginRequest
}
export type SendVerificationEmailApiResponse =
  /** status 200 OK */ ApiResponseVoid
export type SendVerificationEmailApiArg = {
  emailVerificationRequest: EmailVerificationRequest
}
export type ConfirmVerificationEmailApiResponse =
  /** status 200 OK */ ApiResponseVoid
export type ConfirmVerificationEmailApiArg = {
  emailVerificationConfirmRequest: EmailVerificationConfirmRequest
}
export type DeleteUserApiResponse = /** status 200 OK */ ApiResponseVoid
export type DeleteUserApiArg = {
  userDeleteRequest: UserDeleteRequest
}
export type LoginResponse = {
  /** 액세스 토큰 */
  accessToken?: string
  /** 회원 번호 */
  userId?: number
  /** 닉네임 */
  nickname?: string
}
export type ApiResponseLoginResponse = {
  code?: string
  message?: string
  data?: LoginResponse
}
export type SocialLoginRequest = {
  /** 소셜 제공자 */
  provider: string
  /** 소셜 인증 토큰 */
  providerToken: string
}
export type RegisterResponse = {
  /** 회원 번호 */
  userId?: number
  /** 이메일 */
  email?: string
}
export type ApiResponseRegisterResponse = {
  code?: string
  message?: string
  data?: RegisterResponse
}
export type RegisterRequest = {
  /** 이메일 */
  email: string
  /** 비밀번호 */
  password: string
  /** 약관동의 여부 */
  agreed: boolean
}
export type UserResponse = {
  /** 회원 번호 */
  userId?: number
  /** 이메일 */
  email?: string
  /** 닉네임 */
  nickname?: string
}
export type ApiResponseUserResponse = {
  code?: string
  message?: string
  data?: UserResponse
}
export type NicknameRequest = {
  /** 설정할 닉네임 */
  nickname: string
}
export type ApiResponseVoid = {
  code?: string
  message?: string
  data?: object
}
export type LoginRequest = {
  /** 이메일 */
  email: string
  /** 비밀번호 */
  password: string
}
export type EmailVerificationRequest = {
  /** 인증을 진행할 이메일 */
  email: string
}
export type EmailVerificationConfirmRequest = {
  /** 인증을 진행한 이메일 */
  email: string
  /** 이메일로 발송된 인증 코드 */
  verificationCode: string
}
export type UserDeleteRequest = {
  /** 현재 계정의 비밀번호 */
  password: string
}
export const {
  useSocialLoginMutation,
  useRegisterMutation,
  useUpdateUserNicknameMutation,
  useLogoutMutation,
  useLoginMutation,
  useSendVerificationEmailMutation,
  useConfirmVerificationEmailMutation,
  useDeleteUserMutation,
} = injectedRtkApi
