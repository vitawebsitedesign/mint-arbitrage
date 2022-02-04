const promisify = require('util').promisify;
const path = require('path');
const fs = require('fs');
const readdirp = promisify(fs.readdir);
const statp = promisify(fs.stat);

async function getDataFilePaths(directoryName = './data', results = []) {
    let files = await readdirp(directoryName);
    files.pop();    // Ignore todays data file - we use that to compare against the averages

    for (let f of files) {
        let fullPath = path.join(directoryName, f);
        let stat = await statp(fullPath);
        if (stat.isDirectory()) {
            await scan(fullPath, results);
        } else {
            results.push(fullPath);
        }
    }
    return results;
}

async function getDataFilePathLatest(directoryName = './data', results = []) {
    let files = await readdirp(directoryName);
    const path = files.pop(); 
    return `data/${path}`;
}

async function getJsons(paths) {
    const jsons = [];
    for (let path of paths) {
        const json = await fs.promises.readFile(path, 'utf-8');
        jsons.push(json);
    }
    return jsons;
}

const getPriceHistory = jsons => {
    const history = {};
    for (let json of jsons) {
        const ahPrices = JSON.parse(json);
        for (const [name, price] of Object.entries(ahPrices)) {
            if (name in history) {
                history[name].push(price);
            } else {
                history[name] = [price];
            }
        }
    }

    return history;
};

const getPriceAverages = history => {
    const averages = {};
    for (const [name, prices] of Object.entries(history)) {
        const sum = prices.map(p => parseFloat(p)).reduce((agg, p) => agg + p, 0);
        averages[name] = sum / prices.length;
    }

    return averages;
};

const getPriceAverageDiff = (historicalAverages, latestAverages) => {
    const diffs = [];
    for (const [name, price] of Object.entries(latestAverages)) {
        const historicalAvg = historicalAverages[name];
        if (historicalAvg) {
            const diff = (price - historicalAvg).toFixed(1)
            diffs.push({
                name,
                diff 
            });
        }
    }

    return diffs;
};

const jsons = [];

(async () => {
    const paths = await getDataFilePaths();
    const jsons = await getJsons(paths);
    const history = getPriceHistory(jsons);
    const averages = getPriceAverages(history);

    const latestPath = await getDataFilePathLatest();
    const latestJsons = await getJsons([ latestPath ]);
    const latestHistory = getPriceHistory(latestJsons);
    const latestAverages = getPriceAverages(latestHistory);

    const diff = getPriceAverageDiff(averages, latestAverages);
    const diffOrdered = diff.sort((a, b) => b.diff - a.diff);

    console.log('================')
    console.log('==== REPORT ====')
    console.log('================')
    for (let d of diffOrdered) {
        console.log(d);
    }
})().catch(console.error);
