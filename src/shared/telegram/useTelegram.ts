import { computed, ref, onMounted } from 'vue'
import { useWebApp } from './web-app-plugin'
import type { Theme } from './web-app'

export function useTelegram() {
  const webApp = useWebApp()
  const theme = ref<Theme>(webApp.theme)
  const username = ref<string | null>(webApp.username)
  const available = computed(() => webApp.available)

  onMounted(() => {
    webApp.webApp?.onEvent?.('themeChanged', () => {
      const next = webApp.webApp?.colorScheme === 'dark' ? 'dark' : 'light'

      theme.value = next
    })
  })

  const configuration = {
    available,
    theme,
    username,
    hapticImpact: webApp.hapticImpact,
    showBackButton: webApp.showBackButton,
  }

  return configuration
}
