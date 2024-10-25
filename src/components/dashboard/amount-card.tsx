import React from 'react'
import Transfer from '../../assets/vectors/transfer.svg';
import Topup from '../../assets/vectors/topup.svg';
import Bills from '../../assets/vectors/bills.svg';
import More from '../../assets/vectors/more.svg';

export default function AmountCard() {
    return (
        <div>
            <div className="amountblock flex flex-col items-center gap-3 p-20 py-10 pt-[100px]">
                <h2 className="text-gray text-md">Your Balance</h2>
                <p className='text-6xl'>N {"12,000"}</p>
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
