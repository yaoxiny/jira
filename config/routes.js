/*
 * @文档描述:
 * @author: 宣灵杰
 * @Date: 2020-12-21 16:25:41
 * @LastEditTime: 2020-12-21 17:12:24
 * @LastEditors: 宣灵杰
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: '../login',
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            routes: [
              {
                path: '/',
                redirect: '/createActivity',
              },
              {
                path: '/createActivity',
                name: 'createActivity',
                icon: 'smile',
                component: './active',
              },
              {
                path: '/detail',
                name: 'detail',
                icon: 'smile',
                component: './detail',
              },
              {
                path: '/active',
                name: 'active',
                icon: 'smile',
                component: './active/route_active',
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
