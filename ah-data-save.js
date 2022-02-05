const fs = require('fs');

const getDataCsv = callback => {
    fs.readFile('ah-data.csv', {encoding: 'utf8'}, (err, data) => {
        if (!err) {
            callback(data);
        } else {
            console.log(err);
        }
    });
};

const getDataJson = csv => {
    const output = {};
    const lines = csv.trim().split('\n');
    lines.shift();  // Ignore header line
    
    for (let line of lines) {
        const itemInfo = line.split(',');
        const price = itemInfo[0];
        const name = itemInfo[1];
    
        // Ignore designs
        console.log(name);
        if (name.toLowerCase().startsWith('"design:'))
            continue;
    
        const nameSanitized = name.replaceAll('"', '').replaceAll(' ', '-').toLowerCase();
        const priceSanitized = (parseFloat(price) / 10000).toString();
        output[nameSanitized] = priceSanitized;
    }
    
    return JSON.stringify(output);
};



const saveDataFile = json => {
    const unixTime = new Date().getTime().toString();
    const filename = `${unixTime}.json`;
    const path = `data/${filename}`;
    fs.writeFile(path, json, 'utf8', err => {
        if(err) {
            return console.error(err);
        }
        console.log("The file was saved!");
    });     
};

getDataCsv(csv => {
    const json = getDataJson(csv);
    saveDataFile(json);
});
