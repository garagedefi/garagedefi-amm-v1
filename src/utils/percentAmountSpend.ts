import { CurrencyAmount, JSBI } from '@flash-swap/sdk'
import BigNumber from 'bignumber.js'

/**
 * Given some token amount, return the precent that can be spent of it
 * @param currencyAmount to return percent of
 */
export type PercentType = "25" | "50" | "75" | "100";

export function percentAmountSpend(currencyAmount?: CurrencyAmount, percent?: PercentType): string | undefined {
  if (!currencyAmount || !percent) return undefined
  if (currencyAmount.currency && currencyAmount.currency.decimals) { 
    const balance = new BigNumber(currencyAmount.raw.toString());
    if (balance.isGreaterThan(new BigNumber(1, currencyAmount.currency.decimals))) {
      let amount:BigNumber = new BigNumber(0);
      if (percent === "100") {
        amount = new BigNumber(currencyAmount.raw.toString());
      }

      if (percent === "75")
      amount = balance.multipliedBy(0.75)

      if (percent === "50")
      amount = balance.multipliedBy(0.5)

      if (percent === "25")
      amount = balance.multipliedBy(0.25)

      return new BigNumber(amount).dividedBy(new BigNumber(10).pow(currencyAmount.currency.decimals)).toFixed(5);
    }
    return "0";
  }
  return "0"
}

export default percentAmountSpend
