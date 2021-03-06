// "use strict";

var WhatsAppDesktop = angular.module("WhatsAppDesktop", [
  "ngRoute",
  "ui.router",
  "ngMaterial",
  "ngCookies",
  "ngMdIcons",
  "ngStorage",
  "hyperContentFor"
]);

var config = function($routeProvider, $stateProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
  $routeProvider
    .when("/", {
      controller: "ChatsController",
      templateUrl:  "ng-app/chats/chats.html"
    })
    .when("/login", {
      controller: "LoginController",
      templateUrl: "ng-app/login/login.html"
    })
    .otherwise("/")

  $mdThemingProvider.theme("docs-dark", "default")
    .primaryPalette('yellow')
    .dark();
};

WhatsAppDesktop.config(config);

WhatsAppDesktop.run(function($rootScope, $location, $localStorage, LoginService, WhatsAppService) {

  // check is logged in? if not redirect to login page;
  if (! WhatsAppService.isLoggedIn()) {
    if ($localStorage.whatsappInfo !== undefined) {
      LoginService.login($localStorage.whatsappInfo);
    }

    $location.path("/login");
  }
})

WhatsAppDesktop.constant("SERVICE_EVENTS", {
  loginSucess: "login-sucess",
  loginFailure: "login-faulure",
})
