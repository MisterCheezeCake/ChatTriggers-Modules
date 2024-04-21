//@ts-ignore
import { @Vigilant, @SwitchProperty, @SliderProperty, @CheckboxProperty, @SelectorProperty} from '../../Vigilance';
@Vigilant("WarpConfirm", "Settings", {
    getCategoryComparator: () => (a, b) => {
        const categories = ['General', 'Locations', 'Advanced'];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
    // General
    @SwitchProperty({
        name: "Enabled",
        description: "Whether or not the module is enabled",
        category: "General"
    })
    enabled = true; 
    @SliderProperty({
        name: "Command Persistance",
        description: "How long (in seconds) running a warp command again will work\n0 to make it indefinite",
        category: "General",
        min: 0,
        max: 60,
    })
    warpDelay = 5;
    // Location
    @SwitchProperty({
        name: "Enable Location Specific Confirmation",
        description: "Whether the module should only work in specific locations",
        category: "Locations"
    })
    locationSpecific = false;
    @CheckboxProperty({
        name: "Hub",
        description: "Whether to enable warp confirmation in The Hub",
        category: "Locations"
    })
    hub = false;
    @CheckboxProperty({
        name: "Private Island",
        description: "Whether to enable warp confirmation on your Private Island",
        category: "Locations"
    })
    island = false;
    @CheckboxProperty({
        name: "Garden",
        description: "Whether to enable warp confirmation in The Garden",
        category: "Locations"
    })
    garden = false;  
    @CheckboxProperty({
        name: "Gold Mine",
        description: "Whether to enable warp confirmation in the Gold Mine",
        category: "Locations"
    })
    gold = false;
    @CheckboxProperty({
        name: "Deep Caverns",
        description: "Whether to enable warp confirmation in the Deep Caverns",
        category: "Locations"
    })
    deep = false;
    @CheckboxProperty({
        name: "Dwarven Mines",
        description: "Whether to enable warp confirmation in the Dwarven Mines",
        category: "Locations"
    })
    dwarven = false;
    @CheckboxProperty({
        name: "Crystal Hollows",
        description: "Whether to enable warp confirmation in the Crystal Hollows",
        category: "Locations"
    })
    crystal = false;
    @CheckboxProperty({
        name: "Glacite Mineshafts",
        description: "Whether to enable warp confirmation in the Glacite Mineshafts",
        category: "Locations"
    })
    mineshaft = false;
    @CheckboxProperty({
        name: "Farming Islands",
        description: "Whether to enable warp confirmation in the Farming Islands",
        category: "Locations"
    })
    farming = false;
    @CheckboxProperty({
        name: "The Park",
        description: "Whether to enable warp confirmation in The Park",
        category: "Locations"
    })
    park = false;
    @CheckboxProperty({
        name: "Dungeons",
        description: "Whether to enable warp confirmation in Dungeons",
        category: "Locations"
    })
    dungeon = false;  
    @CheckboxProperty({
        name: "Dungeon Hub",
        description: "Whether to enable warp confirmation in the Dungeon Hub",
        category: "Locations"
    })
    dungeon_hub = false;
    @CheckboxProperty({
        name: "Spider's Den",
        description: "Whether to enable warp confirmation in the Spider's Den",
        category: "Locations"
    })
    spider = false;
    @CheckboxProperty({
        name: "The End",
        description: "Whether to enable warp confirmation in The End",
        category: "Locations"
    })
    end = false;
    @CheckboxProperty({
        name: "Crimson Isle",
        description: "Whether to enable warp confirmation in the Crimson Isle",
        category: "Locations"
    })
    nether = false;
    @CheckboxProperty({
        name: "The Rift",
        description: "Whether to enable warp confirmation in The Rift",
        category: "Locations"
    })
    rift = false;
    @CheckboxProperty({
        name: "Unknown Location",
        description: "Whether to enable warp confirmation in locations the module can't recognize",
        category: "Locations"
    })
    unknown = false;
    // Advanced
    @SwitchProperty({
        name: "Replace /hub",
        description: "Whether to replace /hub with /warp hub",
        category: "Advanced"
    })
    replaceHub = true;
    @SwitchProperty({
        name: "Replace /is",
        description: "Whether to replace /is with /warp home",
        category: "Advanced"
    })
    replaceIsland = true;
    @SelectorProperty({
        name: "Locraw Options",
        description: "Whether /locraw should always be sent on joining a server, never be sent, or sent on a delay to check if another mod is sending it first\n&cIf you don't know what this is, leave this on Conditional",
        category: "Advanced",
        options: ["Conditional", "Never", "Always"]
    })
    locrawOption = 0;
    @SliderProperty({
        name: "Locraw Delay",
        description: "How long (in seconds) to wait before sending /locraw\nThis is applies both when the option is set to Conditional and Always",
        category: "Advanced",
        min: 1,
        max: 20,
    })
    locrawDelay = 5;
    
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "WarpConfirm by &6MisterCheezeCake")
        this.setCategoryDescription("Locations", "WarpConfirm by &6MisterCheezeCake")
        this.setCategoryDescription("Advanced", "WarpConfirm by &6MisterCheezeCake")
        this.addDependency("Hub", "Enable Location Specific Confirmation")
        this.addDependency("Private Island", "Enable Location Specific Confirmation")
        this.addDependency("Garden", "Enable Location Specific Confirmation")
        this.addDependency("Gold Mine", "Enable Location Specific Confirmation")
        this.addDependency("Deep Caverns", "Enable Location Specific Confirmation")
        this.addDependency("Dwarven Mines", "Enable Location Specific Confirmation")
        this.addDependency("Crystal Hollows", "Enable Location Specific Confirmation")
        this.addDependency("Glacite Mineshafts", "Enable Location Specific Confirmation")
        this.addDependency("Farming Islands", "Enable Location Specific Confirmation")
        this.addDependency("The Park", "Enable Location Specific Confirmation")
        this.addDependency("Dungeons", "Enable Location Specific Confirmation")
        this.addDependency("Dungeon Hub", "Enable Location Specific Confirmation")
        this.addDependency("Spider's Den", "Enable Location Specific Confirmation")
        this.addDependency("The End", "Enable Location Specific Confirmation")
        this.addDependency("Crimson Isle", "Enable Location Specific Confirmation")
        this.addDependency("The Rift", "Enable Location Specific Confirmation")
        this.addDependency("Unknown Location", "Enable Location Specific Confirmation")
        
    }
}

export default new Settings;
