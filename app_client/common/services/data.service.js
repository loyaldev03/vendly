(function() {

  angular
    .module('meanApp')
    .service('meanData', meanData);

  meanData.$inject = ['$http', 'authentication'];
  function meanData ($http, authentication) {

    var getProfile = function () {
      return $http.get('/api/profile', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };
      
    var getRolodex = function () {
        return $http.get('/api/rolodex', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
    };
      
    var saveContact = function (contact) {
        return $http.post('/api/saveContact', contact, {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
    };
      
    var getCalendar = function () {
        return $http.get('/api/calendar', {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
    };
      
    var saveEvent = function (event) {
        alert(JSON.stringify(event));
        return $http.post('/api/saveEvent', event, {
            headers: {
                Authorization: 'Bearer '+ authentication.getToken()
            }
        });
    };
      
    return {
      getProfile : getProfile,
      getRolodex : getRolodex,
      saveContact: saveContact,
      getCalendar: getCalendar,
      saveEvent  : saveEvent
    };
  }

})();