let name='';
var size=20;
var gameStatus=0;
let button=document.querySelector('.submit-button');
button.addEventListener('click',function(){
    name=document.querySelector('#name').value;
    size=document.getElementById('size').value;
    gameStatus=1;
    document.getElementById("bg").style.opacity='1';
    document.getElementById("input").style.visibility='hidden';
    initializeGame();
});

function initializeGame(){
    
    let board=document.getElementById('board');
    board.style.gridTemplateColumns=`repeat(${size},1fr)`;
    board.style.gridTemplateRows=`repeat(${size},1fr)`;
    let lpt=0;
    let speed=4;
    var time=43;
    var seqarr=[];
    var score=0;
    let p=document.querySelector('.hiscore');
    var n=100;
    var lives=3;
    var lifecount=document.querySelector('.lifecounter');
    var speeddown=[];
    var speedless=0;
    var shrink=[];
    var words=['LOVE','HATE','CATS','DOGS','CITY','NITT','BELL','BALL','BIRD'];
    let wordarr=[];
    let snakesound= new Audio('slurp.mp3');
    var reload=0;
    

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
            speed+=0.2;
        }
        
        if (time==0){
            if (score>localStorage.getItem('hiscore')){
                hiscore=score;
            }
            else{
                hiscore=localStorage.getItem('hiscore');
            }
            localStorage.setItem('hiscore',hiscore);
            localStorage.setItem(name,score);
            gameStatus=0;
            document.querySelector('.bg').style.opacity=0.5;
            document.getElementById('gameover').style.visibility='visible';
            let playagain=document.getElementById('playagain');
            document.getElementById('gameovertext').innerHTML=`Time up! Game over ${name}! Your score is ${score}`;
            const items={...localStorage};
            const elements=Object.entries(items);

            elements.forEach(k=>{
                if (k[0]=='hiscore'){
                    elements.splice(elements.indexOf(k),1);
                }
            });
            for(var i = 0; i < elements.length; i++) {
                for(var j=0; j < elements.length; j++) {
                    if(Number(elements[i][1]) > Number(elements[j][1])) {
                        var temp = elements[i];
                        elements[i] = elements[j];
                        elements[j] = temp;        
                    }
                }
            }
            let leaderboard=document.querySelector('.leaderboard');
            leaderboard.innerHTML='Leaderboard:<br>';
            let index=1
            for (k of elements){
                leaderboard.innerHTML+=`${index}. ${k[0]}: ${k[1]}<br>`;
                index+=1;
            }
            playagain.addEventListener('click',function(){
                window.location.reload;
            });
            
            
        }

    },1000);
    var y1=0;
    var p1=Math.floor(Math.random()*size);
    var dir=1;
    setInterval(function(){
        if (gameStatus==1){
            obs=board.querySelector(`[data-x="${p1}"][data-y="${y1}"]`);
            obs.classList.remove('obstacle');
            y1+=dir;
            if (y1==size-1){
                y1=0;
                p1=Math.floor(Math.random()*size);
            }
            obs=board.querySelector(`[data-x="${p1}"][data-y="${y1}"]`);
            obs.classList.add('obstacle');
        }
        
    },200);


    for (let i=0;i<size;i++){
        for (let j=0;j<size;j++){
            cell=document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x=j;
            cell.dataset.y=i;
            board.appendChild(cell);

        }
    }
    
    var r1=Math.floor(Math.random()*size);
    var r2=Math.floor(Math.random()*size);
    var s1=Math.floor(Math.random()*size);
    var s2=Math.floor(Math.random()*size);

    let input=1;
    var headposition= {'x':Math.floor(Math.floor(size/2)),'y':Math.floor(Math.floor(size/2))};
    var bodyposition= {'x':Math.floor(size/2)-1,'y':Math.floor(size/2)};
    var snakeArr=[headposition,bodyposition];

    let arr = [];
    function fps(ctime){
        lifecount.innerHTML=`Lives: ${lives}`;
        if (snakeArr[0].x<0 || snakeArr[0].x>size-1 || snakeArr[0].y<0 || snakeArr[0].y>size-1){
            lives--;
            if (lives!=0){
                
                speed=4;
                let p=document.querySelectorAll('.snake');
                for (z of p){
                    z.classList.remove('snake');
                }
                headposition= {'x':Math.floor(size/2),'y':Math.floor(size/2)};
                bodyposition= {'x':Math.floor(size/2)-1,'y':Math.floor(size/2)};
                snakeArr=[headposition,bodyposition,{'x':Math.floor(size/2)-2,'y':Math.floor(size/2)}];
                snakeArr.forEach(s=>{

                    let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
            
                    snakeElement.classList.add('snake');
                });
                gameStatus=0;
                document.querySelector('.bg').style.opacity=0.5;
                document.getElementById('life').style.visibility='visible';
                let displaybtn=document.getElementById('submit');
                displaybtn.addEventListener('click',function(){
                    document.getElementById('life').style.visibility='hidden';
                    document.querySelector('.bg').style.opacity=1;
                    gameStatus=1;
                });
                
            }
            else{
                lives=0;
                if (score>localStorage.getItem('hiscore')){
                    hiscore=score;
                }
                else{
                    hiscore=localStorage.getItem('hiscore');
                }
                localStorage.setItem('hiscore',hiscore);
                localStorage.setItem(name,score);
                gameStatus=0;
                document.querySelector('.bg').style.opacity=0.5;
                document.getElementById('gameover').style.visibility='visible';
                document.getElementById('gameovertext').innerHTML=`You hit the wall! Game over ${name}! Your score is ${score}`;
                let playagain=document.getElementById('playagain');
                const items={...localStorage};
                const elements=Object.entries(items);

                elements.forEach(k=>{
                    if (k[0]=='hiscore'){
                        elements.splice(elements.indexOf(k),1);
                    }
                });
                for(var i = 0; i < elements.length; i++) {
                    for(var j=0; j < elements.length; j++) {
                        if(Number(elements[i][1]) > Number(elements[j][1])) {
                            var temp = elements[i];
                            elements[i] = elements[j];
                            elements[j] = temp;        
                        }
                    }
                }
                let leaderboard=document.querySelector('.leaderboard');
                leaderboard.innerHTML='Leaderboard:<br>';
                let index=1
                for (k of elements){
                    leaderboard.innerHTML+=`${index}. ${k[0]}: ${k[1]}<br>`;
                    index+=1;
                }
                playagain.addEventListener('click',function(){
                    window.location.reload();
                });
            }
            
            
        }
        
        if (reload==1){
            window.location.reload();
        }
        var seg=[];
        for (let i=1;i<snakeArr.length;i++){
            seg.push(snakeArr[i]);
        }
        seg.forEach(s=>{
            if (snakeArr.length>4){
                if (s.x==snakeArr[0].x && s.y==snakeArr[0].y){
                    lives--;
                if (lives==0){
                    if (score>localStorage.getItem('hiscore')){
                        hiscore=score;
                    }
                    else{
                        hiscore=localStorage.getItem('hiscore');
                    }
                    localStorage.setItem('hiscore',hiscore);
                    localStorage.setItem(name,score);
                    gameStatus=0;
                    document.querySelector('.bg').style.opacity=0.5;
                    document.getElementById('gameover').style.visibility='visible';
                    let playagain=document.getElementById('playagain');
                    document.getElementById('gameovertext').innerHTML=`You ate yourself! Game over ${name}! Your score is ${score}`;
                    const items={...localStorage};
                    const elements=Object.entries(items);

                    elements.forEach(k=>{
                        if (k[0]=='hiscore'){
                            elements.splice(elements.indexOf(k),1);
                        }
                    });
                    for(var i = 0; i < elements.length; i++) {
                        for(var j=0; j < elements.length; j++) {
                            if(Number(elements[i][1]) > Number(elements[j][1])) {
                                var temp = elements[i];
                                elements[i] = elements[j];
                                elements[j] = temp;        
                            }
                        }
                    }
                    let leaderboard=document.querySelector('.leaderboard');
                    leaderboard.innerHTML='Leaderboard:<br>';
                    let index=1
                    for (k of elements){
                        leaderboard.innerHTML+=`${index}. ${k[0]}: ${k[1]}<br>`;
                        index+=1;
                    }
                    playagain.addEventListener('click',function(){
                        window.location.reload;
                    });
                    
                    
                }
                else{

                    speed=4;
                    let p=document.querySelectorAll('.snake');
                    for (z of p){
                        z.classList.remove('snake');
                    }
                    
                    headposition= {'x':Math.floor(size/2),'y':Math.floor(size/2)};
                    bodyposition= {'x':Math.floor(size/2)-1,'y':Math.floor(size/2)};
                    snakeArr=[headposition,bodyposition,{'x':Math.floor(size/2)-2,'y':Math.floor(size/2)}];
                    snakeArr.forEach(s=>{
        
                        let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
                
                        snakeElement.classList.add('snake');
                    });
                    
                    gameStatus=0;
                    document.getElementById('life').style.visibility='visible';
                    document.querySelector('.bg').style.opacity=0.5;
                    let displaybtn=document.getElementById('submit');
            
                    displaybtn.addEventListener('click',function(){
                        document.getElementById('life').style.visibility='hidden';
                        document.querySelector('.bg').style.opacity=1;
                        gameStatus=1;
                    })
                    

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
            var word=document.querySelector('.word');
            while (word.hasChildNodes()){
                word.removeChild(word.firstChild);
            }
            var letter1=document.createElement('div');
            var letter2=document.createElement('div');
            var letter3=document.createElement('div');
            var letter4=document.createElement('div');
            word.appendChild(letter1);
            word.appendChild(letter2);
            word.appendChild(letter3);
            word.appendChild(letter4);
            letter1.innerHTML=arr[0];
            letter2.innerHTML=arr[1];
            letter3.innerHTML=arr[2];
            letter4.innerHTML=arr[3];
            time+=7;
            let add=board.querySelector(`[data-x="${snakeArr[snakeArr.length-1].x}"][data-y="${snakeArr[snakeArr.length-1].y}"]`);
            snakeArr.push(add);
            speeddown=board.querySelector(`[data-x="${r1}"][data-y="${r2}"]`);
            speeddown.classList.remove('speeddown');
            shrink=board.querySelector(`[data-x="${s1}"][data-y="${s2}"]`);
            shrink.classList.remove('shrink');
            
            
            
            if (speed>8){
                r1=Math.floor(Math.random()*size);
                r2=Math.floor(Math.random()*size);
                speeddown=board.querySelector(`[data-x="${r1}"][data-y="${r2}"]`);
                speeddown.classList.add('speeddown');
            }
            
            
            if (snakeArr.length>3){
                s1=Math.floor(Math.random()*size);
                s2=Math.floor(Math.random()*size);
                shrink=board.querySelector(`[data-x="${s1}"][data-y="${s2}"]`);
                shrink.classList.add('shrink');
            }
            

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
                    snakeArr[0].x++;
                    break;
                case 2:
                    snakeArr[0].y++;
                    break;
                case -1:
                    snakeArr[0].x--;
                    break;
                case -2:
                    snakeArr[0].y--;
                    break;
        }
        
        
        }
        

        if (r1==snakeArr[0].x && r2==snakeArr[0].y){
            speedless=1;
        }
        if (s1==snakeArr[0].x && s2==snakeArr[0].y){
            
            if (snakeArr.length>3){
                m=snakeArr.pop();
                let t1=document.querySelector(`[data-x="${m.x}"][data-y="${m.y}"]`);
                t1.classList.remove('snake');
                n=snakeArr.pop();
                let t2=document.querySelector(`[data-x="${n.x}"][data-y="${n.y}"]`);
                t2.classList.remove('snake');
                let t3=document.querySelector(`[data-x="${s1}"][data-y="${s2}"]`);
                t3.classList.remove('shrink');
            }
            

            
        }
        if (speed>8){
            if (speedless==1){
                speedless=0;
                speed=speed-4;
                let item1=board.querySelector(`[data-x="${r1}"][data-y="${r2}"]`);
                item1.classList.remove('speeddown');
            }
            
        }

        
        snakeArr.forEach(s=>{

            let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);

            snakeElement.classList.add('snake');
        });
        let x1=board.querySelector('.obstacle').dataset.x;
        let x2=board.querySelector('.obstacle').dataset.y;
        for (let k=0;k<snakeArr.length;k++){
            if (snakeArr[k].x==x1 && snakeArr[k].y==x2){
                gameStatus=0;
                lives=lives-1;
                if (lives==0){
                    if (score>localStorage.getItem('hiscore')){
                        hiscore=score;
                    }
                    else{
                        hiscore=localStorage.getItem('hiscore');
                    }
                    localStorage.setItem('hiscore',hiscore);
                    localStorage.setItem(name,score);
                    gameStatus=0;
                    document.querySelector('.bg').style.opacity=0.5;
                    document.getElementById('gameover').style.visibility='visible';
                    let playagain=document.getElementById('playagain');
                    document.getElementById('gameovertext').innerHTML=`You hit the obstacle! Game over ${name}! Your score is ${score}`;
                    const items={...localStorage};
                    const elements=Object.entries(items);
    
                    elements.forEach(k=>{
                        if (k[0]=='hiscore'){
                            elements.splice(elements.indexOf(k),1);
                        }
                    });
                    for(var i = 0; i < elements.length; i++) {
                        for(var j=0; j < elements.length; j++) {
                            if(Number(elements[i][1]) > Number(elements[j][1])) {
                                var temp = elements[i];
                                elements[i] = elements[j];
                                elements[j] = temp;        
                            }
                        }
                    }
                    let leaderboard=document.querySelector('.leaderboard');
                    leaderboard.innerHTML='Leaderboard:<br>';
                    let index=1
                    for (k of elements){
                        leaderboard.innerHTML+=`${index}. ${k[0]}: ${k[1]}<br>`;
                        index+=1;
                    }
                    playagain.addEventListener('click',function(){
                        reload=1;
                    });
                    
                    
                }
                else{
    
                        speed=4;
                        let p=document.querySelectorAll('.snake');
                        for (z of p){
                            z.classList.remove('snake');
                        }
                        
                        headposition= {'x':Math.floor(size/2),'y':Math.floor(size/2)};
                        bodyposition= {'x':Math.floor(size/2)-1,'y':Math.floor(size/2)};
                        snakeArr=[headposition,bodyposition,{'x':Math.floor(size/2)-2,'y':Math.floor(size/2)}];
                        snakeArr.forEach(s=>{
            
                            let snakeElement=board.querySelector(`[data-x="${s.x}"][data-y="${s.y}"]`);
                    
                            snakeElement.classList.add('snake');
                        });
                        
                        gameStatus=0;
                        document.getElementById('life').style.visibility='visible';
                        document.querySelector('.bg').style.opacity=0.5;
                        let displaybtn=document.getElementById('submit');
                
                        displaybtn.addEventListener('click',function(){
                            document.getElementById('life').style.visibility='hidden';
                            document.querySelector('.bg').style.opacity=1;
                            gameStatus=1;
                        })
                        
    
                    }
            }
        }
        
        seqarr.forEach(b=>{
            let w=board.querySelector(`[data-x="${b.dataset.x}"][data-y="${b.dataset.y}"]`);
            w.classList.add('letters');
        });
        let v=board.querySelector(`[data-x="${seqarr[0].dataset.x}"][data-y="${seqarr[0].dataset.y}"]`);
        v.classList.add('letter');
        var word=document.querySelector('.word');
        var word2=word.children;

        if (seqarr[0].dataset.x==snakeArr[0].x && seqarr[0].dataset.y==snakeArr[0].y){
            snakesound.play();
            word2.item(4-seqarr.length).style.color='red';
            word2.item(4-seqarr.length).style.fontSize='40px';
            seqarr[0].innerHTML='';
            let n=board.querySelector(`[data-x="${seqarr[0].dataset.x}"][data-y="${seqarr[0].dataset.y}"]`);
            n.classList.remove('letter');
            seqarr.splice(0,1);
            arr.splice(0,1);
            score++;
            document.getElementById('Score').innerText=`Score: ${score}`;
            
            

        }
        
        
        
        
    }
    function regeneratefood(){
        let y=Math.floor(Math.random()*9);
        var x=words[y];
        arr=x.split('');
        arr.forEach(c=>{
            k1=Math.floor(Math.random()*size);
            k2=Math.floor(Math.random()*size);
            var z=board.querySelector(`[data-x="${k1}"][data-y="${k2}"]`);
            z.innerHTML=c;
            seqarr.push(z);
        })
        

    }
    let up=document.querySelector('.up');
    let down=document.querySelector('.down');
    let left=document.querySelector('.left');
    let right=document.querySelector('.right');
    let play=document.querySelector('.pause');

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
    play.addEventListener('click', function(event)
        {
            if (gameStatus==1){
                gameStatus=0;
            }
            else{
                gameStatus=1;
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

    
    fps();
}




