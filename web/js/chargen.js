import { insert_new_char_db, loadClassList, loadRaceList } from "./api.js";
import {state, setState} from './app.js';
import {formatValue, addLine, showHeader} from "./ui.js";

export let class_list = [];
export let race_list = [];
export let character_buffer = {
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

//load class list and race list from api
export async function loadCharGen()
{
    if (!class_list.length)
    {class_list = await loadClassList();}

    if (!race_list.length)
        {race_list = await loadRaceList();}
}
export async function clearCharacterBuffer()
{
    character_buffer = {
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
}
//sends character to database
export function chargen(user, character)
{
    try {
        insert_new_char_db(user, character);
    }
    catch (error)
    {
        console.log("something went wrong", error);
    }
}

export function addName(name)
{
            character_buffer.name = name;
}
export async function viewClass(input)
{
    if (input === "list")
    {
        for (let i = 0; i<class_list.length; i++)
        {
            addLine(class_list[i].Name);
        }
    }

    else 
    {
        //check for input among class list
        const foundClass = class_list.find(
            cls => cls.Name === input
        );

        //display each field in json object
        if (foundClass) {
            for (const [key, value] of Object.entries(foundClass)) {
                addLine(`${key}: ${formatValue(value)}`);
            }
        } else {
            addLine("Class not found.");
        }
    }
}
export async function addClass(input)
{
    const foundClass = class_list.find(
    cls => cls.Name === input
    );

    if (foundClass) {
        character_buffer.class_ = foundClass;
        }
    else {
        addLine("Class not found.");
    }

    showHeader();
}
export async function viewRace(input)
{
    if (input === "list")
    {

        for (let i = 0; i<race_list.length; i++)
        {
            addLine(race_list[i].Name);
        }
    }
        else {
        const foundRace = race_list.find(
            race => race.Name === input
        );

        if (foundRace) {
            for (const [key, value] of Object.entries(foundRace)) {
                addLine(`${key}: ${formatValue(value)}`);
            }
        } else {
            addLine("Race not found.");
        }
    } 
}

export async function addRace(input)
{

    const foundRace = race_list.find(
        race => race.Name === input
    );

    if (foundRace) {
        character_buffer.race = foundRace;
        }
    else {
        addLine("Race not found.");
    }

    showHeader();
        
}