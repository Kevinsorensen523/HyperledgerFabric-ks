const { Wallets, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const ccpPath = path.resolve(__dirname, '..', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function connectToNetwork() {
    try {
        // Load the wallet
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check if user1 exists in the wallet
        const identity = await wallet.get('user1');
        if (!identity) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to the peer node
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'user1',
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network
        const contract = network.getContract('basic');

        return contract;
    } catch (error) {
        console.error(`Failed to connect to network: ${error}`);
        process.exit(1);
    }
}

module.exports = { connectToNetwork };
