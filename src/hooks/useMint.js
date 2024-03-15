import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react"
import { useCallback } from "react";

const useMint = () => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    let mint = useCallback(
        async (address, tokenId) => {
            if (!isSupportedChain(chainId))
                return console.error("Wrong network");
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();

            const contract = getNFTContract(signer);

            try {
                const transaction = await contract.safeMint(address, tokenId, { value: "100000000000000" });
                console.log("transaction: ", transaction);
                const receipt = await transaction.wait();

                console.log("receipt: ", receipt);

                if (receipt.status) {
                    return console.log("Mint successfull");
                }

                console.log("Failed to mint");
            } catch (error) {
                console.log(error);

                console.error("error: ", error);
            }
        },
        [chainId, walletProvider]
    );

    return mint;
}

export default useMint;