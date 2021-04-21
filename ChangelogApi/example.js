// Example use for ChangelogAPI

import { Changelog } from "../ChangelogAPI/index";;

const cl = new Changelog(
    "ModuleName", // This MUST be the exact name of the module and capitalized correctly. This will be automatticly colored, DO NOT PUT COLOR CODES IN.
    "&e1.1.0", // The version that the module is updating to. It is up to you to include color codes in this.
    "&aAdded Some Stuff" // The Changelog that should be printed into chat. Its up to you to include color codes in this.
)

cl.writeChangelog()
// This will make it print when the module is updated.

// Once you invoke this function an "update.txt" file will be created in the module folder, the function reads from this file to determine wether to print the changelog. Make sure that this file DOES NOT exist when you upload the module or else the changelog will not print.
