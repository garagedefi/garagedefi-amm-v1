import { ChainId } from '@flash-swap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x38bfCD5c6eAC12001687Fa005E2fD847E5dF9bf6', // TODO
  [ChainId.TESTNET]: '0x91b3F80CA394e8DB79C74FD57Ad2FbB82AA682Dd'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
