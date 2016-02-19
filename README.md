#Focus Manager for AngularJS

#### Version: 0.3.12

###Simple key and mouse navigation in your Angular JS application.
---

**[Download](https://raw.githubusercontent.com/obogo/angular-focusmanager/master/build/angular-focusmanager.js)** (or **[Minified](https://raw.githubusercontent.com/obogo/angular-focusmanager/master/build/angular-focusmanager.min.js)**) **|**
**[Guide](http://obogo.github.io/angular-focusmanager/) |**
**[Help!](http://stackoverflow.com/questions/ask?tags=angularjs,focusmanager)**

---

**Focus Manager for AngularJS** allows you to have complete control over the order in which elements receive focus. Focus Manager provides you with a simple interface and can easily be added to both new and existing projects. Focus Manger is designed to handle the fully constructed UIs in modern web applications (panels, popups, widgets, etc.) Here are some additional benefits to using Focus Manager:


* Simple integration
* ARIA compatible
* Cross-browser support
* No jQuery dependencies
* Small footprint
* Service-based plugin architecture
* Mobile support
* Custom focus highlighter
* Shortcut key support (uses [Mousetrap.js](http://craig.is/killing/mice))

####What's wrong with the browser's focus manager?
---

Have you ever tried navigating through a web application using the TAB key? You have probably found the results to be less than desirable. The browser treats all elements as if it were a single web page, including your application. Angular Focus Manager fixes this limitation of the browser by allowing you to organize your application into ***focus groups***. Focus groups organize elements into sections maintaining the focus index on a more granular level.


##Getting Started
---
**(1)** Get Focus Manager for AngularJS in one of 3 ways:

* Clone this repository
* Download the release (or minified)
* Install via Bower: by running $ bower install angular-focusmanager from your console

**(2)** Include angular-focusmanager.js (or angular-focusmanager.min.js) in your index.html, after including Angular itself

**(3)** Add "fm" to your main module's list of dependencies

When you're done, your setup should look similar to the following:

>
```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min.js"></script>
    <script src="js/angular-focusmanager.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['fm']);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```

####Guide to using Focus Manager
---

The guide is the best way to help you get started using the Focus Manager for AngularJS.

[Click here to view the guide](http://obogo.github.io/angular-focusmanager/)

####Article on "Creating the Focus Manager"
---

Goes over some of the architecture on how the Focus Manager was designed and then implemented.

[Click to read](https://github.com/obogo/angular-focusmanager/wiki/How-the-focus-manager-was-created)
