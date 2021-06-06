export async function getSolanaPrice<T>(): Promise<T> {
    const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    const body = await response.json();
    return body;
}
