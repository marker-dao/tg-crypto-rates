/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TG_MOCK: 'true' | 'false'
  readonly VITE_TG_THEME?: 'light' | 'dark'
  readonly VITE_TG_USER_NAME?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
