import type { WebApp as WebAppType } from '@twa-dev/types'
import WebApp from '@twa-dev/sdk'

type Theme = 'light' | 'dark'

type HapticImpactStyle = 'light' | 'medium' | 'heavy'

export type TwaApi = {
  available: boolean
  webApp: WebAppType | null
  theme: Theme
  username: string | null
  ready: () => void
  expand: () => void
  hapticImpact: (style?: HapticImpactStyle) => void
  showBackButton: (show: boolean, onClick?: () => void) => void
}

const isMock = import.meta.env.VITE_TG_MOCK === 'true'

function createReal(): TwaApi {
  const theme = WebApp?.colorScheme === 'dark' ? 'dark' : 'light'
  const username = WebApp?.initDataUnsafe?.user?.username ?? null

  const configuration: TwaApi = {
    available: Boolean(WebApp),
    webApp: WebApp ?? null,
    theme,
    username,
    ready: () => {
      WebApp?.ready()
    },
    expand: () => {
      WebApp?.expand?.()
    },
    hapticImpact: (style = 'light') => {
      WebApp?.HapticFeedback?.impactOccurred(style)
    },
    showBackButton: (show, onClick) => {
      const button = WebApp?.BackButton

      if (!button) {
        return
      }

      if (show) {
        button.onClick(() => onClick?.())
        button.show()
      } else {
        button.hide()
        button.offClick(onClick ?? (() => {}))
      }
    },
  }

  return configuration
}

function createMock(): TwaApi {
  const theme = import.meta.env.VITE_TG_THEME ?? 'light'
  const username = import.meta.env.VITE_TG_USER_NAME ?? 'dev'

  const configuration: TwaApi = {
    available: true,
    webApp: null,
    theme,
    username,
    ready: () => {
      /* no-op */
    },
    expand: () => {
      /* no-op */
    },
    hapticImpact: () => {
      /* no-op */
    },
    showBackButton: () => {
      /* no-op */
    },
  }

  return configuration
}

export function createTwa(): TwaApi {
  if (isMock) {
    return createMock()
  } else {
    return createReal()
  }
}
