import './index.scss';
import { HEADER } from '../../../shared/constants';

export default ngModule => {
  ngModule.directive("userAdd", () => (
    {
      template: require('./index.html'),
      controller: function ($scope, $http, $state) {

        $scope.onSubmit = function () {
          const formData = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password
          };

          $http.post('http://localhost:8000/user/add', formData, HEADER).then(function (res) {
            $scope.message = res.data;

            $state.go('userList')
          })
        }


      }
    }));
}