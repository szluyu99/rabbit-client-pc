import { getBrands } from "@/api/home";
import { useCategoryStore } from "@/stores/category";
import { computed } from "vue";

export default function useMenuList() {
  const store = useCategoryStore()
  // 品牌类
  const brand = {
    id: "brand",
    name: "品牌",
    children: [{ id: "child-brand", name: "推荐品牌" }],
    brands: [],
  };

  //#region 热门品牌数据
  getBrands(6).then(res => {
    console.log("getBrands:", res);
    brand.brands = res.result
  })
  //#endregion

  // 获取左侧分类数据
  return computed(() => {
    // 一级分类中
    const list = store.list.map(item => ({
      ...item,
      children: item.children?.slice(0, 2) || []
    }))
    // 添加品牌类
    list.push(brand)
    // console.log("menuList:", list);
    return list
  })
}