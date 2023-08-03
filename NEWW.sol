// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NEWW is ERC721 {
    mapping(address => uint256[]) private _tokensByOwner;

    struct NFT {
        string name;
        uint256 price;
    }

    mapping(uint256 => NFT) private _nfts;

    constructor() ERC721("Ecommerce NFT", "ECNFT") {}

    function mintNFT(
        address _recipient,
        uint256 _tokenId,
        string memory _name,
        uint256 _price
    ) public {
        require(!_exists(_tokenId), "Token ID already exists"); // Check if token ID is already in use
        _mint(_recipient, _tokenId);
        _tokensByOwner[_recipient].push(_tokenId);

        _nfts[_tokenId] = NFT(_name, _price);
    }

    function tokenExists(uint256 _tokenId) public view returns (bool) {
        return _exists(_tokenId);
    }

    function getTokenIdsByOwner(address _owner) public view returns (uint256[] memory) {
        return _tokensByOwner[_owner];
    }

    function getNFT(uint256 _tokenId)
        public
        view
        returns (string memory name, uint256 price)
    {
        NFT storage nft = _nfts[_tokenId];
        return (nft.name, nft.price);
    }

    function transferNFT(uint256 _tokenId, address _newOwner) public {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "You are not the owner or approved to transfer this NFT"
        );

        _transfer(msg.sender, _newOwner, _tokenId);
        _removeTokenFromOwnerEnumeration(msg.sender, _tokenId);
        _addTokenToOwnerEnumeration(_newOwner, _tokenId);
    }

    function _removeTokenFromOwnerEnumeration(address _owner, uint256 _tokenId)
        internal
    {
        uint256[] storage tokenList = _tokensByOwner[_owner];
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i] == _tokenId) {
                tokenList[i] = tokenList[tokenList.length - 1];
                tokenList.pop();
                break;
            }
        }
    }

    function _addTokenToOwnerEnumeration(address _owner, uint256 _tokenId)
        internal
    {
        _tokensByOwner[_owner].push(_tokenId);
    }
}
