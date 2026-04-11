import {chargen} from "./chargen.js";
import {login, loadCharacterList} from "./api.js";
let terminal;
let input;
const debug = true;
export const user = "1";
export let state = "main";

let character_list = [];

let character_temp = {
    "Name": null,
    "Race": null,
    "class": null,
    
};

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


function addLine(text) {
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
            chargen(user);
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

    if (state === "chargen_1")
    {


        switch(cmdArray[0].toLowercase())
        {
            case "exit":
            state = "main";
            console.log ("switching state to:", state)
            break;

            default:
                addLine("Command not found: " + cmd);
        }
    }


}

function showStaticText(){

    if (state === "main"){
        terminal.innerHTML = 
        '<div class="line">Welcome to the Command Interface</div>'
        + '<div class="line">Type <b>help</b> to see commands.</div>' ;
    }
}

function clearConsole(){
                terminal.querySelectorAll(".line").forEach(line =>
                {line.remove();});
                showStaticText();
}
document.addEventListener("DOMContentLoaded", main)