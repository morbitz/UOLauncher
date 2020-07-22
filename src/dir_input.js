const enterbutton = document.getElementById("enterbutton");
let uo_dir = document.getElementById("uodir");
const succes_text = document.getElementById("succestext");
let varfile = require("./var.json");
const {dialog} = require('electron');
console.log(dialog);

//succes_text.innerText = "";

function setdirectory(){
    var ultima_dir = localStorage.getItem("ultimaDir");
    localStorage.setItem("ultimaDir", uo_dir.value);
    succes_text.innerText = "Changed Directory!";
    console.log("Done");
}

function selectDownloadPath () {
 dialog.showOpenDialog({properties: ['openDirectory']},function (path) {
  if(path){
   fs.access(path[0], fs.R_OK&&fs.W_OK, function(err) {
     if(err){
      prompt.alert(translate('Cannot select this folder'));
     }else{
      settingsForm.find('input[name="downloadpath"]').val(path[0]);
     }
    });
  }
 });
}


function pickGameFolder() {
  console.log("gamefolder");
  var gameFolder = dialog.showOpenDialog({
    title: 'Select your games folder',
    message: 'Select your games folder',
    properties: ['openDirectory']
  });

  if (!gameFolder) {
    return false;
  }
  return gameFolder[0];
}


enterbutton.onclick = pickGameFolder;
