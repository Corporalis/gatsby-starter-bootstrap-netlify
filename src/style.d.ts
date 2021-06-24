import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string
        text: string
      }
      highlight: {
        text: string
      }
      background: string
    }
  }
}
