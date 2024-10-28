import Header from '@components/shared/header';
import HeaderTitle from '@components/shared/header-title';
import { formatNumber } from '@utils/numberFormatter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SessionStorageService } from 'services/SessionStorageService';
import { toast } from 'sonner';
import * as Yup from "yup";
import { useMakeATransferMutation } from '@api/transactionApi';
import { useGetUserByIDQuery, useLazyGetUserByAccQuery, useUpdateUserAmountByIdMutation } from '@api/usersApi';
import { formattedDate } from '@utils/dateAndFormatter';


interface SwipeButtonProps {
    children: React.ReactNode;
}

// SwipeButton Component
const SwipeButton: React.FC<SwipeButtonProps> = ({ children }) => {
    return (
        <button
            type="submit"
            className="w-full mt-5 bg-purple-600 text-white py-4 rounded-full text-md shadow-lg hover:bg-purple-700 active:bg-purple-800"
        >
            {children}
        </button>
    );
};

export default function Transfer() {
    const userData = SessionStorageService.getItem("user");
    const transactionDate = formattedDate;
    const { data: user, isLoading } = useGetUserByIDQuery(userData?.id, {
        pollingInterval: 5000, // Polls every 5 seconds
    });

    const initialValues = {
        userId: userData.id,
        recipientId: '', // Initially empty
        amount: '', // Initially empty
        transactionDate: transactionDate, // Current date
        type: "transfer"
    }

    const validationSchema = Yup.object().shape({
        recipientId: Yup.number()
            .required("Account Number is required"),
        amount: Yup.number()
            .required("Amount is required")
            .positive("Amount must be a positive number")
            .min(1, "Amount must be at least 1"),
    });

    const [pay, { isLoading: isPaying }] = useMakeATransferMutation();
    const [chargeAccount] = useUpdateUserAmountByIdMutation();
    const [recipientData] = useLazyGetUserByAccQuery();

    const handleSendMoney = async (values: typeof initialValues) => {

        try {
            console.log(`Sending ${values.amount} money`); // Use Formik value

            // Check User balance
            if (Number(values.amount) > Number(user?.balance)) {
                toast.error("Insufficient balance");
                return;
            } else {
                if(values.recipientId.toString().length < 10){
                    toast.error("Account Number is too short");
                    return;
                }else{
                    const newBalance = user ? (user?.balance - parseInt(values.amount) ) : 0;
                    const collectingCharges = await chargeAccount({id: userData.id, amount: newBalance} ).unwrap();

                    if(!collectingCharges){
                        toast.error("Failed to charge the account");
                        return;
                    }else{
                        const getRecipient = await recipientData(values.recipientId.toString()).unwrap();
                        if(!getRecipient){
                            toast.error("Failed to get recipient data");
                            return;
                        }else{
                            if (Array.isArray(getRecipient) && getRecipient.length > 0) {
                                const recipient = getRecipient[0]; // Extracting the first object
                                const newRecipientBalance = recipient.balance + parseInt(values.amount);
                                const payingRecipient = await chargeAccount({ id: recipient.id, amount: newRecipientBalance}).unwrap();

                                console.log(payingRecipient);
                            if(!payingRecipient){
                                toast.error("Failed to pay recipient");
                                return;
                            }else{
                                const response = await pay({
                                    userId: userData.id,
                                    recipientId: values.recipientId,
                                    amount: parseInt(values.amount),
                                    date: transactionDate,
                                    type: "transfer"
                                }).unwrap();
    
                                if(response){
                                    toast.success("Transfer Successful");
                                }else{
                                    toast.error("Transfer Failed");
                                }
                            }
                            }
                            
                        }
                        
                    }
                    
                }
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='flex h-[100vh] flex-col items-center justify-center'>
            <Header />
            {isLoading ? " " : ""}
            {JSON.stringify(userData)}
            <p className={`p-6 shadow-lg cursor-pointer flex flex-col items-center rounded-md mb-3 ${initialValues.amount > userData.balance ? "bg-orange text-black" : "bg-green text-white"}`}>
                <span className="text-lg">Your balance</span>
                <span className="text-4xl">N {formatNumber(parseInt(user?.balance?.toString() || "0"))}</span>
            </p>
            <div className="p-5 w-[70%] bg-white rounded-2xl shadow-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSendMoney}
                >
                    {({ handleChange, values }) => (
                        <Form>
                            <div>
                                <HeaderTitle title={'Transfer'} showBackButon={true} />
                                <Field
                                    as="input"
                                    type="number"
                                    name="recipientId" // Corrected field name
                                    className="w-full py-4 px-4 text-center text-xl text-gray rounded-xl border-gray outline-none focus:ring-2 focus:ring-purple-500 mb-5"
                                    placeholder="Enter Account Number"
                                    autoComplete="false"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="recipientId"
                                    component="div"
                                    className="text-xs text-[#EA580C]"
                                />
                            </div>

                            <div>
                                <Field
                                    as="input"
                                    type="number"
                                    name="amount"
                                    className="w-full py-4 px-4 text-center text-xl text-gray rounded-xl border-gray outline-none focus:ring-2 focus:ring-purple-500 mb-5"
                                    placeholder="Enter amount"
                                    autoComplete="false"
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="amount"
                                    component="div"
                                    className="text-xs text-[#EA580C]"
                                />
                            </div>

                            <div className="mt-4">
                                {
                                        Number(values.amount) > Number(user?.balance || 0) ? (
                                            <p className='p-4 text-center bg-gray text-white '>Amount Exceeded can't transfer</p>
                                        ) : (
                                            <SwipeButton>
                                                {isPaying ? "paying ... " : "Send"}
                                            </SwipeButton>
                                        )
                                    }
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
