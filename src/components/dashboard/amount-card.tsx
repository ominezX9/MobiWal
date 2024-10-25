
import Transfer from '../../assets/vectors/transfer.svg';
import Topup from '../../assets/vectors/topup.svg';
import Bills from '../../assets/vectors/bills.svg';
import More from '../../assets/vectors/more.svg';
import { useAppSelector } from '@hooks/redux-hooks';
import { SessionStorageService } from 'services/SessionStorageService';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '@utils/numberFormatter';

export default function AmountCard() {
    const userPass = useAppSelector((store) => store.userDetails.password);
    const userData = SessionStorageService.getItem("user");
    const navigate = useNavigate();

    if (userData.password === userPass) {
        // just chill
        navigate('/dashboard');
    } else {
        navigate('/logout')
    }


    // alert(JSON.stringify(user))
    return (
        <div>
            {JSON.stringify(userPass) + JSON.stringify(userData)}
            <div className="amountblock flex flex-col items-center gap-3 p-20 py-10 pt-[100px]">
                <h2 className="text-gray text-md">Your Balance</h2>
                <p className='text-6xl'>N {formatNumber(userData.balance)}</p>
            </div>

            <div className="quickkactions flex justify-around p-10 px-20">
                <button className="quickaction">
                    <img src={Transfer} />
                    <span>Transfer</span>
                </button>
                <button className="quickaction">
                    <img src={Topup} />
                    <span>Withdraw</span>
                </button>
                <button className="quickaction">
                    <img src={Bills} />

                    <span>Bills</span>
                </button>
                <button className="quickaction">
                    <img src={More} />

                    <span>More</span>
                </button>
            </div>

        </div>
    )
}
