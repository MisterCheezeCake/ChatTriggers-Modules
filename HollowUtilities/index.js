/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

import Settings from './configfile';
register("command", () => Settings.openGUI()).setName("hollowutilties")
// Auto Skip
/*
register("chat", () => {
    if (!Settings.toggleAuto) return;
    ChatLib.command('enterthecrystalhollows')
}).setCriteria("&bYou've seen all this before, click here to &e&lSKIP &bthe journey!&r")
*/
// Pristine
register("chat", (event) => {
    if (!Settings.togglePristine) return
    cancel(event)
}).setCriteria("&r&d&lPRISTINE! &r&fYou found ${*} &r&fFlawed ${*} Gemstone&r&f!&r")
// Wind
register("chat", (event) =>{
    if (!Settings.toggleWind) return;
    cancel(event)
}).setCriteria('&r&aThe wind has changed direction!&r')

// Send My Coords

register("command", () => {
    const coords = getCoords()
    ChatLib.say(`x: ${coords.x}, y: ${coords.y}, z: ${coords.z}`)
}).setName('sendmycoords')
function getCoords() {
    return {
        x: Math.floor(Player.getX()),
        y: Math.floor(Player.getY()),
        z: Math.floor(Player.getZ())
    }
}