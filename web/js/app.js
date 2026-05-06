import {input, loadUI, addLine, showHeader} from "./ui.js";
import {runCommand} from "./command.js";
const debug = true;
export const user = "1";
export let state = "main";

export let character_list = [];

//loads app and adds listener for keyboard
function main()
{
    loadUI();
    showHeader();

input.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        const command = input.value.trim();
        addLine("> " + command);
        runCommand(command);

        input.value = "";
    }

});
}

//assigns new app state
export function setState(newState)
{
    state = newState;
    showHeader(); //refresh header to reflect new state
}

//entrypoint
if (typeof document !== "undefined")
{
    document.addEventListener(
        "DOMContentLoaded",
        main
    );
}