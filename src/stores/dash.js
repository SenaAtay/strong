
import {writable}  from "svelte/store";
import {jwt} from "./jwt";


// console.log($jwt);

export const dash = writable([]);

const loadDash = async () =>{
    try {
        console.log("sss", jwt);
        const submit = await fetch("https://strengthn.herokuapp.com/user/home", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "token": JSON.stringify(jwt)
            },
        }); 
        
        try{
         const data = await submit.json();
        console.log("consoling data", data)
        const parsedData= JSON.parse(data);
        console.log("consoloing", parsedData)

        } catch (err){
            console.log(err)
        }
        
      

        dash.set(parsedData.groups);


        
    } catch (err){
        console.log(err)
    } 

    
};

loadDash();

