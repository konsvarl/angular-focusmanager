/* global ux, utils */
angular.module('ux').directive('focusGroup', function (focusManager, focusQuery, focusDispatcher) {

    var groupId = 1, // unique id counter for groups
        elementId = 1, // unique id counter for selectable elements
        dispatcher = focusDispatcher(), // general reference to dispatcher
        delay = 100; // amount of time to delay before performing an action

    /**
     * Compile finds elements within a focus group and assigns them a unique element id
     * and a parent id (which references the group they belong to). If no tab index is
     * defined, then they will assigned a tabindex of -1 to prevent conflicts between
     * the browser's focus manager and this focus manager.
     * @param groupName
     * @param el
     */
    function compile(groupName, el) {
        var els, i, len, elementName;

        els = focusQuery.getElementsWithoutParents(el);
        len = els.length;
        i = 0;
        while (i < len) {
            elementName = elementId;
            focusQuery.setParentId(els[i], groupName);
            focusQuery.setElementId(els[i], elementName);

            var tabIndex = focusQuery.getTabIndex(els[i]);
            if (tabIndex === undefined || tabIndex === null) {
                focusQuery.setTabIndex(els[i], -1); // elements in focus manager should not be tab enabled through browser
            }

            elementId += 1;
            i += 1;
        }

        els = focusQuery.getGroupsWithoutParentGroup(el);
        len = els.length;

        i = 0;
        while (i < len) {
            focusQuery.setParentGroupId(els[i], groupName);
            i += 1;
        }
    }

    function linker(scope, element, attr) {

        var el = element[0];
        var groupName = groupId++;
        var bound = false;
        var cacheHtml = '';
        var newCacheHtml = '';

        function init() {
            scope.$on('focus::' + groupName, function () {
                compile(groupName, el);
                createBrowserEntryPoints();
            });

            if (!focusQuery.getParentGroupId(el)) { // this is an isolate focus group

                cacheHtml = el.innerHTML;

                scope.$watch(utils.debounce(function() {
                    newCacheHtml = el.innerHTML;
                    if (cacheHtml !== newCacheHtml) {
                        var els = el.querySelectorAll('['+focusGroup+']');
                        var i = els.length, groupId;
                        while (i) {
                            i -= 1;
                            groupId = els[i].getAttribute(focusGroupId);
                            scope.$broadcast("focus::" + groupId);
                        }
                        cacheHtml = newCacheHtml;
                    }
                    compile(groupName, el);
                    createBrowserEntryPoints();
                }, delay));

                dispatcher.on('focusin', utils.debounce(function (evt) {
                    // if group contains target then bind keys
                    if (focusQuery.contains(el, evt.newTarget)) {
                        if (bound === false) {
                            bound = true;
                            scope.$broadcast('bindKeys', groupName);
                        }
                    } else {
                        if (bound === true) {
                            bound = false;
                            scope.$broadcast('unbindKeys');
                        }
                    }
                }, delay));
            }
        }

        function createBrowserEntryPoints() {
            focusManager.callback = function (el) {
                focusQuery.setTabIndex(el, 0);
            };
            focusManager.findPrevChildGroup(groupName);
            focusManager.findNextElement(groupName);

            focusManager.callback = null;
        }

        function onFocus() {
            focusManager.enable();
        }

        el.addEventListener('focus', onFocus, true);

        // using timeout to allow all groups to digest before performing ParentGroup check
        setTimeout(init, delay);

        focusQuery.setGroupId(el, groupName);
        compile(groupName, el);
    }

    return {
//        scope: true,
        link: linker
    };

})