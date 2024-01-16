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
    { label: "Jump 10", value: "Jump 10 Index" },
    { label: "Jump 25", value: "Jump 25 Index" },
    { label: "Jump 50", value: "Jump 50 Index" },
    { label: "Jump 75", value: "Jump 75 Index" },
    { label: "Jump 100", value: "Jump 100 Index" },
]

export const Currencies = [
  { label: "EUR/USD", value: "EUR/USD" },
  { label: "GBP/USD", value: "GBP/USD" },
  { label: "USD/JPY", value: "USD/JPY" },
  { label: "USD/CAD", value: "USD/CAD" },
  { label: "AUD/USD", value: "AUD/USD" },
  { label: "NZD/JPY", value: "NZD/JPY" },
  { label: "NZD/USD", value: "NZD/USD" },
  { label: "GPB/JPY", value: "GBP/JPY" },
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
  ];
