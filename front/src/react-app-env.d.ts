/// <reference types="react-scripts" />

declare module '*.css' {
  export default '' as string
}
declare module '*.png' {
  export default '' as string
}
declare module '*.svg' {
  export default '' as string
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
