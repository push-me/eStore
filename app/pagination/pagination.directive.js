'use strict';

angular.module('eStore')
    .directive('pagination', [
        'category',
        'paginationService',
        'pageCountFilter',
        function(category, paginationService,pageCountFilter) {
        return {
            restrict:'E',
            templateUrl:'pagination/pagination.template.html',
            controller:function($scope) {
                $scope.pages=[];
                $scope.lastPage = 1;

                $scope.dispPages = function(index) {
                    if($scope.pages && index>4) {
                        return true
                    } else return false
                }

                $scope.nextPage = function() {
                    $scope.selectPage($scope.selectedPage+1);
                }

                $scope.prevPage = function() {
                    $scope.selectPage($scope.selectedPage-1);
                }

                $scope.pageCheck = function(page) {
                   if($scope.selectedPage ==page)  {
                       return true
                   } else return false
                }
            },
            link:function(scope) {
                var itemsPerPage = paginationService.getItemsPerPage();
                scope.$watch(function(){return scope.data.products},function(data) {
                    //initial state, when data is loaded
                    scope.pages = pageCountFilter(angular.copy(data),itemsPerPage);
                    if(scope.pages) {
                        scope.lastPage = scope.pages.length;
                    }
                    
                })

                scope.$watch(function(){return category.getCategory()}, function(cat) {
                    //select category
                    var result =[];
                    //when data is available
                    if(scope.data.products) {
                        var data = scope.data.products;
                        //for Home btn
                        if(!cat) {
                            scope.pages = [];
                            data.forEach(function(item,index) {
                                scope.pages.push(index+1);
                            })
                            scope.lastPage = scope.pages.length;
                        } else {
                            data.forEach(function(item,index) {
                                if(item.category == cat) {
                                    result.push(item);
                                }
                            })
                            scope.pages = pageCountFilter(result,itemsPerPage);
                            scope.lastPage = scope.pages.length;
                        }
                       
                    } else return 'no data'
                })

                scope.$watch(function(){return scope.selectedPage}, function(page) {
                    //select page
                    var length = scope.lastPage;
                        scope.pages = [];

                        for(var i=0;i<5;i++) {
                            if(4<page && page <= length-4) {
                                scope.pages.push(page+i-2);
                            } else if(page <=4) {
                                scope.pages.push(i+1);
                            } else {
                                scope.pages.push(length-4+i);
                            }
                        }
                })
            }
        }
    }])