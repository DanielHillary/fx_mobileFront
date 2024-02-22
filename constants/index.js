import images from "./images";
import icons from "./icons";
import { COLORS, FONT, SIZES, SHADOWS } from "./theme";

export { images, icons, COLORS, FONT, SIZES, SHADOWS };

export const Synthetics = [
    { label: "Step", value: "Step Index" },
    { label: "v10", value: "Volatility 10 Index" },
    { label: "v25", value: "Volatility 25 Index" },
    { label: "v50", value: "Volatility 50 Index" },
    { label: "v75", value: "Volatility 75 Index" },
    { label: "v100", value: "Volatility 100 Index" },
    { label: "v10(1s)", value: "Volatility 10 (1s) Index" },
    { label: "v25(1s)", value: "Volatility 25 (1s) Index" },
    { label: "v50(1s)", value: "Volatility 50 (1s) Index" },
    { label: "v75(1s)", value: "Volatility 75 (1s) Index" },
    { label: "v100(1s)", value: "Volatility 100 (1s) Index" },
    { label: "v150(1s)", value: "Volatility 150 (1s) Index" },
    { label: "v250(1s)", value: "Volatility 250 (1s) Index" },
    { label: "J10", value: "Jump 10 Index" },
    { label: "J25", value: "Jump 25 Index" },
    { label: "J50", value: "Jump 50 Index" },
    { label: "J75", value: "Jump 75 Index" },
    { label: "J100", value: "Jump 100 Index" },
]

export const Currencies = [
  { label: "EURUSD", value: "EURUSD" },
  { label: "EURJPY", value: "EURJPY" },
  { label: "EURNZD", value: "EURNZD" },
  { label: "EURCAD", value: "EURCAD" },
  { label: "EURSEK", value: "EURSEK" },
  { label: "GBPUSD", value: "GBPUSD" },
  { label: "GPBJPY", value: "GBPJPY" },
  { label: "GPBAUD", value: "GBPAUD" },
  { label: "GPBNZD", value: "GBPNZD" },
  { label: "USDJPY", value: "USDJPY" },
  { label: "USDCAD", value: "USDCAD" },
  { label: "USDCHF", value: "USDCHF" },
  { label: "AUDUSD", value: "AUDUSD" },
  { label: "AUDCAD", value: "AUDCAD" },
  { label: "AUDNZD", value: "AUDNZD" },
  { label: "AUDJPY", value: "AUDJPY" },
  { label: "NZDJPY", value: "NZDJPY" },
  { label: "NZDUSD", value: "NZDUSD" },
  { label: "NZDCAD", value: "NZDCAD" },
]

export const tradeTypelist = [
    {
      label: "INSTANT BUY",
      value: "BUY INSTANT",
    },
    {
      label: "INSTANT SELL",
      value: "SELL INSTANT",
    },
    {
      label: "SELL STOP",
      value: "SELL STOP",
    },
    {
      label: "BUY STOP",
      value: "BUY STOP",
    },
    {
      label: "BUY LIMIT",
      value: "BUY LIMIT",
    },
    {
      label: "SELL LIMIT",
      value: "SELL LIMIT",
    },
    // {
    //   label: "BUY STOP LIMIT",
    //   value: "BUY STOP LIMIT",
    // },
    // {
    //   label: "SELL STOP LIMIT",
    //   value: "SELL STOP LIMIT",
    // },
  ];
