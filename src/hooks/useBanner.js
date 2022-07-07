// 导入 API
import { ref } from "vue"
import { getBanners } from "@/api/home"

export default function useBanners(distributionSite = 1) {
  let banners = ref(null)
  getBanners(distributionSite).then(res => {
    banners.value = res.result
  })
  return banners
}