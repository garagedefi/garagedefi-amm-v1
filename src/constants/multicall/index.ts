import { ChainId } from '@flash-swap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.TESTNET]: '0x91b3F80CA394e8DB79C74FD57Ad2FbB82AA682Dd'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
