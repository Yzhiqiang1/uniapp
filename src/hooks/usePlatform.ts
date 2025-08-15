import { computed } from 'vue'
import PLATFORM from '@/utils/platform'

export function usePlatform() {
  const platform = computed(() => PLATFORM.platform)
  const isH5 = computed(() => PLATFORM.isH5)
  const isApp = computed(() => PLATFORM.isApp)
  const isMp = computed(() => PLATFORM.isMp)
  const isMpWeixin = computed(() => PLATFORM.isMpWeixin)
  const isMpAlipay = computed(() => PLATFORM.isMpAplipay)
  const isMpToutiao = computed(() => PLATFORM.isMpToutiao)
  const isHarmony = computed(() => PLATFORM.isHarmony)

  return {
    platform: platform.value,
    isH5: isH5.value,
    isApp: isApp.value,
    isMp: isMp.value,
    isMpWeixin: isMpWeixin.value,
    isMpAlipay: isMpAlipay.value,
    isMpToutiao: isMpToutiao.value,
    isHarmony: isHarmony.value
  }
}