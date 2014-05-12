var GAFile = angular.module('GAFileService', ['ngResource', 'AppConfigService'])
    .factory('GAFile', ['$resource', 'AppConfig',
        function($resource, AppConfig) {

            var File = $resource(
                AppConfig.apiGAProduccion + '/file/:action', {}, {
                    getAvailableProductPictures: {
                        method: 'GET',
                        params: {
                            action: 'getAvailableProductPictures'
                        },
                        isArray: false
                    },
                    getAvailableProductSlides: {
                        method: 'GET',
                        params: {
                            action: 'getAvailableProductSlides'
                        },
                        isArray: false
                    },
                    getAvailableProjectPictures: {
                        method: 'GET',
                        params: {
                            action: 'getAvailableProjectPictures'
                        },
                        isArray: false
                    },
                    getAvailableProjectSlides: {
                        method: 'GET',
                        params: {
                            action: 'getAvailableProjectSlides'
                        },
                        isArray: false
                    },
                    getAvailableHomeSlides: {
                        method: 'GET',
                        params: {
                            action: 'getAvailableHomeSlides'
                        },
                        isArray: false
                    },
                    saveHomeSlides: {
                        method: 'POST',
                        params: {
                            action: 'saveHomeSlides'
                        },
                        isArray: false
                    },
                    saveDestacados: {
                        method: 'POST',
                        params: {
                            action: 'saveDestacados'
                        },
                        isArray: false
                    },
                    getDestacados: {
                        method: 'GET',
                        params: {
                            action: 'getDestacados'
                        },
                        isArray: false
                    },
                    getHomeSlides: {
                        method: 'GET',
                        params: {
                            action: 'getHomeSlides'
                        },
                        isArray: false
                    }




                }
            );
            //
            return File;
        }
    ]);