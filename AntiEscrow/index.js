import Settings from "./configfile";
import { Color } from "Vigilance";

register("command", () => Settings.openGUI()).setName("antiescrow");
register("chat", (event) => {
  if (!Settings.ahToggle) return;
    ChatLib.command('ah')
}).setCriteria("&r&cThere was an error with the auction house! &r&7(AUCTION_EXPIRED_OR_NOT_FOUND)&r");

register("chat", (event) => {
  if (!Settings.ahToggle) return;
    ChatLib.command('ah')
}).setCriteria("&r&cThere was an error with the auction house! &r&7(INVALID_BID)&r");

register("chat", (event) => {
  if (!Settings.binToggle) return;
  ChatLib.command('ah')
}).setCriteria("&r&7Claiming BIN auction...&r");

register("chat", (event) => {
  if (!Settings.binToggle) return;
  ChatLib.command('ah')
}).setCriteria("&r&eVisit the Auction House to collect your item!&r");

// Changelog Writer
let usedNewUpdate = FileLib.read("AntiEscrow/update","1.2.0.txt")
if (usedNewUpdate == "false")
{
    
    ChatLib.chat('&8----------- &f[&5ChatTriggers&f] &8-----------')
	ChatLib.chat('&5&lAntiEscrow &r&ahas been updated to version &e1.2.0')
	ChatLib.chat('&bChangelog&f: &aVigilance is now the config system for AntiEscrow. Do /antiescrow to use the cool new menu.')
	ChatLib.chat('&8------------------------------------')
  FileLib.write("AntiEscrow/update", "1.2.0.txt", "true");
}



