angular.module('relampago', ['LocalStorageModule'])

.controller("appController", ["$rootScope", function($rootScope){
	var appCtrl = this;

	$rootScope.viewFlag = 1;

}])

.directive('mensagem', ["$rootScope",
  function($rootScope) {
	  return {
	  	restrict: 'E',
	  	link: function($scope){
	  		var socket = io.connect('http://localhost:3000');

	  		$scope.sendMessage = function(){
	  			socket.emit('mensagem', '<strong>' + $rootScope.nome + '</strong>: ' + $scope.mensagem);
	  			$scope.mensagem = '';
	  		}

	  		socket.on('mensagem', function(msg){
		        $('#messages').append($('<li>').html(msg));
		    });
	  	},
	    templateUrl: 'view/mensagem.html'
	  };
	}
])

.directive('login', ["$rootScope",
  function($rootScope) {
	  return {
	  	restrict: 'E',
	  	link: function($scope){

	  		$scope.logar = function(){
	  			$rootScope.nome = $scope.nome;

	  			$rootScope.viewFlag = 2;
	  		}
	  	},
	    templateUrl: 'view/login.html'
	  };
	}
])