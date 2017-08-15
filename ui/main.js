console.log('Loaded!');
var element = document.getElementById("main-text");
element.innerHTML="New Value";
var img = document.getElementById("madi");
var marginleft = 0;
function moveRight(){
    marginleft = marginleft + 10;
    img.style.marginleft + "px";
}
img.onClick= function(){
    var interval = setInterval(moveRight , 100);
};