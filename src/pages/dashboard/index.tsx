
import AmountCard from "@components/dashboard/amount-card";
import TransactionList from "@components/dashboard/transaction-list";
import HeaderTitle from "@components/shared/header-title";
import { getUser } from "@utils/getUserFromSession";

export default function Dashboard() {
  return (
    <div className="relative h-full">
      <HeaderTitle title={`Welcome, ${getUser.name}`} showBackButon={false} />
      <AmountCard/>
      <TransactionList/>
    </div>
  )
}
