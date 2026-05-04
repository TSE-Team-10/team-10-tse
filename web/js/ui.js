import {state} from "./app.js";
import {character_buffer} from "./chargen.js";

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

    if (state === "main"){
        clearHeader();
        showHeaderMain();
    }

    if (state === "chargen_1"){
        clearHeader();
        showHeaderCharGen1();
    }
}
//displays text for main state header
function showHeaderMain()
{
    addHeader("Welcome to the Character Generator");
    addHeader("(Type help to see commands.)");
}
//displays header for chargen_1 state header
export function showHeaderCharGen1()
{
    addHeader("Creating character:");
    addHeader("Name | Class | Race | Level");

    addHeader(
        `${character_buffer.name || "None"} | ` +
        `${character_buffer.class_?.Name || "None"} | ` +
        `${character_buffer.race?.Name || "None"} | ` +
        `level ${character_buffer.level || 1}`
    );
}

//clears the header text
function clearHeader(){
    header.querySelectorAll(".line").forEach(line => {line.remove();})
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