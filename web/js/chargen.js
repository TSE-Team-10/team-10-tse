import { insert_new_char_db } from "./api.js";
import {state} from './app.js';
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

