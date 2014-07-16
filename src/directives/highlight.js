/* global ux, utils */
angular.module('ux').directive('focusHighlight', function (focusManager) {

    function getOffsetRect(elem) {
        // (1) get bounding rect
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        // (2) get scroll offset
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // (3) get position offset
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // (4) calculate offset
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;

        return { top: Math.round(top), left: Math.round(left), width: box.width, height: box.height };
    }

    function updateDisplay(el, activeElement) {
        if (focusManager.canReceiveFocus(activeElement)) {
            var rect = getOffsetRect(activeElement);
            el.style.left = rect.left + "px";
            el.style.top = rect.top + "px";
            el.style.width = rect.width + "px";
            el.style.height = rect.height + "px";
        }
    }

    return {
        scope: true,
        replace: true,
        link: function (scope, element, attrs) {
            var el = element[0];
//                dispatcher.on("focusin", utils.throttle(function(evt) {
//                    updateDisplay(el, evt.newTarget);
//                }), 100);
            document.addEventListener("focus", function (evt) {
                updateDisplay(el, evt.target);
            }, true);
        },
        template: '<div class="focus-highlight"></div>'
    };
})