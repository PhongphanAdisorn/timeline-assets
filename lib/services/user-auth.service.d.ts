import { Observable } from "rxjs";
interface UserAuthedInterface {
    account_id: string;
    account_name: string;
    thumb: string;
    resp_account: any;
    fullname: string;
    phone: string;
    status_account: number;
    admin_verified: string;
    permission: number;
    division_id: string;
    district_id: string;
    section_id: string;
    division_name: string;
    district_name: string;
    section: string;
    rank: number;
    [x: string]: any;
}
export declare class UserAuthedService {
    private AUTH_KEY;
    private _authUser;
    private _observe;
    constructor();
    get watchUserAccount(): Observable<UserAuthedInterface>;
    get authUser(): UserAuthedInterface;
    setAuthUser(user: UserAuthedInterface): void;
}
export {};
