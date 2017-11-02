console.log('Java is connected');
var start_button = document.querySelector('.Initiate-rhythm');
start_button.onclick = function () {
    // create the li element (starts emptys)
    console.log('Timer button has been pressed');
    set_timer();

};





//Declaration count-up number I may make it a modulus of 4.  To represent the beat.
//This is where the count will start. it Will will increase this number
var countdown_start = 0;
var countFeedback = document.querySelector('.timer');
countFeedback.innerHTML = countdown_start;
//There has to be an array that have sets of the numbers in which you can play.
var rhythm_check_intervals = [1, 2, 3, 4];  //This will be expanded to be dynamic and progress with the game or iterate through multiple intervals
var correct_check=0;
var user_input_keys =[];
var key_stroke_input=0;
var life = 15;


function set_timer (){
initiate_timer =  setInterval(
      // this anonymous function is our callback
      function () {
          // Increases the count of the number
          //this variable is the major driver of the game and number.
          console.log('Timer is going and activated');
          countdown_start += 0.015;
          countFeedback.innerHTML = countdown_start;

          // stop the "setInterval()" loop when the counter reaches 0
          if (countdown_start >4.03 ) {
              console.log("Time has reseted, good.");

              countFeedback.innerHTML = countdown_start;
               clearInterval(initiate_timer);
              check_rhythm();
//Here is where you reset all values.
      countdown_start=0;
       user_input_keys =[];

            }
      },
      15
    );
}
//Checks the rhythm of the user input and inputs it into an array.
function check_rhythm(){
  if (countdown_start % 4 !== 0){
      if(countdown_start <1 && key_stroke_input<1){
        //Use the filter function
         key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if (countdown_start>1 && countdown_start <2 && key_stroke_input<2){
          key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if (countdown_start>2 && countdown_start <3 && key_stroke_input<3){
          key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if (countdown_start>3 && countdown_start <4 && key_stroke_input<4){
         key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if(countdown_start>4){
        //This is the max value in which you reset key_stroke_input, the timer, and add or take away lives if the player does not
        //does not accomplish the intended rhythm.
         key_stroke_input = 0;
         //Call a filter function that determines whether the values are correct.
        console.log('Reached end');
         user_input_keys.push(countdown_start);
         correct_check = check_rhythm_filter_check(user_input_keys);
        update_lifeDOM();
         if(correct_check<4){
          lose_a_life();
        }

        if (life <0){
              location.href='./end_game.html';
        }

        //!!! Very important part of the program, this will make the program a continous loop
        set_timer();

      }
  }

}


function check_rhythm_filter_check(){

  var correct_hits = user_input_keys.filter(function(each_input){

        return ((each_input >= 1 && (each_input % 1 <=0.25 || each_input % 1 >=0.75) ) ||
          (each_input >=2 &&  (each_input % 2 <=0.25 || each_input % 2 >=0.75)) ||
          (each_input >= 3  && (each_input % 3 <=0.25 || each_input % 3 >=0.75))) && each_input <4;
          });

  console.log(user_input_keys +"Here is the correct ones:"+correct_hits);
  return correct_hits.length;

}

$(document).ready(function () {
    var game_melody_bar = {
        first_position: 0,  // left
        last_postion: 4 // top
    };

    //var speed = 0;  This will be  added later to modulate the speed the rhythm

    $(document).keyup(function () {
        console.log('Receives key input');
        switch (event.keyCode) {
            case 65:  // "a" key
            case 37:  // left arrow

               check_rhythm();
                break;

            case 32:  // spacebar
            case 87:  // "w" key
            case 38:  // up arrow
                check_rhythm();
                break;

            case 68:  // "d" key
            case 39:  // right arrow
                 check_rhythm();
                break;

            case 83:  // "s" key
            case 40:  // down arrow
                check_rhythm();
                break;
        } // switch
    }); // keyup
});



  function lose_a_life(){
  life -= 1;
  update_lifeDOM();
  }

  function update_lifeDOM () {
        $('.lives p').html('Lives: ' + life);

        // Plain DOM version:
        // myP.innerHTML = 'Score: ' + score;

        var myPost = $('.lives');

        // remove the classes "poop", "warm", and "hot"
        myPost.removeClass('life1 life2 life3');

        // add the "poop" class if the score is less than 0
        if (life >=3) {
            myPost.addClass('life3');
        }
        // add the "hot" class if the score is greater than 20
        else if (life===2) {
            myPost.addClass('life2');
        }
        // add the "warm" class if the score is greater than 10
        // (but less than 20)
        else if (life<=1) {
            myPost.addClass('life1');
        }
     // updatePostDom()
} // document ready

//--------------------Canvas Implementation----------------------------------------------//

//Initiatilation of the Canvas object
var canvas = document.querySelector('.diffusion-game');
canvas.width = window.innerWidth - 30;
var ctx = canvas.getContext('2d');


//ctx will be used to draw the arrays.

//Will have objects moving from one part of the screen to the right.

//Each molecule will be declared in an object through a prototyhpe function,
//Each object will have a speed that will be determined by the random context according to temperature.
//Each object will have a sensor, a square area that indicates how many objects are in its location, from the amount of
//objects in its location will affect another variable that positions the objects primarily x -> to the right.

// So there will be (x,y)= random-movement * context-(temperature) * local-area-determination(same molecule) * local-diffusion-events

//if it is closer the object will have a more redish color if it is farther away it will have a more yellowish color.
//You will have 4 types of functions that will map the initial distribution.
// You will use a log function for both x and y,

function Molecule (width, height, color, x, y,context_temp) {
    console.log('Create_molecule1');
    this.width = width;
    this.height = height;
    this.color = color;  //The color turns more reddish if the molecules are densley packed and warm.
    this.x = x; //+ (rate_rand_movement()*context_temp);//Gradient_direction will decrease as determinant_surround decrease.
    this.y = y; //+ (rate_rand_movement()*context_temp);
    this.r_movement= rate_rand_movement;//Will be a constant
    this.temp_movement= context_temp; //This will fluctuate with each game iteration.

}

//get_molecule_color returns a colective function of an additive affect of both temp and determinant_surrond
function get_molecule_color(){


}
function rate_rand_movement(){
 var d = 10-Math.floor(Math.random()*20);
return d;

}




Molecule.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 25, 0, (Math.PI*2));
    ctx.fill();
};

Molecule.prototype.resetIfPassed = function () {
    if (this.x <= -canvas.width) {
        this.x = canvas.width;
    }
    if (this.x >= canvas.width) {
        this.x = canvas.width;
    }
    if (this.y >= canvas.width) {
        this.y = canvas.width;
    }
    if (this.y <= -canvas.width) {
        this.y = canvas.width;
    }

};

// Molecule.prototype.crashWith = function (obj) {
//     return getBottom(this) >= getTop(obj)    &&
//            getTop(this)    <= getBottom(obj) &&
//            getRight(this)  >= getLeft(obj)   &&
//            getLeft(this)   <= getRight(obj);
// };
//
// function getTop(obj) {
//   return obj.y;
// }
//
// function getBottom(obj) {
//   return obj.y + obj.height;
// }
//
// function getLeft(obj) {
//   return obj.x;
// }
//
// function getRight(obj) {
//   return obj.x + obj.width;
// }


var canvas = document.querySelector('.diffusion-game');
canvas.width = window.innerWidth - 30;

var ctx = canvas.getContext('2d');

ctx.fillRect(20, 20, 100, 100);
// var flappyBox = {
//     x: 0,
//     y: 225,
//     width: 50,
//     height: 50,
//     draw: function () {
//         ctx.fillStyle = 'indigo';
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// };


function create_Molecules(number, total_distr_percent, y_x_ratio, temp1){

  for (var i =0; i < number; i++){
    console.log(molecule_diffuse_location(total_distr_percent,y_x_ratio)[1]);
    var temp= new Molecule(50, 50, 'green', molecule_diffuse_location(total_distr_percent,y_x_ratio)[0],molecule_diffuse_location(total_distr_percent,y_x_ratio)[1],temp1);
    myMolecules.push(temp);


  }

}

function molecule_diffuse_location(percent_diffused,y_x_ratio){
//y/x  ratio meaning that diffusion is mostly spread over the y/x ratios.
//So if y_x_ratio is 1.25 it will equal 1.25/addtional spread trough the y-axis

var value=[Math.random()*(canvas.width*percent_diffused*y_x_ratio),Math.random()*(canvas.width*percent_diffused*(1/y_x_ratio))];
return value;

}



var myMolecules= [];
// var myTubes = [
//   new Tube(10, 100, 'green', 30, 0),
//   new Tube(15, 85, 'green', 60, 0),
//   new Tube(10, 50, 'green', 80, 450),
//   new Tube(10, 100, 'tomato', 100, 400),
//   new Tube(30, 200, 'green', 150, 0),
//   new Tube(30, 200, 'green', 150, 300),
//   new Tube(50, 300, 'tomato', 300, 200),
// ];

var initiate_iter=0;
function draw () {


    if (initiate_iter<1){
        create_Molecules(75,0.35,1.25,1);//Num of elements, total distribution x and y, ratio of y/x offset distribtuion
        initiate_iter++;


    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     //myMolecules[0].draw();

    // assume first that the game isn't over
               var isGameOver = false;

    //Test to see if the code works.
    //ctx.fillRect(20, 20, 100, 100);

    // loop over all the tubes to update and draw each one
    myMolecules.forEach(function (oneMolecule) {
        oneMolecule.draw();
        oneMolecule.x += rate_rand_movement();
        oneMolecule.y += rate_rand_movement();


         //Here is where you will update the drawing and modulate x, y, or x and y with positive or negative functions
        //Here is where you will make all of the functions calls to get the molecules or as nomral as possible.
        oneMolecule.resetIfPassed();

        // if any tube crashes with flappy box, GAME OVER!
        // if (oneMolecule.crashWith(flappyBox)) {
        //     isGameOver = true;
        // }
    });

    // only continue to draw things if game isn't over
    if (!isGameOver) {
        requestAnimationFrame(draw);
    }
}

requestAnimationFrame(draw);
