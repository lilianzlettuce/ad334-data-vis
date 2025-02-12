
// Convert CSV file to JSON
// Pass in file path
async function csvJSON(fp) {
    try {
        // Fetch csv file and get contents
        const res = await fetch(fp);
        let csv = await res.text();

        // Trim and remove empty lines
        let lines = csv.split("\n").map(line => line.trim()).filter(line => line.length > 0);
    
        let result = [];
    
        // NOTE: If your columns contain commas in their values, you'll need
        // to deal with those before doing the next step 
        // (you might convert them to &&& or something, then covert them back later)
        // jsfiddle showing the issue https://jsfiddle.net/
        let headers=lines[0].split(",");
    
        // Populate result array with objects
        for(let i = 1; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");
    
            // Populate object with corresponding keys (header) and values
            for (let j = 0; j < headers.length; j++) {
                // Handle missing values
                obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : ""; 
            }
    
            result.push(obj);
        }
    
        return result; //JavaScript object
        //return JSON.stringify(result); //JSON string
    } catch(err) {
        console.error('Error loading CSV file:', err);
    }
}

//export let dataJSON = await csvJSON('./data/test-data.csv');
//export let dataJSON = await csvJSON('./data/day1.csv');
export let dataJSON = await csvJSON('./data/interactions-full.csv');
console.log(dataJSON);