import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';

const settings = new SettingsObject('CaptchaAlert', [
	{
        name: 'Captcha',
		settings: [
			new Setting.Toggle('Enabled', true),
		],
	},
]).setCommand('captchaalert').setSize(250, 25);

Setting.register(settings);


const sound = new Sound({
    source: "sound.ogg"
})

register("step", () => {
    if (!settings.getSetting("Captcha", "Enabled")) return;

    if(Player.getInventory().getStackInSlot(7).getID() == 358) {
        sound.play();
    }
}).setFps(1);