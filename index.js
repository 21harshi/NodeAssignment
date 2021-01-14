const config = require("./config");
var rp = require("request-promise");

// function for handling timeout error
function errorIsDueToTimeout(e) {
    if (e.cause && e.cause.code === "ETIMEDOUT") return true;
    if (e.error && e.error.code === "ETIMEDOUT") return true;
    return false;
}
 
// function for checking available online servers
// if available, it returns Lowest priority Server details
// if there is not any online server it returns Error message. 
async function executeUrl(sArray) {
    try {
        var onlineServers = [];
        for (let i = 0; i < sArray.length; i++) {
            let opts = {
                resolveWithFullResponse: true,
                method: "GET",
                uri: sArray[i].url,
                timeout: 5000 //each url get execute within 5 seconds
            };
            const resp = await rp(opts).catch(e => e);
            if (resp.statusCode == config.successCode) {
                onlineServers.push({ url: sArray[i].url, priority: sArray[i].priority });
            }
        } 

        if (onlineServers.length > 0) {
            onlineServers.sort(function (a, b) {
                return a.priority - b.priority
            })
            var minPriorityServer = onlineServers[0];
            // Resolves with the online server that has the lowest priority number.
            return minPriorityServer;
        } else {
            //Rejects with an error, if no Servers are online.
            return "No server is online..";
        }
        // return onlineServers;
    }
    catch (e) {
        console.error('Error occurred: ' + JSON.stringify(e, null, 2));
        if (errorIsDueToTimeout(e)) {
            /* Put your timeout handling code here. */
            console.log('The error was due to a timeout');
        }
        return { checkedURL: url, isMatching: undefined, timedOut: errorIsDueToTimeout(e) };
    }
}



// executeUrl returns an error message or lowest priority server url
executeUrl(config.serverArray).then(function (onlineServers) {
        console.log("Lowest Priority Data : ", onlineServers);
}).catch(e => {
    console.log(e);
})

module.exports.executeUrl = executeUrl;
module.exports.errorIsDueToTimeout = errorIsDueToTimeout;