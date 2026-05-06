
const API_URL = 'http://127.0.0.1:8000';

export async function insert_new_char_db(character)
{
    //TODO: fix to include all character details
    console.log("user value:", character.belongs_to);
    const response = await fetch(API_URL + "/character_list/",
    {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify( {
            belongs_to: character.belongs_to,
            details: {
                name: character.details.name,
                class_: character.details.class_,
                race: character.details.race,
                level: character.details.level
            }
        })
    });

    if (!response.ok)
    {console.log("failed to post character details");
    return false;
    }
    let data = await response.json();
    let id_ = data.id_

    for (let ability of character.Attributes)
    {
        let attribute_name = Object.keys(ability)[0];
        let attribute_value = ability[attribute_name];

        const response = await fetch(API_URL + "/character_attributes/",
        {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify( {
                belongs_to: id_,
                attribute: attribute_name,
                value: attribute_value
                })
            });
        if (!response.ok)
        {
            console.log(`failed to post attribute: ${attribute_name}`);
            return false;
        }
    }
    for (let skill of character.Skills)
    {
        let skill_name = Object.keys(skill)[0];
        let skill_value = skill[skill_name];

        const response = await fetch(API_URL + "/character_skills/",
        {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify( {
                character_id: id_,
                skill: skill_name,
                value: skill_value
                })
            });
        if (!response.ok)
        {
            console.log(`failed to post attribute: ${skill_name}`);
            return false;
        }
    }
    

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

export async function loadClassList()
{
    const response = await fetch(API_URL + "/class_list/");

    if (!response.ok)
    {console.log("fugg");}
    else
    {console.log("yippee");}

    return response.json();
}

export async function loadRaceList()
{
        const response = await fetch(API_URL + "/race_list/");

    if (!response.ok)
    {console.log("fugg");}
    else
    {console.log("yippee");}

    return response.json();
}