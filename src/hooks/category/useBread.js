import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/category";

export default function useBread(type = "top") {
  const route = useRoute()
  const categoryStore = useCategoryStore()

  // 一级 面包屑
  if (type == "top") {
    // 利用计算属性
    return computed(() => {
      return categoryStore.list.find(
        item => item.id === route.params.id
      )
    })
  }
  // 二级 面包屑
  else if (type == "sub") {
    return computed(() => {
      let topCategory = null
      let subCategory = null
      // 遍历一级分类
      categoryStore.list.forEach(top => {
        // 遍历二级分类
        top.children?.forEach(sub => {
          // 判断分类 id 是否和路由参数 id 相同
          if (sub.id === route.params.id) {
            // console.log("top:", top)
            // console.log("sub:", sub)
            topCategory = top
            subCategory = sub
          }
        })
      })
      return { topCategory, subCategory }
    })
  }

}