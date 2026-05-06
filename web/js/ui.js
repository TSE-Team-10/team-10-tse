import {state} from "./app.js";
import {character_buffer, showStatsHeader, showSkillsHeader} from "./chargen.js";

export let input;

let terminal;
let header;

//assigns html elements to variables
export function loadUI(){
    terminal = document.getElementById("terminal");
    input = document.getElementById("commandInput");
    header = document.getElementById("terminal-header")
}

//clears the output terminal
export function clearTerminal(){
                terminal.querySelectorAll(".line").forEach(line =>
                {line.remove();});

}
//add text to the terminal
export function addLine(text) {
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = text;
    terminal.insertBefore(div, terminal.lastElementChild);
}

//add text to the header
export function addHeader(text){
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = text;
    header.insertBefore(div, header.lastElementChild);
}

//wrapper for header functions
export function showHeader(){
    // TODO: replace with switch case
    if (state === "main"){
        clearHeader();
        showHeaderMain();
    }

    if (state === "chargen_1"){
        clearHeader();
        showHeaderCharGen1();
    }

    if (state === "chargen_2")
    {
        clearHeader();
        showHeaderCharGen2();
    }
    if (state === "chargen_3")
    {
        clearHeader();
        showHeaderCharGen3();
    }
}

//displays text for main state header
function showHeaderMain()
{
    addHeader("Welcome to the Character Generator");
    addHeader("(Type help to see commands.)");
}

//displays header for chargen_1 state header
function showHeaderCharGen1()
{
    addHeader("Creating character:");
    addHeader("Name | Class | Race | Level");

    addHeader(`${character_buffer.name || "None"} | ` 
                + `${character_buffer.class_?.Name || "None"} | ` 
                + `${character_buffer.race?.Name || "None"} | ` 
                + `level ${character_buffer.level || 1}`
    );
        addHeader("(Type help to see commands.)");
}

//displays header for chargen_2 state header
function showHeaderCharGen2()
{
    addHeader("Character Attributes:");
    showStatsHeader();
    addHeader("(Type help to see commands.)");
}

//clears the header text
function clearHeader(){
    header.querySelectorAll(".line").forEach(line => {line.remove();})
}

//displays header for chargen_3 state header
function showHeaderCharGen3()
{
    showSkillsHeader();
    addHeader("(Type help to see commands.)");
}

//iterates for objects within objects
export function formatValue(value, indent = 0) {

//solution sourced from
// https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays/49731588
// calling a json object within a json object needed its own sub-solution
// TODO: change the name to something more relevant

    const spacing = "  ".repeat(indent);

    //iterates itself if the entry is an array
    if (Array.isArray(value)) {
        return value.map(v => formatValue(v, indent)).join(", ");
    }

    //if it finds an object, iterate itself for the entries in that object
    if (typeof value === "object" && value !== null) {
        return "\n" + Object.entries(value)
            .map(([k, v]) => `${spacing}  ${k}: ${formatValue(v, indent + 1)}`)
            .join("\n");
    }

    //base case just returns the value
    return value;
}