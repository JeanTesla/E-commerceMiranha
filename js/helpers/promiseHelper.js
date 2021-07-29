/* Considerei que a API da marvel retorna o atributo data repetitivamente, nesse caso,
* como promisses podem ser passadas para o próximo escopo, o thenHelp faz isso.
* O propósito desse ato é diminuir a quantidade de vezes que o atributo data aparece nos controllers*/
angular.module('geekSpace').value('thenHelp', {
    next: function (r) {
        return r.data.data
    }
});