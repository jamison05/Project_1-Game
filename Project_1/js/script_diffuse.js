var start_button = document.querySelector('.Start-game-button');
start_button.onclick = function () {
    // create the li element (starts emptys)
    location.href='./diffusion_game.html';

};

//Declaration count-up number I may make it a modulus of 4.  To represent the beat.
var countdown_start = 0;//This is where the count will start. it Will will increase this number
var countFeedback = document.querySelector('.timer');
//There has to be an array that have sets of the numbers in which you can play.
var rhythm_check_intervals = [1, 2, 3, 4];  //This will be expanded to be dynamic and progress with the game or iterate through multiple intervals
var correct_check=0;
var user_input_keys =[];
var key_stroke_input=0;
var initiate_timer =    setInterval(
      // this anonymous function is our callback
      function () {
          // Increases the count of the number
          //this variable is the major driver of the game and number.
          countdown_start += 0.015;
          countFeedback.innerHTML = countdown_start;

          // stop the "setInterval()" loop when the counter reaches 0
          if (countdown_start % 5 === 0) {
              clearInterval(intervalId);

          }
      },
      15
    );

//Checks the rhythm of the user input and inputs it into an array.
function check_rhythm(){
  if (countdown_start % 4 !== 0){
      if(count_down_start <1 && key_stroke_input<1){
        //Use the filter function
         key_stroke_input++;
         user_input_keys.push(count_down_start);
      }else if (count_down_start>1 && count_down_start <2 && key_stroke_input<2){
          key_stroke_input++;
         user_input_keys.push(count_down_start);
      }else if (count_down_start>2 && count_down_start <3 && key_stroke_input<3){
          key_stroke_input++;
         user_input_keys.push(count_down_start);
      }else if (count_down_start>3 && count_down_start <4 && key_stroke_input<4){
         key_stroke_input++;
         user_input_keys.push(count_down_start);
      }else if(count_down_start>4 && key_stroke_input>=4){
        //This is the max value in which you reset key_stroke_input, the timer, and add or take away lives if the player does not
        //does not accomplish the intended rhythm.
         key_stroke_input = 0;
         //Call a filter function that determines whether the values are correct.
         user_input_keys.push(count_down_start);
         correct_check = check_rhythm_filter_check(user_input_keys);
         if(correct_check<4){
           //Lose lives.
         }
      }
  }

}


function check_rhythm_filter_check(user_input_keys){

  var correct_hits = user_input_keys.filter(function(each_input){

        return (each_input % 1 >=0 && each_input % 1 <=0.25) ||
          (each_input % 2 >=0 && each_input % 2 <=0.25) ||
          (each_input % 3 >=0 && each_input % 3 <=0.25) ||
          (each_input % 4 >=0 && each_input % 4 <=0.25);
          });


  return correct_hits.length();

}

/*$(document).ready(function () {
    $('.Start-game-button').click(function () {
        // $('.wrapper').hide();

        // $('.wrapper').fadeOut(7000);
          // fade out over 7 seconds
        location.href='./foodlist.html';

          // slide up over 7 seconds
    });

});*/


$(document).ready(function () {
    var game_melody_bar = {
        first_position: 0,  // left
        last_postion: 4 // top
    };

    //var speed = 0;  This will be  added later to modulate the speed the rhythm

    $(document).keyup(function () {
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
