
import {writable}  from "svelte/store";
import {jwt} from "./jwt";
import{userID} from "./userid"

export const dash = writable({});

export const loadDash = async () =>{
    try {
        let njwt;
        const unsubscribe = jwt.subscribe(value => {
            njwt = value;
        })
        // console.log(njwt)
        const submit = await fetch("https://strengthn.herokuapp.com/user/home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify(njwt)
            },
        }); 

        const data = await submit.json();
        const parsedData= JSON.parse(data);
        console.log(parsedData)
        dash.set(parsedData);
        userID.set(parsedData.user[0].userid);

    } catch (err){
        console.log(err)
    } 
};



