import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";
const settings = new SettingsObject("NoPetMSG",
  [
    {
      name: "Settings",
      settings: [
        new Setting.Toggle("Enabled", true),
      ]
    }
  ]
).setCommand("noautopet").setSize(250, 25);
Setting.register(settings);
register("chat", (message) => {
    if (!settings.getSetting("Settings", "Enabled")) return;
    cancel(message);
    
}).setCriteria("&cAutopet &eequipped your ${*}");