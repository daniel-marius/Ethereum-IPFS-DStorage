// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0 < 0.8.0;

contract DStorage {

    string contractName;
    uint fileCount = 0;

    struct File {
      uint fileId;
      string fileHash;
      string fileName;
      string fileType;
      string fileExtension;
      string fileDescription;
      uint fileSize;
      uint uploadTime;
      address payable uploader;
    }

    mapping(uint => File) public files; // mapping fileId => Struct
    // File[] files; // Could be used as an alternative for mapping;

    //Event
    event FileUploaded(
      uint fileId,
      string fileHash,
      string fileName,
      string fileType,
      string fileExtension,
      string fileDescription,
      uint fileSize,
      uint uploadTime,
      address payable uploader
    );

    constructor() public {
      contractName = 'DStorage';
    }

    function uploadFile(string memory _fileHash, string memory _fileName, string memory _fileType, string memory _fileExtension, string memory _fileDescription, uint _fileSize) public {
        // Make sure the file hash exists
        require(bytes(_fileHash).length > 0);

        // Make sure file name exists
        require(bytes(_fileName).length > 0);

        // Make sure file type exists
        require(bytes(_fileType).length > 0);

        // Make sure file extension exists
        require(bytes(_fileExtension).length > 0);

        // Make sure file description exists
        require(bytes(_fileDescription).length > 0);

        // Make sure file size is greater than 0
        require(_fileSize > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment file id
         fileCount += 1;

        // Add file to the contract
        files[fileCount] = File(fileCount, _fileHash, _fileName, _fileType, _fileExtension, _fileDescription, _fileSize, block.timestamp, msg.sender);

        // Trigger an event
        emit FileUploaded(fileCount, _fileHash, _fileName, _fileType, _fileExtension, _fileDescription, _fileSize, block.timestamp, msg.sender);
    }

    function getContractName() public view returns (string memory) {
        return contractName;
    }

    function getFileCount() public view returns (uint) {
        return fileCount;
    }
}
