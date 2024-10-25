import Header from '@components/shared/header';
import HeaderTitle from '@components/shared/header-title';
import { formatNumber } from '@utils/numberFormatter';
import { Formik, Field, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import { SessionStorageService } from 'services/SessionStorageService';
import { toast } from 'sonner';
import * as Yup from "yup";


const SwipeButton = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="w-full mt-5 bg-purple-600 text-white py-4 rounded-full text-lg shadow-lg hover:bg-purple-700 active:bg-purple-800"
        >
            {children}
        </button>
    );
};



const NumberInput = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="number"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full py-4 px-4 text-center text-2xl text-gray-900 rounded-xl border-gray outline-none focus:ring-2 focus:ring-purple-500 mb-5"
        />
    );
};




export default function Transfer() {
    const userData = SessionStorageService.getItem("user");

    const [amount, setAmount] = useState('');
    const [acc, setAccount] = useState('');

    const initialValues = {
        acc: '',
        amount: '',
    }

    const validationSchema = Yup.object().shape({
        acc: Yup.number()
            .required("Account Number is required")
            .max(11, "Account Number must be ten characters long"),
        amount: Yup.number()
          .required("Amount is required")
          .positive("Amount must be a positive number")
          .min(1, "Amount must be at least 1")
    });

    
    const handleSendMoney =  async (values: typeof initialValues) => {
        try {
        console.log(`Sending ${amount} money`);

          const response = await login(values).unwrap();
          if(response && response.length > 0) {
            const [userData] = response;
            toast.success(userData)
          }else{
          toast.error(response)
        }
          
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div className='flex h-[100vh] flex-col items-center justify-center'>
            <Header/>
            <p className={`p-6 shadow-lg cursor-pointer flex flex-col items-center rounded-md mb-3 ${amount > userData.balance ? "bg-orange text-black" : "bg-green text-white"}`}>
                <span className="text-lg">Your balance</span>
                <span className="text-4xl">N {formatNumber(userData.balance)}</span>
            </p>
            <div className="p-5 bg-white rounded-2xl shadow-md">
            <Formik
            onSubmit={handleSendMoney}
            validationSchema={validationSchema}
            initialValues={initialValues}
            >
                <Form>
                    <div>
                        <HeaderTitle title={'Transfer'}  showBackButon={true}  />
                    <Field
                        as="input"
                        type="number"
                        name="acc"
                        className="w-full py-4 px-4 text-center text-2xl text-gray-900 rounded-xl border-gray outline-none focus:ring-2 focus:ring-purple-500 mb-5"
                        placeholder="Enter Account Number"
                        autoComplete="false"
                        onChange={(e) => setAccount(e.target.value)}
                        value={acc}

                    />
                    <ErrorMessage
                        name="acc"
                        component="div"
                        className="text-xs text-[#EA580C]"
                    />
                    </div>

                    <div>
                    <Field
                        as="input"
                        type="number"
                        name="amount"
                        className="w-full py-4 px-4 text-center text-2xl text-gray-900 rounded-xl border-gray outline-none focus:ring-2 focus:ring-purple-500 mb-5"
                        placeholder="Enter amount"
                        autoComplete="false"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                    <ErrorMessage
                        name="amount"
                        component="div"
                        className="text-xs text-[#EA580C]"
                    />
                    </div>

                </Form>
            </Formik>
            
                {
                amount > userData.balance ?
                (
                    <p>Amount Exceeded can't transfer</p>
                )
                : (
                <SwipeButton onClick={handleSendMoney}>
                    Swipe to Send
                </SwipeButton>
                )}
            </div>
        </div>
    );
};

