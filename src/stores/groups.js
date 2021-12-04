import { writable } from "svelte/store";
import { jwt } from "./jwt";


export const groupsStore = writable({});

export const loadGroupsStore = async () => {
    // console.log("jwt", jwt)

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
            // const parsedData = JSON.parse(groupsfetched);
            // console.log("parsed", parsedData)


        //     const data = await submit.json();
        // const parsedData = JSON.parse(data);


            // console.log(groupsfetched)
            groupsStore.set(groupsfetched)
            // groupsStore = groupsfetched; 
            // console.log("store", groupsStore)
            // groupsStore.set(parsedData);
            // console.log("thegroups", groupsStore)
    
    
        } catch (err) {
            console.log(err)
        }
    
};



