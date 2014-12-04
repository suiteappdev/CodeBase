angular.module('configurationModule', [])
       .constant('$myConfiguration', {
           backend : 'http://gec-armitage1989.c9.io/',
           appName:'RtrAbogados',
           description : 'aplicación para la gestión de asesorias legales',
           author : 'suiteapp.net',
           ide : 'Cloud9',
           mode:'developer', //production,
           version:'0.0.1'
       })