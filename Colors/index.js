register("command", () => {
    ChatLib.chat('&11 &22 &33 &44 &55 &66 &77 &88 &99 &00 &aa &bb &cc &dd &ee &ff &ll &r&mm &r&nn &r&oo &kk  &rk')
  }).setName("colors")
  register("command", () => {
    ChatLib.command("ct copy §", true)
    ChatLib.chat('&aThe section symbol has been copied to your clipboard. Although it wont be very helpful in ct since you can just use & codes')
  }).setName("copysymbol")