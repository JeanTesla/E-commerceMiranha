angular.module('geekSpace').controller('comicDetailsCtrl', function ($scope, $uibModalInstance, comicAttrs, comicsSrv, thenHelp) {

    $scope.comicDetails = {};
    $scope.aspectThumbs = '/portrait_uncanny.jpg'
    $scope.comicVotes = ''
    $scope.stateShowReviewBuy = false;
    $scope.showPriceAfterDiscount = false;
    $scope.currentPrice = 0;
    $scope.discountApplied = '-0%';
    $scope.loadComic = true;
    $scope.isRare = comicAttrs.isRare;

    /* Uma div com o preço atual (com desconto ou não) é mostrada quando essa função é chamada.
    * Essa função é chamada ao clicar no botão "Comprar agora"*/
    $scope.showReviewBuy = function () {
        $scope.stateShowReviewBuy = true
        $scope.currentPrice = $scope.comicDetails.prices[0].price;
    }

    /* Essa função é responsável por definir os tipos de desconto possíveis, assim como suas porcentagens*/
    $scope.applyDiscount = function (type) {
        const percentDiscount = type === 'rare' ? 25 : 10;
        const comicPrice = $scope.comicDetails.prices[0].price
        $scope.currentPrice = comicPrice - ((comicPrice * percentDiscount) / 100)
        $scope.discountApplied = '-' + percentDiscount + '%'
        $scope.showPriceAfterDiscount = true;
    }

    /* Cria estrelas aleatoriamente (essas estrelas indicam quantas pessoas gostaram do quadrinho)*/
    function _setRandomComicVotes() {
        const numberOfStars = Math.floor(Math.random() * 5) + 1;
        let concatStars = '';
        for (let i = 1; i <= numberOfStars; i++) {
            concatStars += '<i class="bi bi-star-fill"></i>';
        }
        for (let i = numberOfStars; i <= 5; i++) {
            concatStars += '<i class="bi bi-star"></i>';
        }
        $scope.comicVotes = concatStars;
    }

    /* Abre modal para obtenção de mais detalhes sobre o quadrinho*/
    function getComicDetails() {
        comicsSrv.getComicDetails(comicAttrs.comicId).then(thenHelp.next)
            .then(function (r) {
                $scope.comicDetails = r.results[0]
                $scope.loadComic = false;
            })
        _setRandomComicVotes()
    }

    getComicDetails()

});