/**
 * 全局组件——应用级
 */
//#region 【全局组件】
// 骨架组件
// import XtxSkeleton from "@/components/library/XtxSkeleton";
// 轮播组件
// import XtxCarousel from "@/components/library/XtxCarousel";
// 查看更多组件
// import XtxMore from "@/components/library/XtxMore";
// 面包屑组件
// import XtxBread from "@/components/library/XtxBread";
// import XtxBreadItem from "@/components/library/XtxBreadItem";

//#endregion

//#region 【全局指令】
import directiveLazy from "@/components/directives/lazy";
//#endregion

// 导入Message
import Message from "@/components/library/Message";

//#region 【批量注册组件】
// vtie 中批量导入模块
const components = import.meta.globEager('./*.vue');

const library = {
  install(app) {
    // app.component("组件名称", "单文件组件");
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // 注册指令
    directiveLazy(app);
    // 3. 批量导入组件
    Object.keys(components).forEach(item => {
      const component = components[item].default
      app.component(component.name, component);
    })
    // 将 Message 方法挂载到全局属性中
    app.config.globalProperties.$message = Message;
  },
};
//#endregion

export default library;
