export default {
  //organization Wizard
  wizard: {
    permission: null,
    authenticated: true,
    activated: true,
    path: '/tenant/wizard',
    name: 'app.tenant.wizard',
    page: () => import('modules/qtenant/_pages/wizard'),
    layout: () => import('layouts/blank.vue'),
    title: 'isite.cms.sidebar.adminOrganizationWizard',
    icon: 'fal fa-crown',
  },
  categories: {
    permission: 'itenant.categories.manage',
    activated: false,
    authenticated: true,
    path: '/tenant/categories/index',
    name: 'qtenant.admin.categories',
    crud: import('modules/qtenant/_crud/categories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'itenant.cms.sidebar.adminCategories',
    icon: 'fa-light fa-layer-group',
    subHeader: {
      refresh: true,
    },
  },
};
