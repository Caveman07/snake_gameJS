$(document).ready(function() {
		createGrid(40, "400px");
    var snake = createsnake([20,20]);
    var mainLoopId, foodLoop;
    var Food = {};
    var Storedfood = {};
    printSnake();
    /*$("#newGame").click(function(resetGame()));*/
    $("#startgame").click(function() {
								gameStart(300);
                foodStart(6000);

		});

    $(this).keydown(function(e) {
        if(e.keyCode == 37) {
        		snake.direction = "l";
        }
        else if(e.keyCode == 38) {
        		snake.direction = "u";
        }
        else if(e.keyCode == 39) {
        		snake.direction = "r";
        }
        else if(e.keyCode == 40) {
        		snake.direction = "d";
        }
     });

});

function createGrid(numSquaresOnSide, gridPixelSize) {

			var numOfRaws = numSquaresOnSide;
      var numOfCellsInRaw = numSquaresOnSide;

      var gridWidth = gridPixelSize;
      $(".grid").css("width", gridWidth);
      var gridHeight = parseFloat($(".grid").css("width")) + 'px';
      $(".grid").css("height", function() {
      						return parseFloat($(".grid").css("width"))+"px";
      });
       //$(".grid").css("border", "2px solid black");

			var cellSide = parseFloat($(".grid").css("width"))/ numSquaresOnSide-2+"px";

			for(i=0, num = numSquaresOnSide*numSquaresOnSide; i < num; i++) {
      			$(".grid").append("<div class = 'cell' id ="+ (i+1) +" ></div>");

      };


      $('.cell').css("width", cellSide);
      $('.cell').css("height", cellSide);
      $('.cell').css("float", "left");
      $('.cell').css("border", "1px solid black");

};

function printcell(position,color) {
				if (position[0] >= 0 && position[0] < 40 && position[1] >= 0 && position[1] < 40) {
				var cellid = 40 * position[1] + position[0] + 1;
        cell = $('#' + cellid).addClass(color);
        }
};

function createsnake(initialpos) {
				snake = {
        		initialPos: initialpos,
            direction: "r",
            currentSnake: [initialpos]
        };
        return snake;
};

function foodStart(level) {
				//console.log(food);
        foodLoop = setInterval(function() {
							createfood();
              printcell(Food.currentfield,"food");
              console.log(Food.currentfield);
        }, level);

};

function gameStart(level) {
				// To start the loop
        //console.log(createfood());
        mainLoopId = setInterval(function(){
            if (checkgameover() == true) {
            		clearInterval(mainLoopId);
                clearInterval(foodLoop);
                alert("Game is over");
            }
            else {
                move();
                //eatingFood();
            };
        }, level);
        $("#stopgame").click(function() {
        			clearInterval(mainLoopId);
              clearInterval(foodLoop);
        });
};

function move() {

    if (snake.currentSnake.length > 1) {
    		for (var i = snake.currentSnake.length-1; i > 0; i-- ) {
        		deleteCell(snake.currentSnake[snake.currentSnake.length-1], "head");
            snake.currentSnake[i] = snake.currentSnake[i-1];

            //console.log(snake.currentSnake);

        }
    };


   //gettinglonger();
   movingFirst();
   //eatingfood();
   printSnake();
   //eatingfood();
   //console.log(snake.currentSnake);
   //console.log(storedfood);


};

function checkgameover() {
		if (snake.currentSnake[0][0] >= 0 && snake.currentSnake[0][0] < 40 && snake.currentSnake[0][1] >= 0 && snake.currentSnake[0][1] < 40) {
    return false;
    }
    else if ($.inArray(snake.currentSnake[0], snake.currentSnake, [1] == -1)) {
    return false;
    }
    else {
        return true;
    }

};

function movingFirst() {
				//printSnake();
				deleteCell(snake.currentSnake[0], "head");

        if (snake.direction == "r") {
        snake.currentSnake[0] = [snake.currentSnake[0][0]+1,snake.currentSnake[0][1]];
        }
        else if (snake.direction == "u") {
        snake.currentSnake[0] = [snake.currentSnake[0][0],snake.currentSnake[0][1]-1];
        }
        else if (snake.direction == "d") {
        snake.currentSnake[0] = [snake.currentSnake[0][0],snake.currentSnake[0][1]+1];
        }
        else if (snake.direction == "l") {
        snake.currentSnake[0] = [snake.currentSnake[0][0]-1,snake.currentSnake[0][1]];
        };
        eatingFood();
        //console.log(storedfood);
        //gettinglonger();
};

function printSnake() {
		for(var i = 0; i < snake.currentSnake.length; i++) {
    		printcell(snake.currentSnake[i], "head");
    }
};

function deleteCell(position,color) {
      var cellid = 40 * position[1] + position[0] + 1;
      cell = $('#' + cellid).removeClass(color);
};

function createfood() {
			/*if (food.length) {
			deleteCell(food[0],"food");
      };*/
			Food.currentfield = [1,1];
      console.log(Food.currentfield);
      //printcell(food[0], "food");
};

function randomfield() {
			return [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
};

function eatingFood() {

        console.log("Food.currentfield");

				/*if (snake.currentSnake[0] == food) {
        		console.log(pos);
        		deleteCell(food,"food");
           	storedfood.push(snake.currentSnake[snake.currentSnake.length-1]);
        }
        else {
        storedfood.length = 0
        };*/
};

/*function gettinglonger() {
				if (storedfood.length) {
        		snake.currentSnake.push(storedfood);
            storedfood.length = 0;
        };
};*/
