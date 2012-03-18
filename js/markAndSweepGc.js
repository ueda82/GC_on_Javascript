var gc = {
  HEAP_SIZE : 100,
  heap : new Array(),
  root : {},
  freeList : null,
  //object set heap
  chunk : function(obj){
    var l = this.freeList;
    if(l.length == 0){
       alert('heap is nothing!'); 
    }
    var i = l[0];
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
  //output heap
  heapLog : function(){
    var table = document.getElementById('heapTable');
    table.innerHTML="";
    var h = this.heap;
    var row; 
    for (var i=0; i < h.length; i++) {
      if(i%10 == 0){
        row = document.createElement('div'); 
        row.className = 'list';
        table.appendChild(row);
      }
      var cell = document.createElement('li');
      if(h[i]){
        cell.className = (h[i].mark ? 'mark':'');
        cell.innerText = h[i].value;
      }else{
        cell.className = 'null';
        cell.innerText = "*Null";
      }
      row.appendChild(cell);
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
    var h = this.heap;
    var array = new Array();

    for(var i=0; i<this.HEAP_SIZE; i++){
      if(!h[i]){
        array.push(i); 
        continue;
      }
      if(h[i].mark){
        h[i].mark = false;
      }else{
        // h[i].value = null;
        h[i] = null;
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
