/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import Settings from "./configfile";
import {Changelog} from '../ChangelogApi'
const cl = new Changelog('CoopProtect', '&e1.1.0', '&aOverhauled the module adding Vigilance and changing the internals completly')
cl.writeChangelog()
register("command", (arg1) =>  {
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
        ChatLib.chat('&cCoopProtect protected you from this action');
        cancel(event);
    }
})