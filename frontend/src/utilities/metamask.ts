import { ethers } from "ethers";

export const getProvider = () => {
  // This will inject the ethereum object in the global window
  if (typeof window.ethereum !== "undefined") {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  throw new Error("Please install MetaMask!");
};

export const getSigner = () => {
  const provider = getProvider();
  return provider.getSigner();
};
