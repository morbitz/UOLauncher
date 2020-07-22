const discordbutton = document.getElementById("discord-button");
const websitebutton = document.getElementById("website-button");
const abouttext = document.getElementById("stepinfo");

text = `
Welcome to Cataclysm!<br>
This launcher was designed to help install and patch the latest Cataclysm Ultima Online files<br><br>
${"NOTE:".bold()} This script will perform the following steps, so please review first:<br><br>
1) Download the latest ClassicUO,Razor dev build to: ${__dirname}\\downloads<br><br>
2) Extract both zip-files to:  ${__dirname}\\extracted-files<br><br>
3) Help with setting up the initial settings.json file if it doesn't exist`;


abouttext.innerHTML = text;


function discord(){
    require("electron").shell.openExternal("https://discord.gg/5hmaB2m");
 }

 
 function website(){
    require("electron").shell.openExternal("http://www.cataclysmuo.com/");
 }


discordbutton.onclick = discord;
websitebutton.onclick = website;