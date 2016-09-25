var app = angular.module('tictactoe', ['ngAnimate']);
  app.controller('appCtrl', function($scope) {

	$scope.reloadPage = function() {
	  location.reload();
	};	
	
	$scope.dimensions = [1,2,3];
	$scope.choices = ["topLeft","topMid","topRight","cenLeft","cenMid","cenRight","lowLeft","lowMid","lowRight"];
	$scope.matchResult = false;

	$scope.board = { 
		 topLeft: ['3-0', ''], topMid: ['3-1', ''],	topRight: ['3-2', ''],
		 cenLeft: ['4-0', ''], cenMid: ['4-1', ''],	cenRight: ['4-2', ''],
		 lowLeft: ['5-0', ''], lowMid: ['5-1', ''],	lowRight: ['5-2', ''],
	};

	$scope.checkLine = function(one, two, three) {
	  if ( (one[1] == two[1]) && (two[1] == three[1]) && (one[1] != '') ) {
		if (one[1] == 'x') {
		  color = 'lightgreen';
		  message = 'You won! Congratulations!'
		}
		else {
		  color = '#FF5959';
		  message = 'You lost! Good luck next time.'
		}
		$scope.message = message;
		$scope.matchResult = true;
		document.getElementById("field").style.pointerEvents = 'none';
		for (i=0;i<3;i++) {
		  document.getElementById(arguments[i][0]).style.backgroundColor = color;
		}
		document.getElementById("popup").style.backgroundColor = color;
	  }
	};

	$scope.checkGrid = function(grid) {
	  $scope.checkLine(grid.topLeft, grid.topMid, grid.topRight);
	  $scope.checkLine(grid.cenLeft, grid.cenMid, grid.cenRight);
	  $scope.checkLine(grid.lowLeft, grid.lowMid, grid.lowRight);
	  $scope.checkLine(grid.topLeft, grid.cenLeft, grid.lowLeft);
	  $scope.checkLine(grid.topMid, grid.cenMid, grid.lowMid);
	  $scope.checkLine(grid.topRight, grid.cenRight, grid.lowRight);
	  $scope.checkLine(grid.topLeft, grid.cenMid, grid.lowRight);
	  $scope.checkLine(grid.topRight, grid.cenMid, grid.lowLeft);
	  if ( ( $scope.matchResult == false ) && ( $scope.choices[0] == null  ) ) { 
		$scope.message = "It's a draw! Try again. "
		$scope.matchResult = true;
		document.getElementById("popup").style.backgroundColor = '#F7FC59';
	  }
	};

	$scope.putMark = function(id) {

	  $scope.checkGrid($scope.board);

	  for (var element in $scope.board) {
		if ( ($scope.board[element][0] == id) && ($scope.board[element][1] == '') )  {
	      document.getElementById(id).innerHTML='X';
		  document.getElementById(id).style.pointerEvents = 'none';
		  $scope.board[element][1] = 'x';
		  $scope.choices.splice($scope.choices.indexOf(element),1);
		}
	  };

	  $scope.checkGrid($scope.board);

	  i = $scope.choices[Math.floor(Math.random() * $scope.choices.length)]; //AI chooses random cell from available ones

	  if ( ($scope.board[i][1] === '') && (document.getElementById($scope.board[i][0]).innerHTML != "O") )  {
	    document.getElementById($scope.board[i][0]).innerHTML='O';
		document.getElementById($scope.board[i][0]).style.pointerEvents = 'none';
	    $scope.board[i][1] = 'o';
		$scope.choices.splice($scope.choices.indexOf(i),1);
	  };

	  $scope.checkGrid($scope.board);
	
	};
	
  });