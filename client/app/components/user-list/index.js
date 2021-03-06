import './index.scss';

export default ngModule => {
  ngModule.directive("userList", () => (
    {
      template: require('./index.html'),
      controller: function ($scope, $http) {
        $http.get('http://localhost:8000/users').then(function (res) {
          $scope.userList = res.data;
        })
      }
    }));
}