interface ImportMetaEnv {
  readonly VITE_CG_API_URL: string
  readonly VITE_CG_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
