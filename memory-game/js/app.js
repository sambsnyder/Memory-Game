/* The following are the global variable declarations used.
 * Following the declartions of the variables are all the functions
 * that make use of the variables.
 */

// array of the cards
let cards = Array.from(document.getElementsByClassName('card'));
// counter for the ammount of moves
let counter = 0;
// array of open cards
let open_cards = [];
// string array of posibble card classes
const classes = ["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o",
"fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf",
"fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"]

// const for the container of the cards
const deck = document.querySelector('.deck');

// star elements
const stars = document.querySelectorAll(".fa-star");
// # of stars to display on modal
let star_num = 0;

// timer variables
let t_seconds = 0, t_minutes = 0;
const time = document.querySelector(".time")
var timer_interval;

// scores for modal_content
const time_score = document.querySelector(".time_score");

// EventListener for the container div "deck" that holds all the cards
deck.addEventListener('click',game);

// on load the game is started
window.onload = start_game();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
  }

/* Uses array1 and array2 to change the classes of each card's firstElementChild
 * Array2 is an array of all the possible classes and array1 is an array of the cards.
 * This functions makes use of the provided shuffle as well as the built-in classList.
 */
function create_cards(array1,array2){
  shuffle(array2);
  let counter = 0;
  for (let card of array1){
    // if there is already a second class remove it
    if(card.firstElementChild.classList){
      card.firstElementChild.classList.remove(...classes);
    }
    card.firstElementChild.classList.add(array2[counter]);
    counter++;
  }
}

// called to start the game on load and reset
function start_game(){
  create_cards(cards,classes);
  counter = 0;
  moves_counter();

  for(let card of cards){
    card.classList.remove('show', 'match','open')
  }
  stars[2].style.visibility = 'visible';
  stars[1].style.visibility = 'visible';
  document.querySelector('.modal').classList.remove('show');

  // reset timer on start of game
  t_seconds = 0;
  t_minutes = 0;
  // start timer on game start
  clearInterval(timer_interval);
  timer();
  // reset star score
  star_num = 0;
}

// Displays the card on click, then adds cards to open_cards
function display_card(event) {
  let current = event.target;
  current.classList.add("show","open");
  // if the card is not already matched add to the open_cards array
  console.log(current.classList.contains("match"));
  if(!current.classList.contains("match")){
    open_cards.push(current);
  }
}

// checks the open_cards array to see if cards matched
function match(array) {
  setTimeout(function() {
  let first = array[0] , second = array[1];
  //debugging console.log(first.firstElementChild.classList[1] == second.firstElementChild.classList[1]);
  if(first.firstElementChild.classList[1] == second.firstElementChild.classList[1]){
    first.classList.add("match");
    second.classList.add("match");
    console.log("Match! Waow :)");
  }else{
    first.classList.remove("show","open");
    second.classList.remove("show","open");
  }
  // call end game after each match to check if all cards are matched
  end_game();
  array.pop();
  array.pop();
}, 700);
}

function game(event){
  display_card(event);
  // increment counter if two cards selected and call match
  if(open_cards.length==2){
    counter++;
    match(open_cards);
    end_game();
  }
  moves_counter();
}

/*
 * Use .textContent to update the "moves" span
 * change ammount of stars based on # of moves
 */
function moves_counter(){
  let moves = document.querySelector('.moves');
  moves.textContent = counter;

  if(counter>11){
    stars[2].style.visibility='hidden';
    star_num = 1;
  }
  if(counter>15){
    stars[1].style.visibility='hidden';
    star_num = 2;
  }
}

/*
 * Starts the timer and adds correct innerHTML
 */
function timer(){
  timer_interval = setInterval(function(){
    time.innerHTML = t_minutes+" : "+t_seconds;
    time_score.innerHTML = t_minutes+" : "+t_seconds;
    t_seconds++;
    if(t_seconds == 60){
      t_seconds = 0;
      t_minutes++;
    }
  },1000);
}

/*
 * Check if the matches ==16 cause then game is over.
 * If game over show modal.
 */
function end_game(){
  let matches = document.getElementsByClassName('match');
  if(matches.length == 16){
    document.querySelector(".modal").classList.add("show");
    clearInterval(timer_interval);
    document.querySelector(".moves_score").innerHTML = counter;
    let star_array = Array.from(document.getElementsByClassName('star_modal'));
    // remove stars from modal based
    for(let i = star_num; i > 0; i--){
      star_array[1].parentNode.removeChild(star_array[i]);
    }
  }
}
