const index = require('../index');

var arrHavingOnlineServers = [
    {
        url: 'http://google.com',
        priority: 4
    },
    {
        url: 'http://doesNotExist.kratikal.com',
        priority: 7
    },
    {
        url: 'http://offline.kratikal.com',
        priority: 2
    },
    {
        url: 'http://kratikal.com',
        priority: 3
    }
],
arrHavingOfflineServer = [
    {
        url: 'http://doesNotExist.kratikal.com',
        priority: 7
    },
    {
        url: 'http://offline.kratikal.com',
        priority: 2
    }
]
describe('fetchLowestPriorityServer', () => {
    it("should return the lowest priority server", () => {
        function errorIsDueToTimeout(e) {
            if (e.cause && e.cause.code === "ETIMEDOUT") return true;
            if (e.error && e.error.code === "ETIMEDOUT") return true;
            return false;
        }
        index.executeUrl = async (sArray) => {
            try {
                var onlineServers = [];
                for (let i = 0; i < sArray.length; i++) {
                    let opts = {
                        resolveWithFullResponse: true,
                        method: "GET",
                        uri: sArray[i].url,
                        timeout: 5000
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
                // console.error('Error occurred: ' + JSON.stringify(e, null, 2));
                if (errorIsDueToTimeout(e)) {
                    /* Put your timeout handling code here. */
                    console.log('The error was due to a timeout');
                }
                return { checkedURL: url, isMatching: undefined, timedOut: errorIsDueToTimeout(e) };
            }
        }

        index.executeUrl(arrHavingOnlineServers).then(res => {
            expect(res).toEqual({url: 'http://google.com', priority: 4 })
        })
    })
})

describe('fetchLowestPriorityServer', () => {
    it("should return the error message if all servers are offline", () => {
        function errorIsDueToTimeout(e) {
            if (e.cause && e.cause.code === "ETIMEDOUT") return true;
            if (e.error && e.error.code === "ETIMEDOUT") return true;
            return false;
        }
        index.executeUrl = async (sArray) => {
            try {
                var onlineServers = [];
                for (let i = 0; i < sArray.length; i++) {
                    let opts = {
                        resolveWithFullResponse: true,
                        method: "GET",
                        uri: sArray[i].url,
                        timeout: 5000
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
                // console.error('Error occurred: ' + JSON.stringify(e, null, 2));
                if (errorIsDueToTimeout(e)) {
                    /* Put your timeout handling code here. */
                    console.log('The error was due to a timeout');
                }
                return { checkedURL: url, isMatching: undefined, timedOut: errorIsDueToTimeout(e) };
            }
        }

        index.executeUrl(arrHavingOfflineServer).then(res => {
            expect(res).toBe("No server is online..")
        });
    })
})