//run javascript Object
var sandbox = new function(){
  var window = null;
  var document = null;
  var alert = null;
  var logs='';
  this.do = function(code){
    logs='';
    with( { log :function(output){ logs+=output + "\n"; } }){
      eval(code);
    }
    var ogs;
      for(prop in this){
        ogs+=prop+ "\n";
      }
    gc.heapLog();
  };
  this.outputLog =function(){
     return logs; 
  };
}();

(function(){
  gc.root=sandbox;
})();
//add ButtonEvent
(function(){
  var js = document.getElementById("runJavascript");
  var mark = document.getElementById("runMark");
  var sweep= document.getElementById("runSweep");
  var f  = function () {
    var code = document.getElementById("inputarea").value;
    sandbox.do(code);
    document.getElementById("outputarea").value = sandbox.outputLog();
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
