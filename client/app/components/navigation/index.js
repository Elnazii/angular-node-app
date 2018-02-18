import './index.scss';

export default ngModule => {
  ngModule.directive("navigationBar", () => (
    {
      template: require('./index.html'),
      controller: function ($scope, $http) {

      }
    }));
}