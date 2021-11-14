type DictTypeString = {
  [className: string]: string
}

type ScssFunctions = {
  _getKey: () => string
  _getCss: () => string
  _insertCss: () => () => void
}

declare module '*.scss' {
  const StyleModule: DictTypeString & ScssFunctions
  export default StyleModule
}
