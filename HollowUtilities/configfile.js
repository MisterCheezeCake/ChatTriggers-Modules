import { @Vigilant, @SwitchProperty} from 'Vigilance';

@Vigilant("HollowUtilities")
class Settings {

    @SwitchProperty({
        name: "Auto Enter Hollows",
        description: "Automaticly warp to the crystal hollows when you get the option.",
        category: "General",
    })
    toggleAuto = true
    @SwitchProperty({
        name: "Hide Pristine Messages",
        description: "Hide Pristine Enchant Messages",
        category: "Spam Hiders",
    })
    togglePristine = true
    @SwitchProperty({
        name: "Hide Wind Change Messages",
        description: "Hide Wind Direction Change Messages",
        category: "Spam Hiders",
    })
    toggleWind = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "HollowUtilities by MisterCheezeCake");
        this.setCategoryDescription("Spam Hiders", "HollowUtilities by MisterCheezeCake");
    }
}

export default new Settings;