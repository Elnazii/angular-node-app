window.app.directive("userList", function() {
    return {
        templateUrl : "/app/components/user-lis/index.html",
        controller: function ($scope) {
            $scope.onSubmit = function(){
                if ($scope.firsName === "elnaz" && $scope.password === '12345'){
                    $scope.message = "congradulation! you are now logged in";
                    $scope.isSuccess= true;

                }else{
                    $scope.message = "Please sign-in first";
                    $scope.isSuccess= false;
                }
            }
        }
    };
});