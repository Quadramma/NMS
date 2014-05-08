angular.module('TemaCtrl', []).controller('TemaController'

    , function($scope, $rootScope, Tema) {
        
        $scope.list = Tema.query(); //.net rta


//console.log($scope.list);



        //ALL
        $('.ui.sidebar')
            .sidebar("setting", {
                overlay: true,
                exclusive: true,
                //debug: true,
                //verbose: true
            });

        //TOP
        //$('.nms.top.ui.sidebar').sidebar('toggle');

        //LEFT BIND BTN
        $('.nms.left.ui.sidebar')
            .sidebar('attach events', '.nms.btn-node-sidebar.toggle.button')
            .sidebar("onChange", function() {
                console.log("onChange");
            });
        $(".nms.page").on("click", function(evt) {
            var btnIgnoreId = $('.nms.btn-node-sidebar.toggle.button').first().attr("id");
            if (evt.target.id == btnIgnoreId) {} else {
                $('.nms.left.ui.sidebar')
                    .sidebar("hide");

            }
        });



        $scope.select = function(_id) {
            $scope.item = _.where($scope.list, {
                _id: _id
            })[0];
            //$scope.delete();
        }

        $scope.new = function() {
            $scope.item = new Tema();
        }

        $scope.save = function() {
            if ($scope.item.TemaID == null) {
                Tema.save({}, $scope.item, function(data) {
                    $scope.list.push(data);
                });
            } else {
                Tema.update({
                    id: $scope.item.TemaID
                }, $scope.item, function(data) {});
            }
        }

        $scope.delete = function() {
            if ($scope.item.TemaID != null) {
                console.log($scope.item);
                Tema.delete({
                    id: $scope.item.TemaID
                }, $scope.item, function(list) {


                    //setTimeout(function () {
                    //  $scope.$apply(function () {
                    //$scope.list = list
                    // });
                    // }, 1000);

                }, function() {
                    console.log("Delete FAIL " + $scope.item.TemaID);
                });
            } else {}
        }





    });