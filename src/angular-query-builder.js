(function () {
    'use strict';

    angular.module('ngQueryBuilder', [])
        .directive('queryBuilder', queryBuilder);

    function queryBuilder() {
        return {
            restrict: 'AE',
            scope: {
                group: '='
            },
            link: function (scope, element, attrs) {},
        };
    }
})();
