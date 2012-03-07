//run javascript Object
var sandbox = new function(){
  var window = null;
  var document = null;
  var alert = null;
  var logs='';
  this.do = function(code){
    logs='';
    with(this){
      eval(code);
    }
  };
  this.log =function(output){
      logs+=output + "\n";
  };
  this.outputLog =function(){
     return logs; 
  };
}();

//add ButtonEvent
(function(){
  var obj = document.getElementById("runJavascript");
  var f = function () {
    var code = document.getElementById("inputarea").value;
    sandbox.do(code);
    document.getElementById("outputarea").value = sandbox.outputLog();
  };

  if (obj.attachEvent){
    obj.attachEvent('onclick', f);
  }else {
    obj.addEventListener('click', f, false); 
  }
})()
