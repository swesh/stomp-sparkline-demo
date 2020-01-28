var Table = require("./TableDrawer");
var Consumer = (function () {

    var fxPrices = [];
    /**
     * 
     * @param {*} index 
     * create midPrice and update data array at index
     */
    function createMidPrice(index) {
        var thisItem = fxPrices[index];
        if (!thisItem.midPrice) {
            thisItem.midPrice = [];
        }
        thisItem.midPrice.push((thisItem.bestBid + thisItem.bestAsk) / 2);

    }


    /**
     * findAndInsert finds the data item inside fxPrices
     * if element is found update the data and returns its index 
     * else push the item and return the lastIndex
     */
    function findAndInsert(data) {
        // Filter out data element if it exists in the table.
        let locatedIndex;
        fxPrices.filter((e, i) => {
            if (e.name === data.name) {
                return locatedIndex = i;
            }
        }, locatedIndex);

        if (locatedIndex === undefined) {
            // if element is found then push into fxPrices array
            fxPrices.push(data);
            return fxPrices.length - 1;
        }
        var updated = Object.assign(fxPrices[locatedIndex], data);
        fxPrices[locatedIndex] = updated;
        return locatedIndex;
    }
    this.feedData = function (data) {
        let index = findAndInsert(JSON.parse(data.body));
        createMidPrice(index);
        Table.draw(fxPrices, index);
    }
    return this;
})();
module.exports = Consumer;