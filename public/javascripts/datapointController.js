angular.module('databaseProject').controller('DPCtrl',
['$scope','Locations','DataPoints','$location',
function($scope,Locations,DataPoints,$location) {
  $scope.datapoints = []
  $scope.checkedPoints = {};
  DataPoints.getPending().success(function(res) {
    console.log(res);
    for (var i in res) {
      obj = {
        name: res[i].POI,
        type: res[i].DataType,
        value: res[i].Value,
        date: res[i].DpDate,
        time: res[i].DpTime,
        datime: res[i].DpDate.slice(0,10)+" "+res[i].DpTime
      }
      console.log(obj.datime);
      $scope.datapoints.push(obj);


    }
    $scope.accept = function() {
      for (name in $scope.checkedPoints) {
        if ($scope.checkedPoints[name] == true) {
          var els= name.split('_');
          DataPoints.accept(els[0],els[1]);
        }

        //accept WHERE .name = name
      }
    }
    $scope.reject = function() {
      for (name in $scope.checkedPoints) {
        if ($scope.checkedPoints[name] == true) {
          var els= name.split('_');
          DataPoints.reject(els[0],els[1]);
        }
        //reject WHERE .name = name
      }
    }
    $scope.back = function() {
      $location.path('admin');
    }
  })

}])