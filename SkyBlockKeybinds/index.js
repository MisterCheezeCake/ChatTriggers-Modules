/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import { Color } from "Vigilance";
import FileUtilities from "../FileUtilities/main";;
import Settings from "./configfile";
register("command", () => Settings.openGUI()).setName("sbkeybind");
// Changelog
let usedNewUpdate = FileLib.read("SkyBlockKeybinds/update","1.2.1.txt")
if (usedNewUpdate == "false")
{
    
    ChatLib.chat('&8----------- &f[&5ChatTriggers&f] &8-----------')
	ChatLib.chat('&5&lSkyBlockKeybinds &r&ahas been updated to version &e1.2.1')
	ChatLib.chat('&bChangelog&f: &aFixed config reseting and added keybind for storage')
	FileLib.write("SkyBlockKeybinds/update", "1.2.1.txt", "true");
}
// Variable Declarations
let hasCSMod = FileLib.read("SkyBlockKeybinds/dep","hasMod.txt");
const installMSG = new TextComponent("&2&lClick to Install Controls Saved Mod").setClick("run_command", "/sbk installcs").setHoverValue("&3Click to install the mod into your mods folder");
const noThankYou = new TextComponent("&4&lClick to decline installation").setClick("run_command", "/sbk sayno").setHoverValue("&3Click to say no to installing the mod");
const sbkeybindClickCommand = new TextComponent("&0&l- &e/sbkeybind &aopens the settings menu for custom commands and frag bots").setClick("run_command", "/sbkeybind").setHoverValue("&3Click to run the command");
const sbCCHelpClickCommand = new TextComponent("&0&l- &e/sbk cchelp &aPrints the help message for custom commands").setClick("run_command", "/sbk cchelp").setHoverValue("&3Click to run the command");
const prefix = '&f[&6SkyBlock Keybinds&f] ';
const notDev = '&f[&6SkyBlock Keybinds&f] &cThis is a developer command. You are not allowed to use this. ';
let devMode = false
let fragName1, fragName2, fragName3
let cCommand1, cCommand2, cCommand3, cCommand4, cCommand5; let clientSide1, clientSide2, clientSide3, clientSide4, clientSide5;
// CS installer
// This part is for the first install:
let seenMSG = false;
register("step", () => {
    if (hasCSMod == "false" && seenMSG == false) {
        ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ')
        ChatLib.chat(installMSG)
        ChatLib.chat(noThankYou)
        seenMSG = true
    }

}).setFps(1).setDelay(15);
if (hasCSMod == "false") {
    ChatLib.chat('&eSkyBlockKeybinds &areccomends the use of the &eControls Saved &amod. This mod allows you to save controls so that they will persist across ct loads. ')
    ChatLib.chat(installMSG)
    ChatLib.chat(noThankYou)
    seenMSG = true
}
// SBK
register("command", arg1 => {
    if (arg1 == undefined || arg1 == "help") {
      ChatLib.chat('&8--------------- ' + prefix + '&8---------------')  
      ChatLib.chat(sbkeybindClickCommand)
      ChatLib.chat(sbCCHelpClickCommand)
    } else if (arg1 == "installcs") {
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aAttempting to install Controls Saved mod into your mods folder')
        if (FileUtilities.exists("./mods/1.8.9"))
        {
            FileUtilities.copyFile("./config/ChatTriggers/modules/SkyblockKeybinds/dep/CSM.jar", "./mods/1.8.9/CSM.jar", true)
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.')
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        } else {
        FileUtilities.copyFile("./config/ChatTriggers/modules/SkyblockKeybinds/dep/CSM.jar", "./mods/CSM.jar", true)
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aControls Saved mod succesfully installed. &cYou will need to restart your game for the mod to work.')
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
        }
    } else if (arg1 == "sayno") {
        ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aOkay, you wont be shown this message again.')
        FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "true");
    } else if (arg1 == "devmode") {
        if (devMode === false) {
            devMode = true
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aDeveloper Mode Enabled')
        } else if (devMode === true) {
            devMode = false
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &cDeveloper Mode Disabled')
        }
    } else if (arg1 == "settings") {
        ChatLib.command('sbkeybind', true)
    } else if (arg1 == "testcustom") {
        if (devMode === true) {
            ChatLib.chat(prefix + fragName1 + s + fragName2 + s + fragName3 + s + cCommand1 + s + cCommand2 + s + cCommand3 + s + cCommand4 + s + cCommand5)
        } else if (devMode === false) {
            ChatLib.chat(notDev)
        }
    } else if (arg1 == "cchelp") {
        ChatLib.chat(prefix + '&aTo use custom commands, input the commands in the &e/sbkeybind &asettings menu. If the command is for a mod or another module, the Client Side option should be set to on. &cDO NOT PUT "&e/&c" in the command input.')
    } else if (arg1 == "rewritehasmod") {
        if (devMode === true) {
            FileLib.write("SkyBlockKeybinds/dep", "hasMod.txt", "false");
            ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aSucessfully rewrote file')
            } else if (devMode === false) {
                ChatLib.chat(notDev)
            }
    } else if (arg1 == "testprefix") {
        if (devMode === true) {
            ChatLib.chat(prefix)
            } else if (devMode === false) {
                ChatLib.chat(notDev)
            }
    } else {
        ChatLib.chat(prefix + '&cInvalid Command. &e/sbk help&c for a list of commands')
    }
  }).setTabCompletions(["help","settings", "cchelp"]).setName("sbk")
let ctr
register("command", arg1 => {
    if (devMode === true) {
        ctr = arg1
        eval(ctr)
    ChatLib.chat('&f[&6SkyBlock Keybinds&f] &aEval Completed')
    } else if (devMode === false) {
        ChatLib.chat(notDev)
    } 
  }).setName("sbkeval")

// Command Updater
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
    this.key55 = new KeyBind("Custom Command 1", 0, "SBK - Custom Commands");
    this.key56 = new KeyBind("Custom Command 2", 0, "SBK - Custom Commands");
    this.key57 = new KeyBind("Custom Command 3", 0, "SBK - Custom Commands");
    this.key58 = new KeyBind("Custom Command 4", 0, "SBK - Custom Commands");
    this.key59 = new KeyBind("Custom Command 5", 0, "SBK - Custom Commands");
    this.key60 = new KeyBind("Toggle Chat", 0, "SBK - Chats");
    this.key61 = new KeyBind("All Chat", 0, "SBK - Chats");
    this.key62 = new KeyBind("Party Chat", 0, "SBK - Chats");
    this.key63 = new KeyBind("Guild Chat", 0, "SBK - Chats");
    this.key64 = new KeyBind("Storage Menu", 0 , "SBK - General SkyBlock");




	this.tick = function() {
		if (this.key.isPressed()) {
			ChatLib.command("ah");
		}
		if (this.key2.isPressed()) {
			ChatLib.command("bz");
		}
		if (this.key3.isPressed()) {
			ChatLib.command("p leave");
		}
		
		if (this.key4.isPressed()) {
			ChatLib.command("p list");
		}
		if (this.key5.isPressed()) {
			ChatLib.command("p warp");
		}
		if (this.key6.isPressed()) {
			ChatLib.command("reparty", true);
		}
        if (this.key7.isPressed()) {
			ChatLib.command("joindungeon catacombs 1");
            
		}
        if (this.key8.isPressed()) {
			ChatLib.command("joindungeon catacombs 2");
		}
        if (this.key9.isPressed()) {
			ChatLib.command("joindungeon catacombs 3");
		}
        if (this.key10.isPressed()) {
			ChatLib.command("joindungeon catacombs 4");
		}
        if (this.key11.isPressed()) {
			ChatLib.command("joindungeon catacombs 5");
		}
        if (this.key12.isPressed()) {
			ChatLib.command("joindungeon catacombs 6");
		}
        if (this.key13.isPressed()) {
			ChatLib.command("joindungeon catacombs 7");
		}
        if (this.key14.isPressed()) {
			ChatLib.command("p " + Settings.fragName1);
		}
        if (this.key15.isPressed()) {
			ChatLib.command("p " + Settings.fragName2);
		}
        if (this.key16.isPressed()) {
			ChatLib.command("p " + Settings.fragName3);
		}
        if (this.key17.isPressed()) {
			ChatLib.command("is");
		}
        if (this.key18.isPressed()) {
			ChatLib.command("warp hub");
		}
        if (this.key19.isPressed()) {
			ChatLib.command("warp spider");
		}
        if (this.key20.isPressed()) {
			ChatLib.command("warp nether");
		}
        if (this.key21.isPressed()) {
			ChatLib.command("warp end");
		}
        if (this.key22.isPressed()) {
			ChatLib.command("warp park");
		}
        if (this.key23.isPressed()) {
			ChatLib.command("warp gold");
		}
        if (this.key24.isPressed()) {
			ChatLib.command("warp deep");
		}
        if (this.key25.isPressed()) {
			ChatLib.command("warp mines");
		}
        if (this.key26.isPressed()) {
			ChatLib.command("warp barn");
		}
        if (this.key27.isPressed()) {
			ChatLib.command("warp desert");
		}
        if (this.key28.isPressed()) {
			ChatLib.command("warp dungeon_hub");
		}
        if (this.key29.isPressed()) {
			ChatLib.command("warp crypt");
		}
        if (this.key30.isPressed()) {
			ChatLib.command("warp nest");
		}
        if (this.key31.isPressed()) {
			ChatLib.command("warp castle");
		}
        if (this.key32.isPressed()) {
			ChatLib.command("warp magma");
		}
        if (this.key33.isPressed()) {
			ChatLib.command("warp da");
		}
        if (this.key34.isPressed()) {
			ChatLib.command("warp drag");
		}
        if (this.key35.isPressed()) {
			ChatLib.command("warp jungle");
		}
        if (this.key36.isPressed()) {
			ChatLib.command("warp howl");
		}
        if (this.key37.isPressed()) {
			ChatLib.command("av");
		}
        if (this.key38.isPressed()) {
			ChatLib.command("et");
		}
        if (this.key39.isPressed()) {
			ChatLib.command("craft");
		}
        if (this.key40.isPressed()) {
			ChatLib.command("ec");
		}
        if (this.key41.isPressed()) {
			ChatLib.command("pets");
		}
        if (this.key42.isPressed()) {
			ChatLib.command("wardrobe");
		}
        if (this.key43.isPressed()) {
			ChatLib.command("scg");
		}
        if (this.key44.isPressed()) {
			ChatLib.command("viewsettings");
		}
        if (this.key45.isPressed()) {
			ChatLib.command("sbmenu");
		}
        if (this.key46.isPressed()) {
			ChatLib.command("skillmenu");
		}
        if (this.key47.isPressed()) {
			ChatLib.command("collection");
		}
        if (this.key48.isPressed()) {
			ChatLib.command("craftedgenerators");
		}
        if (this.key49.isPressed()) {
			ChatLib.command("recipemenu");
		}
        if (this.key50.isPressed()) {
			ChatLib.command("questlog");
		}
        if (this.key51.isPressed()) {
			ChatLib.command("warp");
		}
        if (this.key52.isPressed()) {
			ChatLib.command("calendar");
		}
        if (this.key53.isPressed()) {
			ChatLib.command("hotm");
		}
        if (this.key54.isPressed()) {
			ChatLib.command("garry");
		}
        if (this.key55.isPressed()) {
			ChatLib.command(Settings.customName1 , Settings.clientSide1 );
		}
        if (this.key56.isPressed()) {
			ChatLib.command(Settings.customName2 , Settings.clientSide2 );
		}
        if (this.key57.isPressed()) {
			ChatLib.command(Settings.customName3 , Settings.clientSide3 );
		}
        if (this.key58.isPressed()) {
			ChatLib.command(Settings.customName4 , Settings.clientSide4 );
		}
        if (this.key59.isPressed()) {
			ChatLib.command(Settings.customName5 , Settings.clientSide5);
		}
        if (this.key60.isPressed()) {
			ChatLib.command('togglechat');
		}
        if (this.key61.isPressed()) {
			ChatLib.command('chat all');
		}
        if (this.key62.isPressed()) {
			ChatLib.command('chat party');
		}
        if (this.key63.isPressed()) {
			ChatLib.command('chat guild');
        }
        if (this.key64.isPressed()) {
            ChatLib.command('storage');
        }

	}
}