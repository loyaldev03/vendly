/* Setup general page controller */
angular.module('MetronicApp')

.config(['sirTrevorServiceProvider', function(sirTrevorServiceProvider) {
    // set config
    sirTrevorServiceProvider.setConfig({
        "debug": false,
        "scribeDebug": false,
        "language": "en"
    });

    // set defaults
    sirTrevorServiceProvider.setDefaults({
        "iconUrl": "vendor/sir-trevor/src/icons/sir-trevor-icons.svg"
    });

    // set block options
    sirTrevorServiceProvider.setBlockOptions({
        /* put block options here */
    });
}])

.controller('GeneralPageController', ['$rootScope', '$scope', 'settings', 'meanData', 'amazons3', function($rootScope, $scope, settings, meanData, amazons3) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();

        // set default layout mode
        $rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;


        $scope.editorContent = {
          "data": [{
              "type": "checkbox",
              "data": {
                  "text": "<p>Start creating your event handbook!</p>",
                  "format": "html"
              }
          }]
        };

    });

    $scope.handbook = {
      name: 'Untitled'
    };
    
    $scope.onNewProvilegeUserSubmit = function () {
        // save user data
        
        meanData.sendNewUserInviteEmail($scope.user)
            .error(function(e){
                console.log(e);
            })
            .then(function(){
                $('#add_privilege_user').modal('hide');
            });
    };

    $scope.uploadImage = function() {
        var file = $('#avatarImg')[0].files[0];
        if (!file) return;
        amazons3.uploadAvatar(file);
    };
    
    $('#avatarImg').change(function () {
        var file = $(this)[0].files[0];
        $('#preview').attr('src', URL.createObjectURL(file));
    });

    $scope.user_settings = {};
    meanData.getProfile()
        .success(function(user) {
            // TODO - make more secure
            $scope.user_settings.avatar = 'https://ourstory-vendly.s3.amazonaws.com/' + user._id + '/avatar.png';
            $scope.user_settings.name = user.name;
            $scope.user_settings.email = user.email;
            $scope.user_settings.phone = user.phone;
            $scope.user_settings.website = user.website;
            $scope.user_settings.bus_name = user.bus_name;
            $scope.user_settings.usertype = user.usertype;
            $('#usertypeSelect').val(user.usertype);
        })
        .error(function (e) {
            console.log(e);
        });

    $scope.updateProfile = function() {
        for (var key in $scope.user_settings) {
            var obj = $scope.user_settings[key];
            if (typeof obj === 'undefined')
                $scope.user_settings[key] = '';
        }

        meanData.updateProfile($scope.user_settings)
            .success(function() {
                toastr.success('Your profile info was successfully changed.', 'Settings Changed');
            })
            .error(function(e) {
                toastr.error(e.message, 'Error');
            });
    };
}]);
