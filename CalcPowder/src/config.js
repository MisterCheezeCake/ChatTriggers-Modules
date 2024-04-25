import { @Vigilant, @TextProperty, @ButtonProperty } from 'Vigilance';

@Vigilant("CalcPowder")
class Settings {

    @TextProperty({
        name: "Number Seperator",
        description: "What the module should use to seperate numbers",
        category: "Module Settings",
    })
    seperator = ",";
    @ButtonProperty({
        name: "Join the Discord",
        description: "Join the Discord server for support or to suggest new features",
        category: "Module Settings",
        placeholder: "Join",
    })
    join() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/9RJKbCtEUz"));
    }

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Module Settings", "CalcPowder by &6MisterCheezeCake")
    }
}

export default new Settings;