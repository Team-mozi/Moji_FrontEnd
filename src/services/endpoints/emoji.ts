import { api } from '../api'
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmojis: build.query<GetEmojisApiResponse, GetEmojisApiArg>({
      query: () => ({ url: `/api/emojis` }),
    }),
    getRepresentativeEmojis: build.query<
      GetRepresentativeEmojisApiResponse,
      GetRepresentativeEmojisApiArg
    >({
      query: () => ({ url: `/api/emojis/representatives` }),
    }),
  }),
  overrideExisting: false,
})
export { injectedRtkApi as EmojiApi }
export type GetEmojisApiResponse =
  /** status 200 OK */ ApiResponseListEmojiResponse
export type GetEmojisApiArg = void
export type GetRepresentativeEmojisApiResponse =
  /** status 200 OK */ ApiResponseListRepresentativeEmojiResponse
export type GetRepresentativeEmojisApiArg = void
export type EmojiResponse = {
  /** 이모지 번호 */
  emojiId?: number
  /** 이모지 url */
  emojiUrl?: string
}
export type ApiResponseListEmojiResponse = {
  code?: string
  message?: string
  data?: EmojiResponse[]
}
export type RepresentativeEmojiResponse = {
  /** 이모지 번호 */
  emojiId?: number
  /** 이모지 url */
  emojiUrl?: string
  /** 대표 여부 */
  representative?: boolean
}
export type ApiResponseListRepresentativeEmojiResponse = {
  code?: string
  message?: string
  data?: RepresentativeEmojiResponse[]
}
export const {
  useGetEmojisQuery,
  useLazyGetEmojisQuery,
  useGetRepresentativeEmojisQuery,
  useLazyGetRepresentativeEmojisQuery,
} = injectedRtkApi
