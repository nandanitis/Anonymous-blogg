// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Dapp {
    address public owner;

    struct blogDetails {
        string Title;
        string blog;
        uint256 id;
        address writer;
        string section;
    }

    uint256 public blogId;

    blogDetails[] public blogArray;

    string[] public sections;
    mapping(address => blogDetails[]) public MappingBlogs;

    mapping(address => uint256) public profilePic;
    uint256 public usersCount;
    address[] public userAddress;

    constructor() {
        owner = msg.sender;
    }

    function EnterBlogDetails(
        string memory _title,
        string memory _blog,
        address _writer,
        string memory _section
    ) public {
        blogId++;
        blogArray.push(blogDetails(_title, _blog, blogId, _writer, _section));
    }

    function getAllBlogs() public view returns (blogDetails[] memory) {
        return blogArray;
    }

    function addsection(string memory _section) public onlyOwner {
        sections.push(_section);
    }

    function getAllSections() public view returns (string[] memory) {
        return sections;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function login(uint256 _number) public {
        usersCount++;
        profilePic[msg.sender] = _number;
        userAddress.push(msg.sender);
    }

       function getAllLogin() public view returns (address[] memory) {
        return userAddress;
    }

    fallback() external {}
}
