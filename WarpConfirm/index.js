/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
// Generated by CT-Pack
import config from "./src/config.js";
let devmode = false;
let lastWarp = null;
let currentLocraw;
let sendingLocraw = false;
let locrawUpdateTime;
let worldLoadTime = Date.now();
const inSkyblock = () => ChatLib.removeFormatting(Scoreboard.getTitle()).toLowerCase().includes("skyblock");
function whereAmI(lcr) {
    if (!lcr)
        return null;
    switch (lcr.mode) {
        case "hub":
            return "hub";
        case "dynamic":
            return "island";
        case "garden":
            return "garden";
        case "mining_1":
            return "gold";
        case "mining_2":
            return "deep";
        case "mining_3":
            return "dwarven";
        case "crystal_hollows":
            return "crystal";
        case "mineshaft":
            return "mineshaft";
        case "farming_1":
            return "farming";
        case "foraging_1":
            return "park";
        case "dungeon":
            return "dungeon";
        case "dungeon_hub":
            return "dungeon_hub";
        case "combat_1":
            return "spider";
        case "combat_3":
            return "end";
        case "crimson_isle":
            return "nether";
        case "rift":
            return "rift";
        default:
            return "unknown";
    }
}
register("worldLoad", () => {
    if (!config.enabled)
        return;
    lastWarp = null;
    if (config.locrawOption == 1)
        return;
    if (config.locrawOption == 2) {
        setTimeout(() => {
            if (!inSkyblock())
                return;
            sendingLocraw = true;
            ChatLib.command("locraw");
            if (devmode)
                ChatLib.chat("&aSent locraw command");
        }, config.locrawDelay * 1000);
    }
    else if (config.locrawOption == 0) {
        setTimeout(() => {
            if (!locrawUpdateTime || locrawUpdateTime < worldLoadTime) {
                if (!inSkyblock())
                    return;
                sendingLocraw = true;
                ChatLib.command("locraw");
                if (devmode)
                    ChatLib.chat("&aSent locraw command");
            }
        }, config.locrawDelay * 1000);
    }
});
register("messageSent", (message, event) => {
    if (!config.enabled)
        return;
    if (!message.startsWith("/warp"))
        return;
    const warp = message.split(" ")[1];
    if (lastWarp === warp) {
        lastWarp = null;
        return;
    }
    lastWarp = warp;
    if (config.locationSpecific) {
        const loc = whereAmI(currentLocraw);
        const confEnabled = config[loc];
        if (!confEnabled)
            return;
    }
    ChatLib.chat(new TextComponent(`&f[&bWarpConfirm&f] &7Are you sure you want to warp to &b${warp}&7?`).setClick("run_command", `/warp ${warp}`).setHover("show_text", "&7Click to warp to &b" + warp));
    if (config.warpDelay !== 0) {
        setTimeout(() => {
            if (lastWarp == warp)
                lastWarp = null;
        }, config.warpDelay * 1000);
    }
    cancel(event);
});
register("messageSent", (message, event) => {
    if (!config.enabled)
        return;
    //@ts-ignore
    const m = message.replaceAll(" ", "").toLowerCase();
    if (m === "/hub" && config.replaceHub) {
        ChatLib.command("warp hub");
        cancel(event);
    }
    else if (m === "/is" && config.replaceIsland) {
        ChatLib.command("warp home");
        cancel(event);
    }
});
register("command", (...args) => {
    if (!lastWarp)
        return ChatLib.chat("&f[&bWarpConfirm&f] &7No warp to confirm.");
    ChatLib.command(`warp ${lastWarp}`);
    lastWarp = null;
}).setName("wcf");
const helpTc = (command, description) => new TextComponent(`&0&l- &e${command} &a${description}`).setClick("run_command", command).setHoverValue(`&3Click to run &e${command}`);
register('command', (...args) => {
    if (args[0] === undefined || args[0] === "help") {
        ChatLib.chat("&8------------ &f[&bWarpConfirm&f] &8------------");
        ChatLib.chat(helpTc("/warpconfirm config", "Open the config GUI"));
        ChatLib.chat(helpTc("/warpconfirm help", "Show this help message"));
        ChatLib.chat(helpTc("/wcf", "Confirm the last warp request"));
        ChatLib.chat(new TextComponent("&0&l- &3If you need more help, click here to join the Discord").setClick("open_url", "https://discord.gg/9RJKbCtEUz").setHoverValue("&3Join the Discord"));
    }
    //@ts-ignore
    else if (args[0] === "config" || args[0] === "settings")
        config.openGUI();
    else if (args[0] === "devmode") {
        devmode = !devmode;
        if (devmode)
            ChatLib.chat("&f[&bWarpConfirm&f] &aDevmode enabled");
        else
            ChatLib.chat("&f[&bWarpConfirm&f] &cDevmode disabled");
    }
    else
        ChatLib.chat(new TextComponent("&f[&bWarpConfirm&f] &cInvalid command. Use &e/warpconfirm help &cfor help.").setClick("run_command", "/warpconfirm help").setHoverValue("&3Click to run &e/warpconfirm help"));
}).setName("warpconfirm");
// Locraw Parser
register("chat", (server, gametype, mode, map, event) => {
    currentLocraw = {
        server: server,
        gametype: gametype,
        mode: mode,
        map: map
    };
    if (devmode)
        ChatLib.chat(`&aParsed Locraw: &c{"server": ${server}, "gametype": ${gametype}, "mode": ${mode}, "map": ${map}}`);
    locrawUpdateTime = Date.now();
    if (sendingLocraw) {
        cancel(event);
        sendingLocraw = false;
    }
}).setCriteria('{"server":"${server}","gametype":"${gametype}","mode":"${mode}","map":"${map}"}');
const warpConfirmKB = new KeyBind("Confirm Warp", Keyboard.KEY_NONE, "WarpConfirm");
warpConfirmKB.registerKeyPress(() => ChatLib.command("wcf", true));
