import type { WebApp } from '@twa-dev/types'
import TelegramWebApp from '@twa-dev/sdk'

type Theme = 'light' | 'dark'

type HapticImpactStyle = 'light' | 'medium' | 'heavy'

export type TwaApi = {
  available: boolean
  webApp: WebApp | null
  theme: Theme
  username: string | null
  ready: () => void
  expand: () => void
  hapticImpact: (style?: HapticImpactStyle) => void
  showBackButton: (show: boolean, onClick?: () => void) => void
}

const isMock = import.meta.env.VITE_TG_MOCK === 'true'

function createReal(): TwaApi {
  const webApplication =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (TelegramWebApp ?? (globalThis as any)?.Telegram?.WebApp) as WebApp | undefined

  const theme = webApplication?.colorScheme === 'dark' ? 'dark' : 'light'
  const username = webApplication?.initDataUnsafe?.user?.username ?? null

  const configuration: TwaApi = {
    available: Boolean(webApplication),
    webApp: webApplication ?? null,
    theme,
    username,
    ready: () => {
      webApplication?.ready()
    },
    expand: () => {
      webApplication?.expand?.()
    },
    hapticImpact: (style = 'light') => {
      webApplication?.HapticFeedback?.impactOccurred(style)
    },
    showBackButton: (show, onClick) => {
      const button = webApplication?.BackButton

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
