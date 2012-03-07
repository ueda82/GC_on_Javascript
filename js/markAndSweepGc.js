var gc = {
  HEAP_SIZE : 100,
  heap : new Array(),
  root : window.sandbox,
  freeList:null,
  //object set heap
  chunk :function(obj){
    var l=this.freeList;
    if(l.length==0){
       alert('heap is nothing!'); 
    }
    var i =l[0];
    l.shift();
    this.heap[i] = obj;
    return; 
  },
  newFreeList:function(){
    this.freeList = new Array();  
    for (var i=0; i < this.HEAP_SIZE; i++) {
      this.freeList.push(i); 
    };
  }
}

gc.newFreeList();

//O is GC target Object
var O = function(v){
  this.isGcObject = true;
  this.mark = false;
  this.value = v;
  gc.chunk(this);
}
