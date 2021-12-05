import { writable } from "svelte/store";
import { jwt } from "./jwt";


export const groupsStore = writable({});

export const loadGroupsStore = async () => {


    let njwt;
    const unsubscribe = jwt.subscribe(value => {
        njwt = value;
    })
	
        try {
            const groupsfetch = await fetch("https://strengthn.herokuapp.com/user/groups", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "token": JSON.stringify(njwt)
                },
            });
    
            const groupsfetched = await groupsfetch.json();

            groupsStore.set(groupsfetched)
 
    
    
        } catch (err) {
            console.log(err)
        }
    
};



