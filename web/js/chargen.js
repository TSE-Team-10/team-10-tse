import { insert_new_char_db, loadClassList, loadRaceList } from "./api.js";
import {state, formatValue, addLine, clearConsole, showStaticText} from './app.js';

export let class_list = [];
export let race_list = [];
export let character_temp = {
    "name": null,
    "race": null,
    "class_": null,
    "Attributes": [
        {"Strength": 0},
        {"Dexterity": 0},
        {"Constitution": 0},
        {"Wisdom": 0},
        {"Intelligence": 0},
        {"Charisma": 0}
    ]
};

export function chargen(user)
{
    try {
        insert_new_char_db(user)
    }
    catch (error)
    {
        console.log("something went wrong");
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
                if (!cmdArray[1])
                {addLine("Provide a name for your character");}

                cmdArray.splice(0, 1);
                character_temp.name = cmdArray.join(" ");
                clearConsole();
                break;
            
            case "class":

                if (!class_list.length)
                    {class_list = await loadClassList();}

                if (!cmdArray[1])
                {addLine("Please provide a secondary argument");}

                if (cmdArray[1] === "view" && cmdArray[2] === "list")
                {


                    for (let i = 0; i<class_list.length; i++)
                    {
                        addLine(class_list[i].Name);
                    }
                }

                else if (cmdArray[1] === "view" && cmdArray[2]) {
                    const foundClass = class_list.find(
                        cls => cls.Name === cmdArray[2]
                    );

                    if (foundClass) {
                        for (const [key, value] of Object.entries(foundClass)) {
                            addLine(`${key}: ${formatValue(value)}`);
                        }
                    } else {
                        addLine("Class not found.");
                    }
                } 
                break;

            case "race":

                if (!race_list.length)
                    {race_list = await loadRaceList();}

                if (!cmdArray[1])
                {addLine("Please provide a secondary argument");}

                if (cmdArray[1] === "view" && cmdArray[2] === "list")
                {


                    for (let i = 0; i<race_list.length; i++)
                    {
                        addLine(race_list[i].Name);
                    }
                }

                else if (cmdArray[1] === "view" && cmdArray[2]) {
                    const foundRace = race_list.find(
                        race => race.Name === cmdArray[2]
                    );

                    if (foundRace) {
                        for (const [key, value] of Object.entries(foundRace)) {
                            addLine(`${key}: ${formatValue(value)}`);
                        }
                    } else {
                        addLine("Race not found.");
                    }
                } 
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
                "class_": null,
                "Attributes": [
                    {"Strength": 0},
                    {"Dexterity": 0},
                    {"Constitution": 0},
                    {"Wisdom": 0},
                    {"Intelligence": 0},
                    {"Charisma": 0}
                ]
            };
            clearConsole();
            break;

            default:
                addLine("Command not found: " + cmdArray);
        }
}

export function showStaticTextCharGen()
{
        addLine("Creating character:");
        addLine("Name | Class | Race | Level");
        addLine(character_temp.name + " | " + character_temp.class_ + " | " + character_temp.race + " | level " + character_temp.level);
}