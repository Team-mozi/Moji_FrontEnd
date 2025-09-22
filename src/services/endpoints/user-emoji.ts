import { api } from '../api'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUserEmoji: build.mutation<
      CreateUserEmojiApiResponse,
      CreateUserEmojiApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user-emojis`,
        method: 'POST',
        body: queryArg.userEmojiCreateRequest,
      }),
    }),
    getUserEmojiDetail: build.query<
      GetUserEmojiDetailApiResponse,
      GetUserEmojiDetailApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user-emojis/${queryArg.userEmojiId}`,
      }),
    }),
    deleteUserEmoji: build.mutation<
      DeleteUserEmojiApiResponse,
      DeleteUserEmojiApiArg
    >({
      query: (queryArg) => ({
        url: `/api/user-emojis/${queryArg.userEmojiId}`,
        method: 'DELETE',
      }),
    }),
    getRandomUserEmojis: build.query<
      GetRandomUserEmojisApiResponse,
      GetRandomUserEmojisApiArg
    >({
      query: () => ({ url: `/api/user-emojis/random` }),
    }),
    getLatestUserEmoji: build.query<
      GetLatestUserEmojiApiResponse,
      GetLatestUserEmojiApiArg
    >({
      query: () => ({ url: `/api/user-emojis/latest` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as UserEmojiApi }
export type CreateUserEmojiApiResponse = /** status 200 OK */ ApiResponseLong
export type CreateUserEmojiApiArg = {
  userEmojiCreateRequest: UserEmojiCreateRequest
}
export type GetUserEmojiDetailApiResponse =
  /** status 200 OK */ ApiResponseUserEmojiDetailResponse
export type GetUserEmojiDetailApiArg = {
  userEmojiId: number
}
export type DeleteUserEmojiApiResponse = /** status 200 OK */ ApiResponseVoid
export type DeleteUserEmojiApiArg = {
  userEmojiId: number
}
export type GetRandomUserEmojisApiResponse =
  /** status 200 OK */ ApiResponseListRandomUserEmojiResponse
export type GetRandomUserEmojisApiArg = void
export type GetLatestUserEmojiApiResponse =
  /** status 200 OK */ ApiResponseUserEmojiResponse
export type GetLatestUserEmojiApiArg = void
export type ApiResponseLong = {
  code?: string
  message?: string
  data?: number
}
export type UserEmojiCreateRequest = {
  /** 이모지 번호 */
  emojiId: number
  /** 내용 */
  text?: string
  /** 이미지 URL 목록 */
  imageUrls?: string[]
}
export type UserEmojiDetailResponse = {
  /** 유저 이모지 번호 */
  userEmojiId?: number
  /** 유저 닉네임 */
  nickname?: string
  /** 이모지 번호 */
  emojiId?: number
  /** 내용 */
  text?: string
  /** 이미지 URL 목록 */
  imageUrls?: string[]
}
export type ApiResponseUserEmojiDetailResponse = {
  code?: string
  message?: string
  data?: UserEmojiDetailResponse
}
export type ApiResponseVoid = {
  code?: string
  message?: string
  data?: object
}
export type RandomUserEmojiResponse = {
  /** 유저 이모지 번호 */
  userEmojiId?: number
  /** 유저 닉네임 */
  nickname?: string
  /** 이모지 번호 */
  emojiId?: number
}
export type ApiResponseListRandomUserEmojiResponse = {
  code?: string
  message?: string
  data?: RandomUserEmojiResponse[]
}
export type UserEmojiResponse = {
  /** 유저 이모지 번호 */
  userEmojiId?: number
  /** 유저 번호 */
  userId?: number
  /** 이모지 번호 */
  emojiId?: number
}
export type ApiResponseUserEmojiResponse = {
  code?: string
  message?: string
  data?: UserEmojiResponse
}
export const {
  useCreateUserEmojiMutation,
  useGetUserEmojiDetailQuery,
  useLazyGetUserEmojiDetailQuery,
  useDeleteUserEmojiMutation,
  useGetRandomUserEmojisQuery,
  useLazyGetRandomUserEmojisQuery,
  useGetLatestUserEmojiQuery,
  useLazyGetLatestUserEmojiQuery,
} = injectedRtkApi
