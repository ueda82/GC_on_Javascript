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
    var row,cell; 
    for (var i=0; i < h.length; i++) {
      //create new row
      if(i%10 == 0){
        row = document.createElement('div'); 
        row.className = 'list';
        table.appendChild(row);
      }
      //create new cell 
      cell = document.createElement('li');
      if(h[i]){
        cell.className = (h[i].mark ? 'mark' : '');
        cell.innerText = h[i].value;
      }else{
        cell.className = 'null';
        cell.innerText = "*Null";
      }

      row.appendChild(cell);
    };
  },
  rootLog : function(){
    var table = document.getElementById('rootTable');
    table.innerHTML="";
    var r = this.root;
    var row,cell; 
    var i = 0;
    for (name in r) {
      //create new row
      if(i% 5 == 0){
        row = document.createElement('div'); 
        row.className = 'list root';
        table.appendChild(row);
      }
      //create new cell 
      var obj = r[name];
      cell = document.createElement('li');
      cell.className = (obj.isGcObject ? 'mark' : '');
      var s = obj instanceof Array? 'Array[' + obj.length + ']'
        : typeof obj == "object" & "value" in obj ? obj.value 
        : obj;
      cell.innerText = name +' = '+ s;
      row.appendChild(cell);
      i++;
    };
  },
  
  mark : function(obj){
    for(var s in obj){
      var prop = obj[s];
      if(typeof prop == 'object'){
        var visitAleady = prop.isGcObject && prop.mark;
        if(prop.isGcObject && !prop.mark){
          prop.mark = true;
        }
        if(!visitAleady){
          this.mark(prop);
        }
      }
    }
    this.heapLog();
    this.rootLog();
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
    this.heapLog();
    this.rootLog();
  },
  compaction : function(){
    var h = this.heap;
    var copyAdress = 0;
    for(var i=0; i<this.HEAP_SIZE; i++){
      if(!h[i]){
        continue;
      }
      if(h[i].mark){
        h[i].mark = false;
        h[copyAdress] =h[i]; 
        copyAdress = copyAdress + 1;
      }
    }
    //after copyAdress List clear 
    var array = new Array();
    for(var i=copyAdress; i<this.HEAP_SIZE; i++){
      array.push(i); 
      if(h[i]){
        h[i] = null;
      }
    }
    this.freeList = array;  
    this.heapLog();
    this.rootLog();
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
