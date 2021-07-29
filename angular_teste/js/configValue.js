angular.module('geekSpace').value('cfg', {
    marvelApi: {
        /* Valor do atributo hash -> md5 (ts + privateKey + publicKey) */
        baseUrl: 'http://gateway.marvel.com/v1/public/',
        ts: 1,
        publicKey: 'd4c8fd95be9546319aac0abb062c366e',
        hash: '7f8ea4f2844dc78e81a8692985e32bb0',

        /* Essa função retorna todos os parâmetros do objeto de filtro em
        * formato de quueryString, já que a API da marvel precisa que os filtros
        * sejam aplicados dessa maneira */

        buildReq: function (endPoint, filters = {}) {
            let filterConcat = '&';
            if (filters.length !== 0) {
                Object.entries(filters).forEach((filter) => {
                    filterConcat += filter[0] + '=' + filter[1] + '&'
                })
            }
            const queryString = `?apikey=${this.publicKey}&ts=${this.ts}&hash=${this.hash}` + filterConcat
            return this.baseUrl + endPoint + queryString
        }
    }
})