angular.module('geekSpace').factory('coinsSrv', function ($http) {
    /* Obtem cotação do Dollar do dia anterior*/
    const _getCoins = function () {
        return $http.get('https://economia.awesomeapi.com.br/last/USD-BRL')
    }

    return {
        getCoins: _getCoins
    }
})