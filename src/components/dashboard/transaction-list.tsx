import { useAppSelector } from '@hooks/redux-hooks';
import { SessionStorageService } from 'services/SessionStorageService';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '@utils/numberFormatter';
import { Link } from 'react-router-dom';
import { useViewMyTransactionsQuery } from '@api/transactionApi';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export default function TransactionList() {
    // const userPass = useAppSelector((store) => store.userDetails.password);
    const userData = SessionStorageService.getItem("user");
    // const navigate = useNavigate();
    const { data: transactions, isLoading } = useViewMyTransactionsQuery(userData.id);

    console.log(transactions);




    return (
        <div className="w-[80%] mx-auto p-4 bg-white relative -top-12 rounded-[24px]">
            <h1 className="font-bold py-3 text-gray">Transaction</h1>
            {/* {JSON.stringify(transactions)} */}
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex flex-col gap-2'>
                        {transactions?.map((transaction: { type: string; amount: number; date: string | number | Date; recipientId: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, i: Key | null | undefined) => (
                            <Link key={i} to="" className='shadow rounded-md p-4 cursor-pointer'>
                                {/* "id": "1",
                                "userId": 1,
                                "recipientId": 2,
                                "amount": 200,
                                "date": "2024-10-24T10:00:00",
                                "type": "transfer" */}
                                <div className='flex justify-between font-bold'> 
                                    <div >{transaction.type?.toUpperCase()}</div>
                                    <div>{formatNumber(transaction.amount)}</div>
                                </div>
                                <div className="flex justify-between text-gray">
                                    <div>{new Date(transaction.date).toLocaleString()}</div>
                                    <div>
                                        {transaction.recipientId}
                                    </div>
                                </div>
                                
                            </Link>
                        ))}

                    </div>
                )
            }
        </div>
    )
}