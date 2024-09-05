export const quickSort = (arr) => {
    // base case
    if (arr.length <= 1) return arr;
    // choose a pivot (middle of array)

    let pin = Math.floor(arr.length/2) - 1

    // change to be price
    let pivot = arr[pin]['price'];

    let larr = [];
    let rarr = [];
    
    for (let i = 0; i < arr.length; i++){
        if (i !== pin && arr[i]["price"] < pivot){
            larr.push(arr[i]);
        }if (i !== pin && arr[i]["price"] >= pivot){
            rarr.push(arr[i]);
        }
    }
    // recurse on left arr
    return quickSort(larr).concat([arr[pin]].concat(quickSort(rarr)));
    // recurse on right arr
}


export const formFeature = (row) => {
    let answer = ""
    if (row.fountains === 1){
        answer += "Fountains, ";
    } if (row.bubbles === 1){
        answer += "Bubbles, ";
    } if (row.lights === 1){
        answer += "Lights, ";
    } if (row.is_smart === 1){
        answer += "Smart Pool, ";
    } if (row.heater === 1){
        answer += "Heater, ";
    }
    if (answer.length > 0){
        return answer.slice(0,-2);
    } else{
        return "N/A";
    }
};

export function formLandscaping(row){
    let answer = ""
    if (row.plants === 1){
        answer += "Plants, ";
    } if (row.grill === 1){
        answer += "Grill, ";
    }
    if (answer.length > 0){
        return answer.slice(0,-2);
    } else{
        return "N/A";
    }
};


export const outputQuery = (request) => {
    let query = "";
    if (request.shape !== null){
        query = `Quotes from our sources for a ${request.shape}-styled pool with `;
    } else {
        query = `Quotes from our sources for a pool with `;
    }  
    if (request.sanitation_system !== null){
        query += `a ${request.sanitation_system} sanitation system, `;
    }
    
    let fk = Object.keys(request.features);
    let count = 0;

    for (let i=0; i<fk.length;i++){
        if (request.features[fk[i]] != false){
            count +=1;
        }
    }
    count -=1;
    console.log(count);
    if (count != 0){
        query += `featuring `;
        if (request.features.bubbles != false){
            query += `bubbles, `;
            count -=1;
        }
        if (request.features.fountains != false){
            if (count != 0) {query += `fountains, `; count -=1;}
            else {
                query += `and fountains.`
            }

        }
        if (request.features.lights != false){
            if (count != 0) {query += `lights, `; count -=1;}
            else {
                query += `and lights.`
            }

        }
        if (request.features.is_smart != false){
            if (count != 0) {query += `smart technology,`; count -=1;}
            else {
                query += `and smart technology.`
            }

        }
        if (request.features.heater != false){
            if (count != 0) {query += `a heater, `; count -=1;}
            else{
                query += `and a heater.`
            }

        }
    }
    return query;
}