import { OnInit } from '@angular/core';
import { UserAuthedService } from './services/user-auth.service';
export declare class TimelineAssetsComponent implements OnInit {
    private _authSer;
    _assetInfo: any;
    _triggerNumber: number;
    constructor(_authSer: UserAuthedService);
    set AssetInfo(items: any);
    set TriggerNumber(num: number);
    set userUnth(user: any);
    ngOnInit(): void;
}
