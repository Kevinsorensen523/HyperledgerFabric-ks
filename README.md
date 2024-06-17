# HyperledgerFabric-ks

Creating a Hyperledger Fabric network on a Linux system involves several steps. Below is a detailed guide to help you set up Hyperledger Fabric:
## Prerequisites
1. Operating System: Linux (Ubuntu 20.04 LTS is recommended)
2. Docker: Required for containerization
3. Docker Compose: Required to manage multi-container Docker applications
4. cURL: For downloading files from the web
5. Go: Programming language used by Hyperledger Fabric
6. Node.js and npm: Required for Fabric SDK
7. Python: Required for Fabric SDK

## Step-by-Step Guide
1. Install Docker
```bash
  sudo apt-get update
  sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt-get update
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io
  sudo usermod -aG docker $USER
```

2. Install Docker COmpose
```bash
  sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
```

3. Install Go
```bash
  wget https://golang.org/dl/go1.16.5.linux-amd64.tar.gz
  sudo tar -C /usr/local -xzf go1.16.5.linux-amd64.tar.gz
  echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc
  source ~/.bashrc
```

4. Install Node.js and npm
```bash
  sudo apt-get install -y nodejs npm
```

5. Install Python3
```bash
  sudo apt-get install -y python3-pip
```

6. Install Hyperledger Fabric Binaries and Docker Images
```bash
  curl -sSL https://bit.ly/2ysbOFE | bash -s
```
This script will download the necessary binaries and Docker images.

7. Set Up Hyperledger Fabric Network
  - Navigate to the fabric-samples directory:
    ```bash
      cd fabric-samples/test-network
    ```
  - Start the test Network
    ```bash
      ./network.sh up
    ```
  - Create A Channel
    ```bash
      ./network.sh createChannel -c mychannel
    ```
  - Deploy a Chaincode
    ```bash
      ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
    ```
    
8. Interact with the Network
After setting up the network and deploying chaincode, you can interact with the network using the Hyperledger Fabric CLI or SDKs.

9. Shut Down the Network
```bash
  ./network.sh down
```

10. Save Command History
```bash
  history > command_history.txt
```

## Additional Resources
- Hyperledger Fabric Documentation: https://hyperledger-fabric.readthedocs.io/en/release-2.5/
- Fabric Samples GitHub Repository: https://github.com/hyperledger/fabric-samples

## Step-by-Step Troubleshooting Guide
1. Check Docker and Docker-Compose Versions
```bash
  docker --version
  docker-compose --version
```
You should have Docker version 20.10.7 or later and Docker Compose version 1.29.2 or later.

2. Remove Existing Container
```bash
  docker rm -f $(docker ps -aq)
  docker volume prune -f
```
If you have any old or exited containers, remove them to avoid conflicts.

3. Check Docker Logs
```bash
  docker logs <container_id>
```
Inspect the logs of the failed containers to get more details about why they are not starting.
For Example :
```bash
  docker logs b30243c0f334_peer0.org1.example.com
  docker logs e8c600cc2949_peer0.org2.example.com
  docker logs 3af99a1f43f3_orderer.example.com
```

4. Check Docker Configuration: Ensure Docker is configured correctly and has sufficient resources (CPU, memory).

5. Rebuild Network: Clean up and rebuild the network.
```bash
  ./network.sh down
  ./network.sh up
  ./network.sh createChannel -c mychannel
```

## Rebuild The Network
1. Bring Down the Network
```bash
  ./network.sh down
```

2. Bring Up the Network
```bash
  ./network.sh up
```

3. Create the Channel
```bash
  ./network.sh createChannel -c mychannel
```

### Additional Tips
- Increase Docker Resources: If running on a virtual machine or a system with limited resources, increase the CPU and memory allocation for Docker.
- Check Network Configuration: Ensure there are no port conflicts and the Docker network is correctly configured.
- Use Specific Versions: Sometimes, using specific versions of the Hyperledger Fabric Docker images can help. Modify the FABRIC_VERSION and THIRDPARTY_VERSION in the .env file if needed.
 

