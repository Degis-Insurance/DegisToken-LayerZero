import { task } from "hardhat/config";
import { DegisOFT__factory, ProxyOFT__factory } from "../typechain-types";
import { readAddressList } from "../scripts/contractAddress";

const addressList = readAddressList();

const ARB_ADDRESS = "0x9f285507Ea5B4F33822CA7aBb5EC8953ce37A645";
const AVAX_ADDRESS = "0x3DA175e017D0578df38FEAeB9E50E39679c5FD02";

const ARB_CHAINID = 110;
const AVAX_CHAINID = 106;

task("addTrustedRemote", "Add trusted remote path").setAction(
  async (args, hre) => {
    const { network, ethers } = hre;

    const [dev] = await ethers.getSigners();

    // const ProxyOFT = new ProxyOFT__factory(dev).attach(
    //   addressList[network.name].ProxyOFT
    // );

    const DegisOFT = new DegisOFT__factory(dev).attach(
      addressList[network.name].DegisOFT
    );

    const tx = await DegisOFT.setTrustedRemoteAddress(
      AVAX_CHAINID,
      AVAX_ADDRESS
    );
    console.log("Tx details", await tx.wait());
  }
);

task("addTrustedRemotePath", "Add trusted remote path").setAction(
  async (args, hre) => {
    const { network, ethers } = hre;

    const [dev] = await ethers.getSigners();

    const ProxyOFT = new ProxyOFT__factory(dev).attach(
      addressList[network.name].ProxyOFT
    );

    // const DegisOFT = new DegisOFT__factory(dev).attach(
    //   addressList[network.name].DegisOFT
    // );

    const path = ethers.utils.solidityPack(
      ["address", "address"],
      [ARB_ADDRESS, AVAX_ADDRESS]
    );
    const tx = await ProxyOFT.setTrustedRemote(AVAX_CHAINID, path);
    console.log("Tx details", await tx.wait());
  }
);

task("test").setAction(async (args, hre) => {
  const { network, ethers } = hre;

  const [dev] = await ethers.getSigners();

  const DegisToken = new DegisOFT__factory(dev).attach(
    addressList[network.name].DegisToken
  );

  const tx = await DegisToken.approve(
    addressList[network.name].ProxyOFT,
    ethers.utils.parseUnits("1000")
  );
});
