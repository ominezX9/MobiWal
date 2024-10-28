export type UserDetailsResponse = {
    find(arg0: (recipient: { id: number; }) => boolean): unknown;
    id: string,
    name: string,
    email: string,
    phone: string,
    balance: number,
    password: string,
}