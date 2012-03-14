var gc = {
  HEAP_SIZE : 100,
  heap : new Array(),
  root : {},
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
      cell.innerHTML = (h[i].mark ? "*":"") + h[i].value;
    };
  },
  
  mark : function(obj){
    for(var s in obj){
      var prop = obj[s];
      if(typeof prop == 'object'){
        if(prop.isGcObject && !prop.mark){
          prop.mark = true;
        }
        if(!(prop.isGcObject && prop.mark)){
          this.mark(prop);
        }
      }
    }
    this.heapLog();
  },
  sweep : function(){
    var i;
    var h = this.heap;
    var array =  new Array();

    for(i=0; i<h.length; i++){
      if(h[i].mark){
        h[i].mark =false;
      }else{
        h[i].value = null;
        array.push(i); 
      }
    }
    this.freeList = array;  
    gc.heapLog();
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
