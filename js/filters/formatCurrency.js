angular.module('geekSpace').filter('formatCurrency', function () {
    return function (input, currency = 'BRL') {
        if (currency !== 'BRL') {
            return parseFloat(input).toLocaleString("en-US", {style: "currency", currency})
        }
        const currentBRL = window.localStorage.getItem('currentBRL')
        const price = parseFloat(input) * currentBRL
        return price.toLocaleString("pt-BR", {style: "currency", currency})
    }
})