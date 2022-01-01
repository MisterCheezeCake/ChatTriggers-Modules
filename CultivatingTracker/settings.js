/// <reference types="../CTAutocomplete" /> 
/// <reference lib="es2015" />

import { @Vigilant, @TextProperty, @ButtonProperty, @SwitchProperty, @SelectorProperty } from 'Vigilance';

@Vigilant("CultivatingTracker")
class Settings {
    @SwitchProperty({
        name: "Enabled",
        description: "Toggle the Display",
        category: "General"
    })
    toggle = true;
    @ButtonProperty({
        name: "Move Display",
        description: "Click to change the location where the counter is rendered",
        category: "General",
        placeholder: "Move"
    })
    action() {
        ChatLib.command("cultivating move", true)
    }
    @SwitchProperty({
        name: "Text Shadow",
        description: "Whether the text should be shadowed or not",
        category: "Appearance"
    })
    shadow = true;
    @TextProperty({
        name: "Prefix",
        description: "The prefix that should be shown before the number",
        category: "Appearance"
    })
    prefix = "&7[&6Cultivating&7] &f";
    @SelectorProperty({
        name: "Number Formating",
        description: "How the numbers should be formated",
        category: "Appearance",
        options: [ 'None', 'Dot', 'Comma', 'Space' ]
    })
    seperator = 2;

   

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General","CultivatingTracker by MisterCheezeCake")
        this.setCategoryDescription("Appearance","CultivatingTracker by MisterCheezeCake")
    }
}

export default new Settings();