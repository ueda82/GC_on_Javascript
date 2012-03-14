//run javascript Object
var sandbox = {
  do : function(code){
    var logs='';
    var root = gc.root;
    var withObj ={ 
      log :function(output){ logs+=output + "\n"; }, 
      window : undefined,
      document : undefined,
      alert : undefined,
      sandbox : undefined,
      gc :undefined 
    } ;
    with(withObj){
      // code this object is gc.root
      (function(){
        eval(code);
      }).apply(root,[]);
    }
    //outputlogs
    document.getElementById("outputarea").value = logs;
    this.windowDiff();
    gc.heapLog();
  },
  //windowProp has window's propaty
  windowProp:function(){
    var obj = {};
    for(var s in window){
      obj[s]=true;
    }
    return obj;
  }(),
  //window diff windowProp
  windowDiff:function(){
    for(var s in window){
      if(!this.windowProp[s]){
        gc.root[s]=window[s];
      }
    }
  }
};

//add ButtonEvent
(function(){
  var js = document.getElementById("runJavascript");
  var mark = document.getElementById("runMark");
  var sweep= document.getElementById("runSweep");
  var f  = function () {
    var code = document.getElementById("inputarea").value;
    sandbox.do(code);
  };

  if (js.attachEvent){
    js.attachEvent('onclick', f);
    mark.attachEvent('onclick', function(){gc.mark(gc.root);});
    sweep.attachEvent('onclick', gc.sweep);
  }else {
    js.addEventListener('click', f, false); 
    mark.addEventListener('click',function(){gc.mark(gc.root);}, false); 
    sweep.addEventListener('click', gc.sweep, false); 
  }
})();
