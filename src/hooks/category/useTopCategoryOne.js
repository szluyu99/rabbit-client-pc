import { ref } from 'vue'
import { getTopCategoryById } from "@/api/category";
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export default function useTopCategoryOne() {
  const route = useRoute()
  let result = ref(null)

  const getData = (id) => {
    getTopCategoryById(id).then(res => {
      result.value = res.result
    })
  }
  // 获取 data
  getData(route.params.id)
  // 路由更新周期
  onBeforeRouteUpdate((to) => {
    getData(to.params.id)
  })

  return result
}