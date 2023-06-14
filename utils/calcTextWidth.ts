export function calcTextWidth(str: string): number {
  let englishCount = 0
  let nonEnglishCount = 0
  let spaceCount = 0

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))
      englishCount++
    else if (charCode === 32)
      spaceCount++
    else
      nonEnglishCount++
  }

  return nonEnglishCount + spaceCount + (englishCount * 0.525)
}
