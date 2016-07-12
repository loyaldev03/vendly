(function () {
  
  angular
    .module('meanApp')
    .controller('calendarCtrl', calendarCtrl);

  calendarCtrl.$inject = ['$location', 'meanData', '$route', '$scope'];
  function calendarCtrl($location, meanData, $route, $scope) {
    var vm = this;
    vm.event = {};

    meanData.getCalendar()
        .success(function(data) {
            $('#calendar').fullCalendar({
                events: data,
                timezone: 'local'
            });
        })
        .error(function (e) {
            console.log(e);
        });
      
    $('#datetimepicker1')
        .datetimepicker()
        .on("dp.change", function() {
            //vm.event.start = moment.utc($("#datetimepicker1").data("DateTimePicker").date()).valueOf();
            vm.event.start = $('#datetimepicker1 > input').val();
        });
      
    vm.onSubmit = function () {
        console.log('Submitting events ' + vm.event.title);
        vm.event.start = moment.utc($("#datetimepicker1").data("DateTimePicker").date()).valueOf();
        meanData.saveEvent(vm.event)
            .error(function(e){
                console.log(e);
            })
            .then(function(){
                $route.reload();
            });
    };
      
    
  }

})();