/* global angular, module, utils, moduleName */
module.directive('focusHighlight', function (focusManager) {

    function getOffsetRect(elem) {
        // (1) get bounding rect
        var box = elem.getBoundingClientRect();

        var body = document.body;
        var docElem = document.documentElement;

        // (2) get scroll offset
        //var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        //var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

        // (3) get position offset
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        // (4) calculate offset
        //var top = box.top + scrollTop - clientTop;
        //var left = box.left + scrollLeft - clientLeft;
        var top = box.top - clientTop;
        var left = box.left - clientLeft;

        return { top: Math.round(top), left: Math.round(left), width: box.width, height: box.height };
    }

    var _updateDisplay = function (el, activeElement) {
        var style = el.style;
        if (activeElement && focusManager.canReceiveFocus(activeElement)) {
            var rect = getOffsetRect(activeElement);
            style.display = null;
            style.left = rect.left + 'px';
            style.top = rect.top + 'px';
            style.width = rect.width + 'px';
            style.height = rect.height + 'px';
        } else {
            style.display = 'none';
        }
    };

    var updateDisplay = utils.debounce(_updateDisplay, 10);

    return {
        scope: true,
        replace: true,
        link: function (scope, element, attrs) {
            var timer;
            var el = element[0];
            var targetEl;
            el.style.display = 'none';
            document.addEventListener('focus', function (evt) {
                clearTimeout(timer);
                targetEl = evt.target;
                updateDisplay(el, evt.target);
            }, true);

            document.addEventListener('blur', function (evt) {
                timer = setTimeout(function () {
                    updateDisplay(el);
                });
            }, true);

            var onUpdate = function(){
                _updateDisplay(el, targetEl);
            };

            window.addEventListener('scroll', onUpdate);
            window.addEventListener('resize', onUpdate);
        },
        template: '<div class="focus-highlight"></div>'
    };
});