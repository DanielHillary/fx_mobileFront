import { makeApiCall } from "./fetch.config"



export const executeTrade = (tradeDetails) => {

  const response = makeApiCall("/trade/executeorder", tradeDetails);
}