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
  windowProp:function(){
    var obj = {};
    for(var s in window){
      obj[s] = true;
    }
    return obj;
  }(),
  //window diff windowProp
  windowDiff:function(){
    for(var s in window){
      if(!this.windowProp[s]){
        gc.root[s] = window[s];
      }
    }
  }
};

//add ButtonEvent
(function(){
  var example= document.getElementById("example");
  var js = document.getElementById("runJavascript");
  var mark = document.getElementById("runMark");
  var sweep = document.getElementById("runSweep");
  var compaction= document.getElementById("runCompaction");
  var f = function () {
    var code = document.getElementById("inputarea").value;
    sandbox.run(code);
  };
  var ex1 = function () {
    document.getElementById("inputarea").value = 
    '//サンプル１\n'
    + '//run Programsボタンをプログラムを実行\n'
    + '//GC markボタンを押してマークを確認\n'
    + '//GC sweepボタンを押して不要な部分が消えるのを確認\n'
    + '\n'
    + '//Oというオブジェクトを生成するとGCの管理下に入ります。\n'
    + 'new O("HelloWorld");\n'
    + 'new O(1);\n'
    + 'new O([1,2,3]);\n'
    + '\n'
    + '//グローバル変数、root、r のプロパティはroot として扱います。\n'
    + 'g= new O("ぐろーばる変数");\n'
    + '//log関数を使うとOutputAreaに引数の値が表示されます。\n'
    + '//O.valueで値を取得できます\n'
    + 'log(g.value);\n'
    + 'g.value = "グローバル変数を書き換えるよ";\n'
    + 'log(g.value);\n'
    + '\n'
    + 'var l= new O("ローカル変数");\n'
    + 'log(l.value);\n';
  };

  var ex2 = function () {
    document.getElementById("inputarea").value = 
    + '//for文の中でOを生成して\n'
    + '//3の倍数だけloop変数に入れる\n'
    + 'loop =[];\n'
    + 'for(var i =0;i<30;i++){\n'
    + '    var obj = new O(i);\n'
    + '    if(i%3){\n'
    + '        loop[i] = obj;\n'
    + '    }\n'
    + '}\n'
  };
  var ex3 = function () {
    document.getElementById("inputarea").value = 
    + '//for文の中でObjを生成して\n'
    + '//3の倍数だけloop変数に入れる\n'
    + 'loop =[];\n'
    + 'for (var i =0;i<30;i++){\n'
    + '    var test = new O(i);\n'
    + '    if(i%3){\n'
    + '        loop[i] =test ;\n'
    + '    }\n'
    + '}\n'
  };
  if (js.attachEvent){
    js.attachEvent('onclick', f);
    example.attachEvent('onclick', ex1);
    example2.attachEvent('onclick', ex2);
    example3.attachEvent('onclick', ex3);
    mark.attachEvent('onclick', function(){gc.mark(gc.root);});
    sweep.attachEvent('onclick', function(){gc.sweep();});
    compaction.attachEvent('onclick', function(){gc.compaction();});
  }else {
    js.addEventListener('click', f, false); 
    example.addEventListener('click', ex1, false);
    example2.addEventListener('click', ex2, false);
    example3.addEventListener('click', ex3, false);
    mark.addEventListener('click',function(){gc.mark(gc.root);}, false); 
    sweep.addEventListener('click',function(){gc.sweep();}, false); 
    compaction.addEventListener('click',function(){gc.compaction();}, false); 
  }
})();
