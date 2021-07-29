angular.module('geekSpace').controller('comicsCtrl', function ($scope, comicsSrv, coinsSrv, thenHelp, $uibModal) {
    $scope.listComics = []
    $scope.aspectThumbs = '/portrait_uncanny.jpg'
    $scope.loadComics = true;

    /*  Abre modal para mais informações de um comic  */
    $scope.comicDetails = function (comicId, isRare) {
        $uibModal.open({
            templateUrl: "views/comicDetailsView.html",
            controller: "comicDetailsCtrl",
            size: 'lg',
            resolve: {
                comicAttrs: function () {
                    return {
                        comicId,
                        isRare
                    }
                }
            },
        });
    };

    /*  Filtro dos Comics  */
    $scope.filterComics = function (comicFilter) {
        console.log(comicFilter)
        if (comicFilter) _getListComics(comicFilter)
    }

    function _getListComics(filters = {}) {
        comicsSrv.getComics(filters).then(thenHelp.next)
            .then(function (r) {
                $scope.listComics = _makeRareComics(r.results)
                $scope.loadComics = false;
            })
    }

    /*  Atribui o parametro rare à 12% dos Comics totais  */
    function _makeRareComics(comics) {
        const numberOfComics = comics.length
        const numberOfRareComics = parseInt((numberOfComics * 12) / 100)
        console.log(numberOfRareComics)
        for (let i = 1; i <= numberOfRareComics; i++) {
            const randomIndex = Math.floor(Math.random() * numberOfComics) + 1
            comics[randomIndex].rare = true
        }
        return comics;
    }

    /*  Inicializador para chamadas assíncronas em cadeia (Só tapia)
        A req para obter a lista de Comics só é feita após o retorno da cotação do dollar
    */
    function boot() {
        /* Aguarda a promisse com a cotação atual das moedas para depois obter os quadrinhos */
        coinsSrv.getCoins().then(function (r) {
            const currentBRL = parseFloat(r.data.USDBRL.high)
            window.localStorage.setItem('currentBRL', currentBRL)
            _getListComics()
        })
    }

    boot()
})