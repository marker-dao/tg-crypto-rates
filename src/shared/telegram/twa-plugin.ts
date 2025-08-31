import { inject, provide } from 'vue'
import { createTwa } from './twa'
import type { TwaApi } from './twa'

const TwaKey = Symbol('Twa')

export function provideTwa() {
  const twa = createTwa()

  provide(TwaKey, twa)

  twa.ready()
  twa.expand()

  return twa
}

export function useTwa(): TwaApi {
  const twa = inject<TwaApi>(TwaKey)

  if (!twa) {
    throw new Error('TWA is not provided')
  }

  return twa
}
