/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import settings from './settings';
import { killsPerLevel } from './constants';
import Changelog from "../ChangelogLib"
const cl = new Changelog("CultivatingTracker", "2.1.0", "&aUpdated for ChatTriggers 2.0")
cl.writeChangelog({
	name: "&e",
	version: "&e",
	changelog: "&b"

})
//import migrateSettings from './migrate';

const File = Java.type("java.io.File")
let loc = {x:0,y:0}
if (!new File(`${Config.modulesFolder}/CultivatingTracker/loc.json`).exists()) {
	FileLib.write(`${Config.modulesFolder}/CultivatingTracker/loc.json`, JSON.stringify({x:0,y:0}))
} else loc = JSON.parse(FileLib.read(`${Config.modulesFolder}/CultivatingTracker/loc.json`))

const changeLoc = (x,y) => {
	loc.x = x
	loc.y = y
	FileLib.write(`${Config.modulesFolder}/CultivatingTracker/loc.json`, JSON.stringify(loc))
}
register("command", arg1 =>  {
	if (arg1 === "move") moveGui.open()
	else {
		settings.openGUI()
		
	}
}).setCommandName("cultivating")

const moveGui = new Gui()

moveGui.registerDraw(() => {
	const text = 'Drag to move the Tracker and Press ESC to go back';
	const scale = 1.8;
	const color = Renderer.color(255, 55, 55);
	new Text(text, Renderer.screen.getWidth() / 2 - Renderer.getStringWidth(text) * scale / 2, Renderer.screen.getHeight() / 2 - 50).setColor(color).setScale(scale).draw();
});

moveGui.registerKeyTyped((char, key) => {
	if (key === 45 || 1) {
		moveGui.close()
		settings.openGUI()
	}

})


register('dragged', (dx, dy) => {
	if (!moveGui.isOpen()) return;

	trackerDisplay.setRenderLoc(
		trackerDisplay.getRenderX() + dx,
		trackerDisplay.getRenderY() + dy,
	);
	changeLoc(
	MathLib.map(
		trackerDisplay.getRenderX(),
		0, Renderer.screen.getWidth(),
		0, 1
	),
	MathLib.map(
		trackerDisplay.getRenderY(),
		0, Renderer.screen.getHeight(),
		0, 1
	)
	)

});





// draw display 
const trackerDisplay = new Display();

trackerDisplay.addLine(1);
trackerDisplay.setRenderLoc(

		Renderer.screen.getWidth() * loc.x,
		Renderer.screen.getHeight() * loc.y
);

register('renderOverlay', () => {
	if (!settings.toggle) return trackerDisplay.shouldRender = false;
	if (moveGui.isOpen()) return trackerDisplay.shouldRender = true;
	trackerDisplay.shouldRender = true;

	trackerDisplay
		.setRenderLoc(
			Renderer.screen.getWidth() * loc.x,
			Renderer.screen.getHeight() * loc.y
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
		?.getInventory()
		?.getItems()
		?.filter(item => [290, 291, 292, 293, 271, 275, 258, 286, 279].includes(item?.getID())) 
		?.reverse() // to get farmed from hoe that is closest to hotbar slot 1
		?.forEach(item => {
			const nbtData = item.getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
			if (!nbtData.get('farmed_cultivating')) return;
			kills = nbtData.getInteger('farmed_cultivating');
		});

	let separator;

	switch (settings.seperator) {
		case 1:
			separator = '.';
			break;

		case 2:
			separator = ',';
			break;

		case 3:
			separator = ' ';
			break;
	}	
	
	trackerDisplay.setLine(1, new DisplayLine(`${settings.prefix}${isNaN(kills) ? '-/-' : kills < killsPerLevel[maxLevel] ? localeString(kills, separator) + '/' + localeString(getNextKillCount(kills), separator) : localeString(kills, separator)+ ' (Maxed)'}`).setShadow(settings.shadow));
}).setFps(5);
// Help Command
register("command", () => {
	ChatLib.chat("&7[&6Cultivating&7] &cThe module now works with all farming items automaticly")
}).setName('ciid')

