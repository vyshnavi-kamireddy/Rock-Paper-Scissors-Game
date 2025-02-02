let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};
let id;
let isplay=false;
document.querySelector('.score').innerText=`Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;

let confirmbutton;


document.querySelector('.rock').addEventListener('click',()=>{
    game('rock');
});
document.querySelector('.paper').addEventListener('click',()=>{
    game('paper');
});
document.querySelector('.scissors').addEventListener('click',()=>{
    game('scissors');
});
document.querySelector('.reset').addEventListener('click',()=>{
    confirmbutton=document.querySelector('.confirm');
    confirmbutton.innerHTML=`Are you sure you want to reset the score? <button onclick="reset();
     confirmbutton.innerHTML='';"
     >Yes</button> <button onclick="confirmbutton.innerHTML='';">No</button>`;
    
});
document.querySelector('.autoplay').addEventListener('click',()=>{
    autoplay();
});



document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        game('rock');
    }
    else if(event.key==='p'){
        game('paper');
    }
    else if(event.key==='s'){
        game('scissors');
    }else if(event.key=='a'){
        autoplay();
    }else if(event.key=='Backspace'){
        confirmbutton=document.querySelector('.confirm');
        confirmbutton.innerHTML=`Are you sure you want to reset the score? <button onclick="
        reset();
        confirmbutton.innerHTML='';
        " >Yes</button> <button onclick="
        confirmbutton.innerHTML='';
        ">No</button>`;
        
    }
});



function autoplay(){
    if(!isplay){
        id=setInterval(()=>{
                let move=computer();
                game(move);
        },1000)
        textinput=document.querySelector('.auto');
        if(textinput.innerText=='Auto Play'){
            textinput.innerText='Stop Play';
        }
        isplay=true;
    }
    else{
        clearInterval(id);
        isplay=false;
        if(textinput.innerText=='Stop Play'){
            textinput.innerText='Auto Play';
        }
    }
}
function game(user){
    let comp=computer();
    let result='';

    if(user==='rock'){
        if(comp==='rock'){
            result='Tie.'
        }
        else if(comp==='paper'){
            result='You lose.'
        }
        else if(comp=='scissors'){
            result='You win.'
        }
    }

    else if(user==='paper'){
        if(comp==='rock'){
            result='You win.'
        }
        else if(comp==='paper'){
            result='Tie.'
        }
        else if(comp=='scissors'){
            result='You lose.'
        }
    }

    else if(user==='scissors'){
        if(comp==='rock'){
            result='You lose.'
        }
        else if(comp==='paper'){
            result='You win.'
        }
        else if(comp=='scissors'){
            result='Tie.'
        }
    }

    if(result=='You win.'){
        score.wins+=1;
    }
    else if(result=='You lose.'){
        score.losses+=1;
    }
    else if(result=='Tie.'){
        score.ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score))
    document.querySelector('.result').innerText=result;
    document.querySelector('.display').innerHTML=`You <img src="images/${user}-emoji.png" class="image"> <img src="images/${comp}-emoji.png" class="image"> Computer`;
    document.querySelector('.score').innerText=`Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;
    }
    function reset(){
        score.wins=0;
        score.losses=0;
        score.ties=0;
        localStorage.removeItem('score')
        document.querySelector('.score').innerText=`Wins: ${score.wins} , Losses: ${score.losses} , Ties: ${score.ties}`;
}


function computer(){
    let comp='';
    num=Math.random();
    if(num>=0 && num<=1/3){
        comp='rock';
    }
    else if(num>1/3 && num<=2/3){
        comp='paper';
    }
    else{
        comp='scissors';
    }
    return comp;
}