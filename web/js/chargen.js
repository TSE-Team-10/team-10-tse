import { insert_new_char_db, loadClassList, loadRaceList } from "./api.js";
import {state, setState, user} from './app.js';
import {formatValue, addLine, showHeader, addHeader} from "./ui.js";

export let class_list = [];
export let race_list = [];
export let character_buffer = {
    "name": null,
    "race": null,
    "class_": null,
    "level": 1,
    "Attributes": [
        {"Strength": 0},
        {"Dexterity": 0},
        {"Constitution": 0},
        {"Wisdom": 0},
        {"Intelligence": 0},
        {"Charisma": 0}
    ],
    "Skills": [
        {"Acrobatics": 0},
        {"Animal Handling": 0},
        {"Arcana": 0},
        {"Athletics": 0},
        {"Deception": 0},
        {"History": 0},
        {"Insight": 0},
        {"Intimidation": 0},
        {"Investigation": 0},
        {"Medicine": 0},
        {"Nature": 0},
        {"Perception": 0},
        {"Performance": 0},
        {"Persuasion": 0},
        {"Religion": 0},
        {"Sleight of Hand": 0},
        {"Stealth": 0},
        {"Survival": 0}

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
const skill_abilities = {
    "Acrobatics": "Dexterity",
    "Animal Handling": "Wisdom",
    "Arcana": "Intelligence",
    "Athletics": "Strength",
    "Deception": "Charisma",
    "History": "Intelligence",
    "Insight": "Wisdom",
    "Intimidation": "Charisma",
    "Investigation": "Intelligence",
    "Medicine": "Wisdom",
    "Nature": "Intelligence",
    "Perception": "Wisdom",
    "Performance": "Charisma",
    "Persuasion": "Charisma",
    "Religion": "Intelligence",
    "Sleight of Hand": "Dexterity",
    "Stealth": "Dexterity",
    "Survival": "Wisdom"
};

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
export async function chargen() {

    console.log(character_buffer);

        let output = {
            belongs_to: user,
            details: {
                name: character_buffer.name,
                race: character_buffer.race.Name,
                class_: character_buffer.class_.Name,
                level: character_buffer.level ?? 1
            },
            Attributes: character_buffer.Attributes,
            Skills: character_buffer.Skills
        };

        console.log(output);
        let result = await insert_new_char_db(output);

        if (!result) {
            console.log("Character creation failed");
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

    for (let attribute of character_buffer.Attributes)
    {   
        //output should be something like str: 18 (15 + 3)
        // (15+3) is only needed if it's increased from race
        // else everything will be (15 + 0)

        let attribute_name = Object.keys(attribute)[0];

        //grab value from either list of assigned attributes or default (which is 0)
        let base_value = assigned_attributes[attribute_name]
                        ?? attribute[attribute_name];

        let race_bonus = race_ASI[attribute_name] ?? 0;

        let finalValue = base_value + race_bonus;

        let output = attribute_name + ": "
                    + finalValue;

        // this part should add the (15+3)
        if (race_bonus > 0)
        {
            output +=" (" + base_value + " + " + race_bonus + ")";
        }

        addHeader(output);
    }

    addHeader("");
    addHeader("Remaining scores: " + stat_buffer.join(", "));
}

//get ASI from race in buffer
//TODO: check if this works with subraces
function getRaceASI()
{
    let ASI = {};

    for (let entry of character_buffer.race["Ability Score Increase"])
    {
        ASI[entry.ability] = entry.bonus;
        console.log("adding " + ASI[entry.ability] + "with value " + entry.bonus);
    }

    return ASI;
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

// commit ability score buffer to character buffer
export function commitAbilityScores()
{
    //solution sourced from
    // https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays/49731588
    //it made more sense to store values into a separate buffer from character or face more object within object pain

    character_buffer.Attributes = character_buffer.Attributes.map(attribute => 
        {let name = Object.keys(attribute)[0];
        return {[name]: assigned_attributes[name]};
    });

}

//add skills to a buffer
export function populateSkills(){
    for (let skill in character_buffer.class_.skills)
    {
        skills.push(skill);
    }
    character_buffer.class_.Proficiencies["Skill no"];
}

//display skills
export function showSkillsHeader()
{   
    addHeader(`choices remaining: ${skill_counter}`);
    addHeader("available skills:");
    for (let skill of character_buffer.Skills)
    {
        let skill_name = Object.keys(skill)[0];

        let proficient = skill[skill_name]; //skills are tracked in bool 0/1
        let bonus = 0;
        if (proficient)
        {
            bonus = 2;
        }

        //im pretty sure this is a programming war crime but i've run out of names
        let ability = skill_abilities[skill_name]; //grab related ability for modifier modifier
        let attribute_score = character_buffer.Attributes.find(
        attribute => Object.keys(attribute)[0] === ability);

        let score = Object.values(attribute_score);
        let modifier = getAbilityModifier(score); // ditto

        let total = modifier + bonus;
        let mark = proficient ? "X " : "";
        let output = `${mark}${skill_name}: ${total}`;


        addHeader(output);
    }
}

export function toggleSkill(skill_name)
{


    let skill = character_buffer.Skills.find( // grab skill from character
        skl => Object.keys(skl)[0].toLowerCase() === skill_name.toLowerCase()
    );

    if (!skill)
    {
        addLine("Skill not found.");
        return;
    }

    let name = Object.keys(skill)[0];
    let prof = skill[name];

    if (prof === 1)
    {
        skill[name] = 0;
        skill_counter++;

        addLine(`${name} removed.`);
        

        return;
    }

    if (skill_counter === 0)
    {
        addLine("No remaining skill choices.");
        return;
    }

        skill[name] = 1;
        skill_counter--;
        addLine(`${name} selected.`);

}

export function validateCharGen3()
{
    if (skill_counter != 0)
    {
        addLine("you still have skill options remaining");
        return false;
    }
    return true;

}
//returns string with first character capitalized
export function capitalize(input)
{
    return (input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()); // i can't believe i had to write this manually
}


export function getAbilityModifier(score)
{
    return Math.floor((score - 10) / 2);
}

export function getTestCharacter()
{
    character_buffer = {
        name: "testman",
        race: {name: "testrace"},
        class_: {name: "testclass"},
        level: 1,
        Attributes: [
            {"Strength": 10},
            {"Dexterity": 10},
            {"Constitution": 10},
            {"Wisdom": 10},
            {"Intelligence": 10},
            {"Charisma": 10}
        ],
        Skills: [
            {"Acrobatics": 1},
            {"Animal Handling": 1},
            {"Arcana": 0},
            {"Athletics": 0},
            {"Deception": 0},
            {"History": 0},
            {"Insight": 0},
            {"Intimidation": 0},
            {"Investigation": 0},
            {"Medicine": 0},
            {"Nature": 0},
            {"Perception": 0},
            {"Performance": 0},
            {"Persuasion": 0},
            {"Religion": 0},
            {"Sleight of Hand": 0},
            {"Stealth": 0},
            {"Survival": 0}
        ]
    };

chargen();
return;
}