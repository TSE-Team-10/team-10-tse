let terminal;
let input;
let user;
let pass;

function main()
{
    terminal = document.getElementById("terminal");
    input = document.getElementById("commandInput");
    welcome();

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

function runCommand(cmd) {

    switch(cmd.toLowerCase()) {

        case "login":
            login()
            break;

        case "help":
            addLine("Available commands:");
            addLine("login - logs into account");
            addLine("help - show commands");
            addLine("about - about this interface");
            addLine("clear - clear terminal");
            break;

        case "about":
            addLine("[PROJECT] v0.1");
            break;

        case "clear":
            terminal.querySelectorAll(".line").forEach(line =>
                {line.remove();});
            welcome();
            break;

        default:
            addLine("Command not found: " + cmd);
    }

}

function welcome(){
    terminal.innerHTML = 
    '<div class="line">Welcome to the Command Interface</div>'
    + '<div class="line">Type <b>help</b> to see commands.</div>' ;

}

function login(){
    addLine("Enter username: ");
    user = input.value.trim();
    addLine("Enter password: ");
    pass = input.value.trim();
    //finish when back hoem

}

document.addEventListener("DOMContentLoaded", main)