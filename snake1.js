let board=document.getElementById('board');
let lpt=0;
let speed=4;
var time=63;
var sequence=document.querySelectorAll('.color');
var seqarr=[];
var score=0;
let p=document.querySelector('.hiscore');
var gameStatus=1;
var n=100;
var lives=3;
var lifecount=document.querySelector('.lifecounter');
var obsstat=0;
var obs=[];


if(!localStorage.getItem('hiscore')){
    localStorage.setItem('hiscore',0);
}
var hiscore=0;
p.innerText= `Highscore:${localStorage.getItem('hiscore')}`;

document.getElementById('Score').innerText=`Score: 0`;
setInterval(function(){
    if (gameStatus==1)
        time--;
    document.querySelector('.timer').innerText=`Timer:${time}`;
    if (gameStatus==1){
        speed+=0.06;
    }
    
    if (time==0){
        if (score>localStorage.getItem('hiscore')){
            hiscore=score;
        }
        else{
            hiscore=localStorage.getItem('hiscore');
        }
        localStorage.setItem('hiscore',hiscore);
        if(!alert('Time up! Game over')){
            window.location.reload(); 
        }
        
        
    }

},1000);


for (let i=0;i<20;i++){
    for (let j=0;j<20;j++){
        cell=document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x=j;
        cell.dataset.y=i;
        board.appendChild(cell);

    }
}
var p1=Math.floor(Math.random()*20);
var p2=Math.floor(Math.random()*20);

let input=1;
let headposition= {'x':12,'y':10};
let bodyposition= {'x':11,'y':10};
var snakeArr=[headposition,bodyposition];

const foodcolor=['red','green','yellow','purple'];

let arr = [];
function fps(ctime){
    lifecount.innerHTML=`Lives: ${lives}`;
    if (snakeArr[0].x<0 || snakeArr[0].x>19 || snakeArr[0].y<0 || snakeArr[0].y>19){
        lives--;
        if (lives!=0){
            alert('You lost a life!You hit the wall!');
            speed=4;
            let p=document.querySelectorAll('.snake');
            for (z of p){
                z.classList.remove('snake');
            }
            headposition= {'x':12,'y':10};
            bodyposition= {'x':11,'y':10};
            snakeArr=[headposition,bodyposition,{'x':10,'y':10}];
            snakeArr.forEach(s=>{

                let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        
                snakeElement.classList.add('snake');
            });
        }
        else{
            if (score>localStorage.getItem('hiscore')){
                hiscore=score;
            }
            else{
                hiscore=localStorage.getItem('hiscore');
            }
            localStorage.setItem('hiscore',hiscore);
            
            if(!alert('You hit the wall! Game over')){
                window.location.reload(); 
            }
            return;
        }
        
        
    }
    if (obsstat==1){
        lives--;
        if (lives!=0){
            alert('You lost a life!You hit the obstacle!');
            obsstat=0;
            speed=4;
            let p=document.querySelectorAll('.snake');
            for (z of p){
                z.classList.remove('snake');
            }
            headposition= {'x':12,'y':10};
            bodyposition= {'x':11,'y':10};
            snakeArr=[headposition,bodyposition,{'x':10,'y':10}];
            snakeArr.forEach(s=>{

                let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
        
                snakeElement.classList.add('snake');
            });
        }
        else{
            if (score>localStorage.getItem('hiscore')){
                hiscore=score;
            }
            else{
                hiscore=localStorage.getItem('hiscore');
            }
            localStorage.setItem('hiscore',hiscore);
            
            if(!alert('You hit the obstacle! Game over')){
                window.location.reload(); 
            }
            return;
        }

    }
    
    var seg=[];
    for (let i=1;i<snakeArr.length;i++){
        seg.push(snakeArr[i]);
    }
    seg.forEach(s=>{
        if (snakeArr.length>4){
            if (s.x==snakeArr[0].x && s.y==snakeArr[0].y){
                lives--;
            if (lives!=0){
                alert('You lost a life!You ate yourself!');
                speed=4;
                let p=document.querySelectorAll('.snake');
                for (z of p){
                    z.classList.remove('snake');
                }
                headposition= {'x':12,'y':10};
                bodyposition= {'x':11,'y':10};
                snakeArr=[headposition,bodyposition,{'x':10,'y':10}];
                snakeArr.forEach(s=>{
    
                    let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
            
                    snakeElement.classList.add('snake');
                });
            }
            else{
                if (score>localStorage.getItem('hiscore')){
                    hiscore=score;
                }
                else{
                    hiscore=localStorage.getItem('hiscore');
                }
                localStorage.setItem('hiscore',hiscore);
                if(!alert('You ate yourself! Game over')){
                    window.location.reload(); 
                }
                return;
            }
            };
        }
        
    });
    
    window.requestAnimationFrame(fps);
    
    if((ctime-lpt)/1000>1/speed){
        lpt=ctime;
        if (gameStatus==1){
            logic();
        }
        
        
        
    }
    
}
function logic(){
    
    if (arr.length==0){
        regeneratefood();
        var foods=document.querySelectorAll('.food');
        for (var i=foods.length;i--;arr.unshift(foods[i]));
        k=Math.floor(Math.random()*4);
        for (let p=0;p<4;p++){
            sequence[p].style.backgroundColor=foodcolor[(p+k)%4];
        }
        for (var i=sequence.length;i--;seqarr.unshift(sequence[i]));
        time+=7;
        for (k of seqarr){
            k.style.margin='0px';
        }
        let add=board.querySelector(`[data-x="${snakeArr[snakeArr.length-1].x}"][data-y="${snakeArr[snakeArr.length-1].y}"]`);
        snakeArr.push(add);
        obs=board.querySelector(`[data-x="${p1}"][data-y="${p2}"]`);
        obs.classList.remove('obstacle');   
        p1=Math.floor(Math.random()*20);
        p2=Math.floor(Math.random()*20);
        obs=board.querySelector(`[data-x="${p1}"][data-y="${p2}"]`);
        obs.classList.add('obstacle');


    }
    else {
        let item=board.querySelector(`[data-x="${snakeArr[snakeArr.length-1].x}"][data-y="${snakeArr[snakeArr.length-1].y}"]`);
        item.classList.remove('snake');
    }
    
    for (let i=snakeArr.length-1;i>0;i--){
        snakeArr[i].x=snakeArr[i-1].x;
        snakeArr[i].y=snakeArr[i-1].y;
    }
    
    if (gameStatus==1){
        switch(input){
            case 1:
                headposition.x++;
                break;
            case 2:
                headposition.y++;
                break;
            case -1:
                headposition.x--;
                break;
            case -2:
                headposition.y--;
                break;
    }
    
    
    }
    if (p1==snakeArr[0].x && p2==snakeArr[0].y){
        obsstat=1;
    }
    
    snakeArr.forEach(s=>{

        let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);

        snakeElement.classList.add('snake');
    });
    
    for (j of arr){
        if (j.dataset.x==headposition.x&&j.dataset.y==headposition.y){
            if (seqarr[0].style.backgroundColor==j.style.backgroundColor){
                j.classList.remove('food');
                j.removeAttribute('style');
                seqarr[0].style.margin= '5px';
                let index = arr.indexOf(j);
                seqarr.splice(0,1);
                if (index > -1) { 
                    arr.splice(index, 1); 
                }
                score++;
                document.getElementById('Score').innerText=`Score: ${score}`;
                
                
            }
        }
        
    
    }
    
    
    
    
    
}
function regeneratefood(){
    for (let i=0;i<4;i++){
        let k1=Math.floor(Math.random()*20);
        let k2=Math.floor(Math.random()*20);
        let food=board.querySelector(`[data-x="${k1}"][data-y="${k2}"]`);
        food.style.backgroundColor=foodcolor[i];
        food.classList.add('food');
    }
    

}
let up=document.querySelector('.up');
let down=document.querySelector('.down');
let left=document.querySelector('.left');
let right=document.querySelector('.right');

window.addEventListener('keydown', function(event)
                                {
        let key = event.key;
        if (gameStatus==1){
            switch (key) {
                case "ArrowLeft":
                    if (input!=1)
                        input=-1;             
                    break;
                case "ArrowRight":
                    if (input!=-1)
                        input=1;
                    break;
                case "ArrowUp":
                    if (input!=2)
                        input=-2;
                    break;
                case "ArrowDown":
                    if (input!=-2)
                        input=2;
                    break;
            }
        }
        
    });
up.addEventListener('click', function(event)
    {
        if (gameStatus==1){
            if (input!=2){
                input=-2;
            }
        }
        
    });
down.addEventListener('click', function(event)
    {
        if (gameStatus==1){
            if (input!=-2){
                input=2;
            }
        }
        
    });
left.addEventListener('click', function(event)
    {   
        if (gameStatus==1){
            if (input!=1){
                input=-1;
            }
        }
        
    });
right.addEventListener('click', function(event)
    {
        if (gameStatus==1){
            if (input!=-1){
                input=1;
            }
        }
        
    });
window.addEventListener('keydown',function(event)
{
    let pause=event.key;
    
    if (pause=="Escape"){
            if (gameStatus==1)
                gameStatus=0;
            else
                gameStatus=1;
    }
});

fps(500);



