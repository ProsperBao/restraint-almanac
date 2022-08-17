import k from './keyword.json'

export type KeywordJson = Record<string, Keyword[] | string>

export interface Keyword {
  name: string
  emoji: string
}

export function match(str: string): Keyword[] {
  const json = k as KeywordJson
  const strKeyword: string[] = str.split(' ')
  const result: Keyword[] = []
  for (let i = 0; i < strKeyword.length; i++) {
    const keyword = strKeyword[i]
    let target = json[keyword]
    if (!target) {
      const include = Object.keys(json).find(key => keyword.includes(key))
      if (include)
        target = json[include]
    }

    if (typeof target === 'string') {
      strKeyword.push(target as string)
      continue
    }
    if (target)
      result.push(...target as Keyword[])
  }
  return result.filter((item, index, self) => self.findIndex(v => v.name === item.name) === index).sort((a, b) => a.name.length - b.name.length)
}
