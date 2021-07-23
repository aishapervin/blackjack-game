let blackjackGame = {
    'you': {'scorespan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer': {'scorespan' : '#dealer-blackjack-result','div':'#dealer-box','score':0},
     'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
     'cardsmap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
     'wins':0,
     'losses':0,
     'draws':0,
     'isstand':false,
     'turnover':false,


    };

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const winSound=new Audio('sounds/soundss/cash.mp3');
const lostSound=new Audio('sounds/soundss/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerlogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackdeal);

function blackjackHit() {
    if(blackjackGame['isstand']===false)
    {let card=randomcard();
    showcard(card,YOU);
    updatescore(card,YOU);
    showscore(YOU);
    }

}
function randomcard()
{
    let randomindex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomindex];
}

function showcard(card,activeplayer) {
    if(activeplayer['score']<=21)
    {let cardImage = document.createElement('img');
    cardImage.src=`images/imagess/${card}.png`;
    
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    }
}
function blackjackdeal()
{
if(blackjackGame['turnover']===true){

blackjackGame['isstand']=false;


    let yourImages=document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');
   
    for(let i=0;i<yourImages.length;i++)
   {yourImages[i].remove();}

   for(let i=0;i<dealerImages.length;i++)
   {dealerImages[i].remove();

}
YOU['score']=0;
DEALER['score']=0;
document.querySelector('#your-blackjack-result').textContent=0;
document.querySelector('#dealer-blackjack-result').textContent=0;
document.querySelector('#your-blackjack-result').style.color='#ffffff';
document.querySelector('#dealer-blackjack-result').style.color='#ffffff';

document.querySelector('#blackjack-result').textContent="Lets play!";
document.querySelector('#blackjack-result').style.color='black';

blackjackGame['turnover']=true;
}
}



function updatescore(card,activeplayer){
    if(card==='A')
    {
    if(activeplayer['score']+blackjackGame['cardsmap'][card][1]<=21){
activeplayer['score']+=blackjackGame['cardsmap'][card][1];}
else {
activeplayer['score']+=blackjackGame['cardsmap'][card][0];
}
    }
    else{
activeplayer['score']+=blackjackGame['cardsmap'][card];}

}
function showscore(activeplayer){
    if(activeplayer['score']>21){
        document.querySelector(activeplayer['scorespan']).textContent="BUST!";
        document.querySelector(activeplayer['scorespan']).style.color='red';
    }else{
    document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
}}
function sleep(ms)
{
    return new Promise(resolve=>setTimeout(resolve,ms));
}

 async function dealerlogic(){
    blackjackGame['isstand']=true;
    while(DEALER['score']<16 && blackjackGame['isstand']===true)
    {
    let card=randomcard();
    showcard(card,DEALER);
    updatescore(card,DEALER);
    showscore(DEALER);
    await sleep(1000);
    }

    
        blackjackGame['turnover']=true;
        let winner=computewinner();
        showresult(winner);
    
   
    
    

}
function computewinner(){
    let winner;
    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21))
        {
            blackjackGame['wins']++;
            winner=YOU;

        }
        else if(YOU['score']<DEALER['score'])
        {
               winner=DEALER;
               blackjackGame['losses']++;
        }
        else if(YOU['score']==DEALER['score'])
        {
            blackjackGame['draws']++;
        }
    }
    else if(YOU['score'] >21  && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21)
    {
        blackjackGame['draws']++;
    }
    console.log("winner is",winner);
return winner;
}



function showresult(winner){
let message,messageColor;

if(blackjackGame['turnover']===true)
{

if(winner===YOU)
{ document.querySelector('#wins').textContent=blackjackGame['wins'];
    message="you won";
    messageColor='green';
    winSound.play();
}

else if(winner===DEALER)
{
    document.querySelector('#losses').textContent=blackjackGame['losses'];
    message="you lost";
    messageColor='red';
    lostSound.play();
}
else
{
    document.querySelector('#draws').textContent=blackjackGame['draws'];
    message="you drew";
    messageColor='black';
    
}
document.querySelector('#blackjack-result').textContent=message;
document.querySelector('#blackjack-result').style.color=messageColor;
}  
}
