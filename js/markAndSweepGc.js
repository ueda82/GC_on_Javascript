var gc = {
  HEAP_SIZE : 100,
  heap : new Array(HEAP_SIZE),
  root : sandbox,
  freeList:null,
  chunk :function(){
    if(freeList.length==0){
       alert('heap is nothing!'); 
    }
    var i =freeList[0];

    return i; 

  
  },
  newFreeList:function(){
    this.freeList = new Array();  
    for (var i=0; i < this.HEAP_SIZE.length; i++) {
       this.freeList.push(i); 
    };
  }
}

(function(){
    gc.newFreeList();
})();

//O is GC target Object
var O = function(v){
  var isGcObject = true;
  var mark = false;
  var value = v;
}
