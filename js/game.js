window.onload=function(){
    var obj=new game();
    obj.play()
}

function game(){
    this.letterArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.image={A:"image/A.png",B:"image/B.png",C:"image/C.png",D:"image/D.png",E:"image/E.png",F:"image/F.png",G:"image/G.png",H:"image/H.png",I:"image/I.png",J:"image/J.png",K:"image/K.png",L:"image/L.png",M:"image/M.png",N:"image/N.png",O:"image/O.png",P:"image/P.png",Q:"image/Q.png",R:"image/R.png",S:"image/S.png",T:"image/T.png",U:"image/U.png",V:"image/V.png",W:"image/W.png",X:"image/X.png",Y:"image/Y.png",Z:"image/Z.png"}
    this.letterNum=3;
    this.currArr=[];
    this.currSpan=[];
    this.clientW=document.documentElement.clientWidth;
    this.clientH=document.documentElement.clientHeight;
    this.t;
    this.speed=1;
    this.gq=1;
    this.life=5;
    this.score=0;
    this.zscore=0;
    this.lifeEle=$(".life")[0];
    this.gqEle=$(".gq")[0];
    this.scoreEle=$(".score")[0];
    this.zscoreEle=$(".zscore")[0];
    this.tankuang=$(".tankuang")[0];
    this.tankuang2=$(".tankuang2")[0];
    this.tu3=$(".tu3")[0];
    this.tu4=$(".tu4")[0];
    this.tu5=$(".tu5")[0];
    this.tu6=$(".tu6")[0];
    this.step=10;
    this.sure1=$(".sure",this.tankuang)[0];
    this.sure2=$(".sure",this.tankuang2)[0];
    this.cancel1=$(".cancel",this.tankuang)[0];
    this.cancel2=$(".cancel",this.tankuang2)[0];

}
game.prototype={
    play:function(){
        /*创建随机的字母*/
        /*创建随机的span*/
        this._getLetter(this._getRand(this.letterNum));
        this._move(this.currSpan);
        this._key(this.currSpan);
    },
    _key:function(currSpan){
        var that=this;
        document.onkeydown=function(e){
            var e=e||window.event;
            var letter=String.fromCharCode(e.keyCode);
            for(var i=0;i<that.currArr.length;i++){
                if(letter==that.currArr[i]){
                    document.body.removeChild(that.currSpan[i]);
                    that.currSpan.splice(i,1);
                    that.currArr.splice(i,1);
                    that._getLetter(that._getRand(1));
                    that.score++;
                    that.zscore++;
                    that.scoreEle.innerHTML=that.score;
                    that.zscoreEle.innerHTML=that.zscore;
                    if(that.score%that.step==0){
                        // alert("恭喜你，进入下一关！")
                        clearInterval(that.t);
                        that.tankuang.style.display="block" ;
                        that.tu3.style.display="block" ;
                        that.sure1.onclick=function(){
                            that._next();
                            that.tu3.style.display="none" ;
                            that.tankuang.style.display="none" ;
                        }
                        that.cancel1.onclick=function(){
                            that.tu3.style.display="none" ;
                            that.tankuang.style.display="none" ;
                        }
                    }



                }
            }
        }
    },
    _next:function(){
        this.life=5;
        this.lifeEle.innerHTML=this.life;
        this.score=0;
        this.scoreEle.innerHTML=this.score;
        this.gq++;
        this.gqEle.innerHTML=this.gq;
        this.speed++;
        this.step+=5;
        if(this.speed>10){
            this.speed=10;
        }
        this.letterNum++;
        if(this.letterNum>15){
            this.letterNum=15;
        }
        this.zscoreEle.innerHTML=this.zscore;
        clearInterval(this.t);
        for (var j = 0; j < this.currSpan.length; j++) {
            document.body.removeChild(this.currSpan[j])
        }
        this.currArr=[];
        this.currSpan=[];
        this._getLetter(this._getRand(this.letterNum));
        this._move(this.currSpan);
        this._key(this.currSpan);
    },
    _move:function(currSpan){
        var that=this;
        this.t=setInterval(function(){
            that.tu5.onclick=function(){
                clearInterval(that.t);
            };
            that.tu6.onclick=function(){
                that._move()
            };
            for(var i=0;i<that.currSpan.length;i++){
                var tops=that.currSpan[i].offsetTop+that.speed;
                that.currSpan[i].style.top=tops+"px"
                if(tops>that.clientH){
                    document.body.removeChild(that.currSpan[i]);
                    that.currSpan.splice(i,1);
                    that.currArr.splice(i,1);
                    that._getLetter(that._getRand(1));
                    that.life--;
                    that.lifeEle.innerHTML=that.life;
                    if (that.life<=0) {
                        that.tankuang2.style.display="block" ;
                        that.tu4.style.display="block" ;
                        clearInterval(that.t);
                        that.sure2.onclick=function(){
                            that.life=5;
                            that.lifeEle.innerHTML=that.life;
                            that.tankuang2.style.display="none" ;
                            that.tu4.style.display="none" ;

                            for (var j = 0; j < that.currSpan.length; j++) {
                                document.body.removeChild(that.currSpan[j])
                            }

                            that.currArr=[];
                            that.currSpan=[];
                            that._getLetter(that._getRand(that.letterNum));
                            that._move(that.currSpan);
                            that._key(that.currSpan);
                            that.life=5;
                        }
                        that.cancel2.onclick=function(){
                            that.tu4.style.display="none" ;
                            that.tankuang2.style.display="none" ;
                        }
                    };
                }
            }
        },60)

    },
    _getRand:function(num){
        var newarr=[];
        for(i=0;i<num;i++){
            var letter=this.letterArr[Math.floor(Math.random()*this.letterArr.length)];
            while(this._checkLetter(letter,this.currArr)){
                letter=this.letterArr[Math.floor(Math.random()*this.letterArr.length)];
            }
            newarr.push(letter);
            this.currArr.push(letter);

        }
        return newarr;
    },
    _checkLetter:function(val,arr){
        for(i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    },
    _getLetter:function(arr){
        var newarr=[];
        for(var i=0;i<arr.length;i++){
            var spans=document.createElement("span");
            spans.innerHTML="<img style='width:60px;height:60px' src="+this.image[arr[i]]+">";;
            var lefts=100+Math.random()*(this.clientW-200);
            document.body.appendChild(spans);
            while(this._checkPos(lefts,this.currSpan)){
                lefts=160+Math.random()*(this.clientW-250);

            }

            newarr.push(spans);
            this.currSpan.push(spans);
            spans.style.cssText="position:absolute;left:"+lefts+"px;top:"+(Math.random()*20-10)+"px"
        }
        return newarr;
    },
    _checkPos:function(ele,arr){
        for(var i=0;i<arr.length;i++){
            if(ele>arr[i].offsetLeft-60&&ele<arr[i].offsetLeft+60){
                return true;
            }
        }
        return false;
    }
}