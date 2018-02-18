import './index.scss';
import { HEADER } from '../../../shared/constants';

export default ngModule => {
  ngModule.directive("userLogin", () => (
    {
      template: require('./index.html'),
      controller: function ($scope, $http, $state) {

        $scope.onLogin = function () {
          const loginInfo = {
            email: $scope.email,
            password: $scope.password
          };

          $http.post('http://localhost:8000/login', loginInfo, HEADER).then(function (res) {
            $scope.message = res.data;
            if($scope.message === "Login succeed"){
              $state.go('userList');
            }
          })
        }

      }
    }));
}