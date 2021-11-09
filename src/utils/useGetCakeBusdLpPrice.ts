import { useCurrency } from 'hooks/Tokens'
import { useTradeExactIn } from 'hooks/Trades'
import { tryParseAmount } from 'state/swap/hooks'

const useGetCakeBusdLpPrice = () => {
  const cakeAddress = '0x4A2883F4e92037a298Dd8cBFc2bcb15B45174587'
  const busdAddress = '0xaEe5841e2fbA2849eb562B4e81A9C33E565BbD54'
  const inputCurrency = useCurrency(cakeAddress)
  const outputCurrency = useCurrency(busdAddress)
  const parsedAmount = tryParseAmount('1', inputCurrency ?? undefined)
  const bestTradeExactIn = useTradeExactIn(parsedAmount, outputCurrency ?? undefined)
  const price = bestTradeExactIn?.executionPrice.toSignificant(6)
  return price ? parseFloat(price) : undefined
}

export default useGetCakeBusdLpPrice
