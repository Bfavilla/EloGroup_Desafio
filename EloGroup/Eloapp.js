var EloApp = angular.module('EloApp', ['ngRoute', 'ngMessages', 'ngDragDrop']);

EloApp.config(function ($routeProvider,$locationProvider){


    $routeProvider

    .when('/', {
        templateUrl: 'pages/Main.html',
        controller: 'mainController'
    })

    .when('/login',{
        templateUrl: 'pages/login.html',
        controller: 'secondController'
    })    

    .when('/tabela', {
        templateUrl: 'pages/Tabela.html',
        controller: 'tableController'
    })

});

EloApp.service('signinService', function(){
    this.h43="sim";
    this.usuario = {
        username:'',
        senha1:'',
        senha2:'',

    }
   
});

EloApp.service('leadService', function(){
    this.h43="sim";
    this.leads = [
        {
            nome:'loja abc',
            email:'comercial.lojaabc@gmail.com',
            fone:'98765-4321',
        }, 
        {
            nome:'loja doe',
            email:'comercial.doe@gmail.com',
            fone:'91234-5678',
        }, 
        {
            nome:'loja cba',
            email:'comercial.lojascba@gmail.com',
            fone:'91872-3654',
        }, 

    ]
});


EloApp.controller('mainController', ['$scope', 'signinService', function($scope, signinService) {
    $scope.h43 = signinService.h43;
    $scope.username = signinService.usuario.username;
    $scope.$watch('username', function(){
        signinService.usuario.username = $scope.username;
    });

    $scope.senha1 = signinService.usuario.senha1;
    $scope.$watch('senha1', function(){
        signinService.usuario.senha1 = $scope.senha1;
    });

    $scope.senha2 = signinService.usuario.senha2;
    $scope.$watch('senha2', function(){
        signinService.usuario.senha2 = $scope.senha2;
    });
    
    $scope.cadastroFeito = function () {
        if ($scope.senha2 ===""){
            alert("Por Favor criar uma senha")
        }
        else {
        alert("Cadastro feito com sucsess");
        }
    }
 
}]);

EloApp.controller('secondController', ['$scope', 'signinService', function($scope, signinService) {

    $scope.username = signinService.usuario.username;
    $scope.senha1 = signinService.usuario.senha1;
    $scope.loginFeito = function () {
        if ($scope.logName !== $scope.username && $scope.logName !== "" || $scope.senha1 !== $scope.logSenha && $scope.logSenha !== ""){
            alert("Usuário ou Senha Incorreto")
        }
        else {
            alert("Login feito com sucsess");
        }
    }


}]);

EloApp.controller('tableController', ["$scope", '$q', 'leadService', function($scope,$q,leadService) {
    
    $scope.leads = leadService.leads;
    $scope.$watch('leads', function(){
        leadsService.leads = $scope.leads;
    })
      
    $scope.addText = function(text) {
        $scope.leads.push(text);
    }

    $scope.form = {
        nome: '',
        email: '',
        fone: '',
    };

    $scope.deucerto = function() {
       alert("Lead Criado com sucesso!")
    };

    $scope.forminvalido = function() {
        alert("Um mais campo(s) estao vazios!")
    };

    $scope.list1 = [ ];
    $scope.list2 = [ ];
    $scope.list3 = [ ];


    $scope.beforeDrop = function() {
      var deferred = $q.defer();
      if (confirm('Are you sure???')) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };
}]);



EloApp.directive("tabelaLead", function(){
    return {
        restrict:'AE',
        templateUrl: "directives/tabelaLead.html",
        replace: true,
        scope: {
            leadObject: "="
        }
    }
})