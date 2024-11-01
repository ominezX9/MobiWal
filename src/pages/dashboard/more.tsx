import { Link } from "react-router-dom";


import Transfer from '../../assets/vectors/transfer.svg';
import Topup from '../../assets/vectors/topup.svg';
import Bills from '../../assets/vectors/bills.svg';
import HeaderTitle from "@components/shared/header-title";

export default function More() {
  return (
    <div className='flex h-[100vh] flex-col items-center justify-center'>
        <HeaderTitle showBackButon={true} title="More"/>
        <div className="flex flex-col justify-around py-5 px-20 gap-5">
                <Link to="../transfer" className="flex flex-row items-center gap-2 pl-3 py-2 rounded-md  px-10 border-gray shadow hover:shadow-lg">
                    <img src={Transfer} />
                    <span>Transfer</span>
                </Link>
                <Link to="../topup" className="flex flex-row items-center gap-2 pl-3 py-2 rounded-md  px-10 border-gray shadow hover:shadow-lg">
                    <img src={Topup} />
                    <span>Topup</span>
                </Link>
                <Link to="../bills" className="flex flex-row items-center gap-2 pl-3 py-2 rounded-md  px-10 border-gray shadow hover:shadow-lg">
                    <img src={Bills} />

                    <span>Bills</span>
                </Link>

                <p className=""> More coming soon</p>
            </div>
      
    </div>
  )
}
