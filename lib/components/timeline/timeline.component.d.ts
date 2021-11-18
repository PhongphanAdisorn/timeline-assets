import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimelineAssetsService } from '../../timeline-assets.service';
export declare class TimelineComponent implements OnInit {
    private _timelineAPI;
    private _dialog;
    _assetId: string;
    _assetType: string;
    _assetCaption: string;
    preLoading: boolean;
    listLog: Array<any>;
    private _timelinePeriod;
    private _timelinePeriodType;
    constructor(_timelineAPI: TimelineAssetsService, _dialog: MatDialog);
    ngOnInit(): void;
    set assetInfo(info: any);
    set triggerNum(num: number);
    triggerReload(ev: any): void;
    private loadData;
    /** Timeline clicked */
    timelineClicked(data: any): void;
    /** Dialog */
    maintenanceRecord(viewId: number): void;
    conditionReport(viewId: number): void;
    taskDialog(data: any): void;
    bugetCode(data: any): void;
}
