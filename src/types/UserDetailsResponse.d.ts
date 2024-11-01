export type UserDetailsResponse = {
    find(arg0: (recipient: { id: number; }) => boolean): unknown;
    id: string,
    name: string,
    email: string,
    acc_no: string,
    balance: number,
    password: string,
}