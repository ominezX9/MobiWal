
import Transfer from '../../assets/vectors/transfer.svg';
import Topup from '../../assets/vectors/topup.svg';
import Bills from '../../assets/vectors/bills.svg';
import More from '../../assets/vectors/more.svg';
import { useAppSelector } from '@hooks/redux-hooks';
import { SessionStorageService } from 'services/SessionStorageService';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '@utils/numberFormatter';
import { Link } from 'react-router-dom';
import { useGetUserByIDQuery } from '@api/usersApi';

export default function AmountCard() {
    const userPass = useAppSelector((store) => store.userDetails.password);
    const userData = SessionStorageService.getItem("user");
    const navigate = useNavigate();
    const { data: user, isLoading } = useGetUserByIDQuery(userData?.id, {
        pollingInterval: 5000, // Polls every 5 seconds
    });

    if (userData.password === userPass) {
        // just chill
        // navigate('/dashboard');
    } else {
        navigate('/logout')
    }


    // alert(JSON.stringify(user))
    return (
        <div className="bg-fume pb-14">
            {/* {JSON.stringify(userPass) + JSON.stringify(userData)} */}
            <div className="amountblock flex flex-col items-center gap-3 p-20 py-10 pt-[100px]">
                <h2 className="text-gray text-md">Your Balance</h2>
                {
                    isLoading? (
                        <div>Loading...</div>
                    ) : 
                    (
                        <span className="text-4xl">N {formatNumber(parseInt(user?.balance?.toString() || "0"))}</span>
                    )
                }
                
                <h2 className="rounded-md bg-smoke py-1 px-3 text-gray">Acc No: {userData.acc_no}</h2>
                <h3></h3>
            </div>

            <div className="quickkactions flex justify-around p-10 px-20">
                <Link to="../transfer" className="quickaction">
                    <img src={Transfer} />
                    <span>Transfer</span>
                </Link>
                <Link to="../topup" className="quickaction">
                    <img src={Topup} />
                    <span>Topup</span>
                </Link>
                <Link to="../bills" className="quickaction">
                    <img src={Bills} />

                    <span>Bills</span>
                </Link>
                <Link to="../more" className="quickaction">
                    <img src={More} />

                    <span>More</span>
                </Link>
            </div>

        </div>
    )
}
