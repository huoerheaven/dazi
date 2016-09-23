      //先声明一个函数function----------类名的兼容函数
     /*  function getClass(selector){
     	判断获取类名的方式是否存在，如果存在，
     	则直接得到一个返回值，否则，就可以判
     	断是在IE中使用
	   if(document.getElementsByClassName){
           return document.getElementsByClassName(selector)
	   }else{
	   	用标签名来获取body中的元素，“*”代表文档中
	   	的所有标签，结果是一个集合，并赋值给变量all
	   	   var all=document.getElementsByTagName("*");
	   	   定义一个新数组
	   	   var newarr=[];
        对集合进行遍历
	   	   for (var i = 0; i <all.length; i++) {
	   	   	    if(all[i].className==selector){
	   	   	    	newarr.push(all[i]);
	   	   	    }
	   	   };
	   	   return newarr;
	   }
   }*/
      
    //先声明一个函数function
      function getClass(selector,father){
      	father=father||document;
	   if(father.getElementsByClassName){
           return father.getElementsByClassName(selector);
	   }else{
	   	   var all=father.getElementsByTagName("*");
	   	   var newarr=[];
	   	   for (var i = 0; i <all.length; i++) {
	   	   	//调用check函数
	   	   	    if(check(all[i].className,selector)){
	   	   	    	newarr.push(all[i]);
	   	   	    }
	   	   };
	   	   return newarr;
	   }
   }
   // /*如果出现news two，用以下去实现*/"one two" ["one","two"]   one
    function check(str,selector){
        var arr=str.split(" ");
        for(var i in arr){
        	//如果有相同的，则返回一个真值
        	if(arr[i]==selector){
        		return true;
        	}
        }
       return false;
   }

   
//2.获取样式的兼容函数

/*getStyle(ele,attr)  
ele:操作的document对象；
attr：获取哪个属性的值 */ 
 

 function getStyle(ele,attr){
 	if(ele.currentStyle){
 		return ele.currentStyle[attr];
 	}else{
 		return getComputedStyle(ele,null)[attr];
 	}
 }


//3.获取元素的函数

function $(selector,father){
    father=father||document;
    if(typeof selector=="string"){
    	selector=selector.replace(/^\s*|\s*$/g,"");
    	if(selector.charAt(0)=="."){
    		return getClass(selector.slice(1),father)
    	}else if(selector.charAt(0)=="#"){
    		return father.getElementById(selector.slice(1));
    	}else if(/^[a-z1-6]{1,10}/.test(selector)){
    		return father.getElementsByTagName(selector);
    	}
    }else if(typeof selector=="function"){
        window.onload=function(){
            selector();
        }
    }
}



/*4.解决滚动条的兼容问题*/
document.documentElement.scrollTop=1;
var obj;
if(document.documentElement.scrollTop){
   obj=document.documentElement;
}else{
   obj=document.body;
}

/*三元运算符*/

/*obj=document.documentElement.scrollTop?
document.documentElement:document.body;*/


//5.获取子节点的兼容函数
//"a"  元素子节点
//"b"  元素+文本节点
function getChild(father,type){
   type=type||"b";
   var all=father.childNodes;
   var arr=[];
    for(var i=0;i<all.length;i++){
      if(type=="a"){
          if(all[i].nodeType==1){
            arr.push(all[i]);

          }
      }else if(type=="b"){
          if(all[i].nodeType==1 || all[i].nodeType==3 && all[i].nodeValue.replace(/^\s*|\s*$/g,"")!=""){
            arr.push(all[i])
          }
      }                                  
    }
    return arr;
}


//6.获取第一个子节点

function getFirst(father){
  return getChild(father)[0];
}

//7.获取最后一个子节点

function getLast(father){
  return getChild(father)[getChild(father).length-1]
}

//8.获取指定位置的子节点

function getNum(father,num){
  return getChild(father)[num];
}

//9.获取下一个兄弟节点
function getNext(ele){
  var next=ele.nextSibling;
  if(next==null){
    return false;
  }
  while(next.nodeType==3||next.nodeType==8){
    next=next.nextSibling;
    if(next==null){
      return false;
    }
  }
  return next;
}

//10.获取上一个兄弟节点

function getPrevious(ele){
  var previous=ele.previousSibling;
   if(previous==null){
    return false;
  }
  while(previous.nodeType==3||previous.nodeType==8){
    previous=previous.previousSibling;
    if(previous==null){
      return false;
    }
  }
  return previous;
}
