NMSApp.controller("TemaController", [
    "$scope", "Tema",
    function($scope, Tema) {

        $scope.list = Tema.query();

        console.log($scope.list);

        $scope.select = function(_id) {
            $scope.item = _.where($scope.list, {
                _id: _id
            })[0];
            $scope.delete();
        }

        $scope.new = function() {
            $scope.item = new Tema();
        }

        $scope.save = function() {
            if ($scope.item._id == null) {
                Tema.save({}, $scope.item, function(data) {
                    $scope.list.push(data);
                });
            } else {
                Tema.update({
                    temaId: $scope.item._id
                }, $scope.item, function(data) {});
            }
        }

        $scope.delete = function() {
            if ($scope.item._id != null) {
                console.log($scope.item);
                Tema.delete({
                    id: $scope.item._id
                }, $scope.item, function(list) {


                    //setTimeout(function () {
                    //  $scope.$apply(function () {
                    $scope.list = list
                    // });
                    // }, 1000);

                }, function() {
                    console.log("Delete FAIL " + $scope.item._id);
                });
            } else {}
        }

        $scope.complete = function(id) {
            Tema.delete({
                id: id
            }, function() {
                $scope.list = _.without($scope.list, $scope.item);
            });
        }

        $scope.data = [{
            "id": 1,
            "title": "1. dragon-breath",
            "items": []
        }, {
            "id": 2,
            "title": "2. moiré-vision",
            "items": [{
                "id": 21,
                "title": "2.1. tofu-animation",
                "items": [{
                    "id": 211,
                    "title": "2.1.1. spooky-giraffe",
                    "items": [{
                        "id": 2111,
                        "title": "2.1.1.1 spooky-giraffe",
                        "items": []
                    }, {
                        "id": 2112,
                        "title": "2.1.1.2 bubble-burst",
                        "items": []
                    }]
                }, {
                    "id": 212,
                    "title": "2.1.2. bubble-burst",
                    "items": []
                }]
            }, {
                "id": 22,
                "title": "2.2. barehand-atomsplitting",
                "items": []
            }]
        }, {
            "id": 3,
            "title": "3. unicorn-zapper",
            "items": []
        }, {
            "id": 4,
            "title": "4. romantic-transclusion",
            "items": []
        }];


    }
]);