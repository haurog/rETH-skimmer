export function findRETHRatioByDate(targetDate, rETHRatios) {
    let targetDateTimestamp = targetDate.getTime() / 1000;
    // console.log("targetDate: ", targetDateTimestamp);
    for (var i = 0; i < rETHRatios.length; i++) {
        if (rETHRatios[i].block.timestamp < targetDateTimestamp) {
            // console.log("Timestamp: ", rETHRatios[i].block.timestamp, ", i: ", i);
            break;
        }
    }
    return {
        rate: rETHRatios[i].rate,
        timestamp: rETHRatios[i].block.timestamp,
        index: i
    };
}


export function calcRateIncrease(startRatio, endRatio) {
    const increase = (endRatio.rate / startRatio.rate - 1)*100;
    // console.log("increase: ", increase)
    return increase;
}

export function calcEquivalentAPY(startRatio, endRatio) {
    const yearInSeconds = 365*24*60*60;
    const timeSpan = endRatio.timestamp - startRatio.timestamp;
    const APY = yearInSeconds / timeSpan * 100 * (endRatio.rate / startRatio.rate - 1);
    // console.log("APY: ", APY, "timespan: ", timeSpan)
    return APY;
}