import {runCommandChargen, showStaticTextCharGen} from "./chargen.js";
import {login, loadCharacterList} from "./api.js";

let terminal;
let input;
const debug = true;
export const user = "1";
export let state = "main";

export let character_list = [];

function main()
{
    terminal = document.getElementById("terminal");
    input = document.getElementById("commandInput");
    showStaticText();

input.addEventListener("keydown", function(e) {

    if (e.key === "Enter") {

        const command = input.value.trim();
        addLine("> " + command);
        runCommand(command);

        input.value = "";
    }

});
}


export function addLine(text) {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = text;
    terminal.insertBefore(div, terminal.lastElementChild);
}

async function runCommand(cmd) {

    let cmdArray = cmd.split(" ");

    if (state === "main"){
    switch(cmdArray[0].toLowerCase()) 
    {

        case "help":
            addLine("Available commands:");
            addLine("help - show commands");
            addLine("about - about this interface");
            addLine("login (username) (password) - log in using credentials ");
            addLine("new - start a new character");
            addLine("list - show existing characters")
            addLine("clear - clear terminal");
            break;

        case "about":
            addLine("[PROJECT] v0.1");
            break;

        case "clear":
            clearConsole();
            break;
        
        case "new":
            state = "chargen_1";
            console.log("switching state to:", state)
            clearConsole();
            break;

        case "login":

            if (!cmdArray[1])
            {addLine("Please insert a username");
                break;
            }
            if(!cmdArray[2])
            {addLine("Please insert a password");
                break;
            }
            // TODO: replace with login chain
            login(cmdArray[1], cmdArray[2]);
            break;
        case "list":
        
        if (!character_list.length)
            {
                character_list = await loadCharacterList(user);
            }
        
        addLine("ID | Name | Class | Race | Level");
        for (let i=0; i<character_list.length; i++)
        {addLine(i + "| " + character_list[i].details.name + " | " + character_list[i].details.class_ + " | " + character_list[i].details.race + " | level " + character_list[i].details.level);}
        break;

        default:
            addLine("Command not found: " + cmd);

    }
    }

    else if (state === "chargen_1")
    {
        runCommandChargen(cmdArray)


    }


}

export function showStaticText(){

    if (state === "main"){
        addLine("Welcome to the Character Generator");
        addLine("(Type help to see commands.)");
    }

    if (state === "chargen_1"){

        showStaticTextCharGen();
    }
}

export function clearConsole(){
                terminal.querySelectorAll(".line").forEach(line =>
                {line.remove();});
                showStaticText();
}

export function formatValue(value, indent = 0) {
    const spacing = "  ".repeat(indent);

    if (Array.isArray(value)) {
        return value.map(v => formatValue(v, indent)).join(", ");
    }

    if (typeof value === "object" && value !== null) {
        return "\n" + Object.entries(value)
            .map(([k, v]) => `${spacing}  ${k}: ${formatValue(v, indent + 1)}`)
            .join("\n");
    }

    return value;
}

document.addEventListener("DOMContentLoaded", main)