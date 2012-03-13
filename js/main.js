//run javascript Object
var sandbox = {
  do : function(code){
    var logs='';
    var withObj ={ 
      log :function(output){ logs+=output + "\n"; }, 
      window : undefined,
      document : undefined,
      alert : undefined,
      sandbox : undefined,
      gc :undefined 
    } ;
    with(withObj){
      eval(code);
    }
    //outputlogs
    document.getElementById("outputarea").value = logs;
    gc.heapLog();
  },
};
//gc rootObj regit
(function(){
  gc.root=sandbox;
})();

//ç≈èâÇ©ÇÁÇ†ÇÈä÷êîÇ…ÇÕàÛÇÇ¬ÇØÇƒÇ®Ç≠
// (function(){
  // var f = function(obj){
    // for(s in obj){
      // s
    // }
  // }
  // f(window);
// })();

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
    mark.attachEvent('onclick', function(){gc.mark(window);});
    sweep.attachEvent('onclick', gc.sweep);
  }else {
    js.addEventListener('click', f, false); 
    mark.addEventListener('click',function(){gc.mark(gc.root);}, false); 
    sweep.addEventListener('click', gc.sweep, false); 
  }
})();
