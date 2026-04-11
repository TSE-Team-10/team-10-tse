
const API_URL = 'http://127.0.0.1:8000';

export async function insert_new_char_db(user)
{
    //TODO: fix to include all character details
    console.log("user value:", user);
    const response = await fetch(API_URL + "/character_list/",
    {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify( {
            belongs_to: user
        })
    });

    if (!response.ok)
    {console.log("fugg");}
    else
    {console.log("yippee");}

    return response;
}

export async function get_character_by_user(user)
{
    const response = await fetch(API_URL + "/get_character_by_id/" + user)
}
export async function login(user, pass)
{
    console.log("Successful user login: ", user, pass);
    return;
}

export async function loadCharacterList(user)
{
        console.log("user value:", user);
    const response = await fetch(API_URL + "/character_list/user/" + user);

    if (!response.ok)
    {console.log("fugg");}
    else
    {console.log("yippee");}

    return response.json();
}
