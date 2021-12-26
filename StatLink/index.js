/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import { Changelog } from "../ChangelogApi/index"

const planckeURL = "https://plancke.io/hypixel/player/stats/";
const scURL = "https://sky.shiiyu.moe/stats/";
const hyAucURL = "https://auctions.craftlink.xyz/players/";
const nameMCURL = "https://namemc.com/profile/";
let player;;
let planckeTC;
let scTC;
let hyaucTC;
let nameMCTC;
register("command", arg1 => {
    player = arg1 || Player.getName()
    planckeTC = new TextComponent("&a" + planckeURL +player).setClick("open_url", planckeURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(planckeTC);
    ChatLib.chat('&f[&bStatLink&f] &cThis command is depricated. Please use &e/sl p')
  }).setName("slp")
register("command", arg1 => {
    player = arg1 || Player.getName()
    scTC = new TextComponent("&a" + scURL + player).setClick("open_url", scURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(scTC);
    ChatLib.chat('&f[&bStatLink&f] &cThis command is depricated. Please use &e/sl sc')
}).setName("slsc")
register("command", arg1 => {
    player = arg1 || Player.getName()
    hyaucTC = new TextComponent("&a" + hyAucURL +player).setClick("open_url", hyAucURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(hyaucTC);
    ChatLib.chat('&f[&bStatLink&f] &cThis command is depricated. Please use &e/sl ha')
}).setName("slha")
register("command", arg1 => {
    player = arg1 || Player.getName()
    nameMCTC = new TextComponent("&a" + nameMCURL +player).setClick("open_url", nameMCURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(nameMCTC);
    ChatLib.chat('&f[&bStatLink&f] &cThis command is depricated. Please use &e/sl nm')
}).setName("slnm")
let helpTCP = new TextComponent("&0&l- &e/sl p &a- Stat Link Command for plancke.io").setClick("suggest_command", "/sl p").setHoverValue("&3Click to copy the command into your Chat Box");
let helpTCSc = new TextComponent("&0&l- &e/sl sc &a- Stat Link Command for sky.shiiyu.moe").setClick("suggest_command", "/sl sc").setHoverValue("&3Click to copy the command into your Chat Box");
let helpTCHy = new TextComponent("&0&l- &e/sl ha&a- Stat Link Command for auctions.craftlink.xyz").setClick("suggest_command", "/sl ha").setHoverValue("&3Click to copy the command into your Chat Box");
let helpTCNm = new TextComponent("&0&l- &e/sl nm &a- Stat Link Command for NameMC").setClick("suggest_command", "/sl nm").setHoverValue("&3Click to copy the command into your Chat Box");
const startLine = '&8--------------- ' + '&f[&bStatLink&f] ' + '&8---------------'
register("command", (arg1, arg2, arg3) => {
    if (arg1 === undefined || arg1 === "help") {
    ChatLib.chat(startLine);
    ChatLib.chat('&aAny of these commands can be clicked and put into your chat box');
    ChatLib.chat(helpTCP);
    ChatLib.chat(helpTCSc);
    ChatLib.chat(helpTCHy);
    ChatLib.chat(helpTCNm);
    } else if (arg1 === 'p' || arg1 === 'plancke' || arg1 === 'plancke.io') {
        player = arg2 || Player.getName()
        planckeTC = new TextComponent("&a" + planckeURL +player).setClick("open_url", planckeURL + player).setHoverValue(`&3View &e${player}'s &3stats on &eplancke.io`);
        ChatLib.chat(planckeTC);
    } else if (arg1 === 'sc' || arg1 === 'skycrypt' || arg1.includes('shiiyu') || arg1.includes('shiyu')) {
        player = arg2 || Player.getName()
        scTC = new TextComponent("&a" + scURL + player).setClick("open_url", scURL + player).setHoverValue(`&3View &e${player}'s &3stats on &eshy.shiiyu.moe`);
        ChatLib.chat(scTC);
    } else if (arg1 === 'ha' || arg1.includes('hyauc') || arg1.includes('craftlink')) {
        player = arg2 || Player.getName()
        hyaucTC = new TextComponent("&a" + hyAucURL +player).setClick("open_url", hyAucURL + player).setHoverValue(`&3View &e${player}'s &3stats on &eauctions.craftlink.xyz`);
        ChatLib.chat(hyaucTC);
    } else if (arg1 === 'nm' || arg1 === 'namemc' || arg1 === 'n') {
        player = arg2 || Player.getName()
        nameMCTC = new TextComponent("&a" + nameMCURL +player).setClick("open_url", nameMCURL + player).setHoverValue(`&3View &e${player}'s &3stats on &enamemc.com`);
        ChatLib.chat(nameMCTC);
    } else {
        ChatLib.chat(`&f[&bStatLink&f] &cInvalid Command`);
    }
}).setName("sl").setTabCompletions(['p', 'sc', 'ha', 'nm'])
const cl = new Changelog("StatLink","&e1.2.0", "&aIf the commands are run wihout an argument, it will use the player's name");
cl.writeChangelog();