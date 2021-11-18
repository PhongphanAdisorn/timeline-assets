import { NgZone, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAuthedService } from 'projects/timeline-assets/src/lib/services/user-auth.service';
import { TimelineAssetsService } from 'projects/timeline-assets/src/lib/timeline-assets.service';
import { Subscription } from 'rxjs';
interface DialogDataInterface {
    modeDialog: 'maintenance' | 'assets';
    viewType: 'Add' | 'View';
    viewId: string;
    assetId: string;
    assetType: string;
    [x: string]: any;
}
interface FileItem {
    name: string;
    thumb: string | ArrayBuffer;
    file: File;
    size: number;
    progress?: number;
}
export declare class DialogNewRecordComponent implements OnInit {
    private _dialog;
    private _dateAdapter;
    private _snackBar;
    private _zone;
    private _timelineAPI;
    private _authed;
    viewType: 'Add' | 'View';
    modeDialog: 'maintenance' | 'assets';
    _assetId: string;
    _assetType: string;
    _viewId: string;
    capText: {
        title: string;
        detail: string;
    };
    filesUpload: Array<FileItem>;
    filesView: Array<any>;
    imagesView: Array<any>;
    /** FormControl */
    currentDate: FormControl;
    detail: FormControl;
    cost: FormControl;
    guaranteeDate: FormControl;
    /** Saving */
    isSaving: boolean;
    isSaved: boolean;
    preLoading: boolean;
    /** Subscription */
    _subscription: {
        [x: string]: Subscription;
    };
    constructor(_dialog: MatDialogRef<DialogNewRecordComponent>, data: DialogDataInterface, _dateAdapter: DateAdapter<any>, _snackBar: MatSnackBar, _zone: NgZone, _timelineAPI: TimelineAssetsService, _authed: UserAuthedService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private loadFormData;
    /** Replace number */
    numberOnly(ev: KeyboardEvent): boolean;
    costNumber(): number;
    /** Handler */
    private setFormDisabled;
    private setFormEnabled;
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
    getFileIcon(extension: string): string;
    /** Delete file item */
    delFile(position: number): void;
    /** ==========================================================
     * Download file
     */
    downloafFile(file: any): void;
    private downloadBlob;
    /** ==========================================================
     * Save data
     */
    isImageSaved(): boolean;
    saveData(): void;
    private uploadAllFile;
}
export {};
