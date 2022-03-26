### What
This Node repo integrates with the CSV data, exported from the Lua WoW classic addon ["Auctioneer"](https://www.curseforge.com/wow/addons/auctionator).

By allowing you to store snapshots of WoW auction house data, it enables comparison between aggregated snapshots to calculate price arbitrage opportunities on the auction house. You would ideally use a mean-reversion strategy for max PnL.

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

### Versus other interop addons
| Auc Advanced      | TSM |
| ----------- | ----------- |
| [![Auctioneer Advanced providing AH averages](https://i.imgur.com/3J0B4NU.png "Auctioneer Advanced providing AH averages")](https://i.imgur.com/3J0B4NU.png)      | [![TSM providing AH averages](https://i.imgur.com/ytFEDcS.png "Auctioneer Advanced providing AH averages")](https://i.imgur.com/ytFEDcS.png)       |

Whilst auctioneer advanced & TSM are great addons, the AH averages they display are [SMA](https://www.investopedia.com/terms/s/sma.asp). From my perspective, there are problems with using an overly-simplistic formula:

#### Market edge
- Their averages provide [market edge](https://www.investopedia.com/articles/active-trading/022415/vital-importance-defining-your-trading-edge.asp) to a user, but the edge is lost if too many people use the addon

> *"The Mint Arbitrage addon provides realm-specific market edge, due to covering specific items of interest, & only uses data scraped from the user for their realm, rather than sufferring from sample bias from other realm data"*

#### Standard deviation
- Their averages dont distinguish [standard deviations](https://en.wikipedia.org/wiki/Standard_deviation). For instance, if spot price is 3g and average is 4g, however common prices could be 2-6g, with [breakouts](https://www.investopedia.com/articles/trading/08/trading-breakouts.asp#:~:text=A%20breakout%20is%20a%20stock,the%20stock%20breaks%20below%20support.) only occurring outside those levels.

> *"Mint Arbitrage charting visually identifies standard deviations to correctly distinguish arbitrage opportunities."*

#### Metagame
- Most importantly, their averages dont cover changes in "the AH meta", especially as [phases](https://tbc.wowhead.com/news/blizzconline-five-phases-planned-for-the-burning-crusade-classic-321016) roll out over time. For instance, when the haste stat is introduced, [terocone](https://tbc.wowhead.com/item=22789/terocone) will suddenly increase in price due to being the primary reagent for haste potions. This is a significant missed arbitrage, and wont be signified by those addons.

> *"Mint Arbitrage charting visually identifies hints, via steadily increasing spot prices leading into a new phase."*

### Contributing
Pull requests are welcome. Please ensure that new tests are thread-safe, & that the all test fixtures pass before opening a PR.
