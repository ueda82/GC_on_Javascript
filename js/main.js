//run javascript Object
var sandbox = {
  run : function(code){
    var logs = '';
    var root = gc.root;
    var r = gc.root;
    var withObj = { 
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
        try{
          eval(code);
        }catch(e){
          log(e.message);
        }
      }).apply(root,[]);
    }
    //outputlogs
    document.getElementById("outputarea").value = logs;
    this.windowDiff();
    gc.heapLog();
    gc.rootLog();
  },
  //windowProp has window's propaty
  windowProp: null, 
  //window diff windowProp
  windowDiff:function(){
    for(var s in window){
      if(!this.windowProp[s]){
        gc.root[s] = window[s];
      }
    }
  }
};
(function(){
    var obj = {};
    for(var s in window){
      obj[s] = true;
    }
    return obj;
})();

//add ButtonEvent
(function(){
  var example= document.getElementById("example");
  var js = document.getElementById("runJavascript");
  var mark = document.getElementById("runMark");
  var sweep = document.getElementById("runSweep");
  var f = function () {
    var code = document.getElementById("inputarea").value;
    sandbox.run(code);
  };
  var f2 = function () {
    document.getElementById("inputarea").value = 
      "//グローバル変数, this,r,rootに入れた変数はrootの管理下に置かれます。\n"
      + "//new O(objct);  OクラスのインスタンスはGCの対象となります\n"
      + "//log(value)　を使うと//outputAreaにログを出力します\n \n"
      + "r.hello = new O('hello gc on js'); "
      + "\nlog(r.hello.value); \n\ni=1; \nvar local = new O([1,2,3]);"
      + " \nlog(local.value);\nfor (var i =0;i<=local.value.length;i++){\n "
      + " if(i==2){\n    r.loop = new O(i);\n  }\n}\n";
  };

  if (js.attachEvent){
    js.attachEvent('onclick', f);
    example.attachEvent('onclick', f2);
    mark.attachEvent('onclick', function(){gc.mark(gc.root);});
    mark.attachEvent('onclick', function(){gc.mark(gc.root);});
    sweep.attachEvent('onclick', function(){gc.sweep();});
  }else {
    js.addEventListener('click', f, false); 
    example.addEventListener('click', f2, false);
    mark.addEventListener('click',function(){gc.mark(gc.root);}, false); 
    sweep.addEventListener('click',function(){gc.sweep();}, false); 
  }
})();
