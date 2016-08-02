"use strict";angular.module("demoWebEducWebApp",["ui.router","tmh.dynamicLocale","pascalprecht.translate","angularMoment","angularFileInput","LocalStorageModule"]),angular.module("demoWebEducWebApp").constant("demoWebEducWebAppConfig",{api:{url:"http://localhost:1337"}}),angular.module("demoWebEducWebApp").config(["tmhDynamicLocaleProvider",function(a){a.localeLocationPattern("bower_components/angular-i18n/angular-locale_{{locale}}.js")}]).config(["localStorageServiceProvider",function(a){a.setPrefix("demoWebEducWebApp")}]).config(["$translateProvider",function(a){a.useStaticFilesLoader({files:[{prefix:"languages/",suffix:".json"}]}).registerAvailableLanguageKeys(["en","fr"],{"en*":"en","fr*":"fr"}),a.preferredLanguage("en")}]).run(["$window","tmhDynamicLocale","$translate","amMoment",function(a,b,c,d){var e=a.navigator.userLanguage||a.navigator.language;b.set(e?e.toLowerCase():null),c.use(e),d.changeLocale(e)}]),angular.module("demoWebEducWebApp").config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/home"),a.state("home",{url:"/home",templateUrl:"views/home.html",controller:"HomeCtrl"}).state("app",{"abstract":!0,url:"/app",template:"<ui-view/>"}).state("app.feed",{url:"/feed",templateUrl:"views/app/feed.html",controller:"AppFeedCtrl"}).state("app.loadpic",{url:"/loadpic",templateUrl:"views/app/loadpic.html",controller:"AppLoadpicCtrl"}).state("app.typename",{url:"/typename",templateUrl:"views/app/typename.html",controller:"AppTypenameCtrl"})}]),angular.module("demoWebEducWebApp").controller("HomeCtrl",function(){}),angular.module("demoWebEducWebApp").controller("AppFeedCtrl",["$scope","pictureSrv",function(a,b){a.images=[],a.loading=!0,a.refreshImages=function(){return b.findAll().then(function(b){b=_.sortBy(b,"savedAt"),a.images=b})},a.refreshImages()["finally"](function(){a.loading=!1})}]),angular.module("demoWebEducWebApp").controller("AppLoadpicCtrl",["$scope","pictureSrv","$translate","$window",function(a,b,c,d){a.image=null,a.validate=function(b){a.image=b},a.save=function(a){b.save(a).then(null,function(a){switch(a){case b.errors.tooBig:d.alert(c.instant("page.app.loadpic.errors.pictureTooBig"))}})}}]),angular.module("demoWebEducWebApp").controller("AppTypenameCtrl",function(){}),angular.module("demoWebEducWebApp").service("pictureSrv",["localStorageService","$q",function(a,b){var c={},d="img.";return c.errors={tooBig:1},c.maxSize=5e5,c.save=function(e){var f=b.defer();if(e.size>c.maxSize)return f.reject(c.errors.tooBig),f.promise;e.savedAt=new Date;var g=a.set(d+e.name,e);return g?f.resolve():f.reject(),f.promise},c.findAll=function(){var c=b.defer(),e=_.map(_.filter(a.keys(),function(a){return a.startsWith(d)}),function(b){return a.get(b)});return c.resolve(e),c.promise},c.findById=function(c){var e=b.defer(),f=a.get(d+c);return e.resolve(f),e.promise},c}]),angular.module("demoWebEducWebApp").run(["$templateCache",function(a){a.put("views/app/feed.html",'<div class="panel"> </div> <div class="panel panel-default" ng-repeat="image in images"> <div class="panel-body"> <img ng-src="{{ image ? (\'data:\' + image.mimetype + \';base64,\' + image.content) : \'images/blank-img.c5efe13b.png\' }} "> </div> <div class="panel-footer"><abbr title="{{ image.savedAt | amCalendar }}">{{ image.savedAt | amTimeAgo }}</abbr></div> </div>'),a.put("views/app/loadpic.html",'<!-- <div class="panel panel-default">\n  <div style="width: 200px; height: 200px; line-height: 200px; text-align: center;">\n    <img style="max-width: 200px; max-height: 200px;" ng-src="{{ file ? (\'data:\' + file.mimetype + \';base64,\' + file.content) : \'images/blank-img.c5efe13b.png\' }} " />\n  </div>\n</div> --> <div class="row"> <div class="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1"> <a class="thumbnail"> <img ng-src="{{ image ? (\'data:\' + image.mimetype + \';base64,\' + image.content) : \'images/blank-img.c5efe13b.png\' }} "> </a> </div> </div> <div class="row text-center"> <ng-file-input mode="data-url" callback="validate(file)" accept="image/*" tmpl="\'views/app/loadpic/picfilebutton.html\'"></ng-file-input> <button class="btn btn-danger" ng-disabled="!image" type="button" ng-click="image = null">{{ \'page.app.loadpic.button.clear\' | translate }}</button> <button class="btn btn-primary" ng-disabled="!image" type="button" ng-click="save(image)">{{ \'page.app.loadpic.button.save\' | translate }}</button> </div> <script type="text/ng-template" id="views/app/loadpic/picfilebutton.html"><button class="btn btn-default">{{ \'page.app.loadpic.button.pickpic\' | translate }}</button></script>'),a.put("views/app/typename.html",""),a.put("views/home.html",'<div class="row"> <div class="col-sm-4"> <a href ui-sref="app.typename"> <div class="thumbnail"> <img src> <div class="caption"> <h3>{{ \'page.home.app.typename.title\' | translate }}</h3> </div> </div> </a> </div> <div class="col-sm-4"> <a href ui-sref="app.loadpic"> <div class="thumbnail"> <img src> <div class="caption"> <h3>{{ \'page.home.app.loadpic.title\' | translate }}</h3> </div> </div> </a> </div> <div class="col-sm-4"> <a href ui-sref="app.feed"> <div class="thumbnail"> <img src> <div class="caption"> <h3>{{ \'page.home.app.feed.title\' | translate }}</h3> </div> </div> </a> </div> </div>')}]);