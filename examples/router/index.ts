import Vue from "vue";
import Router from "vue-router";
import { XbRouteConfig } from "./types";
import { headerConfig } from "./config";

Vue.use(Router);

// const getFullPath = (router: XbRouteConfig) => {
//     const children = router.children;
//     if (children === undefined) {
//     } else {
//         getFullPath(children);
//     }
//     return;
// };

// 根据路由注册组件
const addComponent = (router: XbRouteConfig[]) => {
  router.forEach((route) => {
    route.component = (r) => require.ensure([], () => r(require(`../docs${route.path}.md`)));
  });
};

const indexRoute: XbRouteConfig[] = [
  {
    text: "首页",
    name: "index",
    path: "/",
    component: (r) => require.ensure([], () => r(require("../pages/index.vue"))),
  },
  {
    name: "container",
    path: "/container",
    component: (r) => require.ensure([], () => r(require("../pages/container.vue"))),
  },
];

indexRoute[1].children = headerConfig();

const routes: XbRouteConfig[] = indexRoute;

// addComponent(sidebarConfig);

// routes[2].children = sidebarConfig();

export default new Router({
  routes,
});
