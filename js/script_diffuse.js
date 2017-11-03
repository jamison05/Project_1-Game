console.log('Java is connected');
var start_button = document.querySelector('.Initiate-rhythm');
start_button.onclick = function () {
    // create the li element (starts emptys)

    if (initiate_iter<1){
        if (myMolecules === null){
        create_Molecules(125,0.5,0.5,game_rhythm_temp_pace[iter_progress]);
      ///Num of elements, total distribution x and y, ratio of y/x offset distribtuion
      }else{
        myMolecules = [];
        create_Molecules(125,0.5,0.5,game_rhythm_temp_pace[iter_progress]);
        countdown_start = 0;

      }

    }
    console.log('Timer button has been pressed');
    set_timer();


};





//Declaration count-up number I may make it a modulus of 4.  To represent the beat.
//This is where the count will start. it Will will increase this number
var countdown_start = 0;
var key_pressed =document.querySelector('.Key-Press');
var arbdiffusion_speed =document.querySelector('.Speed');
var countFeedback = document.querySelector('.timer');
countFeedback.innerHTML = countdown_start;

//There has to be an array that have sets of the numbers in which you can play.
var rhythm_check_intervals = [1, 2, 3, 4];  //This will be expanded to be dynamic and progress with the game or iterate through multiple intervals
var game_rhythm_temp_pace = [0.35,0.45,0.58,0.7,0.8,0.9,1,1.5,1.8];
var game_iteration=0;
var iter_progress=0;
var correct_check=0;
var user_input_keys =[];
var key_stroke_input=0;
var life = 5;
key_pressed.innerHTML=correct_check;
arbdiffusion_speed.innerHTML=game_rhythm_temp_pace[iter_progress];


function set_timer (){
initiate_timer =  setInterval(
      // this anonymous function is our callback
      function () {
          // Increases the count of the number
          //this variable is the major driver of the game and number.

          countdown_start += 0.015*game_rhythm_temp_pace[iter_progress];  //Progresses through the game logic of pace affecting the timer
          countFeedback.innerHTML = Math.floor((countdown_start)*1000) + " "+ "milliseconds";

          // stop the "setInterval()" loop when the counter reaches 0
          if (countdown_start >4.03 ) {
              console.log("Time has reseted, good.");

              countFeedback.innerHTML = (Math.floor(countdown_start)*1000) + " "+ "milliseconds";
               clearInterval(initiate_timer);
               check_rhythm();
               key_pressed.innerHTML="Correct number: "+correct_check +" Total Number: " + user_input_keys.length;
               arbdiffusion_speed.innerHTML="Speed is: "+game_rhythm_temp_pace[iter_progress];
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
      if(countdown_start <1 && key_stroke_input<=1){  //I had to lax the key_stroke_input where user can make a few mistakes getting the rhytm of the game.
        //Use the filter function
         key_stroke_input++;
         user_input_keys.push(countdown_start);

      }else if (countdown_start>1 && countdown_start <2 && key_stroke_input<=2){
          key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if (countdown_start>2 && countdown_start <3 && key_stroke_input<=3){
          key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if (countdown_start>3 && countdown_start <4 && key_stroke_input<=4){
         key_stroke_input++;
         user_input_keys.push(countdown_start);
      }else if(countdown_start>4){
        //This is the max value in which you reset key_stroke_input, the timer, and add or take away lives if the player does not
        //does not accomplish the intended rhythm.
         key_stroke_input = 0;
         //Call a filter function that determines whether the values are correct.
         document.getElementById('sound1').play();
         user_input_keys.push(countdown_start);
         correct_check = check_rhythm_filter_check(user_input_keys);

         //Here is the main code that drives the rhythm of the game, the iter_progress is connected both to the timing and the diffusion
         //However the timer is the driver.
         game_iteration++;
         iter_progress++;
         if (iter_progress>=game_rhythm_temp_pace.length-1){
           iter_progress =0;
         }
         //
         update_lifeDOM();
         if(correct_check<3){
          lose_a_life();
        }

        if (life <0){
              game_status=-1;
              location.href='./game_results_lose.html';
        }
        if (life <0){
              game_status=-1;
              location.href='./game_results_lose.html';
        }
        if (game_iteration >20){

            location.href='./game_results_win.html';
        }
        //!!! Very important part of the program, this will make the program a continous loop
        set_timer();

      }
  }

}

var game_status=0;  //Determines whether 1 is you win the game -1 is when you lose the game.

function check_rhythm_filter_check(){

  var correct_hits = user_input_keys.filter(function(each_input){

        return ((each_input < 1 && (each_input <=0.2 || each_input >=0.8) )||
          (each_input >= 1 && (each_input % 1 <=0.2 || each_input % 1 >=0.8) ) ||
          (each_input >=2 &&  (each_input % 2 <=0.2 || each_input % 2 >=0.8)) ||
          (each_input >= 3  && (each_input % 3 <=0.2 || each_input % 3 >=0.8))) && each_input <4;
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
                  key_pressed.innerHTML="Correct number: "+correct_check +" Total Number: " + user_input_keys.length;
       document.getElementById('drum_bass').play();
                break;

            case 32:  // spacebar
            case 87:  // "w" key
              document.getElementById('drum_snare').play();
                check_rhythm();
                key_pressed.innerHTML="Correct number: "+correct_check +" Total Number: " + user_input_keys.length;
                break;

            case 68:  // "d" key
             document.getElementById('drum_bass').play();
                 check_rhythm();
                key_pressed.innerHTML="Correct number: "+correct_check +" Total Number: " + user_input_keys.length;
                break;

            case 83:  // "s" key
                document.getElementById('drum_snare').play();
                check_rhythm();
                   key_pressed.innerHTML="Correct number: "+correct_check +" Total Number: " + user_input_keys.length;
                break;
        } // switch
    }); // keyup
});



  function lose_a_life(){
  life -= 1;
  update_lifeDOM();
  }
//Code that updates the live elements visually,
  function update_lifeDOM () {
        $('.lives p').html('Lives: ' + life);
        var myPost = $('.lives');
        myPost.removeClass('life1 life2 life3');
        if (life >=3) {
            myPost.addClass('life3');
        }
        else if (life===2) {
            myPost.addClass('life2');
        }
        else if (life<=1) {
            myPost.addClass('life1');
        }

}

//--------------------Canvas Implementation----------------------------------------------//

//Initiatilation of the Canvas object
var canvas = document.querySelector('.diffusion-game');
canvas.width = window.innerWidth - 30;
var ctx = canvas.getContext('2d');
ctx.globalAlpha = 0.35;

//ctx will be used to draw the arrays.

//Will have objects moving from one part of the screen to the right.

//Each molecule will be declared in an object through a prototyhpe function,
//Each object will have a speed that will be determined by the random context according to temperature.
//(Maybe)Each object will have a sensor, a square area that indicates how many objects are in its location, from the amount of
//(Maybe)objects in its location will affect another variable that positions the objects primarily x -> to the right.

// So there will be (x,y)= random-movement * context-(temperature)

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
 var d=0;
var random_selector = Math.random()*10;
if (random_selector<=5){
  d = Math.floor(Math.random()*20);
}else{
d = -1*(Math.floor(Math.random()*20));

}
return d;

}




Molecule.prototype.draw = function () {
        //  ctx.fillStyle = 'hsl(' + (75*game_rhythm_temp_pace[iter_progress]) + ', 100%, 70%)';
                          //'rgba('+(75*game_rhythm_temp_pace[iter_progress])+', 0,'+ (250-(75*game_rhythm_temp_pace[iter_progress]))+', 0.2)'

            //  ctx.fillStyle = 'rgba(8, 0,222, 0.2)';
        //ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
        //  ctx.beginPath();
          //ctx.arc(this.x, this.y, 25, 0, (Math.PI*2));


          //ctx.fill();

                    //'rgba('+(75*game_rhythm_temp_pace[iter_progress])+', 0,'+ (250-(75*game_rhythm_temp_pace[iter_progress]))+', 0.2)'
//[0.35,0.45,0.58,0.7,0.8,0.9,1,1.5,1.8];
switch (iter_progress){
case 0:
ctx.fillStyle = 'rgba(8, 0,222, 0.35)';
break;
case 1:
ctx.fillStyle = 'rgba(35, 0,222, 0.35)';
break;
case 2:
ctx.fillStyle = 'rgba(70, 0,222, 0.35)';
break;
case 3:
ctx.fillStyle = 'rgba(100, 0,222, 0.35)';
break;
case 4:
ctx.fillStyle = 'rgba(145, 0,222, 0.35)';
break;
case 5:
ctx.fillStyle = 'rgba(170, 0,222, 0.35)';
break;
case 6:
ctx.fillStyle = 'rgba(210, 0,222, 0.35)';
break;
case 7:
ctx.fillStyle = 'rgba(250, 0,222, 0.35)';
break;
case 8:
ctx.fillStyle = 'rgba(250, 0,75, 0.35)';
break;
default:
ctx.fillStyle = 'rgba(8, 0,222, 0.35)';
break;
}



  //ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 20, 0, (Math.PI*2));
     ctx.fill();
};

Molecule.prototype.reset_molecule_position = function () {
var random_selector = Math.floor((Math.random *4));

    if (this.x <= -canvas.width) {
      if (random_selector <= 5){
        this.x = Math.random()* canvas.width;
      }else{
        this.x = canvas.width;
        //this.x=0;
      }
    }
    if (this.x >= canvas.width) {
  if (random_selector <=5){
        this.x = Math.random()* canvas.width;
      }else{
          this.x = -canvas.width;
          //this.x=0;
      }
    }
if (this.y >= canvas.height) {
  if (random_selector <= 5){
        this.y = Math.random()* canvas.height;
    }else{
        this.y = -canvas.height;}
        //this.y=0;
    }
    if (this.y <= -canvas.height) {
      if (random_selector <= 5){
        this.y = Math.random()* canvas.height;
      }else{
          this.y = canvas.height;
          //this.y =0;
      }
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

function create_Molecules(number, total_distr_percent, y_x_ratio, temp1){

  for (var i =0; i < number; i++){
    console.log(molecule_diffuse_location(total_distr_percent,y_x_ratio)[1]);

    var temp= new Molecule(50, 50,'green', molecule_diffuse_location(total_distr_percent,y_x_ratio)[0],molecule_diffuse_location(total_distr_percent,y_x_ratio)[1],temp1);
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

var initiate_iter=0;
function draw () {



    ctx.clearRect(0, 0, canvas.width, canvas.height);

     //myMolecules[0].draw();

    // assume first that the game isn't over
               var isGameOver = false;

    //Test to see if the code works.
    //ctx.fillRect(20, 20, 100, 100);

    // loop over all the tubes to update and draw each one
    myMolecules.forEach(function (oneMolecule) {
        oneMolecule.draw();



         //Here is where you will update the drawing and modulate x, y, or x and y with positive or negative functions
        //Here is where you will make all of the functions calls to get the molecules or as nomral as possible.

         var random_select= Math.floor(Math.random(2));
        //!!!!Here is the main connection to the timing part and the canvas diffusion.
        oneMolecule.temp_movement= game_rhythm_temp_pace[iter_progress];

        oneMolecule.reset_molecule_position();

        oneMolecule.x += (rate_rand_movement()*oneMolecule.temp_movement);  //This modulates the motion based on  temperature !!! very important for controllin the game.
        oneMolecule.y += (rate_rand_movement()*oneMolecule.temp_movement);



    });

    // only continue to draw things if game isn't over
    if (!isGameOver) {
        requestAnimationFrame(draw);
    }
}

requestAnimationFrame(draw);
