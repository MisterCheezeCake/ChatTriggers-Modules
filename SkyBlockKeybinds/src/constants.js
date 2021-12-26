const installMSG = new TextComponent("&2&lClick to Install Controls Saved Mod").setClick("run_command", "/sbk installcs").setHoverValue("&3Click to install the mod into your mods folder");
const noThankYou = new TextComponent("&4&lClick to decline installation").setClick("run_command", "/sbk sayno").setHoverValue("&3Click to say no to installing the mod");
const sbkeybindClickCommand = new TextComponent("&0&l- &e/sbk settings &aopens the settings menu for custom commands and frag bots").setClick("run_command", "/sbkeybind").setHoverValue("&3Click to run &e/sbkeybind");
const sbCCHelpClickCommand = new TextComponent("&0&l- &e/sbk cchelp &aPrints the help message for custom commands").setClick("run_command", "/sbk cchelp").setHoverValue("&3Click to run &e/sbk cchelp");
const installCSHelpClickCommands = new TextComponent("&0&l- &e/sbk installcs &aInstall the controls saved mod").setClick("run_command", "/sbk installcs").setHoverValue("&3Click to run &e/sbk installcs");
const requestHelpClickCommand = new TextComponent("&0&l- &e/sbkrequest &aRequest a feature or keybind for the mod").setClick("suggest_command", "/sbkrequest textHere").setHoverValue("&3Click to add &e/sbkrequest &3 to your chat box");
const refreshHelpClickCommand = new TextComponent("&0&l- &e/sbk refreshremote &aRefresh the mod's remote data").setClick("run_command", "/sbk refreshremote").setHoverValue("&3Click to run &e/sbk refreshremote")
const prefix = '&f[&6SkyBlock Keybinds&f] ';
const notDev = '&f[&6SkyBlock Keybinds&f] &cThis is a developer command. You are not allowed to use this.';
const blackListURL = 'https://raw.githubusercontent.com/MisterCheezeCake/RemoteData/main/Managment/SBKBlacklist.txt';
export { blackListURL, notDev, prefix, refreshHelpClickCommand, requestHelpClickCommand, installCSHelpClickCommands, sbCCHelpClickCommand, sbkeybindClickCommand, installMSG, noThankYou}