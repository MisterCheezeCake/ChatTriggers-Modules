/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
const File = Java.type("java.io.File")
class CheezeCore {
    /**
     * 
     * @param {string} file - The path of the file 
     * @param {string} content - The contents you want the created file to have
     * @returns {boolean} If the file was written to
     */
    static createConditionaly(file: string, content: string) {
        if (new File(file).exists()) return false;
        FileLib.write(file, content);
        return true;
    }
    /**
     * 
     * @param {string} command - The command the Help TC is for
     * @param {string} description - The command's description
     * @returns A help text component in my style
     */
    static createHelpTC(command:string, description:string) {
        return new TextComponent(`&0&l- &e${command} &a${description}`).setClick("run_command", command).setHoverValue(`&3Click to run &e${command}`);
    }
    /**
     * 
     * @param {object} object - The object to join
     * @param {string} seperator - The seperator which should join the object
     * @returns {string} A joined string of the objects values
     */
    static joinObjectContentToString(object: object, seperator: string) {
        return [].slice.call(object).join(seperator)
    }
}
export default CheezeCore