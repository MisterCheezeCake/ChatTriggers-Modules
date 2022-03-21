import Settings from "./configfile";
import Changelog from "../ChangelogLib";
const changelog = new Changelog("AntiEscrow", "2.0.0", "Updated for CT 2.0 and added bazzar support");
changelog.writeChangelog({
  name: "&e",
  version: "&e",
  changelog: "&b"
}) 
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

register("chat", (event) => {
  if (!Settings.bzToggle) return;
  ChatLib.command('bz')
}).setCriteria("&r&eEscrow refunded ${*} &r&efor &r&bBazaar Instant Buy Submit&r&e!&r");


