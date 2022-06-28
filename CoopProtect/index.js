/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from "./configfile";
import Changelog from "../ChangelogLib";

const cl = new Changelog("CoopProtect", "1.3.0", "Updated module to not allowing clicking coop-add in profile viewer from IcarusPhantom");
cl.writeChangelog({
    changelog: "&b",
    name: "&e",
    version: "&e"
});

register("command",  arg1 =>  {
    if (arg1 === 'settings' || arg1 === 'config' || arg1 === undefined) {
     Settings.openGUI();
    } else if (arg1 === 'on' || arg1 === 'enable') {
        Settings.toggle = true;
        ChatLib.chat('&aCoopProtect enabled');
    } else if (arg1 === 'off' || arg1 === 'disable') {
        Settings.toggle = false;
        ChatLib.chat('&cCoopProtect disabled');
    } else if (arg1 === 'toggle') {
        if (Settings.toggle) {
            ChatLib.chat('&cCoopProtect disabled');
        } else {
            ChatLib.chat('&aCoopProtect enabled');
        }
        Settings.toggle = !Settings.toggle;
    }
}).setTabCompletions(["settings", "toggle", "on", "off"]).setName('coopprotect');

register("MessageSent", (message, event) => {
    if (!Settings.toggle) return;
    if (message.toLowerCase().includes('coopadd')) {
        cancel(event);
        ChatLib.chat('&cCoopProtect protected you from this action! do &e/coopprotect &cto disable this.');
    }
})

//IcarusPhantom was here :D

let mouseCacheX = null;
let mouseCacheY = null;

register("guiRender", (mouseX, mouseY, gui) => {
    mouseCacheX = mouseX;
    mouseCacheY = mouseY;
})

register("guiMouseClick", (mouseX, mouseY, button, gui, event) => {
    if (!Settings.toggle) return;
    if (Player.getPlayer() === null || Player.getContainer().getClassName() !== 'ContainerChest') return;
    const items = Player.getContainer().getItems();
    const slot = getSlotUnderMouse(gui, mouseX, mouseY);
    if (slot !== null && slot === 25 && ChatLib.removeFormatting(items[25]?.getName() || '') === 'Co-op Request') {
        cancel(event);
        ChatLib.chat("&cCoopProtect protected you from this action! do &e/coopprotect &cto disable this.");
    }
})

register('guiKey', (char, keyCode, gui, event) => {
    if (!Settings.toggle) return;
    if (Player.getPlayer() === null || Player.getContainer().getClassName() !== 'ContainerChest') return;
    const items = Player.getContainer().getItems();
    const slot = getSlotUnderMouse(gui, null, null);
    if (slot !== null && slot === 25 && ChatLib.removeFormatting(items[25]?.getName() || '') == 'Co-op Request') {
        if (keyCode === Client.getMinecraft().field_71474_y.field_74316_C.func_151463_i()) { // Getting drop keybind
            cancel(event);
            ChatLib.chat("&cCoopProtect protected you from this action! do &e/coopprotect &cto disable this.");
        } else {
            Client.getMinecraft().field_71474_y.field_151456_ac.forEach((keybind) => { // Getting hotkey keybind
                if (keybind.func_151463_i() === keyCode) {
                    cancel(event);
                    ChatLib.chat("&cCoopProtect protected you from this action! do &e/coopprotect &cto disable this.");
                }
            })
        }
    }
})

function getSlotUnderMouse(gui, mouseX, mouseY) {
    if (mouseX === null) mouseX = mouseCacheX;
    if (mouseY === null) mouseY = mouseCacheY;
    let slot = null;
    try {
        if (gui.getSlotUnderMouse() === null) { return null; }
        slot = gui.getSlotUnderMouse().field_75222_d; // Getting slot number
    } catch (e) {
        slot = 0;
        while (slot < Player.getContainer().getSize() - 1) {
            const x = slot % 9;
            const y = Math.floor(slot / 9);
            const renderX = Renderer.screen.getWidth() / 2 + ((x - 4) * 18);
            const renderY = (Renderer.screen.getHeight() + 10) / 2 + ((y - Player.getContainer().getSize() / 18) * 18);
            if (mouseX > renderX - 10 && mouseX < renderX + 10
                && mouseY > renderY - 10 && mouseY < renderY + 10) {
                break;
            }
            slot++;
        }
    }
    return slot;
}