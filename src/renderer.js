const startbutton = document.getElementById("start-button");
const exitButton = document.getElementById("exit-button");
const playButton = document.getElementById("play-button");
//Discord and Web Buttons
const discordbutton = document.getElementById("discord-button");
const websitebutton = document.getElementById("website-button");
//const gitPullOrClone = require('git-pull-or-clone');
const { DownloaderHelper } = require('node-downloader-helper');
const decompress = require('decompress');
const fs = require('fs');
const percentage_text = document.getElementById("percentage");
const downloadinfo = document.getElementById("download-info");
var percentage;
var state = "start";
var github1,github2;
var data,data2;
let ultima_dir = "";
let install_dir = "";
var executablePath = "D:\\Cata\\CataWithClassic\\ClassicUO.exe";
var child = require('child_process').execFile;
//localStorage.setItem("installDir", install_dir);
localStorage.setItem("ultimaDir", ultima_dir);
let inputWindow;
//const dirfile = require("./dir_input.js");

//const abouthtml = require("./about.js");
//const progress_container = document.getElementById("progress-containers");



const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const path = require('path');

/*function discord(){
    require("electron").shell.openExternal("https://discord.gg/5hmaB2m");
 }


function website(){
    require("electron").shell.openExternal("http://www.cataclysmuo.com/");
 }


discordbutton.onclick = discord;
websitebutton.onclick = website;
*/
//Close main window
const remote = require('electron').remote;
document.getElementById("close-btn").addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       window.close();
  });

//Open the game
document.getElementById("play-button").addEventListener("click", function (e) {
	var exec = require('child_process').execFile;
                                                exec(executablePath, function(err, data) {
                                                    console.log(err)
                                                    console.log("Opening ClassicUO.exe");
                                                });

});
document.getElementById("cancel-button").style.visibility = "hidden";

function changeCancel(){
	document.getElementById("cancel-button").style.visibility = "visible";
	document.getElementById("start-button").style.visibility = "hidden";
}

function newWindow(){
    inputWindow = new BrowserWindow({
      width: 800,
      height: 600,
      resizable: false,
      webPreferences:{
        nodeIntegration:true,
      }
    });
    inputWindow.removeMenu();
    inputWindow.loadFile(path.join(__dirname, 'dir_input.html'));
    // inputWindow.webContents.openDevTools();
}


//Set the CUO dir first
//If set, show the play button.  If not allow the user to install
//Needs '\\' for path
fs.stat('D:\\Cata\\CataWithClassic\\ClassicUO.exe', function(err) {
    if (!err) {
        document.getElementById("start-button").style.visibility = "hidden";
		document.getElementById("play-button").style.visibility = "visible";
    }
    else if (err.code === 'ENOENT') {
        document.getElementById("start-button").style.visibility = "visible";
		document.getElementById("play-button").style.visibility = "hidden";
    }
});

async function start(){
    if(state === "start"){
        data = 0;
        data2 = 0;
        percentage = 0;


        startbutton.classList.remove('btn-primary');
        startbutton.classList.add('btn-danger');
		 //document.getElementById("start-button").src = '../src/Images/Buttons/cancelBig.png';
		changeCancel();


        state = "Cancel"

        fs.mkdir("./downloads/", function(){
            console.log("Created Download Folder");
        });

        github1 = new DownloaderHelper('https://github.com/andreakarasho/ClassicUO/releases/download/ClassicUO-dev-preview/ClassicUO-dev-preview-release.zip', `./downloads/`);
        github2 = new DownloaderHelper('https://github.com/markdwags/Razor/releases/download/Razor-dev-preview/Razor-dev-preview.zip', `./downloads/`);
        github1.on('end', () => console.log('Download #1 Completed'))
        github2.on('end', () => console.log('Download #2 Completed'))

        github1.start().then(function(){
            github2.start().then(function(){
                if(state === "Cancel"){
                    if(data != 0){
                        data = 0;
                        percent = 0;
                        NProgress.done();
                    }
                    if(data2 != 0){
                        data2 = 0;
                        percent = 0;
                        NProgress.done();
                    }
                    percentage_text.innerText = `0% 3/3`
                    fs.mkdir("./extracted-files/", function(){
                        console.log("Created New Folder");
                    });

                    decompress('./downloads/ClassicUO-dev-preview-release.zip', './extracted-files/').then(function(){
                        NProgress.set(0.0);
                        NProgress.set(0.50);
                        percentage_text.innerText = `50% 3/3`
                        console.log('done extracting first file!');
                        downloadinfo.innerText = "Extracting ClassicUO zip file...";
                    }).then(function(){
                        fs.mkdir("./extracted-files/Razor", function(){
                            console.log("Create Razor Plugin Folder");
                        });
                        decompress('./downloads/Razor-dev-preview.zip', './extracted-files/Razor').then(function(){
                            NProgress.done();
                            percentage_text.innerText = `100% 3/3`
                            console.log('done extracting second zip-file!');
                            downloadinfo.innerText = "Extracting Razor Plugin zip file...";
                        }).then(function(){
                            if(!fs.existsSync("./extracted-files/settings.json")){
                                console.log("Settings.json does not exist, generating....");
                                downloadinfo.innerText = "Settings.json does not exist, generating...";
                                console.log("Asking user for input");

                                newWindow();
                                function loop(){
                                    varfile = require("./var.json");
                                    if(ultima_dir === "" ||  ultima_dir === undefined){
                                        ultima_dir = localStorage.getItem("ultimaDir");

                                        console.log("DIRECTORY IS EMPTY");
                                        setTimeout(loop, 1000)
                                        console.log(ultima_dir)
                                    }else{
                                        let settings = {
                                            "username": "",
                                            "password": "",
                                            "ip": "login.cataclysmuo.com",
                                            "port": 2593,
                                            "ultimaonlinedirectory": `${ultima_dir}`,
                                            "clientversion": "5.0.8.3",
                                            "lastcharactername": "",
                                            "cliloc": "Cliloc.enu",
                                            "lastservernum": 1,
                                            "fps": 60,
                                            "window_position": null,
                                            "window_size": null,
                                            "is_win_maximized": true,
                                            "profiler": true,
                                            "saveaccount": false,
                                            "autologin": false,
                                            "reconnect": false,
                                            "reconnect_time": 0,
                                            "login_music": true,
                                            "login_music_volume": 70,
                                            "shard_type": 0,
                                            "fixed_time_step": true,
                                            "run_mouse_in_separate_thread": true,
                                            "use_verdata": false,
                                            "encryption": 0,
                                            "plugins": ["./extracted-files/Razor/Razor.exe"]
                                        }
                                        let received_setting_data = JSON.stringify(settings);
                                        fs.writeFileSync('./extracted-files/settings.json', received_setting_data)
                                        console.log("Generated JSON file!");
                                        downloadinfo.innerText = "Generated JSON file!";
                                        settingfile = true;

                                        startbutton.classList.remove('btn-danger');
                                        startbutton.classList.add('btn-primary');
                                        startbutton.innerText = "Install";
                                        percentage_text.innerText = ``
                                        state = "start"
                                        data = 0;
                                        data2 = 0;
                                        percent = 0;
                                        inputWindow.close();


                                        function checker(){
                                            if(settingfile){
                                                var exec = require('child_process').execFile;
                                                exec('./extracted-files/ClassicUO.exe', function(err, data) {
                                                    console.log(err)
                                                    console.log("Opening ClassicUO.exe");
                                                });
                                                settingfile = false;
                                            }else if(!settingfile){
                                                console.log("NO input given");
                                            }
                                        }

                                        setTimeout(checker,1000);


                                    }
                                }

                                loop();

                            }else if(fs.existsSync("./extracted-files/settings.json")){
                                console.log("Settings.json already exists!");
                                downloadinfo.innerText = "Settings.json already exists!";
                                //const settingsfile = require("./extracted-files/settings.json");
                            }

                            // startbutton.classList.remove('btn-danger');
                            // startbutton.classList.add('btn-primary');
                            // startbutton.innerText = "Install";
                            // percentage_text.innerText = ``
                            // state = "start"
                            // data = 0;
                            // data2 = 0;
                            // percent = 0;
                        })
                    })
                }
            });
        });

        github1.on("progress", function(){
            data += 1;
            var percent = (data/1933) * 100
            percentage_text.innerText = `${Math.round(percent)}% 1/3`
            NProgress.set(percent/100);
            downloadinfo.innerText = "Downloading ClassicUO zipfile..."
        })

        github2.on("progress", function(){
            data2 += 1;
            var percent = (data2/287) * 100
            percentage_text.innerText = `${Math.round(percent)}% 2/3`
            NProgress.set(percent/100);
            downloadinfo.innerText = "Downloading Razor Plugin zipfile..."
        })



    }else if(state === "Cancel"){
        NProgress.done();
        data = 0;
        data2 = 0;
        github1.stop().then(function (){
            github2.stop()
        })


        percentage = 0;
        percentage_text.innerText = ""
        startbutton.classList.remove('btn-danger');
        startbutton.classList.add('btn-primary');
        startbutton.innerText = "Install";
        state = "start"
        downloadinfo.innerText = "";
    }



    //NProgress.configure({ parent: prograsscontainer });
 }



try{
    startbutton.onclick = start;
}catch{
    console.log();
}
