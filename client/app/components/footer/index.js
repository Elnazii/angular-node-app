import './index.scss';

export default ngModule => {
  ngModule.directive("appFooter", () => (
    {
      template: require('./index.html'),
      controller: function ($scope) {

      }
    }));
}