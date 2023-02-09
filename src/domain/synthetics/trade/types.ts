import { BigNumber } from "ethers";
import { FeeItem, SwapFeeItem } from "../fees";
import { TokenData, TokensRatio } from "../tokens";
import { Market } from "../markets";

export enum TradeType {
  Long = "Long",
  Short = "Short",
  Swap = "Swap",
}

export enum TradeMode {
  Market = "Market",
  Limit = "Limit",
  Trigger = "Trigger",
}

export type DepositAmounts = {
  marketTokenAmount: BigNumber;
  marketTokenUsd: BigNumber;
  longTokenAmount?: BigNumber;
  longTokenUsd?: BigNumber;
  shortTokenAmount?: BigNumber;
  shortTokenUsd?: BigNumber;
  swapFeeUsd: BigNumber;
  swapPriceImpactDeltaUsd: BigNumber;
};

export type WithdrawalAmounts = {
  marketTokenAmount: BigNumber;
  marketTokenUsd: BigNumber;
  longTokenAmount: BigNumber;
  shortTokenAmount: BigNumber;
  longTokenUsd: BigNumber;
  shortTokenUsd: BigNumber;
  swapFeeUsd: BigNumber;
};

export type SwapAmounts = {
  amountIn: BigNumber;
  usdIn: BigNumber;
  amountOut: BigNumber;
  usdOut: BigNumber;
  swapPathStats?: SwapPathStats;
  minOutputAmount: BigNumber;
};

export type IncreasePositionAmounts = {
  initialCollateralAmount: BigNumber;
  initialCollateralUsd: BigNumber;
  collateralAmount: BigNumber;
  collateralUsd: BigNumber;
  collateralUsdAfterFees: BigNumber;
  sizeDeltaUsd: BigNumber;
  sizeDeltaInTokens: BigNumber;
  sizeDeltaAfterFeesUsd: BigNumber;
  sizeDeltaAfterFeesInTokens: BigNumber;
  swapPathStats?: SwapPathStats;
  positionFeeUsd?: BigNumber;
  positionPriceImpactDeltaUsd?: BigNumber;
  triggerPrice?: BigNumber;
  acceptablePrice: BigNumber;
  acceptablePriceImpactBps: BigNumber;
  acceptablePriceAfterSlippage: BigNumber;
  entryMarkPrice: BigNumber;
};

export type DecreasePositionAmounts = {
  sizeDeltaUsd: BigNumber;
  sizeDeltaInTokens: BigNumber;
  collateralDeltaUsd?: BigNumber;
  collateralDeltaAmount?: BigNumber;
  pnlDelta?: BigNumber;
  isClosing: boolean;
  receiveTokenAmount?: BigNumber;
  receiveUsd?: BigNumber;
  positionFeeUsd?: BigNumber;
  positionPriceImpactDeltaUsd?: BigNumber;
  exitMarkPrice: BigNumber;
  triggerPrice?: BigNumber;
  triggerPricePrefix?: string;
  acceptablePrice: BigNumber;
  acceptablePriceImpactBps: BigNumber;
  acceptablePriceAfterSlippage: BigNumber;
};

export type SwapTradeParams = SwapAmounts & {
  tokenIn: TokenData;
  tokenOut: TokenData;
  tokenInPrice: BigNumber;
  tokenOutPrice: BigNumber;
  triggerRatio?: TokensRatio;
  minOutputAmount: BigNumber;
  fees?: TradeFees;
};

export type IncreasePositionTradeParams = IncreasePositionAmounts & {
  initialCollateralToken: TokenData;
  collateralToken: TokenData;
  market: Market;
  isLong: boolean;
  nextPositionValues?: NextPositionValues;
  fees?: TradeFees;
};

export type DecreasePositionTradeParams = DecreasePositionAmounts & {
  market: Market;
  collateralToken: TokenData;
  receiveToken: TokenData;
  nextPositionValues?: NextPositionValues;
  fees?: TradeFees;
};

export type NextPositionValues = {
  nextLeverage?: BigNumber;
  nextLiqPrice?: BigNumber;
  nextCollateralUsd?: BigNumber;
  nextSizeUsd?: BigNumber;
  nextPnl?: BigNumber;
  nextEntryPrice?: BigNumber;
};

export type SwapStats = {
  marketAddress: string;
  tokenInAddress: string;
  tokenOutAddress: string;
  isWrap: boolean;
  isUnwrap: boolean;
  isOutLiquidity?: boolean;
  swapFeeAmount: BigNumber;
  swapFeeUsd: BigNumber;
  priceImpactDeltaUsd: BigNumber;
  totalFeeDeltaUsd: BigNumber;
  amountIn: BigNumber;
  amountInAfterFees: BigNumber;
  amountOut: BigNumber;
  usdOut: BigNumber;
};

export type SwapPathStats = {
  swapPath: string[];
  swapSteps: SwapStats[];
  // isWrap?: boolean;
  // isUnwrap?: boolean;
  targetMarketAddress?: string;
  totalSwapPriceImpactDeltaUsd: BigNumber;
  totalSwapFeeUsd: BigNumber;
  totalFeesDeltaUsd: BigNumber;
  tokenInAddress: string;
  tokenOutAddress: string;
  usdOut: BigNumber;
  amountOut: BigNumber;
};

export type MarketEdge = {
  marketAddress: string;
  // from token
  from: string;
  // to token
  to: string;
};

export type MarketsGraph = {
  abjacencyList: { [token: string]: MarketEdge[] };
  edges: MarketEdge[];
};

export type SwapEstimator = (
  e: MarketEdge,
  usdIn: BigNumber
) => {
  usdOut: BigNumber;
};

export type TradeFees = {
  totalFees?: FeeItem;
  swapFees?: SwapFeeItem[];
  positionFee?: FeeItem;
  swapPriceImpact?: FeeItem;
  positionPriceImpact?: FeeItem;
  positionFeeFactor?: BigNumber;
};
