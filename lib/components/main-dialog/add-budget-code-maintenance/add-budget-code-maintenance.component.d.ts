import { ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Observable } from 'rxjs';
import { UserAuthedService } from '../../../services/user-auth.service';
import { BudgetCodeService } from '../../../timeline-assets.service';
interface DialogDataInterface {
    title: string;
    assetTable: string;
    dialogType: 'Editor' | 'Viewer';
    listGeom: Array<any>;
    budgetCode: string;
}
interface FileItem {
    name: string;
    thumb: string | ArrayBuffer;
    file: File;
    size: number;
    progress?: number;
}
interface BudgetCodeListInterface {
    title: string;
    budgetCode: string;
    reportDate: string;
    assetIds: Array<string>;
    files: Array<{
        fileUrl: string;
        fileName: string;
        extension: string;
        size: number;
        progress?: number;
    }>;
    selected?: boolean;
}
export declare class AddBudgetCodeMaintenanceComponent implements OnInit {
    private _ref;
    private _zone;
    private _dialog;
    private _dateAdapter;
    private _authed;
    private _budgetCodeAPI;
    title: string;
    private assetTable;
    dialogType: 'Editor' | 'Viewer';
    currentDate: FormControl;
    searchBudgetCode: FormControl;
    searchAsset: FormControl;
    selectedOptions: FormControl;
    listBudgetCode: BudgetCodeListInterface[];
    assetsUseBudgetCode: Array<any>;
    listGeom: Array<any>;
    filteredAssets: Observable<Array<any>>;
    filesUpload: Array<FileItem>;
    activeBudgetCode: BudgetCodeListInterface;
    /** Save state */
    isSaving: boolean;
    isSaved: boolean;
    preLoading: boolean;
    loadingSearch: boolean;
    errFindMessage: string;
    /** Subscription */
    private _subscription;
    constructor(_ref: ChangeDetectorRef, _zone: NgZone, _dialog: MatDialogRef<AddBudgetCodeMaintenanceComponent>, data: DialogDataInterface, _dateAdapter: DateAdapter<any>, _authed: UserAuthedService, _budgetCodeAPI: BudgetCodeService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private mapFormat;
    /** Handler Form */
    private setFormDisabled;
    private setFormEnabled;
    getViewBudgetCode(budgetCode: string): void;
    findingBudgetCode(): void;
    private getAssetUsedCode;
    setActiveBudgetCode(budgetCode: BudgetCodeListInterface): void;
    /** ===============================================================================
       * File handlering
       * @param el
       */
    inputFiles(el: any): void;
    /** Reander image file */
    private readImage;
    /** Display size type
     * 10 KB | MB | GB
    */
    readFileSize(size: number): string;
    /** View extention */
    getFileIcon(extension: string, fileUrl?: string): string;
    /** Delete file item */
    delFile(position: number): void;
    /** Select item */
    selectionChanged(selected: MatSelectionListChange): void;
    isImageSaved(): boolean;
    saveData(): void;
    private uploadAllFile;
    downloafFile(file: any): void;
    private downloadBlob;
}
export {};
