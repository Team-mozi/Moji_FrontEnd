// pathMatcher 함수: 경로(path)를 기반으로 매칭하는 함수
const pathMatcher = (pattern) => {
  return (operationName, operationDefinition) => {
    return pattern.test(operationDefinition.path)
  }
}

const config = {
  apiFile: '../src/services/api.ts',
  apiImport: 'api',
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
  schemaFile: 'https://mozi.o-r.kr/v3/api-docs',
  endpointOverrides: [
    {
      parameterFilter: (_name, parameter) => parameter.in !== 'header',
    },
  ],
  outputFiles: {
    '../src/services/endpoints/user.ts': {
      exportName: 'UserApi',
      filterEndpoints: pathMatcher(/^\/api\/users/i),
    },
    '../src/services/endpoints/user-emoji.ts': {
      exportName: 'UserEmojiApi',
      filterEndpoints: pathMatcher(/^\/api\/user-emojis/i),
    },
    '../src/services/endpoints/emoji.ts': {
      exportName: 'EmojiApi',
      filterEndpoints: pathMatcher(/^\/api\/emojis/i),
    },
  },
}

module.exports = config
