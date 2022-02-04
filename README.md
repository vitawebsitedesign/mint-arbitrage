### What
This Node repo integrates with the CSV data, exported from the Lua WoW classic addon ["Auctioneer"](https://www.curseforge.com/wow/addons/auctionator).

By allowing you to store snapshots of WoW auction house data, it enables comparison between aggregated snapshots to calcuate price arbitrage opportunities on the auction house. You would ideally use a mean-reversion strategy for max PnL.

Note: these js scripts require Node >= v16.13.2

### Install
```bash
git clone https://github.com/vitawebsitedesign/mint-arbitrage.git
cd mint-arbitrage
npm i
```

### Usage
1. First, ensure you have the ["Auctioneer addon"](https://www.curseforge.com/wow/addons/auctionator) installed.
1. Import the shopping list `auctionator-shopping-list.txt` into your profile.
1. Export the Auctioneer scan data CSV, by clicking the *"Export Results"* button, & pasting the data into `ah-data.csv`.

You are now ready to save your first snapshot:
```bash
node ah-data-save.js
```

When you have 2 or more snapshots, you can compare the latest snapshot against all historical snapshots:
```bash
node arb.js
```

Which will calculate & print price data for a number of auction house items:
```
================
==== REPORT ====
================
{ name: 'jagged-deep-peridot', diff: '598.3' }
{ name: 'flashing-living-ruby', diff: '15.0' }
{ name: 'destruction-potion', diff: '2.0' }
{ name: 'blood-garnet', diff: '0.7' }
...
{ name: 'enigmatic-skyfire-diamond', diff: '-5.0' }
{ name: 'insightful-earthstorm-diamond', diff: '-5.3' }
{ name: 'inscribed-flame-spessarite', diff: '-597.6' }
{ name: 'balanced-shadow-draenite', diff: '-599.2' }
```

These results are ordered descending. Items at the top of the list represents opportunities to sell, at ones at the bottom are opportunities to buy.

The more snapshots you have, the more reliable the calculated arbitrage data will be.

### Contributing
Pull requests are welcome. Please ensure that new tests are thread-safe, & that the all test fixtures pass before opening a PR.
