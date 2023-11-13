var suits = ["S", "D", "C", "H"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const pdeck = [];
var suit;
var value;
var pcard;
var pscore = 0;
var cscore = 0;
var hit_counter = '0';
var hcs = 0;
var image;
var num = 0;
var ccard;
var pBust = false;
var cBust = false;
var usedcards;
// usedcards;

var hitbtn = document.getElementById('hitbtn');
var scoretxt = document.getElementById('pscore');
var cscoretxt = document.getElementById('cscore');
var staybtn = document.getElementById('staybtn');
//game//

 for (suit in suits) {
   for (value in values) {
     pdeck.push(`imgs/${values[value]}${suits[suit]}.png`)
     }
 }

setregcard();


hitbtn.addEventListener('click', hbutton, false);
staybtn.addEventListener('click', sbutton, false);
hitbtn.addEventListener('click', rbutton, false);

//game//

function rbutton(){
  location.href("index.html");
}

function hbutton(){
  hcs = hcs + 1;
  hit_counter = hcs.toString();
  getCard();
  changeCard();
}

function sbutton(){
  hitbtn.removeEventListener('click', hbutton);
  staybtn.removeEventListener('click', sbutton);

  cGetcard();
}

function p_score(){
  if (num == 'K' || num == 'Q' || num == 'J'){
    num = 10;
  }
  else if (num == 'A'){
    num = 11;
  }
}

function setregcard(){
  getCard();
  image = document.getElementById('reg')
  image.src = pcard
}

function getCard() {
  pcard = pdeck[Math.floor(Math.random() * pdeck.length)];
  usedcards = pdeck.indexOf(pcard);

  if (usedcards > -1) {
    pdeck.splice(usedcards, 1)
  }
  console.log(pcard + " " + pcard.length);
  
  if (pcard.length < 12){
   num = pcard.substring(5, 6);
  }

  else if (pcard.length >= 12){
    num = pcard.substring(5, 7);
  }

   p_score();
   num = parseInt(num, 10);
   if (hcs == 0){
     pscore = num;
     scoretxt.innerHTML = 'Player: ' + pscore;

   }
   else if (hcs > 0){
     pscore = pscore + num;
     scoretxt.innerHTML = 'Player: ' + pscore;
     console.log(pscore);
   }

   checkValue();
}

function changeCard(){
  if(hit_counter == '1'){
    image = document.getElementById('1');
    image.src = pcard;
  }

  else if(hit_counter == '2'){
    image = document.getElementById('2');
    image.src = pcard;
  }

  else if(hit_counter == '3'){
    image = document.getElementById('3');
    image.src = pcard;
  }

  else if(hit_counter == '4'){
    image = document.getElementById('4');
    image.src = pcard;
  }
}

function changeCardc(){

    image = document.getElementById('1');
    image.src = ccard;

}

function checkValue(){
  if (pscore > 21){
    scoretxt.innerHTML = 'Player: Bust';
    hitbtn.removeEventListener('click', hbutton);
    staybtn.removeEventListener('click', sbutton);
    pBust = true;
    cGetcard();
  }
}

function checkValuec(){
  if (cscore > 21){
    cscoretxt.innerHTML = 'Dealer: Bust';
    cBust = true;
  }
}

function setcCard(){
  ccard = pdeck[Math.floor(Math.random() * pdeck.length)];
  usedcards = pdeck.indexOf(ccard);
  image = document.getElementById(i.toString() + 'd');
  image.src = ccard;

  if (usedcards > -1) {
    pdeck.splice(usedcards, 1)
  }

  if (ccard.length < 12){
    num = ccard.substring(5, 6);
  }

  else if (ccard.length > 12){
    num = ccard.substring(5, 7);
  }

  p_score();
  num = parseInt(num, 10);

  cscore = cscore + num;

  checkValuec();
}

function cGetcard(){
  for (i = 1; i < 3; i++){
    setcCard();
  }

  if (cscore < 18){
    setcCard();
  }

  cscoretxt.innerHTML = 'Dealer: ' + cscore;

  checkValuec();
  outcome();
}

function outcome(){
  if (cscore > pscore && cscore <= 21 || pBust == true){
    cscoretxt.innerHTML = 'Dealer: Wins with ' + cscore;
  }
  else if (cscore < pscore && pscore < 22 || pBust == false && cBust == true){
    scoretxt.innerHTML = 'Player: Wins with ' + pscore;
  }
  else if (cscore == pscore){
    cscoretxt.innerHTML = 'Dealer: Ties with ' + cscore;
    scoretxt.innerHTML = 'Player: Ties with ' + pscore;
  }
}
