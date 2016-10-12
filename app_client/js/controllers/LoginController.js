angular.module('MetronicApp').controller('LoginController', ['$location', 'authentication', '$scope', '$rootScope',  function($location, authentication, $scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	App.initAjax();

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        
        
        
    });

    $scope.onSubmit = function () {
      authentication
        .login($scope.credentials)
        .error(function(err){
          alert('Error: ' + err.message);
        })
        .then(function(){
          $('.modal-backdrop').remove();
          $location.path('dashboard');
        });
    };
    
    $scope.onRegisterSubmit = function () {
        console.log('Submitting registration');
        authentication
            .register($scope.register)
            .error(function(err){
                alert(err);
            })
            .then(function(){
                $('.modal-backdrop').remove();
                $location.path('/account/settings');
            });
    };

    $('#registerButton').click(function(){
        $('#registerModal').modal('show');
    });

    $('#loginModal').modal({
        backdrop: 'static',
        keyboard: false
    }).modal('show');
    
}]);