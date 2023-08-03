window.addEventListener('DOMContentLoaded', async () => {
        const ipfsData = {};
        if (typeof window.ethereum !== 'undefined') {
          web3 = new Web3(window.ethereum);
          console.log('MetaMask is installed!');
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          const recipientAddressInput = document.getElementById('recipient-address');
          recipientAddressInput.value = accounts[0];
        } else {
          console.log('Please install MetaMask to interact with this application.');
          return;
        }
      
        window.ethereum.enable().then(function(accounts)
        {
          console.log('Connected to MetaMask:', accounts);
        }).catch(function(error)
        {
          console.error('Error connecting to MetaMask:', error);
        });
      
        const contractABI = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "approved",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "mintNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getApproved",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "getNFT",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "getTokenIdsByOwner",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "ownerOf",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenExists",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
      
        const contractAddress = '0x254e86448b1a9926df7d29769081bfaFA0057F0e';
        const ecommerceContract = new web3.eth.Contract(contractABI, contractAddress);
      
        let pinataLink;
        
        async function mintNFT()
        {
            const recipient = document.getElementById('recipient-address').value;
            const tokenId = document.getElementById('nft-token-id').value;
            const name = document.getElementById('nft-name').value;
            const price = document.getElementById('nft-price').value; 
        try {
        const tokenExists = await ecommerceContract.methods.tokenExists(tokenId).call();
        if (tokenExists) {
          console.error('Token ID already exists');
          document.getElementById('output').textContent = 'Token ID already exists';
          return;
        }
        } catch (error) {
        console.error('Error checking token existence:', error);
        document.getElementById('output').textContent = 'Error checking token existence';
        return;
         }  
          try
          {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const result = await ecommerceContract.methods.mintNFT(recipient, tokenId, name, price).send({ from: accounts[0] });
            console.log('NFT Minted:', result);
            document.getElementById('output').textContent = 'NFT Minted';
            upload();
          }
          catch (error)
          {
            console.error('Error Minting NFT:', error);
            document.getElementById('output').textContent = 'Error Minting NFT.';
          }
        }
        async function upload() {
            const recipientAddressInput = document.getElementById('recipient-address');
            const tokenIdInput = document.getElementById('nft-token-id');
            const nftNameInput = document.getElementById('nft-name');
            const nftPriceInput = document.getElementById('nft-price');
            const imageFileInput = document.getElementById('imageFile');
    
           
            const recipientAddress = recipientAddressInput.value;
            const tokenId = tokenIdInput.value;
            const nftName = nftNameInput.value;
            const nftPrice = nftPriceInput.value;
            const imageFile = imageFileInput.files[0];
          
            if (!recipientAddress || !tokenId || !nftName || !nftPrice || !imageFile) {
              console.log('Please fill in all the required fields.');
              return;
            }
          
            const apiKey = '222e2419c0278170dd43';
          const apiSecret = 'fe68dcf64b90bb37f8a0f84101f9ed268cfebfa9de86edc5c1beafff3be791dc';
          
            const formData = new FormData();
            formData.append('file', imageFile);
          
            try {
              const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
                method: 'POST',
                headers: {
                  pinata_api_key: apiKey,
                  pinata_secret_api_key: apiSecret
                },
                body: formData
              });
          
              const result = await response.json();
              console.log('Image uploaded successfully. IPFS hash:', result.IpfsHash);
          
              pinataLink = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
              console.log('Pinata Link:', pinataLink);
              ipfsData[tokenId] = pinataLink; 
              localStorage.setItem('ipfsLink', pinataLink);
            document.getElementById('output').textContent = 'Image successfully uploaded to IPFS';
             
              Link();
             
              display();
              
              
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
          
         
    
          function display()
          {
            const imageContainer = document.getElementById('imageContainer');
              const image = document.createElement('img');
              image.src = pinataLink;
              image.style.width = '200px'; 
              image.style.height = 'auto';
              imageContainer.appendChild(image);
          }
      
          function viewIPFSLink(event) {
            event.preventDefault();
            window.open(pinataLink, '_blank');
          }
          function Link() {
            const imageContainer = document.getElementById('imageContainer');
            const viewLinkButton = document.createElement('button');
            viewLinkButton.innerText = 'View IPFS Link';
            viewLinkButton.addEventListener('click', viewIPFSLink);
            imageContainer.appendChild(viewLinkButton);
          }
        
      
      // .
    
    
    const displayLinkButton = document.getElementById('display-link-btn');
    displayLinkButton.addEventListener('click', displayTokenIdAndLink);
    
    async function displayTokenIdAndLink() {
      const ownerAddress = document.getElementById('recipient-address').value;
    
      try {
        const tokenIds = await ecommerceContract.methods.getTokenIdsByOwner(ownerAddress).call();
        console.log('Token IDs Owned By', ownerAddress + ':', tokenIds);
        const nftInfo = await Promise.all(tokenIds.map(async (tokenId) => {
          const nft = await ecommerceContract.methods.getNFT(tokenId).call();
          const name = nft[0];
          const price = nft[1];
          const pinataLink = ipfsData[tokenId]; 
    
          return {
            name,
            tokenId,
            price,
            pinataLink, 
          };
        }));
        displayNFTInfo(nftInfo); 
      } catch (error) {
        console.error('Error To Get Owned Token IDs:', error);
        document.getElementById('output').textContent = 'Error To Get Owned Token IDs';
      }
    }
    
    function displayNFTInfo(nftInfo) {
      const outputContainer = document.getElementById('owned-nft-output');
      outputContainer.innerHTML = ''; 
    
      nftInfo.forEach((nft) => {
        const nftElement = `
          <div>
            <br><b>NFT Name: ${nft.name}<br>
            Token ID: ${nft.tokenId}<br>
            Price: ${nft.price}<br>
            <a href="${nft.pinataLink}" target="_blank">View IPFS Link</a> <!-- Use pinataLink -->
          </div>
        `;
        outputContainer.innerHTML += nftElement;
      });
    }
    
    window.mintNFT = mintNFT;
    
    });