/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from "./configfile";

import Changelog from "../ChangelogLib";

const cl = new Changelog("CoopProtect", "1.3.0", "Updated module to not allowing clicking coop-add in profile viewer from IcarusPhantom")
cl.writeChangelog({
    changelog: "&b",
    name: "&e",
    version: "&e"
})

register("command",  arg1 =>  {
    if (arg1 === 'settings' || arg1 === 'config' || arg1 === undefined) {
     Settings.openGUI();
    } else if (arg1 === 'on' || arg1 === 'enable') {
        Settings.toggle = true;
        ChatLib.chat('&aCoopProtect enabled')
    } else if (arg1 === 'off' || arg1 === 'disable') {
        Settings.toggle = false;
        ChatLib.chat('&cCoopProtect disabled')
    } else if (arg1 === 'toggle') {
        if (Settings.toggle) {
            ChatLib.chat('&cCoopProtect disabled')
        } else {
            ChatLib.chat('&aCoopProtect enabled')
        }
        Settings.toggle = !Settings.toggle
    }
}).setTabCompletions(["settings", "toggle", "on", "off"]).setName('coopprotect')

register("MessageSent", (message, event) => {
    if (!Settings.toggle) return;
    if (message.toLowerCase().includes('coopadd')) {
        ChatLib.chat('&cCoopProtect protected you from this action! do &e/coopprotect &cto disable this');
        cancel(event);
    }
})

//IcarusPhantom was here :D
register("guiMouseClick", (x, y, button, gui, event) => {
    if (!Settings.toggle) return;
    if (Player.getPlayer() === null || Player.getContainer().getClassName() !== 'ContainerChest') return;
    const items = Player.getContainer().getItems();
    if (gui.getSlotUnderMouse() !== null && gui.getSlotUnderMouse().field_75222_d === 25 && ChatLib.removeFormatting(items[25]?.getName() || '') == 'Co-op Request') { // field_75222_d: getting slot number
        cancel(event);
        ChatLib.chat("&cCoopProtect Prevented you to clicking coop-add! do &e/coopprotect &cto disable this");
    }
})

register('guiKey', (char, keyCode, gui, event) => {
    if (!Settings.toggle) return;
    if (Player.getPlayer() === null || Player.getContainer().getClassName() !== 'ContainerChest') return;
    const items = Player.getContainer().getItems();
    if (gui.getSlotUnderMouse() !== null && gui.getSlotUnderMouse().field_75222_d === 25 && ChatLib.removeFormatting(items[25]?.getName() || '') == 'Co-op Request') { // field_75222_d: getting slot number
        if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) { // Getting drop keybind
            cancel(event);
            ChatLib.chat("&cCoopProtect Prevented you to clicking coop-add! do &e/coopprotect &cto disable this");
        } else {
            Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => { // Getting hotkey keybind
                if (keybind.func_151463_i() === keyCode) {
                    cancel(event);
                    ChatLib.chat("&cCoopProtect Prevented you to clicking coop-add! do &e/coopprotect &cto disable this");
                }
            })
        }
    }
})
