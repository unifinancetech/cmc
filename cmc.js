const fs = require('fs');
const Web3 = require("web3");
const request = require('request');
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const URLAPY = 'https://unifinancetech-tlv-pubsub.herokuapp.com/apy'
const ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "available", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "balance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "controller", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "depositAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "earn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "governance", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "reserve", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "harvest", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "max", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "min", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "priceE18", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_controller", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_governance", "type": "address" }], "name": "setGovernance", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_min", "type": "uint256" }], "name": "setMin", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_shares", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdrawAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const U = new Map([
    ['USDT', '0xdAC17F958D2ee523a2206206994597C13D831ec7'],
    ['WBTC', '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'],
    ['WETH', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'],
    ['UNI-V2[WBTC]', '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940'],
])
const F = new Map([
    ['USDT', '0x54bE9254ADf8D5c8867a91E44f44c27f0c88e88A'],
    ['WBTC', '0x1a389c381a8242B7acFf0eB989173Cd5d0EFc3e3'],
    ['WETH', '0x1E9DC5d843731D333544e63B2B2082D21EF78ed3'],
    ['UNI-V2[WBTC]', '0x743BC5cc8F52a84fF6e06E47Bc2af5324f5463D6'],
])
const CU = new Map([...U].map(([k, v]) => [k, new web3.eth.Contract(ABI, v)]))
const CF = new Map([...F].map(([k, v]) => [k, new web3.eth.Contract(ABI, v)]))

request(URLAPY, function (error, response, body) {
    if (error) {
        throw error
    }
    if (response.statusCode != 200) {
        throw response
    }
    const APY = new Map(JSON.parse(body).map(v => [v.token.toUpperCase(), v.percentageAPY]))
    Promise.all([...U].map(([k, v]) => new Promise(resolve => {
        if (k.startsWith('UNI-V2')) {
            const url = 'https://api.coinmarketcap.com/data-api/v3/farming/yield/latest'
            request(url, function (error, response, body) {
                if (error) {
                    throw error
                }
                if (response.statusCode != 200) {
                    throw response
                }
                JSON.parse(body).data.farmingProjects.forEach(project => {
                    if (project.name == 'Uniswap') {
                        project.poolList.forEach(pool => {
                            if (pool.pair == 'ETH-WBTC') {
                                Promise.all([
                                    CF.get(k).methods.balance().call(),
                                    CU.get(k).methods.totalSupply().call(),
                                ]).then(([balance, ts]) => [
                                    new web3.utils.BN(balance),
                                    new web3.utils.BN(ts),
                                ]).then(([balance, ts]) => {
                                    resolve([k, pool.totalStake * balance / ts])
                                })
                            }
                        })
                    }
                })
            })
            return
        }
        const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${v}&vs_currencies=usd`
        request(url, function (error, response, body) {
            if (error) {
                throw error
            }
            if (response.statusCode != 200) {
                throw response
            }
            Promise.all([
                CF.get(k).methods.balance().call(),
                CF.get(k).methods.decimals().call(),
            ]).then(([balance, decimals]) => [
                new web3.utils.BN(balance),
                (new web3.utils.BN(10)).pow(new web3.utils.BN(decimals)),
            ]).then(([balance, decimals]) => {
                resolve([k, balance * JSON.parse(body)[v.toLowerCase()].usd / decimals])
            })
        })
    }))).then(vals => new Map(vals))
        .then(TVL => {
            return {
                provider: 'unifinancetech',  // Project name
                provider_logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', // Project logo, square, less than 100*100 px
                provider_URL: 'https://unifinancetech.finance/', // Project URL
                links: [    // social media info
                    {
                        title: 'Twitter',
                        link: 'https://twitter.com/unifinancetech',
                    }
                ],
                pools: [...F].map(([k, v]) => k).map(k => {
                    return {
                        name: `${k} VAULT`, // Pool name if any, eg. Sushi Party, Uniswap Sushi-ETH LP
                        pair: `${k}`, // Pool pairs, e.g SUSHI-ETH
                        pairLink: 'https://unifinancetech.finance/', // The URL to this pool
                        logo: 'https://avatars0.githubusercontent.com/u/70206242?s=100&v=4', //  Pool logo if any, otherwise just use Project logo
                        poolRewards: [`${k}`], // The reward token ticker
                        apr: APY.get(k),  // APY, 1.1 means 110%
                        totalStaked: TVL.get(k),  // Total valued lock in USD
                    }
                }),
            }
        }).then(json => fs.writeFileSync(process.env.OUTFILE, JSON.stringify(json, "", "\t")))
})


