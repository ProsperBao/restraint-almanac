export type SimpleDomAttr = Record<string, string | number>

export class SimpleDom {
  tag: string
  attr: SimpleDomAttr
  content?: string | SimpleDom[]

  constructor(tag: string, attr?: SimpleDomAttr, content?: string | SimpleDom[]) {
    this.tag = tag
    this.attr = attr || {}
    this.content = content
  }

  toString(): string {
    const attr = Object.keys(this.attr)
      .map(key => `${key}="${this.attr[key]}"`)
      .join(' ')
    const content = this.content
      ? Array.isArray(this.content)
        ? this.content.map(dom => dom.toString()).join('')
        : this.content
      : ''
    return `<${this.tag} ${attr}>${content}</${this.tag}>`
  }

  static create(tag: string, attr?: SimpleDomAttr, content?: string | SimpleDom[]): SimpleDom {
    return new SimpleDom(tag, attr, content)
  }

  static createSvg(attr?: SimpleDomAttr, content?: string | SimpleDom[]): SimpleDom {
    const defaultSvgAttr = {
      'xmlns': 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    }

    const svg = new SimpleDom('svg', { ...defaultSvgAttr, ...attr }, content)
    svg.appendChild(SimpleDom.create('style', {}, `text {
      font-family: Consolas, "Lucida Console", Monaco, "DejaVu Sans Mono", "Bitstream Vera Sans Mono", monospace;
      font-variant-numeric: tabular-nums;
    }`))
    return svg
  }

  static createSvgLink(href: string, attr?: SimpleDomAttr, content?: string | SimpleDom[]): SimpleDom {
    return new SimpleDom('a', { 'xmlns:href': href, ...attr }, content)
  }

  appendChild(dom: SimpleDom): SimpleDom {
    if (Array.isArray(this.content))
      this.content.push(dom)

    else
      this.content = [dom]

    return this
  }
}
