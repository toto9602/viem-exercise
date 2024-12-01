import { ethers } from "ethers";
import { ERC_20 } from "./tokens/ERC20";
import { encodeFunctionData } from "viem";
import { TimeComparer } from "./time-comparer";

const functionName = "symbol";

function ethersFunction() {
  const iface = new ethers.utils.Interface(ERC_20);

  iface.encodeFunctionData(functionName, []);
}

function viemFunction() {
  encodeFunctionData({
    abi: ERC_20,
    functionName: functionName,
    args: [],
  });
}

new TimeComparer({
  ethersFunction: ethersFunction,
  viemFunction: viemFunction,
  targetFnName: "encodeFunctionData",
}).run();
