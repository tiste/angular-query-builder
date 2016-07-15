(function () {
    'use strict';

    angular.module('ngQueryBuilder', [])
        .directive('queryBuilder', queryBuilder)
        .directive('queryBuilderGroup', queryBuilderGroup);

    function queryBuilder() {
        return {
            restrict: 'AE',
            scope: {
                options: '=queryBuilder',
            },
            template: '<div query-builder-group="options" group="options._query.group"></div>',
            link: function (scope) {
                var defaults = {
                    operators: [
                        { name: 'AND', value: '$and' },
                        { name: 'OR', value: '$or' },
                    ],
                    conditions: [
                        { name: 'equal', value: '$eq' },
                        { name: 'is not equal', value: '$neq' },
                        { name: 'less than', value: '$lt' },
                        { name: 'less than or equal', value: '$lte' },
                        { name: 'greater than', value: '$gt' },
                        { name: 'greater than or equal', value: '$gte' },
                    ],
                };

                scope.options = angular.extend({}, defaults, scope.options);

                scope.options._query = {
                    'group': {
                        'operator': scope.options.operators[0],
                        'rules': [],
                    },
                };

                scope.format = format;

                function format(group) {
                    var obj = {};
                    var part = [];

                    for (var i = 0; i < group.rules.length; i++) {
                        obj[group.operator.value] = part;

                        if (group.rules[i].group) {
                            part.push(format(group.rules[i].group));
                        }
                        else {
                            var el = {};
                            el[group.rules[i].field.name] = {};
                            el[group.rules[i].field.name][group.rules[i].condition.value] = group.rules[i].data;
                            part.push(el);
                        }
                    }

                    for (var firstKey in obj) break;

                    if (firstKey && obj[firstKey].length < 2) {
                        obj = obj[firstKey].pop();
                    }

                    return obj;
                }

                scope.$watch('options._query', function (query) {
                    scope.options.query = scope.format(query.group);
                }, true);
            },
        }
    }

    queryBuilderGroup.$inject = ['$compile'];
    function queryBuilderGroup($compile) {
        return {
            restrict: 'AE',
            scope: {
                group: '=',
                options: '=queryBuilderGroup',
            },
            templateUrl: '/src/queryBuilderGroupDirective.html',
            compile: function (element, attrs) {
                var compiledContents;
                var content = element.contents().remove();

                return function (scope, element, attrs) {
                    scope.addCondition = addCondition;
                    scope.removeCondition = removeCondition;
                    scope.addGroup = addGroup;
                    scope.removeGroup = removeGroup;

                    function addCondition() {
                        scope.group.rules.push({
                            condition: scope.options.conditions[0],
                            field: scope.options.fields[0],
                            data: '',
                        });
                    }

                    function removeCondition(index) {
                        scope.group.rules.splice(index, 1);
                    }

                    function addGroup() {
                        scope.group.rules.push({
                            group: {
                                operator: scope.options.operators[0],
                                rules: [],
                            }
                        });
                    }

                    function removeGroup() {
                        'group' in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                    }

                    if (!compiledContents) {
                        compiledContents = $compile(content)
                    }

                    compiledContents(scope, function(clone){
                        element.append(clone);
                    });
                }
            }
        };
    }
})();
