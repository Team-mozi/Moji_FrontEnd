import { api } from '../api'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmojis: build.query<GetEmojisApiResponse, GetEmojisApiArg>({
      query: () => ({ url: `/api/emojis` }),
    }),
    getEmojiHighlights: build.query<
      GetEmojiHighlightsApiResponse,
      GetEmojiHighlightsApiArg
    >({
      query: () => ({ url: `/api/emojis/highlights` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as EmojiApi }
export type GetEmojisApiResponse =
  /** status 200 OK */ ApiResponseListEmojiResponse
export type GetEmojisApiArg = void
export type GetEmojiHighlightsApiResponse =
  /** status 200 OK */ ApiResponseEmojiHighlightsResponse
export type GetEmojiHighlightsApiArg = void
export type EmojiResponse = {
  /** 이모지 번호 */
  emojiId?: number
}
export type ApiResponseListEmojiResponse = {
  code?: string
  message?: string
  data?: EmojiResponse[]
}
export type RandomUserEmojiResponse = {
  /** 유저 이모지 번호 */
  userEmojiId?: number
  /** 이모지 번호 */
  emojiId?: number
}
export type RepresentativeEmojiResponse = {
  /** 이모지 번호 */
  emojiId?: number
}
export type EmojiHighlightsResponse = {
  /** 랜덤 이모지 목록 */
  randomEmojis?: RandomUserEmojiResponse[]
  /** 대표 이모지 목록 */
  representativeEmojis?: RepresentativeEmojiResponse[]
}
export type ApiResponseEmojiHighlightsResponse = {
  code?: string
  message?: string
  data?: EmojiHighlightsResponse
}
export const {
  useGetEmojisQuery,
  useLazyGetEmojisQuery,
  useGetEmojiHighlightsQuery,
  useLazyGetEmojiHighlightsQuery,
} = injectedRtkApi
