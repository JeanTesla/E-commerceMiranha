angular.module('geekSpace').filter('limitText', function () {
    return function _limitText(text, limitLength, changeFor) {
        if (!text) return;
        if (text.length >= limitLength)
            return (`${text.substr(0, (limitLength - 1))}${changeFor}`);
        else
            return (text);
    }
})