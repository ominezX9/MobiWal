import { SessionStorageService } from "services/SessionStorageService";
import { useGetUserByIDQuery } from "@api/usersApi";
import HeaderTitle from "@components/shared/header-title";


export default function Profile() {
    const userData = SessionStorageService.getItem("user");
    const { data: user, isLoading } = useGetUserByIDQuery(userData?.id, {
        pollingInterval: 5000, // Polls every 5 seconds
    });
    return (
        <div className="h-full">
            <HeaderTitle title="Profile" showBackButon={true} />

            {
                isLoading ?
                    "Loading..." :
                    (
                        <div className="max-w-sm rounded mx-auto my-[150px] overflow-hidden shadow-lg bg-white p-6">
                            <div className="rounded-full font-bold text-white text-3xl flex items-center justify-center h-[100px] w-[100px] bg-primary mx-auto cursor-pointer">
                                {user?.name[0]}
                            </div>
                            <div className="text-center mt-4">
                                <h2 className="text-xl font-semibold">{user?.name || "User Name"}</h2>
                                <p className="">{user?.email || "user@example.com"}</p>
                                <p className="text-gray">Acc no: {user?.acc_no || "123-456-7890"}</p>

                            </div>
                        </div>
                    )
            }

        </div>
    )
}
