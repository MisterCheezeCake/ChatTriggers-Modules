/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
export class Changelog {
    /**
     * Create a Changelog Object
     * @param {string} module - The exact name of the module with proper capitalization
     * @param {string} version - The SemVer complient version of the module
     * @param {string} changelog - The text of the changelog you want to print
     */
    constructor(module, version, changelog) {
        this.module = module;
        this.version = version;
        this.changelog = changelog;
        }
        /**
         * @returns {string} The changelog will be printed into chat
         */
        writeChangelog() {
            console.log(World.getDifficulty())
            console.log(World.getWorld())
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