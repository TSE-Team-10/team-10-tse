import {clearTerminal, addLine, showHeader} from "./ui.js";
import {loadCharGen, addName, viewClass, addClass, viewRace, addRace, clearCharacterBuffer, validateCharGen1,
        assignScore, resetScores, validateCharGen2, populateSkills, commitAbilityScores, validateCharGen3, chargen,
        toggleSkill, getTestCharacter} from "./chargen.js";
import {state, setState, user} from "./app.js";
import {insert_new_char_db, login, loadCharacterList} from "./api.js";

let character_list = [];
//wrapper function for input commands
export async function runCommand(cmd) {

    let cmdArray = cmd.split(" "); // split by whitespace

    if (cmdArray[0].toLowerCase() === "clear")
    {clearTerminal();
    }
    else
    {
        //run subfunction based on current state
        switch (state)
        {
            case "main":
                runCommandMain(cmdArray);
                break;
            
            case "chargen_1":
                runCommandChargen(cmdArray);
                break;
            
            case "chargen_2":
                runCommandChargenStats(cmdArray);
                break;
            case "chargen_3":
                runCommandChargenSkills(cmdArray);
                break;

            default:
                addLine("Error: unknown app state");
                console.log("state" + state + "not known");
                break;
        }  
    }
}

async function runCommandMain(cmdArray)
{
    switch(cmdArray[0].toLowerCase()) 
    {

        case "help":
            addLine("Available commands:");
            addLine("help - show commands");
            //addLine("about - about this interface");
            //addLine("login (username) (password) - log in using credentials ");
            addLine("new - start a new character");
            addLine("list - show existing characters")
            addLine("clear - clear terminal");
            break;

        case "about": // show app fluff
            addLine("[PROJECT] v0.1");
            break;
        
        case "new": // enter character creation stage 1
            setState("chargen_1")
            console.log("switching state to:", state)
            loadCharGen();
            clearTerminal();
            showHeader();
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

        case "test":
        
        let character = getTestCharacter();
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
            addLine("Command not found: " + cmdArray[0]);

    }

}

export async function runCommandChargen(cmdArray)
{
    switch(cmdArray[0].toLowerCase())
        {
        case "help":
            addLine("name (name) - add name to character");
            addLine("class view (list, class) - view class list, or view details of a specified class");
            addLine("class add (class) - add class to character");
            addLine("race (race) - add race to character");
            addLine("save - commit character")
            addLine("exit - back to main");
            break;

        case "name":
            if (!cmdArray[1]) // early return if no name specified
            {addLine("Provide a name for your character");
                break;
            }
                        cmdArray.splice(0, 1); //take out name command and send rest as name
            let name = cmdArray.join(" ");
            addName(name);
            showHeader();
            break;
        
        case "class":

            if (!cmdArray[1]) // early exit if subcommand unspecified
            {addLine("missing secondary arguement, valid commands: view, add"); 
            break;}
            
            if (!cmdArray[2])
            {addLine("missing tertiary arguement, please specify what you wish to do");}

            if (cmdArray[1] === "view") //displays requested class
            {
            viewClass(cmdArray[2]); 
            }
        
            if (cmdArray[1] === "add") //adds requested class to character
            {
                addClass(cmdArray[2]);
            }

        //reset header to update results
        showHeader();
        break;

        case "race":

            if (!cmdArray[1])
            {addLine("Please provide a secondary argument");}
            if (!cmdArray[2])
            {addLine("missing tertiary arguement, please specify what you wish to do");}

            if (cmdArray[1] === "view")
            {
                viewRace(cmdArray[2])
            }
            else if (cmdArray[1] === "add")
            {
                addRace(cmdArray[2])
            }


            break;

        case "next":

            if (validateCharGen1())
            {
            setState("chargen_2");
            showHeader();
            clearTerminal();
            }

            break;

        case "exit":
        setState("main");
        console.log ("switching state to:", state);
        clearCharacterBuffer();
        clearTerminal();
        break;

        default:
            addLine("Command not found: " + cmdArray[0]);
    }
}

export async function runCommandChargenStats(cmdArray)
{

    switch (cmdArray[0].toLowerCase())
    {
        case "help":
            addLine("assign [ability] [value]");
            addLine("reset");
            addLine("next");
            addLine("exit");
            break;

        case "assign":

            if (!cmdArray[1] || !cmdArray[2])
            {break;}

            assignScore(cmdArray[1], cmdArray[2]);
            break;
        
        case "reset":
            resetScores();
            break;
        
        case "next":

            if (validateCharGen2())
            {
            commitAbilityScores();
            populateSkills();
            setState("chargen_3");
            console.log ("switching state to:", state);
            showHeader();
            clearTerminal();
            }

            break;

        case "exit":
            setState("main");
            console.log ("switching state to:", state);
            clearCharacterBuffer();
            clearTerminal();
            break;

        default:
            addLine("Command not found: " + cmdArray[0]);
            break;

    }
}

export async function runCommandChargenSkills(cmdArray)
{
    switch (cmdArray[0].toLowerCase())
    {
        case "help":
            addLine("add [skill] - add/remove proficiency to skill");
            addLine("next");
            addLine("exit");
            break;
        
        case "add":
            {
                if (!cmdArray[1])
                {
                    addLine("please add secondary arguement")
                    break;
                }
                toggleSkill(cmdArray[1]);
                showHeader();
                break;
            }
        case "next":
            if (!validateCharGen3())
            {
                break;
            }
            if (! await chargen())
            {break;}
            addLine("character created successfully");

            setState("main");
            console.log ("switching state to:", state);
            clearCharacterBuffer();

            break;

        case "exit":
            setState("main");
            console.log ("switching state to:", state);
            clearCharacterBuffer();
            clearTerminal();
            break;

        default:
            addLine("Command not found: " + cmdArray[0]);
            break;

    }
}