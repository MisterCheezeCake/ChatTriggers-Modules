import { @Vigilant, @TextProperty, @SwitchProperty } from '../../Vigilance';

@Vigilant("SkyBlockKeybinds")
class Settings {
    @SwitchProperty({
        name: "Add to chat history",
        description: "Adds commands run by keybinds to your chat history when they are pressed",
        category: "General"
    })
    chatHistory = false;
    @TextProperty({
        name: "Frag Bot 1",
        description: "Set Name for Frag Bot 1. Keybind bound in controls",
        category: "Frag Bots",
        placeholder: "Put Name Here"
    })
    fragName1 = "";
    @TextProperty({
        name: "Frag Bot 2",
        description: "Set Name for Frag Bot 2. Keybind bound in controls",
        category: "Frag Bots",
        placeholder: "Put Name Here"
    })
    fragName2 = "";
    @TextProperty({
        name: "Frag Bot 3",
        description: "Set Name for Frag Bot 3. Keybind bound in controls",
        category: "Frag Bots",
        placeholder: "Put Name Here"
    })
    fragName3 = "";
    @TextProperty({
        name: "Custom Command 1",
        description: "Set Custom Command 1. Keybind bound in controls. &4Do not put &e/ &4 in the command box",
        category: "Custom Commands",
        placeholder: "Command Here"
    })
    customName1 = "";
    @SwitchProperty({
        name: "Client Side 1",
        description: "Toggle for wether custom command 1 should be run client side.",
        category: "Custom Commands",
    })
    clientSide1 = false
    @TextProperty({
        name: "Custom Command 2",
        description: "Set Custom Command 2. Keybind bound in controls. &4Do not put &e/ &4 in the command box",
        category: "Custom Commands",
        placeholder: "Command Here"
    })
    customName2 = "";
    @SwitchProperty({
        name: "Client Side 2",
        description: "Toggle for wether custom command 2 should be run client side.",
        category: "Custom Commands",
    })
    clientSide2 = false
    @TextProperty({
        name: "Custom Command 3",
        description: "Set Custom Command 3. Keybind bound in controls. &4Do not put &e/ &4 in the command box",
        category: "Custom Commands",
        placeholder: "Command Here"
    })
    customName3 = "";
    @SwitchProperty({
        name: "Client Side 3",
        description: "Toggle for wether custom command 3 should be run client side.",
        category: "Custom Commands",
    })
    clientSide3 = false
    @TextProperty({
        name: "Custom Command 4",
        description: "Set Custom Command 4. Keybind bound in controls. &4Do not put &e/ &4 in the command box",
        category: "Custom Commands",
        placeholder: "Command Here"
    })
    customName4 = "";
    @SwitchProperty({
        name: "Client Side 4",
        description: "Toggle for wether custom command 4 should be run client side.",
        category: "Custom Commands",
    })
    clientSide4 = false
    @TextProperty({
        name: "Custom Command 5",
        description: "Set Custom Command 5. Keybind bound in controls. &4Do not put &e/ &4 in the command box",
        category: "Custom Commands",
        placeholder: "Command Here"
    })
    customName5 = "";
    @SwitchProperty({
        name: "Client Side 5",
        description: "Toggle for wether custom command 5 should be run client side.",
        category: "Custom Commands",
    })
    clientSide5 = false
    
    
    
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Frag Bots", "SkyBlockKeybinds by MisterCheezeCake")
        this.setCategoryDescription("Custom Commands", "SkyBlockKeybinds by MisterCheezeCake")
        this.setCategoryDescription("General", "SkyBlockKeybinds by MisterCheezeCake")
    }
}

export default new Settings;