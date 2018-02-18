export default ngModule => {
  ngModule.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    return $locationProvider.html5Mode(false);
  })
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state({
        name: 'userList',
        url: '/user/list',
        template: '<user-list></user-list>'
      })
      .state({
        name: 'userAdd',
        url: '/user/add',
        template: '<user-add></user-add>'
      })
      .state({
        name: 'userLogin',
        url: '/login',
        template: '<user-login></user-login>'
      });

    $urlRouterProvider.otherwise("/login");
  });
}