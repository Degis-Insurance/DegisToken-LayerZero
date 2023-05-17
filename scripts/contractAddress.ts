/**
 * Remember to use this function in the root path of your hardhat project
 */

import * as fs from "fs";

///
/// Deployed Contract Address Info Record
///
export const readAddressList = function () {
  // const filePath = __dirname + "/address.json"
  return JSON.parse(fs.readFileSync("info/address.json", "utf-8"));
};

export const storeAddressList = function (addressList: object) {
  fs.writeFileSync(
    "info/address.json",
    JSON.stringify(addressList, null, "\t")
  );
};

export const getLayerZeroEndpoint = function (networkName: string) {
  switch (networkName) {
    case "arb":
      return "0x3c2269811836af69497E5F486A85D7316753cf62";
    case "avax":
      return "0x3c2269811836af69497E5F486A85D7316753cf62";
  }
};
