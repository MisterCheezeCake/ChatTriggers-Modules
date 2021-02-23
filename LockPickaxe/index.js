
// Setting up our settings menu
import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';

const settings = new SettingsObject('LockPickaxe', [
	{
        name: 'Module Settings',
		settings: [
			new Setting.Toggle('Enabled', true),
		],
	},
]).setCommand('lockpickaxe').setSize(250, 25);

Setting.register(settings);
// Setting up the mechanism to stop the pickaxe clicks
register("playerInteract", clickPick);

function clickPick(arg1, arg2, event) {
// Checking to see if the module is enabled and running a search of the scoreboard for detecting if a player is on their island.
    if (!settings.getSetting("Module Settings", "Enabled") || !String(Scoreboard.getLines().find(value => /.*⏣.*/.test(value))).replace(/(?:[&§][a-f\dk-or])|[^a-z\s]/gi,"").includes("Your Island")) return;
// Now we are checking if the item contains our keywords, "Pickaxe", and "Drill"
    if(ChatLib.removeFormatting(Player.getHeldItem().getName()).includes("Pickaxe")) {
        cancel(event);
        World.playSound("random.successful_hit", 0.5, 0);
    }

    if(ChatLib.removeFormatting(Player.getHeldItem().getName()).includes("Drill")) {
        cancel(event);
        World.playSound("random.successful_hit", 0.5, 0);
    }
    if(ChatLib.removeFormatting(Player.getHeldItem().getName()).includes("Stonk")) {
        cancel(event);
        World.playSound("random.successful_hit", 0.5, 0);
    }
}
