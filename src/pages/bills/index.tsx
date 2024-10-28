import { useViewMyBillsQuery } from "@api/transactionApi"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function Bills() {

  const { data: bills, isLoading: isBillsLoading } = useViewMyBillsQuery(null);

  return (
    <div className="mt-[100px]">
      <div className="header">Bills</div>
      <div className="flex w-[70%] mx-auto gap-4">
        {
        isBillsLoading ? "Loading..." : 
          bills?.map((bill: {
            amount: ReactNode; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; dueDate: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
          }, i: any) => (
            <div className="flex flex-col flex-none basis-1/2 shadow p-4 border-2 border-gray rounded gap-4" key={i}>
              <h2 className="font-bold text-2xl">{bill.name}</h2>
              <p className="text-sm text-gray">Last Due: {bill.dueDate}</p>
              <p>Amount: N{bill.amount} </p>
              <button className="bg-primary hover:bg-secondary p-3 text-white">Click to pay</button>
            </div>
          ))
        }

      </div>

    </div>
  )
}
