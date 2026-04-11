import {chargen} from "./chargen.js";
import {login, loadCharacterList} from "./api.js";
let terminal;
let input;
const debug = true;
export const user = "1";
export let state = "main";

let character_list = [];

let character_temp = {
    "name": null,
    "race": null,
    "class_": null,
    
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

    //TODO: separate into own subfunction
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

    //TODO: separate into own subfunction
    else if (state === "chargen_1")
    {


        switch(cmdArray[0].toLowerCase())
        {
            case "help":
                addLine("name (name) - add name to character");
                addLine("class (class) - add class to character");
                addLine("race (race) - add race to character");
                addLine("save - commit character")
                addLine("exit - back to main");

                break;

            case "name":
                if (!cmdArray[1])
                {addLine("Provide a name for your character");}

                cmdArray.splice(0, 1);
                character_temp.name = cmdArray.join(" ");
                clearConsole();
                break;
            
            case "class":
                //TODO: add class logic
                break;

            case "race":
                //TODO: add race logic
                break;

            case "save":
                chargen(user, character_temp);
                state = "main";
                console.log ("switching state to:", main);

            case "exit":
            state = "main";
            console.log ("switching state to:", state);
            character_temp = {
                "name": null,
                "race": null,
                "class": null,
                
            };
            clearConsole();
            break;

            default:
                addLine("Command not found: " + cmd);
        }
    }


}

function showStaticText(){
    //TODO: separate into subfunctions
    if (state === "main"){
        addLine("Welcome to the Character Generator");
        addLine("(Type help to see commands.)");
    }

    if (state === "chargen_1"){

        addLine("Creating character:");
        addLine("Name | Class | Race | Level");
        addLine(character_temp.name + " | " + character_temp.class_ + " | " + character_temp.race + " | level " + character_temp.level);
    }
}

function clearConsole(){
                terminal.querySelectorAll(".line").forEach(line =>
                {line.remove();});
                showStaticText();
}
document.addEventListener("DOMContentLoaded", main)