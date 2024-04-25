import { CostFunction, Powder } from "./types";
class Perk {
    max: number;
    cost: CostFunction;
    powder: Powder;
    constructor(max: number, cost: CostFunction, poweder: Powder) {
        this.max = max;
        this.cost = cost;
        this.powder = poweder;
    }
    calculateCost(target: number) {
        let currentCost = 0
        for (let i = 1; i <= target; i++) {
            currentCost += this.cost(i);
        }
        return currentCost;
    }
    costBetween(start: number, end: number) {
        return this.calculateCost(end) - this.calculateCost(start);
    }
}

class MithrilPerk extends Perk {
    constructor(max: number, cost: CostFunction) {
        super(max, cost, "Mithril");
    }
}

class GemstonePerk extends Perk {
    constructor(max: number, cost: CostFunction) {
        super(max, cost, "Gemstone");
    }
}

class GlacitePerk extends Perk {
    constructor(max: number, cost: CostFunction) {
        super(max, cost, "Glacite");
    }
}

export const perks = {
    //t1
    mining_speed: new MithrilPerk(50, (n) => (n+1)**3),
    //t2
    mining_fortune: new MithrilPerk(50, (n) => (n+1)**3.05),
    quick_forge: new MithrilPerk(20, (n) => (n+1)**4),
    titanium_insanium: new MithrilPerk(50, (n) => (n+1)**3.1),
    //t3
    daily_powder: new MithrilPerk(100, (n) => 200 + ((n-1)*18)),
    luck_of_the_cave: new MithrilPerk(45, (n) => (n+1)**3.07),
    crystalized: new MithrilPerk(30, (n) => (n+1)**3.4),
    //t4
    efficient_miner: new MithrilPerk(100, (n) => (n+1)**2.6),
    orbiter: new MithrilPerk(80, (n) => n*70),
    seasoned_mineman: new MithrilPerk(100, (n) => (n+1)**2.3),
    //t5 has no scaling perks
    //t6
    mole: new GemstonePerk(180, (n) => (n+1)**2.2),
    professional: new GemstonePerk(140, (n) => (n+1)**2.3),
    lonesome_miner: new GemstonePerk(45, (n) => (n+1)**3.07),
    great_explorer: new GemstonePerk(20, (n) => (n+1)**4),
    fortunate: new GemstonePerk(20, (n) => (n+1)**3.05),
    //t7
    powder_buff: new GemstonePerk(50, (n) => (n+1)**3.2),
    mining_speed_2: new GemstonePerk(50, (n) => (n+1)**3.2),
    mining_fortune_2: new GemstonePerk(50, (n) => (n+1)**3.2),
    //t8
    warm_hearted: "MISSING_DATA",
    dust_collector: "MISSING_DATA",
    no_stone_unturned: "MISSING_DATA",
    //t9
    surveyor: "MISSING_DATA",
    subzero_mining: "MISSING_DATA",
    eager_adventurer: "MISSING_DATA",
    //t10
    gifts_from_the_departed: "MISSING_DATA",
    dead_mans_chest: "MISSING_DATA",
    excavator: "MISSING_DATA",
    rags_to_riches: "MISSING_DATA",


}