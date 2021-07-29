angular.module('geekSpace').factory('comicsSrv', function ($http, cfg) {
    const _getComics = function (filterObject = {}) {
        return $http.get(cfg.marvelApi.buildReq('comics', filterObject))
    }

    const _getComicDetails = function (comicId) {
        return $http.get(cfg.marvelApi.buildReq('comics/' + comicId))
    }

    return {
        getComics: _getComics,
        getComicDetails: _getComicDetails
    }
})