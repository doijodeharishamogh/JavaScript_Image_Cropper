dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.getElementById("btn").addEventListener("click", changebutton);
function changebutton(){
  if(document.getElementById("btn").innerHTML=="Crop"){
    crop()
  }else{
    document.getElementById("btn").innerHTML = "Crop";
  var v="visible";
  document.getElementById("mydiv").style.visibility = v;
  }
};

var h,w,t,l;
/*function to crop the image*/ 
function crop(){
    var element = document.getElementById("mydiv");
    var positionInfo = element.getBoundingClientRect();
    h = (positionInfo.height);
    w = (positionInfo.width);
    t = (positionInfo.top)-8;
    l = (positionInfo.left)-8;
    console.log(h);
    console.log(w);
    console.log(t);
    console.log(l);
    topline=t+11;
    rightline=l+w-11;
    bottomline=t+h-11;
    leftline=l+11;
    console.log(topline);
    console.log(rightline);
    console.log(bottomline);
    console.log(leftline);
    document.getElementById("srcimg").style.clip = "rect("+topline+","+rightline+","+bottomline+","+leftline+")";
    document.getElementById("mydiv").style.visibility = "hidden";
}

/*Function to make div resizable*/ 
var resizable = document.querySelector('#mydiv'),
    resizerlb = document.querySelector( '.resizerlb' ),resizerrb = document.querySelector( '.resizerrb' ),resizerrt = document.querySelector( '.resizerrt' ),resizerlt = document.querySelector( '.resizerlt' ),
    startX, startY, startWidth, startHeight;
    
resizerlb.addEventListener( 'mousedown', initDrag, false );
resizerrb.addEventListener( 'mousedown', initDrag, false );
resizerrt.addEventListener( 'mousedown', initDrag, false );
resizerlt.addEventListener( 'mousedown', initDrag, false );

    
function initDrag( e ) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt( document.defaultView.getComputedStyle( resizable ).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle( resizable ).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag, false);
   document.documentElement.addEventListener('mouseup', stopDrag, false);
}

function doDrag(e) {
   resizable.style.width = (startWidth + e.clientX - startX) + 'px';
   resizable.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);    
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
}
/*function to remove all event listners on page unload*/
window.addEventListener("onunload",function(){
  document.getElementById("btn").removeEventListener("click", changebutton);
  resizerlb.removeEventListener( 'mousedown', initDrag, false );
  resizerrb.removeEventListener( 'mousedown', initDrag, false );
  resizerrt.removeEventListener( 'mousedown', initDrag, false );
  resizerlt.removeEventListener( 'mousedown', initDrag, false );
});
