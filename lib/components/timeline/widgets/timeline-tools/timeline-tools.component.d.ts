import { EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
export declare class TimelineToolsComponent implements OnInit {
    private dialog;
    triggerReload: EventEmitter<any>;
    _assetId: string;
    _assetType: string;
    /** Period for view timeline */
    period: FormControl;
    typePeriod: FormControl;
    listPeriodType: Array<{
        type: string;
        caption: string;
    }>;
    /** Subscription */
    _subscription: {
        [x: string]: Subscription;
    };
    constructor(dialog: MatDialog);
    set assetId(data: string);
    set assetType(data: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    reloadData(): void;
    maintenanceRecord(): void;
    insertAssets(): void;
}
