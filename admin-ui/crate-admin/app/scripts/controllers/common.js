'use strict';

angular.module('common', ['stats'])
  .controller('StatusBarController', function ($scope, $log, $location, ClusterState) {
    var colorMap = {green: 'label-success',
                    yellow: 'label-warning',
                    red: 'label-danger',
                    '--': 'label-default'};

    $scope.cluster_color_label = 'label-default';


    $scope.$watch( function () { return ClusterState.data; }, function (data) {
      $scope.cluster_state = data.status;
      $scope.cluster_name = data.name;
      $scope.cluster_color_label = colorMap[data.status];
      $scope.load1 = data.load[0] == '-.-' ? data.load[0] : data.load[0].toFixed(2);
      $scope.load5 = data.load[1] == '-.-' ? data.load[1] : data.load[1].toFixed(2);
      $scope.load15 = data.load[2] == '-.-' ? data.load[2] : data.load[2].toFixed(2);
    }, true);

    var prefix = $location.search().prefix || '';
    $scope.docs_url = prefix + "/_plugin/docs";

  })
  .controller('NavigationController', function ($scope, $location, ClusterState) {
    var colorMap = {green: '',
                    yellow: 'label-warning',
                    red: 'label-danger',
                    '--': ''};

    $scope.$watch( function () { return ClusterState.data; }, function (data) {
      $scope.cluster_color_label_bar = colorMap[data.status];
    }, true);


    $scope.isActive = function (viewLocation) {
      if (viewLocation == '/') {
        return viewLocation === $location.path();
      } else {
        return $location.path().substr(0, viewLocation.length) == viewLocation;
      }
    };

    $scope.params = $location.search().prefix ? '?prefix='+$location.search().prefix : '';
  });
