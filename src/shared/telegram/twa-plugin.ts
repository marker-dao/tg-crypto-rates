import { inject, provide } from 'vue'
import { createWebApp } from './web-app'
import type { WebAppAPI } from './web-app'

const WebAppKey = Symbol('WebApp')

export function provideWebApp() {
  const webApp = createWebApp()

  provide(WebAppKey, webApp)

  webApp.ready()
  webApp.expand()

  return webApp
}

export function useWebApp(): WebAppAPI {
  const webApp = inject<WebAppAPI>(WebAppKey)

  if (!webApp) {
    throw new Error('WebApp is not provided')
  }

  return webApp
}
