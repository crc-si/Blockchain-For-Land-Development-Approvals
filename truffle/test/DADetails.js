var DADetails = artifacts.require("./DADetails.sol");

contract('DADetails', function (accounts) {
  it("should construct a new instance", async () => {

    // arrange
    var dateLodged = "12334567";
    var description = "hello";
    var lga = "BCC";

    // act
    var daDetails = await DADetails.new(dateLodged, description, lga);

    var retrivedDateLodged = await daDetails.dateLodged();
    var retrivedDescription = await daDetails.description();
    var retrivedLga = await daDetails.lga();

    // assert
    assert.equal(retrivedDateLodged.valueOf(), dateLodged, "date lodged isn't the same");
    assert.equal(retrivedDescription.valueOf(), description, "description isn't the same");
    assert.equal(retrivedLga.valueOf(), lga, "lga isn't the same");
  });

  it("should return a list of the geographic files in the contract", async() => {

    var dateLodged = "123456";
    var description = "Test geographic file types";
    var lga ="BCC";

    var daDetails = await DADetails.new(dateLodged, description, lga);
    var fileName = "nongeographicfile.pdf";
    var fileType = "conditions";
    var uploadedBy = 0x123;
    var ipfsHash = "Hash1";

    daDetails.addAttachment(fileName, fileType, uploadedBy, ipfsHash);

    var fileCount = await daDetails.getFileNamesCount();
    console.log(fileCount);

    for (let f = 0; f < fileCount; f++) {
      console.log(await daDetails.getFileName(f));
    }

    daDetails.addAttachment(fileName, fileType, uploadedBy, "hash2");

    console.log("version count for nongeographicfile.pdf");
    var versionCount = await daDetails.getAttachmentVersionCount(fileName);
    console.log(versionCount);

    console.log("latest version hash");
    console.log(await daDetails.getLatestIpfsHash(fileName));

    console.log("all ipfs hashes:");

    for (let v = 0; v < versionCount; v++) {
      console.log(v);
      console.log(await daDetails.getAttachmentVersionByIndex(fileName, v));
    }

    console.log("file type:");
    console.log(await daDetails.getFileType(fileName));

    console.log("uploaded by:");
    console.log(await daDetails.getUploadedBy(fileName));
  
  });

  it("should change add event logs and print the logs", async () => {
    var dateLodged = "123456";
    var description = "UniTest for event logs";
    var lga ="BCC";

    var daDetails = await DADetails.new(dateLodged, description, lga);
    daDetails.addEventLog("abc", "abc", "abcdc");
    daDetails.addEventLog("efg", "efg", "efgsfa");

    var eventLogs = daDetails.getEventLogs();
    for (var eventLog in eventLogs){
      console.log("Date:");
      console.log(await eventLog.date);

      console.log("Party:");
      console.log(await eventLog.party);

      console.log("description:");
      console.log(await eventLog.description);
    }
    
  })

  // 

//   it("should call a function that depends on a linked library", async () => {
//     var meta = await DADetails.new();
//     var outCoinBalance = await meta.getBalance.call(accounts[0]);
//     var metaCoinBalance = outCoinBalance.toNumber();
//     outCoinBalanceEth = await meta.getBalanceInEth.call(accounts[0]);
//     var metaCoinEthBalance = outCoinBalanceEth.toNumber();

//     assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
//   });
  
});