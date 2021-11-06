import { ChainId } from '@flash-swap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.TESTNET]: '0x5b5ef428aa35ddfc6b23ae7d9c4b661875396f67'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
