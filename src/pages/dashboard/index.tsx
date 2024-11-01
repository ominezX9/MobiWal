
import AmountCard from "@components/dashboard/amount-card";
import HeaderTitle from "@components/shared/header-title";
import { getUser } from "@utils/getUserFromSession";

export default function Dashboard() {
  return (
    <div className="relative h-[100vh]">
      <HeaderTitle title={`Welcome, ${getUser?.name}`} showBackButon={false} />
      <AmountCard/>
    </div>
  )
}
