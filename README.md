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

