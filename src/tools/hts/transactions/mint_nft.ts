import { Client, TokenId, TokenMintTransaction } from "@hashgraph/sdk";
import { MintNFTResult } from "../../../types";

export const mint_nft = async (
    tokenId: TokenId,
    tokenMetadata: Uint8Array,
    client: Client
): Promise<MintNFTResult> => {
    // Max metadata per transaction is 10
    if (Array.isArray(tokenMetadata)) {
        // This basic implementation assumes the tool only handles one metadata entry
        // If batch minting is needed, the transaction building logic needs adjustment
        if (tokenMetadata.length > 1) {
             console.warn("This mint_nft tool currently only processes the first metadata entry for simplicity.");
        }
        if (tokenMetadata.length === 0) {
             throw new Error("No token metadata provided for minting.");
        }
        tokenMetadata = tokenMetadata[0]; // Use only the first entry
    }

    const tx = await new TokenMintTransaction()
        .setTokenId(tokenId)
        .addMetadata(tokenMetadata) // Add the single metadata
        .freezeWith(client);

    const txResponse = await tx.execute(client);
    // Get the record instead of just the receipt to retrieve serials
    const record = await txResponse.getRecord(client);
    const txStatus = record.receipt.status; // Get status from record's receipt
    const serials = record.serials.map(serial => serial.toNumber()); // Extract serials and convert from Long to number

    if (txStatus.toString() !== 'SUCCESS') { // Check for exact SUCCESS
        throw new Error(`NFT token Minting Transaction failed with status: ${txStatus.toString()}`);
    }

    console.log(`Minted NFT for token ${tokenId.toString()} with serial(s): ${serials.join(', ')}`);

    // Return the object including the serials
    return {
        status: txStatus.toString(),
        txHash: txResponse.transactionId.toString(),
        serials: serials, // Include the extracted serials
    };
}
