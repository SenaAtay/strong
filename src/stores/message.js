import {writable}  from "svelte/store";
import {jwt} from "./jwt";

export const messages = writable([]);

export const loadMessages = async () =>{
    try {
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
        
        const submit = await fetch("https://strengthn.herokuapp.com/user/messages", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt)
            },
        }); 

        const data = await submit.json();
        messages.set(data);

    } catch (err){
        console.log(err)
    } 
};



