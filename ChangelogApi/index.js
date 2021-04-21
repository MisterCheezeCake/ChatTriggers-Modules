/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
export class Changelog {
    constructor(module, version, changelog) {
        this.module = module;
        this.version = version;
        this.changelog = changelog;
        }
        writeChangelog() {
            if (!FileLib.read(`./config/ChatTriggers/modules/${this.module}/update.txt`) == "true" || (!FileLib.read(`./config/ChatTriggers/modules/${this.module}/update.txt`) == "false")){
                FileLib.write(`./config/ChatTriggers/modules/${this.module}/update.txt`, "false");
            }
            if (FileLib.read(`./config/ChatTriggers/modules/${this.module}/update.txt`) == "true") return;
            ChatLib.chat('&8---------- &f[&5ChatTriggers&f] &8----------');
            ChatLib.chat(`&e${this.module} &ahas been updated to version &r ${this.version}`);
            ChatLib.chat(`&bChangelog&f: &r${this.changelog}`);
            FileLib.write(`./config/ChatTriggers/modules/${this.module}/update.txt`, "true");
        }
    }

// See example.js for a use example

