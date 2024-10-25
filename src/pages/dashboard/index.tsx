import {useState} from "react";
import AmountCard from "@components/dashboard/amount-card";
import TransactionList from "@components/dashboard/transaction-list";

export default function Dashboard() {
  return (
    <div className="relative h-full">
      <AmountCard/>
      <TransactionList/>
    </div>
  )
}
