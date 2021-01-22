import { ethers, Contract } from "ethers";

import DStorage from "./abis/DStorage.json";

const initEthers = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        // await window.ethereum.enable();
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();

        const dstorageContract = new Contract(
          DStorage.networks[window.ethereum.networkVersion].address,
          DStorage.abi,
          signer
        );

        resolve({ provider, signerAddress, dstorageContract });
      } // } else {
      //   const url = "http://localhost:8545";
      //   const provider = new ethers.providers.JsonRpcProvider(url);
      //   resolve({ provider });
      // }
      resolve({
        provider: undefined,
        signerAddress: undefined,
        dstorageContract: undefined,
      });
    });
  });
};

export default initEthers;
