
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
    icon: 'fal fa-crown'
  },
	
}
