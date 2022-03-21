import { @Vigilant, @SwitchProperty} from 'Vigilance';

@Vigilant("AntiEscrow")
class Settings {

    @SwitchProperty({
        name: "AH Escrow",
        description: "Reopens AH when it is closed by escrow.",
        category: "Module Settings",
        subcategory: "Settings"
    })
    ahToggle = true

    @SwitchProperty({
        name: "BIN Reopen",
        description: "Reopens AH when purchasing something from bin.",
        category: "Module Settings",
        subcategory: "Settings"
    })
    binToggle = true
    @SwitchProperty({
        name: "Bazzar Escrow",
        description: "Reopens Bazzar when it is closed by escrow",
        category: "Module Settings",
        subcategory: "Settings"
    })
    bzToggle = true

    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Module Settings", "AntiEscrow by MisterCheezeCake")
        this.setSubcategoryDescription("Module Settings", "Settings", " ")
    }
}

export default new Settings;
