import { @Vigilant, @SwitchProperty} from 'Vigilance';

@Vigilant("CoopProtect")
class Settings {

    @SwitchProperty({
        name: "Module Toggle",
        description: "Should the module protect you",
        category: "Module Settings",
    })
    toggle = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Module Settings", "CoopProtect by MisterCheezeCake")
    }
}

export default new Settings;