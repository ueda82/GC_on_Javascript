var gc = {
  HEAP_SIZE : 100,
  heap : new Array(),
  root : null,
  freeList : null,
  //object set heap
  chunk : function(obj){
    var l=this.freeList;
    if(l.length==0){
       alert('heap is nothing!'); 
    }
    var i =l[0];
    l.shift();
    this.heap[i] = obj;
    return; 
  },
  newFreeList : function(){
    this.freeList = new Array();  
    for (var i=0; i < this.HEAP_SIZE; i++) {
      this.freeList.push(i); 
    };
  },
  heapLog : function(){
    var table = document.getElementById('heapTable');
    table.innerHTML="";
    var h = this.heap;
    var row; 
    for (var i=0; i < h.length; i++) {
      if(i%10==0){
         row = table.insertRow(); 
      }
      var cell = row.insertCell();
      cell.innerHTML = h[i].value;
    };
  },
  
  mark : function(obj){
  },
  sweep : function(obj){
    alert('test2');
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
