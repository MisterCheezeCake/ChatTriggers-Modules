import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';
import { killsPerLevel } from './constants';

// settings
const settings = new SettingsObject('CultivatingTracker', [
	{
		name: 'display settings',
		settings: [
			new Setting.Toggle('Enabled', true),
			new Setting.Toggle('Text Shadow', true),
			new Setting.TextInput('Prefix', '&7[&6Cultivating&7] &f'),
			new Setting.TextInput('Item ID', '293'),
			new Setting.TextInput('&cFor a list of ids to /ciid', ' '),
			new Setting.StringSelector('Number Formatting', 0, [ 'None', 'Dot', 'Comma', 'Space' ]),
			new Setting.Slider("x", 400, 0, Renderer.screen.getWidth()),
			new Setting.Slider("y", 200, -50, Renderer.screen.getHeight())
		],
	},
]).setCommand('cultivating').setSize(250, 200);

Setting.register(settings);
let idString, idINT
register("step", () => {
  idString = (settings.getSetting("display settings", "Item ID"))
  idINT = parseInt(idString, 10)  
}).setFps(1);




// draw display
const expertiseDisplay = new Display();

expertiseDisplay.addLine(1);
expertiseDisplay.setRenderLoc(
	settings.getSetting('display settings', 'x'),
	settings.getSetting('display settings', 'y'),
);

register('renderOverlay', () => {
	if (!settings.getSetting('display settings', 'Enabled')) return expertiseDisplay.shouldRender = false;

	expertiseDisplay.shouldRender = true;

	expertiseDisplay
		.setRenderLoc(
			settings.getSetting('display settings', 'x'),
			settings.getSetting('display settings', 'y'),
		)
		.render();
});

// update display
const maxLevel = Math.max(...Object.keys(killsPerLevel));

const getNextKillCount = kills => {
	let nextKillCount;

	for (let index = 1; index <= maxLevel; index++) {
		nextKillCount = killsPerLevel[index];
		if (kills < killsPerLevel[index]) break;
	}

	return nextKillCount;
}

const localeString = (number, separator) => {
	if (!separator) return number;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

register('step', () => {
	let kills;

	Player
		.getInventory()
		.getItems()
		.filter(item => item.getID() === idINT) // minecraft:diamond_hoe
		.reverse() // to get farmed from hoe that is closest to hotbar slot 1
		.forEach(item => {
			const nbtData = item.getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
			if (!nbtData.get('farmed_cultivating')) return;
			kills = nbtData.getInteger('farmed_cultivating');
		});

	let separator;

	switch (settings.getSetting('display settings', 'Number Formatting')) {
		case 'Dot':
			separator = '.';
			break;

		case 'Comma':
			separator = ',';
			break;

		case 'Space':
			separator = ' ';
			break;
	}	
	
	expertiseDisplay.setLine(1, new DisplayLine(`${settings.getSetting('display settings', 'Prefix')}${isNaN(kills) ? '-/-' : kills < killsPerLevel[maxLevel] ? localeString(kills, separator) + '/' + localeString(getNextKillCount(kills), separator) : localeString(kills, separator)+ ' (Maxed)'}`).setShadow(settings.getSetting('display settings', 'Text Shadow')));
}).setFps(5);
// Help Command
register("command", () => {
   ChatLib.chat('&8----------------------------------------------------')
   ChatLib.chat('&bDiamond Hoe&f: &e293')
   ChatLib.chat('&bDiamond Axe&f: &e279')
   ChatLib.chat('&6Golden Hoe&f: &e294')
   ChatLib.chat('&6Golden Axe&f: &e286')
   ChatLib.chat('&7Iron Hoe&f: &e292')
   ChatLib.chat('&7Iron Axe&f: &e258')
   ChatLib.chat('&8Stone Hoe&f: &e291')
   ChatLib.chat('&8Stone Axe&f: &e275')
   ChatLib.chat('&6Wooden Hoe&f: &e290')
   ChatLib.chat('&6Wooden Axe&f: &e271')
   ChatLib.chat('&8----------------------------------------------------')
}).setName('ciid')

// Changelog Writer
var usedNewUpdate = FileLib.read("CultivatingTracker/update","1.0.1.txt")
if (usedNewUpdate == "false")
{
    
    ChatLib.chat('&8----------- &f[&5ChatTriggers&f] &8-----------')
	ChatLib.chat('&5&lCultivatingTracker &r&ahas been updated to version &e1.0.1')
	ChatLib.chat('&bChangelog&f: &aThe module now works with many more items, you can select them in the settings menu, and do /ciid for a list of item IDs to enter for the item you want.')
	FileLib.write("CultivatingTracker/update", "1.0.1.txt", "true");
}