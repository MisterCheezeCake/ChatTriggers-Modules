/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import FileUtilities from "../FileUtilities/main";;
import Settings from "./configfile";
import request from "requestv2/index";
let requestURL
let blackListR = 'text'
let cooldown = 0
register("step", () => {
    cooldown--
}).setFps(1)
const webHookURL = 'https://gist.githubusercontent.com/MisterCheezeCake/db00d9b06f8ad09042d55010e41c4e5f/raw/425ee83b60508f618424d74b02188fd99c547552/sbkurl.txt'
request(webHookURL).then(res => {
    requestURL = res;
  }).catch(e => print(JSON.stringify(e)));
register("command", () => Settings.openGUI()).setName("sbkeybind");
// Changelog
import {Changelog} from "../ChangelogApi/index";
const cl = new Changelog('SkyBlockKeybinds', '&e1.4.0', `&aAdded keybinds for Stash, Guild, Events, and Jerry's Workshop. Also added an option to add command to chat history`);
cl.writeChangelog();

// Variable Declarations
let hasCSMod = FileLib.read("SkyBlockKeybinds/dep","hasMod.txt");
const installMSG = new TextComponent("&2&lClick to Install Controls Saved Mod").setClick("run_command", "/sbk installcs").setHoverValue("&3Click to install the mod into your mods folder");
const noThankYou = new TextComponent("&4&lClick to decline installation").setClick("run_command", "/sbk sayno").setHoverValue("&3Click to say no to installing the mod");
const sbkeybindClickCommand = new TextComponent("&0&l- &e/sbkeybind &aopens the settings menu for custom commands and frag bots").setClick("run_command", "/sbkeybind").setHoverValue("&3Click to run the command");
const sbCCHelpClickCommand = new TextComponent("&0&l- &e/sbk cchelp &aPrints the help message for custom commands").setClick("run_command", "/sbk cchelp").setHoverValue("&3Click to run the command");
const installCSHelpClickCommands = new TextComponent("&0&l- &e/sbk installcs &aInstall the controls saved mod").setClick("run_command", "/sbk installcs").setHoverValue("&3Click to run the command");
const requestHelpClickCommand = new TextComponent("&0&l- &e/sbkrequest &aRequest a feature or keybind for the mod").setClick("suggest_command", "/sbkrequest textHere").setHoverValue("&3Click to add the command to your text box");
const prefix = '&f[&6SkyBlock Keybinds&f] ';
const notDev = '&f[&6SkyBlock Keybinds&f] &cThis is a developer command. You are not allowed to use this. ';
let devMode = false;
// CS installer
// This part is for the first install:
let seenMSG = false;
register("step", () => {
    if (hasCSMod == "false" && seenMSG == false) {
        ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ');
        ChatLib.chat(installMSG);
        ChatLib.chat(noThankYou);
        seenMSG = true;
    }

}).setFps(1).setDelay(15);
if (hasCSMod == "false") {
    ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ');
    ChatLib.chat(installMSG);
    ChatLib.chat(noThankYou);
    seenMSG = true;
}
// SBK
register("command", function(arg1, arg2) {
    if (arg1 == undefined || arg1 == "help") {
      ChatLib.chat('&8--------------- ' + prefix + '&8---------------')  ;
      ChatLib.chat(sbkeybindClickCommand);
      ChatLib.chat(sbCCHelpClickCommand);
      ChatLib.chat(installCSHelpClickCommands);
      ChatLib.chat(requestHelpClickCommand)
    } else if (arg1 == "installcs") {
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aAttempting to install Controls Saved mod into your mods folder');
        if (FileUtilities.exists("./mods/1.8.9"))
        {
            FileUtilities.copyFile("./config/ChatTriggers/modules/SkyblockKeybinds/dep/CSM.jar", "./mods/1.8.9/CSM.jar", true);
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.');
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        } else {
        FileUtilities.copyFile("./config/ChatTriggers/modules/SkyblockKeybinds/dep/CSM.jar", "./mods/CSM.jar", true);
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.');
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        }
    } else if (arg1 == "sayno") {
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aOkay, you wont be shown this message again.');
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
    } else if (arg1 == "devmode") {
        if (devMode === false) {
            devMode = true
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aDeveloper Mode Enabled');
        } else if (devMode === true) {
            devMode = false
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &cDeveloper Mode Disabled');
        }
    } else if (arg1 == "settings") {
        ChatLib.command('sbkeybind', true);
    } else if (arg1 == "cchelp") {
        ChatLib.chat(prefix + '&aTo use custom commands, input the commands in the &e/sbkeybind &asettings menu. If the command is for a mod or another module, the Client Side option should be set to on. &cDO NOT PUT "&e/&c" in the command input.');
    } else if (arg1 == "rewritehasmod") {
        if (devMode === true) {
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "false");
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aSucessfully rewrote file');
            } else if (devMode === false) {
                ChatLib.chat(notDev)
            }
    } else if (arg1 === 'request') {
        ChatLib.chat(`${prefix}&aTry using &e/sbkrequest &ainstead`)
    } else {
        ChatLib.chat(prefix + '&cInvalid Command. &e/sbk help&c for a list of commands');
    }
  }).setTabCompletions(["settings", "help", "cchelp", "installcs", "request"]).setName("sbk");
let ctr;
register("command", arg1 => {
    if (devMode === true) {
        ctr = arg1;
        eval(ctr);
    ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aEval Completed');
    } else if (devMode === false) {
        ChatLib.chat(notDev);
    } 
  }).setName("sbkeval");
  // I tried an args array ... it did not work
register("command", function() {
    let usedBefore= FileLib.read('SkyBlockKeybinds', 'RF.txt');
    let userPerson = Player.getUUID();
    let blackListURL = 'https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/Managment/SBKBlacklist.txt';
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
    try {
        request({

            url: requestURL,
            method: 'POST',       
            headers: {
                'Content-type': 'application/json',
                "User-Agent":"Mozilla/5.0"
            },
            body: {         
                // I would do an embed but I cant be bothered to set that up
                content: "Request: `" + thingToSend + '`\nSubmitted by: `' + userPerson + '`'
            }                 
                           
        });
        ChatLib.chat(`${prefix}&aRequest Sucessful`);
        cooldown = 120;
    } catch (err) {
       ChatLib.chat(`${prefix}&cThere was an error. Try running &e/ct load &cand try again.`);
        console.log(err);
    } 
}).setName("sbkrequest")
// Command Updater

// Add to chat history
function addC(msg) {
    if (Settings.chatHistory === false) return;
    let fmsg = `/${msg}`
    Client.getMinecraft().field_71456_v.func_146158_b().func_146239_a(fmsg)
}
// Keybinds
KeybindVar = new SBKeybindFunc();

register("tick", function() {
	KeybindVar.tick();
})
function SBKeybindFunc() {
	this.key = new KeyBind("Auction House", 0, "SBK - Comerce");
	this.key2 = new KeyBind("Bazzar", 0, "SBK - Comerce");
	this.key3 = new KeyBind("Leave Party", 0, "SBK - Party");
	this.key4 = new KeyBind("Party List", 0, "SBK - Party");
	this.key5 = new KeyBind("Warp Party", 0, "SBK - Party");
	this.key6 = new KeyBind("Reparty", 0, "SBK - Party");
    this.key7 = new KeyBind("Join Floor 1", 0, "SBK - Dungeons");
    this.key8 = new KeyBind("Join Floor 2", 0, "SBK - Dungeons");
    this.key9 = new KeyBind("Join Floor 3", 0, "SBK - Dungeons");
    this.key10 = new KeyBind("Join Floor 4", 0, "SBK - Dungeons");
    this.key11 = new KeyBind("Join Floor 5", 0, "SBK - Dungeons");
    this.key12 = new KeyBind("Join Floor 6", 0, "SBK - Dungeons");
    this.key13 = new KeyBind("Join Floor 7", 0, "SBK - Dungeons");
    this.key14 = new KeyBind("Party Fragbot 1", 0, "SBK - Dungeons");
    this.key15 = new KeyBind("Party Fragbot 2", 0, "SBK - Dungeons");
    this.key16 = new KeyBind("Party Fragbot 3", 0, "SBK - Dungeons");
    this.key17 = new KeyBind("Home", 0, "SBK - Warps");
    this.key18 = new KeyBind("Hub", 0, "SBK - Warps");
    this.key19 = new KeyBind("Spider's Den", 0, "SBK - Warps");
    this.key20 = new KeyBind("Blazing Fortress", 0, "SBK - Warps");
    this.key21 = new KeyBind("End", 0, "SBK - Warps");
    this.key22 = new KeyBind("Birch Park", 0, "SBK - Warps");
    this.key23 = new KeyBind("Gold Mine", 0, "SBK - Warps");
    this.key24 = new KeyBind("Deep Caverns", 0, "SBK - Warps");
    this.key25 = new KeyBind("Dwarven Mines", 0, "SBK - Warps");
    this.key26 = new KeyBind("Barn", 0, "SBK - Warps");
    this.key27 = new KeyBind("Mushroom Desert", 0, "SBK - Warps");
    this.key28 = new KeyBind("Dungeon Hub", 0, "SBK - Warps");
    this.key29 = new KeyBind("Cypts", 0, "SBK - MVP+ Warps");
    this.key30 = new KeyBind("Spider's Den Top", 0, "SBK - MVP+ Warps");
    this.key31 = new KeyBind("Hub Castle", 0, "SBK - MVP+ Warps");
    this.key32 = new KeyBind("Magma Boss Arena", 0, "SBK - MVP+ Warps");
    this.key33 = new KeyBind("Dark Auction", 0, "SBK - MVP+ Warps");
    this.key34 = new KeyBind("Dragon's Nest", 0, "SBK - MVP+ Warps");
    this.key35 = new KeyBind("Jungle Island", 0, "SBK - MVP+ Warps");
    this.key36 = new KeyBind("Howling Cave", 0, "SBK - MVP+ Warps");
    this.key37 = new KeyBind("Anvil", 0, "SBK - General SkyBlock");
    this.key38 = new KeyBind("Enchantment Table", 0, "SBK - General SkyBlock");
    this.key39 = new KeyBind("Craft", 0, "SBK - General SkyBlock");
    this.key40 = new KeyBind("Enderchest", 0, "SBK - General SkyBlock");
    this.key41 = new KeyBind("Pets", 0, "SBK - General SkyBlock");
    this.key42 = new KeyBind("Wardrobe", 0, "SBK - General SkyBlock");
    this.key43 = new KeyBind("Sea Creature Guide", 0, "SBK - General SkyBlock");
    this.key44 = new KeyBind("SkyBlock Settings", 0, "SBK - General SkyBlock");
    this.key45 = new KeyBind("SB Menu", 0, "SBK - General SkyBlock");
    this.key46 = new KeyBind("Skills Menu", 0, "SBK - General SkyBlock");
    this.key47 = new KeyBind("Collections Menu", 0, "SBK - General SkyBlock");
    this.key48 = new KeyBind("Minions Menu", 0, "SBK - General SkyBlock");
    this.key49 = new KeyBind("Recepie Book", 0, "SBK - General SkyBlock");
    this.key50 = new KeyBind("Quest Log", 0, "SBK - General SkyBlock");
    this.key51 = new KeyBind("Fast Travel", 0, "SBK - Warps");
    this.key52 = new KeyBind("Calender", 0, "SBK - General SkyBlock");
    this.key53 = new KeyBind("HOTM", 0, "SBK - Dwarven Mines");
    this.key54 = new KeyBind("Warp to Garry", 0, "SBK - Dwarven Mines");
    // Added in 1.1.0
    this.key55 = new KeyBind("Custom Command 1", 0, "SBK - Custom Commands");
    this.key56 = new KeyBind("Custom Command 2", 0, "SBK - Custom Commands");
    this.key57 = new KeyBind("Custom Command 3", 0, "SBK - Custom Commands");
    this.key58 = new KeyBind("Custom Command 4", 0, "SBK - Custom Commands");
    this.key59 = new KeyBind("Custom Command 5", 0, "SBK - Custom Commands");
    this.key60 = new KeyBind("Toggle Chat", 0, "SBK - Chats");
    this.key61 = new KeyBind("All Chat", 0, "SBK - Chats");
    this.key62 = new KeyBind("Party Chat", 0, "SBK - Chats");
    this.key63 = new KeyBind("Guild Chat", 0, "SBK - Chats");
    // Added in 1.2.1
    this.key64 = new KeyBind("Storage Menu", 0 , "SBK - General SkyBlock");
    // Added in 1.2.3
    this.key65 = new KeyBind("Bestiary", 0 , "SBK - General SkyBlock");
    this.key66 = new KeyBind("Warp to Forge", 0 , "SBK - Warps");
    this.key67 = new KeyBind("Join Master 1 ", 0 , "SBK - Dungeons");
    this.key68 = new KeyBind("Join Master 2", 0 , "SBK - Dungeons");
    this.key69 = new KeyBind("Join Master 3", 0 , "SBK - Dungeons");
    this.key70 = new KeyBind("Join Master 4", 0 , "SBK - Dungeons");
    this.key71 = new KeyBind("Join Master 5", 0 , "SBK - Dungeons");
    this.key72 = new KeyBind("Join Master 6", 0 , "SBK - Dungeons");
    this.key73 = new KeyBind("Join Master 7", 0 , "SBK - Dungeons");
    // Added in 1.4.0
    this.key74 = new KeyBind("Jerry Island", 0, "SBK - Warps");
    this.key75 = new KeyBind("Play SkyBlock", 0, "SBK General SkyBlock");
    this.key76 = new KeyBind("Profile Menu", 0, "SBK - General SkyBlock");
    this.key77 = new KeyBind("View Stash", 0, "SBK - Stash");
    this.key78 = new KeyBind("Pick Up Stash", 0, "SBK - Stash");
    this.key79 = new KeyBind("Clear Stash", 0, "SBK - Stash");
    this.key80 = new KeyBind("Guild Online", 0, "SBK - Guild");
    this.key81 = new KeyBind("Guild List", 0, "SBK - Guild");
    this.key82 = new KeyBind("Guild Top", 0, "SBK - Guild");
    this.key83 = new KeyBind("Guild Party", 0, "SBK - Guild");
    this.key84 = new KeyBind("Events", 0, "SBK - General SkyBlock")





	this.tick = function() {
		if (this.key.isPressed()) {
			ChatLib.command("ah");
            addC('ah');
		}
		if (this.key2.isPressed()) {
			ChatLib.command("bz");
            addC('bz');
		}
		if (this.key3.isPressed()) {
			ChatLib.command("p leave");
            addC('p leave');
		}
		
		if (this.key4.isPressed()) {
			ChatLib.command("p list");
            addC('p list');
		}
		if (this.key5.isPressed()) {
			ChatLib.command("p warp");
            addC('p warp');
		}
		if (this.key6.isPressed()) {
			ChatLib.command("reparty", true);
            addC('reparty');
		}
        if (this.key7.isPressed()) {
			ChatLib.command("joindungeon catacombs 1");
            addC('joindungeon catacombs 1');
            
		}
        if (this.key8.isPressed()) {
			ChatLib.command("joindungeon catacombs 2");
            addC('joindungeon catacombs 2');
		}
        if (this.key9.isPressed()) {
			ChatLib.command("joindungeon catacombs 3");
            addC('joindungeon catacombs 3');
		}
        if (this.key10.isPressed()) {
			ChatLib.command("joindungeon catacombs 4");
            addC('joindungeon catacombs 4');
		}
        if (this.key11.isPressed()) {
			ChatLib.command("joindungeon catacombs 5");
            addC('joindungeon catacombs 5');
		}
        if (this.key12.isPressed()) {
			ChatLib.command("joindungeon catacombs 6");
            addC('joindungeon catacombs 6');
		}
        if (this.key13.isPressed()) {
			ChatLib.command("joindungeon catacombs 7");
            addC('joindungeon catacombs 7');
		}
        if (this.key14.isPressed()) {
			ChatLib.command("p " + Settings.fragName1);
            addC(`p ${Settings.fragName1}`);
		}
        if (this.key15.isPressed()) {
			ChatLib.command("p " + Settings.fragName2);
            addC(`p ${Settings.fragName2}`);
		}
        if (this.key16.isPressed()) {
			ChatLib.command("p " + Settings.fragName3);
            addC(`p ${Settings.fragName3}`);
		}
        if (this.key17.isPressed()) {
			ChatLib.command("is");
            addC('is');
		}
        if (this.key18.isPressed()) {
			ChatLib.command("warp hub");
            addC('warp hub');
		}
        if (this.key19.isPressed()) {
			ChatLib.command("warp spider");
            addC('warp spider');
		}
        if (this.key20.isPressed()) {
			ChatLib.command("warp nether");
            addC('warp nether');
		}
        if (this.key21.isPressed()) {
			ChatLib.command("warp end");
            addC('warp end');
		}
        if (this.key22.isPressed()) {
			ChatLib.command("warp park");
            addC('warp park');
		}
        if (this.key23.isPressed()) {
			ChatLib.command("warp gold");
            addC('warp gold');
		}
        if (this.key24.isPressed()) {
			ChatLib.command("warp deep");
            addC('warp deep');
            
		}
        if (this.key25.isPressed()) {
			ChatLib.command("warp mines");
            addC('warp mines');
		}
        if (this.key26.isPressed()) {
			ChatLib.command("warp barn");
            addC('warp barn');
		}
        if (this.key27.isPressed()) {
			ChatLib.command("warp desert");
            addC('warp desert');
		}
        if (this.key28.isPressed()) {
			ChatLib.command("warp dungeon_hub");
            addC('warp dungeon_hub');
		}
        if (this.key29.isPressed()) {
			ChatLib.command("warp crypt");
            addC('warp crypt');
		}
        if (this.key30.isPressed()) {
			ChatLib.command("warp nest");
            addC('warp nest');
		}
        if (this.key31.isPressed()) {
			ChatLib.command("warp castle");
            addC('warp castle');
		}
        if (this.key32.isPressed()) {
			ChatLib.command("warp magma");
            addC('warp magma');
		}
        if (this.key33.isPressed()) {
			ChatLib.command("warp da");
            addC('warp da');
		}
        if (this.key34.isPressed()) {
			ChatLib.command("warp drag");
            addC('warp drag');
		}
        if (this.key35.isPressed()) {
			ChatLib.command("warp jungle");
            addC('warp jungle');
		}
        if (this.key36.isPressed()) {
			ChatLib.command("warp howl");
            addC('warp howl');
		}
        if (this.key37.isPressed()) {
			ChatLib.command("av");
            addC('av');
		}
        if (this.key38.isPressed()) {
			ChatLib.command("et");
            addC('et');
		}
        if (this.key39.isPressed()) {
			ChatLib.command("craft");
            addC('craft');
		}
        if (this.key40.isPressed()) {
			ChatLib.command("ec");
            addC('ec');
		}
        if (this.key41.isPressed()) {
			ChatLib.command("pets");
            addC('pets');
		}
        if (this.key42.isPressed()) {
			ChatLib.command("wardrobe");
            addC('wardrobe');
		}
        if (this.key43.isPressed()) {
			ChatLib.command("scg");
            addC('scg');
		}
        if (this.key44.isPressed()) {
			ChatLib.command("viewsettings");
            addC('viewsettings');
		}
        if (this.key45.isPressed()) {
			ChatLib.command("sbmenu");
            addC('sbmenu');
		}
        if (this.key46.isPressed()) {
			ChatLib.command("skillmenu");
            addC('skillmenu');
		}
        if (this.key47.isPressed()) {
			ChatLib.command("collection");
            addC('collection');
		}
        if (this.key48.isPressed()) {
			ChatLib.command("craftedgenerators");
            addC('craftedgenerators');
		}
        if (this.key49.isPressed()) {
			ChatLib.command("recipemenu");
            addC('recipemenu');
		}
        if (this.key50.isPressed()) {
			ChatLib.command("questlog");
            addC('questlog');
		}
        if (this.key51.isPressed()) {
			ChatLib.command("warp");
            addC('warp');
		}
        if (this.key52.isPressed()) {
			ChatLib.command("calendar");
            addC('calendar');
		}
        if (this.key53.isPressed()) {
			ChatLib.command("hotm");
            addC('hotm');
		}
        if (this.key54.isPressed()) {
			ChatLib.command("garry");
            addC('garry');
		}
        if (this.key55.isPressed()) {
			ChatLib.command(Settings.customName1 , Settings.clientSide1 );
            addC(Settings.customName1);
		}
        if (this.key56.isPressed()) {
			ChatLib.command(Settings.customName2 , Settings.clientSide2 );
            addC(Settings.customName2);
		}
        if (this.key57.isPressed()) {
			ChatLib.command(Settings.customName3 , Settings.clientSide3 );
            addC(Settings.customName3);
		}
        if (this.key58.isPressed()) {
			ChatLib.command(Settings.customName4 , Settings.clientSide4 );
            addC(Settings.customName4);
		}
        if (this.key59.isPressed()) {
			ChatLib.command(Settings.customName5 , Settings.clientSide5);
            addC(Settings.customName5);
		}
        if (this.key60.isPressed()) {
			ChatLib.command('togglechat');
            addC('togglechat');
		}
        if (this.key61.isPressed()) {
			ChatLib.command('chat all');
            addC('chat all');
		}
        if (this.key62.isPressed()) {
			ChatLib.command('chat party');
            addC('chat party');
		}
        if (this.key63.isPressed()) {
			ChatLib.command('chat guild');
            addC('chat guild');
        }
        if (this.key64.isPressed()) {
            ChatLib.command('storage');
            addC('storage');
        }
        if (this.key65.isPressed()) {
            ChatLib.command('bestiary');
            addC('bestiary');
        }
        if (this.key66.isPressed()) {
            ChatLib.command('warpforge');
            addC('warpforge');
        }
        if (this.key67.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 1');
            addC('joindungeon master_catacombs 1');
        }
        if (this.key68.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 2');
            addC('joindungeon master_catacombs 2');
        }
        if (this.key69.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 3');
            addC('joindungeon master_catacombs 3');
        }
        if (this.key70.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 4');
            addC('joindungeon master_catacombs 4');
        }
        if (this.key71.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 5');
            addC('joindungeon master_catacombs 5');
        }
        if (this.key72.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 6');
            addC('joindungeon master_catacombs 6');
        }
        if (this.key73.isPressed()) {
            ChatLib.command('joindungeon master_catacombs 7');
            addC('joindungeon master_catacombs 7');
            // As of release, this does nothing as master floor 7 is not released.
        }
        if (this.key74.isPressed()) {
            ChatLib.command('savethejerrys');
            addC('savethejerrys')
        }
        if (this.key75.isPressed()) {
            ChatLib.command('play sb');
            addC('play sb')
        }
        if (this.key76.isPressed()) {
            ChatLib.command('profiles');
            addC('profiles')
        }
        if (this.key77.isPressed()) {
            ChatLib.command('viewstash');
            addC('viewstash')
        }
        if (this.key78.isPressed()) {
            ChatLib.command('pickupstash');
            addC('pickupstash')
        }
        if (this.key79.isPressed()) {
            ChatLib.command('clearstash');
            addC('clearstash')
        }
        if (this.key80.isPressed()) {
            ChatLib.command('g online');
            addC('g online')
        }
        if (this.key81.isPressed()) {
            ChatLib.command('g list');
            addC('g list')
        }
        if (this.key82.isPressed()) {
            ChatLib.command('g top');
            addC('g top')
        }
        if (this.key83.isPressed()) {
            ChatLib.command('g party');
            addC('g party')
        }
        if (this.key84.isPressed()) {
            ChatLib.command('events');
            addC('events')
        }

	}
}   
/* Release Notes

    1.0.0 - Init
    1.0.1 - Fixed CS Installer Prompt on initial install
    1.1.0 - Custom Commands and Keybinds (see Keybind Comments)
    1.2.0 - Switched to Vigilance | Internal Note: Added bug with config reseting
    1.2.1 - Fixed Config Bug and added Keybind for Storage
    1.2.2 - Keybinds (see Keybind Comments)
    1.3.0 - Added /sbk request command
    1.3.1 - Readded the request try-catch
    1.3.2 - Optimized thanks to Kerby
    1.4.0 - Add to Chat History and Keybinds (see Keybind Comments)

*/
