import { insert_new_char_db, loadClassList, loadRaceList } from "./api.js";
import {state, setState} from './app.js';
import {formatValue, addLine, showHeader, addHeader} from "./ui.js";

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

//step 2: attributes
//allow shorthand for attributes
const aliases = {
    str: "Strength",
    dex: "Dexterity",
    con: "Constitution",
    wis: "Wisdom",
    int: "Intelligence",
    cha: "Charisma"
};
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
let stat_buffer = [...STANDARD_ARRAY];
let assigned_attributes = {};

//step 3: skills
let skill_counter = 0;
let skills = [];


//load class list and race list from api
export async function loadCharGen()
{
    if (!class_list.length)
    {class_list = await loadClassList();}

    if (!race_list.length)
        {race_list = await loadRaceList();}
}
//reset character buffer
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
export function chargen(user)
{   //TODO: finish this 
    character_buffer.class_ = character_buffer.class_.name;
    character_buffer.race = character_buffer.race.name;

    try {
        insert_new_char_db(user, character_buffer);
    }
    catch (error)
    {
        console.log("something went wrong", error);
        return false;
    }
    return true;
}

//add name to character buffer
export function addName(name)
{
            character_buffer.name = name;
}

//view specified class
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

//add specified class to character buffer
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

//view specified race
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

//add specified race to character buffer
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

//returns true if character gen part 1 is fully filled out
export function validateCharGen1()
{
    if (!character_buffer.name)
    {   addLine("Character must have a name before proceeding");
        return false;}

    if (!character_buffer.class_) //IMPORTANT: program will crash if it can't grab skills in step 3
    {   addLine("Character must have a class before proceeding");
        return false;}

    if (!character_buffer.race) //IMPORTANT: program will crash if it can't grab ASI in step 2
    {   addLine("Character must have a race before proceeding");
        return false;}

    console.log("validated: \n"
                +"name: " +  character_buffer.name + "\n"
                +"race: " + character_buffer.race + "\n"
                +"class: " + character_buffer.class_ + "\n"
    );
    return true;
}

//render char gen part 2 header
export async function showStatsHeader()
{
    let race_ASI = getRaceASI(); //nab ASI from race object gotten in previous step

    for (attribute of character_buffer.Attributes)
    {   
        //output should be something like str: 18 (15 + 3)
        // (15+3) is only needed if it's increased from race
        // else everything will be (15 + 0)

        let attribute_name = Object.keys(attribute)[0];

        //grab value from either list of assigned attributes or default (which is 0)
        let base_value = assigned_attributes[attribute_name]
                        ?? attribute[attribute_name];

        let race_bonus = racialBonuses[attribute_name] ?? 0;

        let finalValue = base_value + race_bonus;

        let output = attribute_name + ": "
                    + finalValue;

        // this part should add the (15+3)
        if (racialBonus > 0)
        {
            output +=" (" + baseValue + " + " + racialBonus + ")";
        }

        addHeader(output);
    }

    addLine("");
    addLine("Remaining scores: " + stat_buffer.join(", "));
}

//get ASI from race in buffer
//TODO: check if this works with subraces
function getRaceASI()
{
    let ASI = {};

    for (let entry of character_buffer.race["Ability Score Increase"])
    {
        ASI[entry.ability] = entry.bonus;
        console.log("adding " + bonuses[entry.ability] + "with value " + entry.bonus);
    }

    return bonuses;
}

// assign stat from standard array
export function assignScore(stat_name, value)
{

    try
    {value = Number(value);} // need to convert value from string input to number
    catch(err)
    {
        addLine("cannot convert secondary arguement to a number value");
        return;
    }

    //shorthand needs lowercase, full stat name needs capitalization as per alias key
    //thanks to the magic of operation order this returns either the value from the alias object
    //or capitalises the input if it don't exist
    let normalized_stat = aliases[stat_name.toLowerCase()] || capitalize(stat_name);

    // validate stat exists for the character (redundant for now, but useful if upscaling for custom stats)
    let valid_stats = character_buffer.Attributes.map( obj => Object.keys(obj)[0]);

    // return if can't find the right stat
    if (!valid_stats.includes(normalized_stat))
    {
        addLine("Invalid stat: " + stat_name);
        return;
    }

    // validate score is stil available from buffer
    let score_index = stat_buffer.indexOf(value);

    if (score_index === -1) //index returns -1 if cant find
    {
        addLine("Score already used: " + value);
        return;
    }

    //snip used standard array value from buffer and slot in attribute with value to the other buffer
    stat_buffer.splice(score_index, 1);
    assigned_attributes[normalized_stat] = value;

    addLine(normalized_stat + " assigned to " + value);

    showHeader(); // refresh header
}

// resets stat allocation
export function resetScores()
{
    stat_buffer = [...STANDARD_ARRAY];
    assigned_attributes = {};
    addLine("Attributes reset");
}

//validate all ability scores have been assigned
export function validateCharGen2()
{
    if (!stat_buffer.length)
    {return true;}

    return false;
}

export function commitAbilityScores()
{
    //solution sourced from
    // https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays/49731588
    //it made more sense to store values into a separate buffer from character or face more object within object pain

    character_buffer.Attributes = character_buffer.Attributes.map(attribute => 
        {let name = Object.keys(attribute)[0];
        return {[name]: assigned_attributes[attribute]};
    })

}

export function populateSkills(){
    for (skill in character_buffer.class_.skills)
    {
        skills.push(skill);
    }
}
export function showSkillsHeader()
{   
    addHeader(`choices remaining: ${skill_counter}`);
    addHeader("available skills:");
    for (skill in skills)
    {
        addHeader(skill);
    }
}
//returns string with first character capitalized
export function capitalize(input)
{
    return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()); // i can't believe i had to write this manually
}
