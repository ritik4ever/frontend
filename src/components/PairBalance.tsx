import { SorobanContextType } from "@soroban-react/core";
import { useToken, useTokenScVal, useTokenDecimals } from "../hooks";
import { formatAmount, scvalToBigNumber } from "../helpers/utils";

interface PairBalanceProps {
  pairAddress: string;
  sorobanContext: SorobanContextType;
}

export function PairBalance({ pairAddress, sorobanContext }: PairBalanceProps) {
  const pairBalance = useTokenScVal(pairAddress, sorobanContext.address!);
  const tokenDecimals = useTokenDecimals(pairAddress);

  return (
    <p>
      {pairBalance.result !== undefined
        ? formatAmount(scvalToBigNumber(pairBalance.result), tokenDecimals)
        : "0"}
    </p>
  );
}
