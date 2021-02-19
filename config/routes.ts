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
                // component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/topic/add_topic',
                    name: 'add_topic',
                    icon: 'smile',
                    component: './AddTopic',
                    authority: ['admin'],
                  },
                  {
                    path: '/topic/query_topic',
                    name: 'query_topic',
                    icon: 'smile',
                    component: './QueryTopic',
                    authority: ['admin'],
                  },
                  {
                    path: '/topic/classifyOrType',
                    name: 'classifyOrType',
                    icon: 'smile',
                    component: './ClassifyOrType',
                    authority: ['admin'],
                  },
                ],
              },
              {
                path: '/knowledge',
                name: 'knowledge',
                icon: 'AlertOutlined',
                // component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/knowledge/add_knowledge',
                    name: 'add_knowledge',
                    icon: 'smile',
                    component: './AddKnowledge',
                    authority: ['admin'],
                  },
                  {
                    path: '/knowledge/QueryKnowledge',
                    name: 'query_knowledge',
                    icon: 'smile',
                    component: './QueryKnowledge',
                    authority: ['admin'],
                  },

                ],
              },
              {
                path: '/tag',
                name: 'tag',
                icon: 'DatabaseOutlined',
                component: './Tag',
              },
              {
                path: '/company',
                name: 'company',
                icon: 'UsergroupAddOutlined',
                component: './Company',
              },
              {
                path: '/feedback',
                name: 'feedback',
                icon: 'SolutionOutlined',
                component: './Feedback',
              },
              {
                path: '/userInterview',
                name: 'userInterview',
                icon: 'smile',
                component: './UserInterview',
              },
              {
                path: '/userAddTopic',
                name: 'userAddTopic',
                icon: 'smile',
                component: './UserAddTopic',
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
