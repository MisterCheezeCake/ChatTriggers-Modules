/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
// Imports
import FileUtilities from "../FileUtilities/main";
import Settings from "./src/configfile";
import request from "requestv2/index";
import Keybinds from "./src/keybinds";
import {Changelog} from "../ChangelogApi/index";
import {blackListURL , notDev, prefix, refreshHelpClickCommand, requestHelpClickCommand, installCSHelpClickCommands, sbCCHelpClickCommand, sbkeybindClickCommand, installMSG, noThankYou} from "./src/constants";
const File = Java.type("java.io.File")
register("tick", () => Keybinds.tick())
// Function Declarations
function createConditionaly(file, content) {
    if (new File(file).exists()) return false;
    FileLib.write(file, content);
    return true;
}
// Var Dec
let devMode = false;
let blackListR = 'text';
let cooldown = 0;
let seenMSG = false;
createConditionaly(`${Config.modulesFolder}/SkyBlockKeybinds/dep/hasMod.txt`, 'false')
createConditionaly(`${Config.modulesFolder}/SkyBlockKeybinds/RF.txt`, 'false')
let hasCSMod = FileLib.read("SkyBlockKeybinds/dep","hasMod.txt");
// Cooldown Ticker
register("step", () => {
    cooldown--
}).setFps(1)
// Webhook Fetcher

register("command", () => Settings.openGUI()).setName("sbkeybind");
// Changelog
const cl = new Changelog('SkyBlockKeybinds', '&e1.5.0', `&aAdded new request backend`);
cl.writeChangelog();
// CS installer
// This part is for the first install:
register("step", () => {
    if (hasCSMod == "false" && seenMSG == false) {
        if (FileUtilities.exists("./mods/1.8.9/Controls Saved 1.0.0.2 (Forge 1.8.9).jar") || FileUtilities.exists("./mods/Controls Saved 1.0.0.2 (Forge 1.8.9).jar") ||/* These are here since in the past versions I named the jar CSM.jar => */ FileUtilities.exists("./mods/CSM.jar") || FileUtilities.exists("./mods/1.8.9/CSM.jar")) {
            seenMSG = true;
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
            return;
        }
        ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ');
        ChatLib.chat(installMSG);
        ChatLib.chat(noThankYou);
        seenMSG = true;
    }

}).setFps(1).setDelay(15);
if (hasCSMod == "false") {
    if (FileUtilities.exists("./mods/1.8.9/Controls Saved 1.0.0.2 (Forge 1.8.9).jar") || FileUtilities.exists("./mods/Controls Saved 1.0.0.2 (Forge 1.8.9).jar") || FileUtilities.exists("./mods/CSM.jar") || FileUtilities.exists("./mods/1.8.9/CSM.jar")) {
        seenMSG = true;
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
    }
    if (seenMSG !== true) { // Presumibly because of the execution context, the mod yells at me when I put a return statement here so this it is
    ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ');
    ChatLib.chat(installMSG);
    ChatLib.chat(noThankYou);
    seenMSG = true;
    }
}
// SBK
register("command", (arg1, arg2, arg3) => {
    if (arg1 === undefined || arg1 === "help") {
      ChatLib.chat('&8--------------- ' + prefix + '&8---------------')  ;
      ChatLib.chat(sbkeybindClickCommand);
      ChatLib.chat(sbCCHelpClickCommand);
      ChatLib.chat(installCSHelpClickCommands);
      ChatLib.chat(requestHelpClickCommand);
      ChatLib.chat(refreshHelpClickCommand);
    } else if (arg1 === "installcs") {
        if (FileUtilities.exists("./mods/1.8.9"))
        {
            FileUtilities.copyFile(`${Config.modulesFolder}/SkyblockKeybinds/dep/Controls Saved 1.0.0.2 (Forge 1.8.9).jar`, "./mods/1.8.9/Controls Saved 1.0.0.2 (Forge 1.8.9).jar", true);
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.');
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        } else {
                FileUtilities.copyFile(`${Config.modulesFolder}/SkyblockKeybinds/dep/Controls Saved 1.0.0.2 (Forge 1.8.9).jar`, "./mods/Controls Saved 1.0.0.2 (Forge 1.8.9).jar", true);
                ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.');
                FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        }
    } else if (arg1 === "sayno") {
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aOkay, you wont be shown this message again.');
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
    } else if (arg1 === "devmode") {
        if (devMode === false) {
            devMode = true
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aDeveloper Mode Enabled');
        } else if (devMode === true) {
            devMode = false
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &cDeveloper Mode Disabled');
        }
    } else if (arg1 === "settings") {
        ChatLib.command('sbkeybind', true);
    } else if (arg1 === "cchelp") {
        ChatLib.chat(prefix + '&aTo use custom commands, input the commands in the &e/sbkeybind &asettings menu. If the command is for a mod or another module, the Client Side option should be set to on. &cDO NOT PUT "&e/&c" in the command input.');
    } else if (arg1 === 'request') {
        ChatLib.chat(`${prefix}&aTry using &e/sbkrequest &ainstead`)
    } else if (arg1 === 'refreshremote'){
        ChatLib.chat(`${prefix}&aRefreshing remote data`);
        let preB = blackListR
        request(blackListURL).then(res => {
            blackListR = res;
          }).catch(e => print(JSON.stringify(e)));
        ChatLib.chat(`${prefix}&aRefreshed remote data`)
        if (!devMode) return;
        ChatLib.chat(`${prefix}&aPrevious Data: &eBlacklist&f: ${preB}`)
        ChatLib.chat(`${prefix}&aNew Data: &eBlacklist&f: ${blackListR}`)
    } else if (arg1 === 'eval'){      
        if (devMode === true || Player.getUUID === '6a24734e-7d9f-4abf-bf9e-c56bf5428f1b') {
            try {
                let evaled = eval(arg2)
                let codeTC = new TextComponent(`${prefix}&aEvaluated Code:&f ${arg2}`).setClick("run_command", `/ct copy ${arg2}`).setHoverValue("&3Copy the evaluated code");
                ChatLib.chat(codeTC);
                let itsAStringNow = arg3 || "notjson"
                if (itsAStringNow.toLocaleLowerCase() === 'json') {
                    let resultTC = new TextComponent(`${prefix}&aResult&f: ${JSON.stringify(evaled)}`).setClick("run_command", `/ct copy ${JSON.stringify(evaled)}`).setHoverValue("&3Copy the result");
                    ChatLib.chat(resultTC)
                } else {
                    let resultTC2 = new TextComponent(`${prefix}&aResult&f: ${evaled}`).setClick("run_command", `/ct copy ${evaled}`).setHoverValue("&3Copy the result");
                    ChatLib.chat(resultTC2)
                }
            } catch (error) {
                let errorTC = new TextComponent(`${prefix}&cError: &f${error}`).setClick("run_command", `/ct copy ${error}`).setHoverValue("&cCopy the error");
                ChatLib.chat(errorTC)
            }
        } else if (devMode === false) {
            ChatLib.chat(notDev);
        }
    } else {
        ChatLib.chat(prefix + '&cInvalid Command. &e/sbk help&c for a list of commands');
    }
  }).setTabCompletions(["settings", "help", "cchelp", "installcs", "request", "refreshremote"]).setName("sbk");
// Request Commands
register("command", function() {
    let usedBefore= FileLib.read('SkyBlockKeybinds', 'RF.txt');
    request(blackListURL).then(res => {
        blackListR = res;

      }).catch(e => print(JSON.stringify(e)));
    if (usedBefore === 'false') {
        ChatLib.chat(`${prefix}&aThis is your first time using the request command, this command is meant to allow you to easily request keybinds and features to be added to the mod. &cDo not abuse this or you will be blacklisted from the command`);
        ChatLib.chat(`${prefix}&aIf you would like to make a request, run the command again`)
        FileLib.write('SkyBlockKeybinds', 'RF.txt', 'true');
    }
    if (usedBefore === 'false') return;
    if (cooldown > 0 ) {
        ChatLib.chat(`${prefix}&aYou are currently on cooldown, try again in &e${cooldown} &aseconds`);
    }
    if (cooldown > 0) return;
    if (blackListR.includes(Player.getUUID())) {ChatLib.chat(`${prefix}&cThere was an error performing your request. The error was: BlacklistExecption: You are blacklisted from making requests.`); return;}
    let thingToSend = [].slice.call(arguments).join(" ") // I make best variable names
    if (thingToSend == false) {
        ChatLib.chat(`${prefix}&cYou can't send an empty request!`)
        return;
    }
    try {
        request({

            url: "http://backend.mistercheezecake.xyz/",
            method: 'POST',       
            headers: {
                'Content-type': 'application/json',
                "User-Agent":"Mozilla/5.0"
            },
            body: {         
                text: thingToSend,
                uuid: Player.getUUID(),
                module: "SkyBlockKeybinds"
            }                 
                           
        }).then(data => {
            if (data === "Request Complete") {
            ChatLib.chat(`${prefix}&aRequest Sucessful`);
            } else ChatLib.chat(`${prefix}&cThe module recived unrecognized data from the backend`)
        }).catch(e => {
            ChatLib.chat(`${prefix}&cThere was an error. ${e}`)
        })
        cooldown = 600;
    } catch (err) {
       ChatLib.chat(`${prefix}&cThere was an error that was not caught by built in error handling, check console for details`);
       console.error(err)
    } 
}).setName("sbkrequest")
// Keybinds

/* Release Notes

    1.0.0 - Init
    1.0.1 - Fixed CS Installer Prompt on initial install
    1.1.0 - Custom Commands and Keybinds (see Keybind Comments) - The Custom Command Update
    1.2.0 - Switched to Vigilance | Internal Note: Added bug with config reseting - The Config Update
    1.2.1 - Fixed Config Bug and added Keybind for Storage
    1.2.2 - Keybinds (see Keybind Comments)
    1.3.0 - Added /sbkrequest command - The Request Update
    1.3.1 - Readded the request try-catch
    1.3.2 - Optimized thanks to Kerby
    1.4.0 - Add to Chat History and Keybinds (see Keybind Comments) - The Chat Update
    1.5.0 - File Split, some misc stuff ive been wanting to do. - The Radom Stuff Update

*/
