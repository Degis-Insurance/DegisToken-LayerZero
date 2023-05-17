import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import {
  readAddressList,
  storeAddressList,
  getLayerZeroEndpoint,
} from "../scripts/contractAddress";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  network.name = network.name == "hardhat" ? "localhost" : network.name;

  const { deployer } = await getNamedAccounts();

  const addressList = readAddressList();

  const layerzeroEndpoint = getLayerZeroEndpoint(network.name);

  const degisOFT = await deploy("DegisOFT", {
    contract: "DegisOFT",
    from: deployer,
    args: [layerzeroEndpoint],
    log: true,
  });

  addressList[network.name].DegisOFT = degisOFT.address;

  storeAddressList(addressList);
};

func.tags = ["DegisOFT"];
export default func;
