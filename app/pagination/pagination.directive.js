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
                    if($scope.pages && index>5) {
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
                //generate array for ng-repeat directive,used in pagination
                var makeBtns = function(page) {
                    var length = scope.lastPage;
                        scope.pages = [];
                        for(var i=0;i<5;i++) {
                            if(4<=page && page <= length-3) {
                                scope.pages.push(page+i-2);
                            } else if(page<=4 && i<length){
                                scope.pages.push(i+1);
                            } else if(length>i) {
                                scope.pages.push(length-4+i);
                            }
                        }
                }

                scope.$watch(function(){return scope.data.products},function(data) {
                    //initial state, when data is loaded
                    var totalPages;
                    totalPages = pageCountFilter(angular.copy(data),itemsPerPage);
                    if(totalPages) {
                        scope.lastPage = totalPages.length;
                        scope.selectedPage = 1;//trigger changes
                    }
                    
                })

                scope.$watch(function(){return category.getCategory()}, function(cat) {
                    //select category
                    var result =[];
                    //when data is available
                    if(scope.data.products) {
                        var data = scope.data.products;
                        //for Home btn
                        if(cat=="Home") {
                            var pages = pageCountFilter(angular.copy(data),itemsPerPage);
                            scope.lastPage = pages.length;
                            makeBtns(1);             
                        } else {
                            data.forEach(function(item,index) {
                                if(item.category == cat) {
                                    result.push(item);
                                }
                            })
                            scope.pages = pageCountFilter(result,itemsPerPage);
                            scope.lastPage = scope.pages.length;
                        }
                    }
                })

                scope.$watch(function(){return scope.selectedPage}, function(page) {
                    //select page
                    makeBtns(page);
                })
            }
        }
    }])