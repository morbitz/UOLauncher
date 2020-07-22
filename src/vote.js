const uoPortalbutton = document.getElementById("uoPortal-button");
const uoGatewaybutton = document.getElementById("uoGateway-button");
const uoXtremebutton = document.getElementById("uoXtreme-button");
const uoTop100button = document.getElementById("uoTop100-button");
const uoMPOGbutton = document.getElementById("uoMPOG-button");
const uoTopFreeGamebutton = document.getElementById("uoTopFreeGame-button");
const abouttext = document.getElementById("stepinfo");

text =`
Little snippet about voting and thanks yadayada`;


abouttext.innerHTML = text;

function uoTop100(){
    require("electron").shell.openExternal("https://gtop100.com/topsites/Ultima-Online");
 }
 
function uoPortal(){
    require("electron").shell.openExternal("http://uoportal.com/vote/149");
 }

 function uoGateway(){
    require("electron").shell.openExternal("https://www.uogateway.com/shard.php?id=888&act=vote");
 }
 
 function uoXtreme(){
    require("electron").shell.openExternal("http://www.xtremetop100.com/in.php?site=1132359549");
 }
 
 function uoMPOG(){
   require("electron").shell.openExternal("https://mpogtop.com/ultima-online-uo/1");
 }
 
 function uoTopFreeGame(){
    require("electron").shell.openExternal(" http://www.topfreegameservers.com/");
 }

 
uoTop100button.onclick = uoTop100;
uoPortalbutton.onclick = uoPortal;
uoGatewaybutton.onclick = uoGateway;
uoXtremebutton.onclick = uoXtreme;
uoMPOGbutton.onclick = uoMPOG;
uoTopFreeGamebutton.onclick = uoTopFreeGame;