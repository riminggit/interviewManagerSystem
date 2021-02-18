export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/userAnalyse',
              },
              {
                path: '/userAnalyse',
                name: 'userAnalyse',
                icon: 'AreaChartOutlined',
                component: './UserAnalyse',
              },
              // {
              //   path: '/topicClassify',
              //   name: 'topicClassify',
              //   icon: 'smile',
              //   component: './UserAnalyse',
              // },
              {
                path: '/topic',
                name: 'topic',
                icon: 'ClusterOutlined',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/add_topic',
                    name: 'add_topic',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/query_topic',
                    name: 'query_topic',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/classifyOrType',
                    name: 'classifyOrType',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/knowledge',
                name: 'knowledge',
                icon: 'AlertOutlined',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/add_knowledge',
                    name: 'add_knowledge',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                  {
                    path: '/admin/query_knowledge',
                    name: 'query_knowledge',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },

                ],
              },
              {
                path: '/tag',
                name: 'tag',
                icon: 'DatabaseOutlined',
                component: './UserAnalyse',
              },
              {
                path: '/company',
                name: 'company',
                icon: 'UsergroupAddOutlined',
                component: './UserAnalyse',
              },
              {
                path: '/feedback',
                name: 'feedback',
                icon: 'SolutionOutlined',
                component: './UserAnalyse',
              },
              {
                path: '/userInterview',
                name: 'userInterview',
                icon: 'smile',
                component: './UserAnalyse',
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
