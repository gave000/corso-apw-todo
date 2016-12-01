var app = angular.module('app1',['lbServices']);

app.controller('app1controller',['$scope','Todo',function($scope,Todo) {
	$scope.todos = [];
	$scope.dones = [];
	$scope.newTodo={
		name:"",
		desc:"",
		important:false
	}
	$scope.aggiungitodo=function(){
		Todo.upsert($scope.newTodo);
		console.log("aggiungo il seguente elemento:");
		console.log($scope.newTodo);
		getTodos();
	}
	$scope.cancellatodo=function(idtodo){
		console.log("cancello il seguente elemento: "+idtodo);
		getTodos();
	}
	$scope.eseguitodo=function(idtodo){
		for(i=0;i<$scope.todos.length;i++){
			if ($scope.todos[i].id==idtodo){
				$scope.todos[i].done=true;
				Todo
				.upsert($scope.todos[i])
				.$promise
				.then(function(results){
					getTodos();
					});
				break;
			}
		}
		console.log("eseguo il seguente elemento: "+idtodo);
	}

	function getTodos() {
		Todo
			.find()
			.$promise
			.then(function(results) {
				$scope.todos = [];
				$scope.dones = [];
				for (i=0;i<results.length;i++){
					if (results[i].done==false) {
						$scope.todos.push(results[i]);
					}else{
						$scope.dones.push(results[i]);
					}
				}
//				$scope.todos = results;
				console.log(results);
			});
	}
	getTodos();
}])

