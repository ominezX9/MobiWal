import {useState} from "react";
import AmountCard from "@components/dashboard/amount-card";
import TransactionList from "@components/dashboard/transaction-list";
import HeaderTitle from "@components/shared/header-title";

export default function Dashboard() {
  return (
    <div className="relative h-full">
      <HeaderTitle title="" showBackButon={false} />
      <AmountCard/>
      <TransactionList/>
    </div>
  )
}
