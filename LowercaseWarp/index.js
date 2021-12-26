/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
let toggle = FileLib.read("LowercaseWarp", "toggle.txt")
register("command", arg1 => {
    if (toggle == 'true') {
        ChatLib.command(`warp ${arg1.toLowerCase()}`)
    } else{
        ChatLib.command(`warp ${arg1}`)
    }
}).setName('warp')

register("command", arg1 => {
    if (arg1 === 'on') {
        toggle = 'true'
        FileLib.write("LowercaseWarp", "toggle.txt", "true")
        ChatLib.chat('&aLowercaseWarp Enabled')
    } else if (arg1 === 'off') {
        toggle = 'false'
        FileLib.write("LowercaseWarp", "toggle.txt", "false")
        ChatLib.chat('&cLowercaseWarp Disabled')
    } else {
        ChatLib.chat('&cInvalid argument count. Usage: /lcw (on/off)')
    }
}).setTabCompletions(["on", "off"]).setName('lcw')