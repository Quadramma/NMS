NMSApp.controller("TemaController",[
    "$scope","Tema"
    ,function($scope, Tema) {

    $scope.list = Tema.query();

    console.log($scope.list);

    $scope.select = function (_id) {
        $scope.item = _.where($scope.list, {_id: _id})[0];
        $scope.delete();
    }

    $scope.new = function () {
        $scope.item = new Tema();
    }

    $scope.save = function () {
        if ($scope.item._id == null) {
            Tema.save({}, $scope.item, function (data) {
                $scope.list.push(data);
            });
        }
        else {
            Tema.update({temaId: $scope.item._id}, $scope.item, function (data) {
            });
        }
    }

    $scope.delete = function(){
        if ($scope.item._id != null) {
            console.log($scope.item);
            Tema.delete({id: $scope.item._id}, $scope.item, function (list) {
                

                //setTimeout(function () {
                  //  $scope.$apply(function () {
                        $scope.list  = list
                   // });
               // }, 1000);

            },function(){
                console.log("Delete FAIL "+$scope.item._id);
            });
        }
        else {
        }
    }

    $scope.complete = function (id) {
        Tema.delete({id: id}, function () {
            $scope.list = _.without($scope.list, $scope.item);
        });
    }
}]);