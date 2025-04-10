import BigNumber from "bignumber.js";
import { TokenId, Client, ContractId, AccountId } from "@hashgraph/sdk"; // Added Client, ContractId, AccountId
import { CreateTokenOptions } from "../tools/hts/transactions/create_token";

export type HederaNetworkType = "mainnet" | "testnet" | "previewnet"| "localnode";

export type TokenBalance = {
    account: string;
    balance: number;
    // Removed decimals - often not present in basic balance list
};

// Kept DetailedTokenBalance definition if used elsewhere
export type DetailedTokenBalance= {
    tokenId: string;
    tokenSymbol: string;
    tokenName: string;
    tokenDecimals: string; // Usually a string from API
    balance: number;
    balanceInDisplayUnit: BigNumber;
}

// --- API Response Types (kept as is) ---
export type TokenHoldersBalancesApiResponse = {
    timestamp: string;
    balances: TokenBalance[];
    links: {
        next: string | null; // Allow null
    };
};

export type HtsTokenBalanceApiReponse = {
    timestamp: string;
    balances: TokenBalance[];
    links: {
        next: string | null; // Allow null
    };
};

type ProtobufEncodedKey = {
    _type: "ProtobufEncoded";
    key: string;
};

type CustomFees = {
    created_timestamp: string;
    fixed_fees: any[];
    fractional_fees: any[];
};

export type HtsTokenDetails = {
    admin_key: ProtobufEncodedKey | null; // Allow null
    auto_renew_account: string | null; // Allow null
    auto_renew_period: number | null; // Allow null
    created_timestamp: string;
    custom_fees: CustomFees;
    decimals: string; // Kept as string (API often returns string)
    deleted: boolean;
    expiry_timestamp: number | null; // Allow null
    fee_schedule_key: ProtobufEncodedKey | null; // Allow null
    freeze_default: boolean;
    freeze_key: ProtobufEncodedKey | null; // Allow null
    initial_supply: string;
    kyc_key: ProtobufEncodedKey | null; // Allow null
    max_supply: string;
    memo: string;
    metadata: string;
    metadata_key: ProtobufEncodedKey | null;
    modified_timestamp: string;
    name: string;
    pause_key: ProtobufEncodedKey | null; // Allow null
    pause_status: "PAUSED" | "UNPAUSED";
    supply_key: ProtobufEncodedKey | null; // Allow null
    supply_type: "FINITE" | "INFINITE";
    symbol: string;
    token_id: string;
    total_supply: string;
    treasury_account_id: string;
    type: "FUNGIBLE_COMMON" | "NON_FUNGIBLE_UNIQUE";
    wipe_key: ProtobufEncodedKey | null; // Allow null
};

export type AllTokensBalancesApiResponse = {
    timestamp: string;
    balances: {
        account: string; // Account ID in the format "0.0.x"
        balance: number; // Total balance equivalent in HBAR
        tokens: {
            token_id: string; // Token ID in the format "0.0.x"
            balance: number; // Balance of the specific token
        }[];
    }[];
    links: {
        next: string | null; // link to next page
    };
}

export type RejectTokenResult = {
    status: string,
    txHash: string,
}

export type AssociateTokenResult = {
    status: string,
    txHash: string,
}

export type DissociateTokenResult = {
    status: string,
    txHash: string,
}

export type Airdrop = {
    amount: number;
    receiver_id: string;
    sender_id: string;
    token_id: string;
}

export type AirdropResult = {
    status: string,
    txHash: string,
}

export type ClaimAirdropResult = {
    status: string,
    txHash: string,
}

export type CreateTokenResult = {
    status: string,
    txHash: string,
    tokenId: TokenId,
}

export type TransferTokenResult = {
    status: string,
    txHash: string,
}

export type TransferHBARResult = {
    status: string,
    txHash: string,
}

export type SubmitMessageResult = {
    status: string,
    txHash: string,
}

export type CreateTopicResult = {
    status: string,
    txHash: string,
    topicId: string,
}

export type DeleteTopicResult = {
    status: string,
    txHah: string,
}

export type MintTokenResult = {
    status: string,
    txHash: string,
}

export type MintNFTResult = {
    status: string,
    txHash: string,
    serials: number[]; // Added serials for NFT mint result
}

export type AssetAllowanceResult = {
    status: string,
    txHash: string,
}

export type PendingAirdropsApiResponse = {
    airdrops: Airdrop[];
    links: {
        next: string | null;
    };
}

type Key = {
    _type: "ECDSA_SECP256K1" | "ED25519" | "ProtobufEncoded";
    key: string;
};

type TimestampRange = {
    from: string; // Unix timestamp in seconds.nanoseconds format
    to?: string | null; // Nullable Unix timestamp
};

export type TopicInfoApiResponse = {
    admin_key?: Key | null;
    auto_renew_account?: string | null; // Format: shard.realm.num (e.g., "0.0.2")
    auto_renew_period?: number | null; // 64-bit integer
    created_timestamp?: string | null; // Unix timestamp (e.g., "1586567700.453054000")
    deleted?: boolean | null;
    memo?: string;
    submit_key?: Key | null;
    timestamp?: TimestampRange;
    topic_id?: string | null; // Format: shard.realm.num (e.g., "0.0.2")
};

export type HCSMessage = {
    chunk_info: null | any;
    consensus_timestamp: string;
    message: string;
    payer_account_id: string;
    running_hash: string;
    running_hash_version: number;
    sequence_number: number;
    topic_id: string;
};

export type HCSMessageApiResponse = {
    messages: HCSMessage[];
    links: {
        next: string | null;
    };
};

export interface CreateNFTOptions extends Omit<CreateTokenOptions, "tokenType" | "client" | "decimals" | "initialSupply">{

}

export interface CreateFTOptions extends Omit<CreateTokenOptions, "tokenType" | "client"> {
}

// --- SaucerSwap V2 Types ---

/**
 * Result from the get_swap_quote tool.
 * Amounts are in the smallest unit of the respective tokens.
 */
export type SwapQuote = {
    amountIn: string;  // Amount of input token (smallest unit)
    amountOut: string; // Quoted amount of output token (smallest unit)
    // Removed isExactInput as it's implied by the function called
}

/**
 * Parameters required by the swap_exact_tokens tool.
 */
export type SwapExactTokensParams = {
    client: Client;
    routerContractId: ContractId;
    routerAbi: any[]; // ABI definition for the router
    path: string[]; // Array of token EVM addresses (0x...)
    amountIn: string; // Exact amount of input token (smallest unit)
    amountOutMin: string; // Minimum acceptable output amount (smallest unit)
    recipient: string; // EVM address (0x...) of the recipient
    deadline: number; // Unix timestamp (seconds)
    hbarAmount?: string; // Amount of HBAR (in tinybars) to send, if input token is HBAR/WHBAR
    unwrapWHBAR?: boolean; // Set to true if the output token is HBAR (to unwrap WHBAR)
};

/**
 * Result from the swap_exact_tokens tool.
 */
export type SwapExactTokensResult = {
    status: "SUCCESS" | "ERROR" | string; // Status of the swap transaction
    txHash: string; // Transaction hash/ID
    amountIn?: string; // Actual amount swapped in (smallest unit) - Optional, might not always be returned by tool
    amountOut?: string; // Actual amount received (smallest unit) - Optional, might not always be returned by tool
}
