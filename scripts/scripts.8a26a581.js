"use strict";angular.module("demoWebEducWebApp",["ngRoute","tmh.dynamicLocale","pascalprecht.translate","angularMoment"]),angular.module("demoWebEducWebApp").constant("demoWebEducWebAppConfig",{api:{url:"http://localhost:1337"}}),angular.module("demoWebEducWebApp").config(["tmhDynamicLocaleProvider",function(a){a.localeLocationPattern("bower_components/angular-i18n/angular-locale_{{locale}}.js")}]).config(["$translateProvider",function(a){a.useStaticFilesLoader({files:[{prefix:"languages/",suffix:".json"}]}).registerAvailableLanguageKeys(["en","fr"],{"en*":"en","fr*":"fr"}),a.preferredLanguage("en")}]).run(["$window","tmhDynamicLocale","$translate","amMoment",function(a,b,c,d){var e=a.navigator.userLanguage||a.navigator.language;b.set(e?e.toLowerCase():null),c.use(e),d.changeLocale(e)}]),angular.module("demoWebEducWebApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("demoWebEducWebApp").controller("MainCtrl",function(){}),angular.module("demoWebEducWebApp").run(["$templateCache",function(a){a.put("views/main.html","")}]);