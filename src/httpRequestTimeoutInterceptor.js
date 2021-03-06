angular.module('angularCancelOnNavigateModule')
  .factory('HttpRequestTimeoutInterceptor', function ($q, HttpPendingRequestsService) {
    return {
      request: function (config) {
        config = config || {};

        if (config.timeout === undefined && config.cancelOnRouteChange) {
          config.timeout = HttpPendingRequestsService.newTimeout();
        }
        return config;
      },

      responseError: function (response) {
        if (response.config.timeout && response.config.timeout.isGloballyCancelled) {
          return $q.defer().promise;
        }
        return $q.reject(response);
      }
    };
  });
