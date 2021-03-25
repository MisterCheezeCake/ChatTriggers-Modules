const planckeURL = "https://plancke.io/hypixel/player/stats/"
const scURL = "https://sky.shiiyu.moe/stats/"
const hyAucURL = "https://auctions.craftlink.xyz/players/"
let player
let planckeTC
let scTC
let hyaucTC
register("command", arg1 => {
    player = arg1
    planckeTC = new TextComponent("&a" + planckeURL +player).setClick("open_url", planckeURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(planckeTC)
  }).setName("slp")
register("command", arg1 => {
    player = arg1
    scTC = new TextComponent("&a" + scURL + player).setClick("open_url", scURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(scTC)
}).setName("slsc")
register("command", arg1 => {
    player = arg1
    hyaucTC = new TextComponent("&a" + hyAucURL +player).setClick("open_url", hyAucURL + player).setHoverValue("&3Click Me");
    ChatLib.chat(hyaucTC)
}).setName("slha")
let helpTCP = new TextComponent("&0&l- &e/slp &a- Stat Link Command for plancke.io").setClick("suggest_command", "/slp").setHoverValue("&3Click to copy the command into your Chat Box");
let helpTCSc = new TextComponent("&0&l- &e/slsc &a- Stat Link Command for sky.shiiyu.moe").setClick("suggest_command", "/slsc").setHoverValue("&3Click to copy the command into your Chat Box");
let helpTCHy = new TextComponent("&0&l- &e/slha &a- Stat Link Command for auctions.craftlink.xyz").setClick("suggest_command", "/slha").setHoverValue("&3Click to copy the command into your Chat Box");
let num
let ranCom
register("command", arg1 => {
    if (arg1 == undefined || arg1 == "help") {
    ChatLib.chat('&8--------------- ' + '&f[&bStatLink&f] ' + '&8---------------')
    ChatLib.chat('&aAny of these commands can be clicked and put into your chat box')
    ChatLib.chat(helpTCP)
    ChatLib.chat(helpTCSc)
    ChatLib.chat(helpTCHy)
    } else {
        num = Math.round(Math.random() * 2)
        if (num == 0) { ranCom = "/slp"} else if (num == 1) { ranCom = "/slsc"} else if (num == 2) {ranCom = "/slha"}
        ChatLib.chat('&f[&bStatLink&f] &aInvalid command, did you mean to run &e' + ranCom + ' '  + arg1 +'&a? ')
    }
}).setName("sl")