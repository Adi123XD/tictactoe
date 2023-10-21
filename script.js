// game variables

const gover=new Audio('assets/game over.wav');
const gwin=new Audio('assets/gamewin.wav');
const clickSound=new Audio('assets/Ting.mp3');
let turn="X";
let xcount=0;
let ycount=0;
let count=0;
let iswin=false;
let Tiecount=0;
const boxes=document.getElementsByClassName('box');
let isgameover=false;
// Function to change turn 
const changeTurn=()=>{
    if (turn==="X")
    {
        return "O";
    }
    return "X";
}

// Function to check for tie
function checkTie()
{
    count=0;
    const boxtexts=document.getElementsByClassName('play-box-');
    Array.from(boxtexts).forEach(box=>{
        if(box.innerText!=="")
        {
            count++;
            console.log(count);
        }
    })
    if(count===9)
    {
        isgameover=true;
        console.log('Tie');
        Tiecount++;
        gover.play();
        document.querySelector('.info').innerText="  Its is a draw" ;
        document.getElementsByClassName('Tie')[0].innerText=` ${Tiecount}`;

    }
}




// Function to check Win

const checkWin=()=>{
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const boxtexts=document.getElementsByClassName('play-box-');
    wins.forEach(win=>{
        if((boxtexts[win[0]].innerText===boxtexts[win[1]].innerText) && (boxtexts[win[1]].innerText===boxtexts[win[2]].innerText))
        {
            if(boxtexts[win[0]].innerText!=='')
            {
                document.querySelector('.info').innerText=":  "+turn+" has won the game";
                if(turn==='X')
                {
                    xcount++;
                    document.getElementsByClassName('X-win')[0].innerText=" :  "+xcount;
                }
                else{
                    ycount++;
                    document.getElementsByClassName('Y-win')[0].innerText=" :  "+ycount;
                }
                isgameover=true;
                gwin.play();
                
                iswin= true;
            }
            
        }
        
       
    })
}


Array.from(boxes).forEach((box)=>
{
    let bt=box.querySelector('.play-box-');
    box.addEventListener('click',(e)=>
    {
        console.log(e)
        if (bt.innerText==="")
        {
            bt.innerText=turn;
            checkWin();
            console.log(iswin);
            if (iswin===false)
            {
                checkTie();
            }
            console.log('clilcked')
            clickSound.play();
            turn=changeTurn();
            if (isgameover===false)
            {
                document.querySelector('.info').innerText=`:  ${turn}'s turn to play` ;
            }
            
        }
        
    })
})

const rl=document.getElementById("reload");
rl.addEventListener('click',()=>{
    let boxtexts=document.getElementsByClassName('play-box-');
    Array.from(boxtexts).forEach(bt=>{
        bt.innerText="";
    })
    turn="X";
    isgameover=false;
    iswin=false;
    
    document.querySelector('.info').innerText=`:  ${turn}'s turn to play` ;
    count=0;

});