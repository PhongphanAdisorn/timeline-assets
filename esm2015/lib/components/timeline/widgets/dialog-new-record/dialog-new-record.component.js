import { __awaiter } from "tslib";
import { Component, Inject, NgZone } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconFiles } from '../../../../common/icon-files';
import { UserAuthedService } from '../../../../services/user-auth.service';
import { AppTools, TimelineAssetsService } from '../../../../timeline-assets.service';
import { FadeInGrow, FadeInOut } from './create-event.animation';
const CUSTOM_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
const ɵ0 = CUSTOM_DATE_FORMATS;
export class DialogNewRecordComponent {
    constructor(_dialog, data, _dateAdapter, _snackBar, _zone, _timelineAPI, _authed) {
        this._dialog = _dialog;
        this._dateAdapter = _dateAdapter;
        this._snackBar = _snackBar;
        this._zone = _zone;
        this._timelineAPI = _timelineAPI;
        this._authed = _authed;
        this.capText = {
            title: 'บันทึกประวัติการซ่อมบำรุงทรัพย์สิน',
            detail: 'รายละเอียดการซ่อม'
        };
        //-- file to upload
        this.filesUpload = new Array();
        this.filesView = new Array();
        this.imagesView = new Array();
        /** FormControl */
        this.currentDate = new FormControl(new Date(), [Validators.required]);
        this.detail = new FormControl(null, [Validators.required]);
        this.cost = new FormControl(null, [Validators.required]);
        this.guaranteeDate = new FormControl(null);
        /** Saving */
        this.isSaving = false;
        this.isSaved = false;
        this.preLoading = false;
        /** Subscription */
        this._subscription = {};
        this._dateAdapter.setLocale('th-TH');
        this.modeDialog = data === null || data === void 0 ? void 0 : data.modeDialog;
        this.viewType = data === null || data === void 0 ? void 0 : data.viewType;
        this._assetId = data === null || data === void 0 ? void 0 : data.assetId;
        this._assetType = data === null || data === void 0 ? void 0 : data.assetType;
        this._viewId = data === null || data === void 0 ? void 0 : data.viewId;
    }
    ngOnInit() {
        if (this.modeDialog === 'maintenance') {
            this.capText.title = 'บันทึกประวัติการซ่อมบำรุงทรัพย์สิน';
            this.capText.detail = 'รายละเอียดการซ่อม';
        }
        if (this.modeDialog === 'assets') {
            this.capText.title = 'รายงานสภาพทรัพย์สิน';
            this.capText.detail = 'รายละเอียดสภาพทรัพย์สิน';
        }
        if (this.viewType === 'View') {
            // console.log('%cViewId', 'color:orange', this._viewId);
            this.loadFormData();
        }
    }
    ngAfterViewInit() {
    }
    ngOnDestroy() {
        this._dateAdapter.setLocale('en-EN');
        for (const key in this._subscription) {
            if (Object.prototype.hasOwnProperty.call(this._subscription, key)) {
                this._subscription[key].unsubscribe();
            }
        }
    }
    loadFormData() {
        if (this.modeDialog === 'maintenance') {
            this.preLoading = true;
            this._timelineAPI.getMaintenanceHistoryWithFile(this._viewId).then(res => {
                if (!(res === null || res === void 0 ? void 0 : res.reportDate))
                    return;
                if (res === null || res === void 0 ? void 0 : res.reportDate)
                    this.currentDate.setValue(new Date(res === null || res === void 0 ? void 0 : res.reportDate), { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.description)
                    this.detail.setValue(res === null || res === void 0 ? void 0 : res.description, { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.repairCost)
                    this.cost.setValue(res === null || res === void 0 ? void 0 : res.repairCost, { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.guaranteeDate)
                    this.guaranteeDate.setValue(res === null || res === void 0 ? void 0 : res.guaranteeDate, { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.files)
                    this.filesView = res === null || res === void 0 ? void 0 : res.files;
                if (res === null || res === void 0 ? void 0 : res.images)
                    this.imagesView = res === null || res === void 0 ? void 0 : res.images;
                this.preLoading = false;
            });
        }
        if (this.modeDialog === 'assets') {
            this.preLoading = true;
            this._timelineAPI.getConditionReportWithFile(this._viewId).then(res => {
                if (!(res === null || res === void 0 ? void 0 : res.reportDate))
                    return;
                if (res === null || res === void 0 ? void 0 : res.reportDate)
                    this.currentDate.setValue(new Date(res === null || res === void 0 ? void 0 : res.reportDate), { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.description)
                    this.detail.setValue(res === null || res === void 0 ? void 0 : res.description, { emitEvent: false });
                if (res === null || res === void 0 ? void 0 : res.files)
                    this.filesView = res === null || res === void 0 ? void 0 : res.files;
                if (res === null || res === void 0 ? void 0 : res.images)
                    this.imagesView = res === null || res === void 0 ? void 0 : res.images;
                this.preLoading = false;
            });
        }
    }
    /** Replace number */
    numberOnly(ev) {
        return new RegExp(/^[0-9]*\.?[0-9]*$/).test(ev.key);
    }
    costNumber() {
        return Number(String(this.cost.value).replace(/\,/g, ''));
    }
    /** Handler */
    setFormDisabled() {
        this.currentDate.disable();
        this.detail.disable();
        this.detail.disable();
        this.guaranteeDate.disable();
    }
    setFormEnabled() {
        this.currentDate.enable();
        this.detail.enable();
        this.detail.enable();
        this.guaranteeDate.enable();
    }
    /** ===============================================================================
       * File handlering
       * @param el
       */
    inputFiles(el) {
        const files = el.target.files;
        const filesArr = new Array();
        for (const file of files) {
            const extension = String(file.name).substring(String(file.name).lastIndexOf('.') + 1);
            const type = String(file.type).split('/')[0];
            const format = {
                thumb: null,
                name: file.name,
                file: file,
                size: file.size,
                progress: 0
            };
            if (file.type.match(/image\/*/) && type != 'svg') {
                this.readImage(format);
            }
            else {
                format.thumb = IconFiles.iconFile(String(extension).toLowerCase());
            }
            filesArr.unshift(format);
        }
        this._zone.run(() => __awaiter(this, void 0, void 0, function* () {
            this.filesUpload = [...filesArr, ...this.filesUpload];
        }));
    }
    /** Reander image file */
    readImage(file) {
        let previewUrl = '';
        const reader = new FileReader();
        reader.onload = (_event) => {
            file.thumb = reader.result;
        };
        reader.readAsDataURL(file.file);
        return file;
    }
    /** Display size type
     * 10 KB | MB | GB
    */
    readFileSize(size) {
        if (!size)
            return '';
        if (size <= ((Math.pow(2, 10)) * 1024))
            return `${(size / (Math.pow(2, 10))).toFixed(2)} KB`;
        if (size <= ((Math.pow(2, 20)) * 1024))
            return `${(size / (Math.pow(2, 20))).toFixed(2)} MB`;
        return `${(size / (Math.pow(2, 30))).toFixed(2)} GB`;
    }
    /** View extention */
    getFileIcon(extension) {
        return IconFiles.iconFile(String(extension).toLowerCase());
    }
    /** Delete file item */
    delFile(position) {
        this.filesUpload.splice(position, 1);
    }
    /** ==========================================================
     * Download file
     */
    downloafFile(file) {
        const extract = String(file === null || file === void 0 ? void 0 : file.fileUrl).split('/');
        const fileName = extract[extract.length - 1];
        this._subscription.downloadFile = this._timelineAPI.downloadFile(this._assetType, this._assetId, fileName).subscribe(res => {
            if (typeof res === 'number') {
                file.progress = Math.round(100 * res / Number(file === null || file === void 0 ? void 0 : file.size)); //console.log('Percentag:', Math.round(100 * res / Number(file?.size)));
            }
            else if (res instanceof Blob) {
                this.downloadBlob(res, file === null || file === void 0 ? void 0 : file.fileName);
            }
            // else {
            //     console.log('%cResponse:', 'color:orange', res);
            // }
        });
    }
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        document.body.appendChild(a);
        setTimeout(() => { a.click(); document.body.removeChild(a); }, 100);
    }
    /** ==========================================================
     * Save data
     */
    isImageSaved() {
        var _a, _b;
        if (this.isSaved && !((_a = this.filesUpload) === null || _a === void 0 ? void 0 : _a.length))
            return true;
        if (!((_b = this.filesUpload) === null || _b === void 0 ? void 0 : _b.length))
            return false;
        const saving = this.filesUpload.every(o => o.progress == 100);
        return saving;
    }
    saveData() {
        var _a, _b;
        if (this.isSaving)
            return;
        const tools = new AppTools();
        if (this.modeDialog === 'maintenance') {
            if (this.cost.invalid || this.detail.invalid)
                return;
            this.isSaving = true;
            this.setFormDisabled();
            const data = {
                assetId: this._assetId,
                assetType: this._assetType,
                userId: (_a = this._authed.authUser) === null || _a === void 0 ? void 0 : _a.account_id,
                description: this.detail.value,
                repairCost: Number(String(this.cost.value).replace(/\,/g, '')),
                guaranteeDate: tools.dateTimeFormat(this.guaranteeDate.value),
                reportDate: tools.dateTimeFormat(this.currentDate.value),
            };
            // console.log('%cParams', 'color:tomato', data);
            this._timelineAPI.createMaintenance(data).then((res) => {
                if (res === null || res === void 0 ? void 0 : res.id)
                    this.uploadAllFile(res === null || res === void 0 ? void 0 : res.id, true);
                this.isSaved = true;
            });
        }
        if (this.modeDialog === 'assets') {
            if (this.detail.invalid)
                return;
            this.isSaving = true;
            this.setFormDisabled();
            const data = {
                assetId: this._assetId,
                assetType: this._assetType,
                userId: (_b = this._authed.authUser) === null || _b === void 0 ? void 0 : _b.account_id,
                description: this.detail.value,
                reportDate: tools.dateTimeFormat(this.currentDate.value),
            };
            // console.log('%cParams', 'color:tomato', data);
            this._timelineAPI.createConditionReport(data).then((res) => {
                if (res === null || res === void 0 ? void 0 : res.id)
                    this.uploadAllFile(res === null || res === void 0 ? void 0 : res.id, false);
                this.isSaved = true;
            });
        }
    }
    uploadAllFile(mainId, isMaintenance) {
        let idxFile = 0;
        for (const item of this.filesUpload) {
            this._subscription[`upload-idx-${idxFile}`] = this._timelineAPI.uploadFile(mainId, this._assetType, this._assetId, item.file, isMaintenance).subscribe(res => {
                if (typeof res === 'number') {
                    item.progress = res;
                }
            }, err => console.log('%cError occured while uploading file', 'color:tomato'));
            idxFile++;
        }
    }
}
DialogNewRecordComponent.decorators = [
    { type: Component, args: [{
                selector: 'timeline-dialog-new-record',
                template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 class=\"m-0\">{{ capText?.title }}</h4>\n        <span fxFlex></span>\n        <mat-icon *ngIf=\"(viewType === 'View')\" [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n    <mat-progress-bar *ngIf=\"preLoading\" color=\"warn\" mode=\"indeterminate\" [style.height.px]=\"2\"></mat-progress-bar>\n</div>\n\n<mat-dialog-content>\n    <div fxLayout=\"column\" [style.width.%]=\"100\">\n        <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n            <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</mat-label>\n            <input matInput [formControl]=\"currentDate\" [matDatepicker]=\"addDate\" [readonly]=\"(viewType === 'View')\"\n                (click)=\"(viewType === 'Add')? addDate.open() : null\">\n            <mat-datepicker-toggle matSuffix [disabled]=\"(viewType === 'View')\" [for]=\"addDate\"></mat-datepicker-toggle>\n            <mat-datepicker #addDate color=\"accent\" panelClass=\"custom-datepicker-color\"></mat-datepicker>\n        </mat-form-field>\n\n        <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n            <mat-label>{{ capText.detail }}</mat-label>\n            <textarea matInput [formControl]=\"detail\" [mat-autosize]=\"true\" placeholder=\"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14...\"\n                [readonly]=\"(viewType === 'View')\"></textarea>\n        </mat-form-field>\n\n        <ng-container *ngIf=\"modeDialog === 'maintenance'\">\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"w-100\">\n                <div fxFlex=\"50%\">\n                    <!-- <mat-label>\n                        <small>\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21</small>\n                    </mat-label> -->\n                    <mat-form-field appearance=\"outline\" color=\"warn\" floatLabel=\"always\" class=\"w-100\">\n                        <mat-label>\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21</mat-label>\n                        <input matInput [align]=\"'right'\" [formControl]=\"cost\" [value]=\"costNumber() | number\"\n                            (keypress)=\"numberOnly($event)\" placeholder=\"100,000.00\" class=\"text-right\"\n                            [readonly]=\"(viewType === 'View')\">\n                        <span matPrefix>\u0E3F&nbsp;</span>\n                    </mat-form-field>\n                </div>\n\n                <div fxFlex=\"50%\">\n                    <!-- <mat-label>\n                        <small>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E04\u0E49\u0E33\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19</small>\n                    </mat-label> -->\n                    <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n                        <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E04\u0E49\u0E33\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19</mat-label>\n                        <input matInput [formControl]=\"guaranteeDate\" [matDatepicker]=\"dateGuarantee\"\n                            [readonly]=\"(viewType === 'View')\"\n                            (click)=\"(viewType === 'Add')? dateGuarantee.open() : null\">\n                        <mat-datepicker-toggle matSuffix [disabled]=\"(viewType === 'View')\" [for]=\"dateGuarantee\">\n                        </mat-datepicker-toggle>\n                        <mat-datepicker #dateGuarantee color=\"accent\" panelClass=\"custom-datepicker-color\">\n                        </mat-datepicker>\n                    </mat-form-field>\n                </div>\n            </div>\n        </ng-container>\n    </div>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n        <div [style.width.%]=\"100\">\n            <mat-list>\n                <div *ngIf=\"filesUpload.length\" [@fadeInGrow]>\n                    <ng-container *ngFor=\"let file of filesUpload; let idx = index;\">\n                        <mat-list-item>\n                            <img matListAvatar [src]=\"file?.thumb\" [style.borderRadius.px]=\"5\">\n                            <div matLine>&nbsp;&nbsp;{{ file?.name }}</div>\n                            <div matLine>&nbsp;&nbsp;\n                                <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                            </div>\n                            <div *ngIf=\"isSaving && file?.progress !== 100\" mat-line>\n                                <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                </mat-progress-bar>\n                            </div>\n                            <mat-icon *ngIf=\"isSaving && file?.progress === 100\" [style.color]=\"'var(--success)'\">\n                                check_circle</mat-icon>\n                            <button *ngIf=\"!isSaving\" mat-icon-button matSuffix (click)=\"delFile(idx)\"\n                                [style.color]=\"'gray'\">\n                                <mat-icon>cancel</mat-icon>\n                            </button>\n                        </mat-list-item>\n                    </ng-container>\n                </div>\n            </mat-list>\n        </div>\n    </div>\n\n    <!-- ====== View images ====== -->\n    <ng-container *ngIf=\"imagesView?.length\">\n        <div>\n            <strong>\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"flex-start\" [style.paddingLeft.px]=\"10\"\n                    [style.marginTop.px]=\"10\">\n                    <ng-container *ngFor=\"let file of imagesView; let idx = index;\">\n                        <div fxFlex=\"0 1 calc(33.33% - 10px)\">\n                            <img error-img [default]=\"'assets/img/dummy.png'\" [src]=\"file?.fileUrl\"\n                                style=\"width: 100%; height: 100%; object-fit: cover; margin-bottom: 10px;\">\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    </ng-container>\n\n    <!-- ====== View files ====== -->\n    <ng-container *ngIf=\"filesView?.length\">\n        <div>\n            <strong>\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <mat-list>\n                    <div *ngIf=\"filesView.length\" [@fadeInGrow]>\n                        <ng-container *ngFor=\"let file of filesView;\">\n                            <mat-list-item>\n                                <img matListAvatar [src]=\"getFileIcon(file?.extension)\" [style.borderRadius.px]=\"5\">\n                                <div matLine>&nbsp;&nbsp;{{ file?.fileName }}</div>\n                                <div matLine>&nbsp;&nbsp;\n                                    <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                </div>\n                                <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                    <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                    </mat-progress-bar>\n                                </div>\n                                <button mat-icon-button [style.color]=\"'gray'\"\n                                    [disabled]=\"file?.progress && file?.progress !== 100\" (click)=\"downloafFile(file)\">\n                                    <mat-icon>download</mat-icon>\n                                </button>\n                            </mat-list-item>\n                        </ng-container>\n                    </div>\n                </mat-list>\n            </div>\n        </div>\n    </ng-container>\n</mat-dialog-content>\n\n<mat-dialog-actions *ngIf=\"(viewType === 'Add')\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <button mat-button (click)=\"fileMultiple.click()\" [disabled]=\"isSaving\">\n            <mat-icon>attach_file</mat-icon>\n            <strong>\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C</strong>\n            <input #fileMultiple type=\"file\" name=\"file[]\" multiple (change)=\"inputFiles($event)\" style=\"display: none\">\n        </button>\n\n        <span fxFlex></span>\n\n        <button mat-button mat-dialog-close [disabled]=\"isSaving\">\n            <strong>\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01</strong>\n        </button>\n\n        <button *ngIf=\"!isImageSaved()\" mat-flat-button (click)=\"saveData()\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <mat-icon *ngIf=\"isSaving\">\n                <mat-spinner [diameter]=\"24\"></mat-spinner>\n            </mat-icon>\n            <strong *ngIf=\"!isSaving\">\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01</strong>\n        </button>\n\n        <button *ngIf=\"isSaved && isImageSaved()\" mat-flat-button [mat-dialog-close]=\"true\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <strong>\u0E1B\u0E34\u0E14\u0E1F\u0E2D\u0E23\u0E4C\u0E21</strong>\n        </button>\n    </div>\n</mat-dialog-actions>",
                animations: [FadeInOut, FadeInGrow],
                providers: [
                    { provide: MAT_DATE_FORMATS, useValue: ɵ0 }
                ],
                styles: ["::ng-deep .timeline-dialog-new-record mat-dialog-container{border-radius:12px;padding:16px;overflow:hidden}::ng-deep mat-calendar.custom-datepicker-color .mat-calendar-body-selected{background-color:var(--primary-orange)!important;color:#fff;font-weight:700}"]
            },] }
];
DialogNewRecordComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: DateAdapter },
    { type: MatSnackBar },
    { type: NgZone },
    { type: TimelineAssetsService },
    { type: UserAuthedService }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLW5ldy1yZWNvcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS93aWRnZXRzL2RpYWxvZy1uZXctcmVjb3JkL2RpYWxvZy1uZXctcmVjb3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBa0IsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRGLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFakUsTUFBTSxtQkFBbUIsR0FBbUI7SUFDeEMsS0FBSyxFQUFFO1FBQ0gsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUU7S0FDakU7SUFDRCxPQUFPLEVBQUU7UUFDTCxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVB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QixFQUFFO2lCQUMvRDs7YUFDSjs7O1lBNUNRLFlBQVk7NENBd0VaLE1BQU0sU0FBQyxlQUFlO1lBekV0QixXQUFXO1lBRVgsV0FBVztZQUptQixNQUFNO1lBTzFCLHFCQUFxQjtZQUQvQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgTE9DQUxFX0lELCBOZ1pvbmUsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEYXRlQWRhcHRlciwgTWF0RGF0ZUZvcm1hdHMsIE1BVF9EQVRFX0ZPUk1BVFMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IEljb25GaWxlcyB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbi9pY29uLWZpbGVzJztcbmltcG9ydCB7IFVzZXJBdXRoZWRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2VydmljZXMvdXNlci1hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwVG9vbHMsIFRpbWVsaW5lQXNzZXRzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3RpbWVsaW5lLWFzc2V0cy5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnOyAgIFxuaW1wb3J0IHsgRmFkZUluR3JvdywgRmFkZUluT3V0IH0gZnJvbSAnLi9jcmVhdGUtZXZlbnQuYW5pbWF0aW9uJztcblxuY29uc3QgQ1VTVE9NX0RBVEVfRk9STUFUUzogTWF0RGF0ZUZvcm1hdHMgPSB7XG4gICAgcGFyc2U6IHtcbiAgICAgICAgZGF0ZUlucHV0OiB7IG1vbnRoOiAnc2hvcnQnLCB5ZWFyOiAnbnVtZXJpYycsIGRheTogJ251bWVyaWMnIH0sXG4gICAgfSxcbiAgICBkaXNwbGF5OiB7XG4gICAgICAgIGRhdGVJbnB1dDogeyBtb250aDogJ3Nob3J0JywgeWVhcjogJ251bWVyaWMnLCBkYXk6ICdudW1lcmljJyB9LFxuICAgICAgICBtb250aFllYXJMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbnVtZXJpYycgfSxcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycsIGRheTogJ251bWVyaWMnIH0sXG4gICAgICAgIG1vbnRoWWVhckExMXlMYWJlbDogeyB5ZWFyOiAnbnVtZXJpYycsIG1vbnRoOiAnbG9uZycgfSxcbiAgICB9XG59O1xuXG5pbnRlcmZhY2UgRGlhbG9nRGF0YUludGVyZmFjZSB7XG4gICAgbW9kZURpYWxvZzogJ21haW50ZW5hbmNlJyB8ICdhc3NldHMnO1xuICAgIHZpZXdUeXBlOiAnQWRkJyB8ICdWaWV3JztcbiAgICB2aWV3SWQ6IHN0cmluZztcbiAgICBhc3NldElkOiBzdHJpbmc7XG4gICAgYXNzZXRUeXBlOiBzdHJpbmc7XG4gICAgW3g6IHN0cmluZ106IGFueTtcbn1cbmludGVyZmFjZSBGaWxlSXRlbSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRodW1iOiBzdHJpbmcgfCBBcnJheUJ1ZmZlcjtcbiAgICBmaWxlOiBGaWxlO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICBwcm9ncmVzcz86IG51bWJlcjtcbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy1uZXctcmVjb3JkLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kaWFsb2ctbmV3LXJlY29yZC5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnM6IFtGYWRlSW5PdXQsIEZhZGVJbkdyb3ddLFxuICAgIHByb3ZpZGVyczogWyBcbiAgICAgICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogQ1VTVE9NX0RBVEVfRk9STUFUUyB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dOZXdSZWNvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyB2aWV3VHlwZTogJ0FkZCcgfCAnVmlldyc7XG4gICAgcHVibGljIG1vZGVEaWFsb2c6ICdtYWludGVuYW5jZScgfCAnYXNzZXRzJztcbiAgICBwdWJsaWMgX2Fzc2V0SWQ6IHN0cmluZztcbiAgICBwdWJsaWMgX2Fzc2V0VHlwZTogc3RyaW5nO1xuICAgIHB1YmxpYyBfdmlld0lkOiBzdHJpbmc7IC8vLS0gRGF0YSBpZFxuICAgIHB1YmxpYyBjYXBUZXh0ID0ge1xuICAgICAgICB0aXRsZTogJ+C4muC4seC4meC4l+C4tuC4geC4m+C4o+C4sOC4p+C4seC4leC4tOC4geC4suC4o+C4i+C5iOC4reC4oeC4muC4s+C4o+C4uOC4h+C4l+C4o+C4seC4nuC4ouC5jOC4quC4tOC4mScsXG4gICAgICAgIGRldGFpbDogJ+C4o+C4suC4ouC4peC4sOC5gOC4reC4teC4ouC4lOC4geC4suC4o+C4i+C5iOC4reC4oSdcbiAgICB9O1xuICAgIC8vLS0gZmlsZSB0byB1cGxvYWRcbiAgICBwdWJsaWMgZmlsZXNVcGxvYWQ6IEFycmF5PEZpbGVJdGVtPiA9IG5ldyBBcnJheTxGaWxlSXRlbT4oKTtcbiAgICBwdWJsaWMgZmlsZXNWaWV3OiBBcnJheTxhbnk+ID0gbmV3IEFycmF5KCk7XG4gICAgcHVibGljIGltYWdlc1ZpZXc6IEFycmF5PGFueT4gPSBuZXcgQXJyYXkoKTtcbiAgICAvKiogRm9ybUNvbnRyb2wgKi9cbiAgICBwdWJsaWMgY3VycmVudERhdGU6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKG5ldyBEYXRlKCksIFtWYWxpZGF0b3JzLnJlcXVpcmVkXSk7XG4gICAgcHVibGljIGRldGFpbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgICBwdWJsaWMgY29zdDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCwgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgICBwdWJsaWMgZ3VhcmFudGVlRGF0ZTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wobnVsbCk7XG4gICAgLyoqIFNhdmluZyAqL1xuICAgIHB1YmxpYyBpc1NhdmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBpc1NhdmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIHByZUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKiogU3Vic2NyaXB0aW9uICovXG4gICAgcHVibGljIF9zdWJzY3JpcHRpb246IHsgW3g6IHN0cmluZ106IFN1YnNjcmlwdGlvbiB9ID0ge307XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nUmVmPERpYWxvZ05ld1JlY29yZENvbXBvbmVudD4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBkYXRhOiBEaWFsb2dEYXRhSW50ZXJmYWNlLFxuICAgICAgICBwcml2YXRlIF9kYXRlQWRhcHRlcjogRGF0ZUFkYXB0ZXI8YW55PixcbiAgICAgICAgcHJpdmF0ZSBfc25hY2tCYXI6IE1hdFNuYWNrQmFyLFxuICAgICAgICBwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgICAgIHByaXZhdGUgX3RpbWVsaW5lQVBJOiBUaW1lbGluZUFzc2V0c1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2F1dGhlZDogVXNlckF1dGhlZFNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5fZGF0ZUFkYXB0ZXIuc2V0TG9jYWxlKCd0aC1USCcpO1xuICAgICAgICB0aGlzLm1vZGVEaWFsb2cgPSBkYXRhPy5tb2RlRGlhbG9nO1xuICAgICAgICB0aGlzLnZpZXdUeXBlID0gZGF0YT8udmlld1R5cGU7XG4gICAgICAgIHRoaXMuX2Fzc2V0SWQgPSBkYXRhPy5hc3NldElkO1xuICAgICAgICB0aGlzLl9hc3NldFR5cGUgPSBkYXRhPy5hc3NldFR5cGU7XG4gICAgICAgIHRoaXMuX3ZpZXdJZCA9IGRhdGE/LnZpZXdJZDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZURpYWxvZyA9PT0gJ21haW50ZW5hbmNlJykge1xuICAgICAgICAgICAgdGhpcy5jYXBUZXh0LnRpdGxlID0gJ+C4muC4seC4meC4l+C4tuC4geC4m+C4o+C4sOC4p+C4seC4leC4tOC4geC4suC4o+C4i+C5iOC4reC4oeC4muC4s+C4o+C4uOC4h+C4l+C4o+C4seC4nuC4ouC5jOC4quC4tOC4mSc7XG4gICAgICAgICAgICB0aGlzLmNhcFRleHQuZGV0YWlsID0gJ+C4o+C4suC4ouC4peC4sOC5gOC4reC4teC4ouC4lOC4geC4suC4o+C4i+C5iOC4reC4oSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW9kZURpYWxvZyA9PT0gJ2Fzc2V0cycpIHtcbiAgICAgICAgICAgIHRoaXMuY2FwVGV4dC50aXRsZSA9ICfguKPguLLguKLguIfguLLguJnguKrguKDguLLguJ7guJfguKPguLHguJ7guKLguYzguKrguLTguJknO1xuICAgICAgICAgICAgdGhpcy5jYXBUZXh0LmRldGFpbCA9ICfguKPguLLguKLguKXguLDguYDguK3guLXguKLguJTguKrguKDguLLguJ7guJfguKPguLHguJ7guKLguYzguKrguLTguJknO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZpZXdUeXBlID09PSAnVmlldycpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCclY1ZpZXdJZCcsICdjb2xvcjpvcmFuZ2UnLCB0aGlzLl92aWV3SWQpO1xuICAgICAgICAgICAgdGhpcy5sb2FkRm9ybURhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgfVxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRlQWRhcHRlci5zZXRMb2NhbGUoJ2VuLUVOJyk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9zdWJzY3JpcHRpb24sIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25ba2V5XS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRm9ybURhdGEoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVEaWFsb2cgPT09ICdtYWludGVuYW5jZScpIHtcbiAgICAgICAgICAgIHRoaXMucHJlTG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl90aW1lbGluZUFQSS5nZXRNYWludGVuYW5jZUhpc3RvcnlXaXRoRmlsZSh0aGlzLl92aWV3SWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcz8ucmVwb3J0RGF0ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LnJlcG9ydERhdGUpIHRoaXMuY3VycmVudERhdGUuc2V0VmFsdWUobmV3IERhdGUocmVzPy5yZXBvcnREYXRlKSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LmRlc2NyaXB0aW9uKSB0aGlzLmRldGFpbC5zZXRWYWx1ZShyZXM/LmRlc2NyaXB0aW9uLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcz8ucmVwYWlyQ29zdCkgdGhpcy5jb3N0LnNldFZhbHVlKHJlcz8ucmVwYWlyQ29zdCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgICAgIGlmIChyZXM/Lmd1YXJhbnRlZURhdGUpIHRoaXMuZ3VhcmFudGVlRGF0ZS5zZXRWYWx1ZShyZXM/Lmd1YXJhbnRlZURhdGUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzPy5maWxlcykgdGhpcy5maWxlc1ZpZXcgPSByZXM/LmZpbGVzO1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LmltYWdlcykgdGhpcy5pbWFnZXNWaWV3ID0gcmVzPy5pbWFnZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2RlRGlhbG9nID09PSAnYXNzZXRzJykge1xuICAgICAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lQVBJLmdldENvbmRpdGlvblJlcG9ydFdpdGhGaWxlKHRoaXMuX3ZpZXdJZCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzPy5yZXBvcnREYXRlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHJlcz8ucmVwb3J0RGF0ZSkgdGhpcy5jdXJyZW50RGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZShyZXM/LnJlcG9ydERhdGUpLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcz8uZGVzY3JpcHRpb24pIHRoaXMuZGV0YWlsLnNldFZhbHVlKHJlcz8uZGVzY3JpcHRpb24sIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzPy5maWxlcykgdGhpcy5maWxlc1ZpZXcgPSByZXM/LmZpbGVzO1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LmltYWdlcykgdGhpcy5pbWFnZXNWaWV3ID0gcmVzPy5pbWFnZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZXBsYWNlIG51bWJlciAqL1xuICAgIHB1YmxpYyBudW1iZXJPbmx5KGV2OiBLZXlib2FyZEV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKC9eWzAtOV0qXFwuP1swLTldKiQvKS50ZXN0KGV2LmtleSk7XG4gICAgfVxuICAgIHB1YmxpYyBjb3N0TnVtYmVyKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIoU3RyaW5nKHRoaXMuY29zdC52YWx1ZSkucmVwbGFjZSgvXFwsL2csICcnKSk7XG4gICAgfVxuXG4gICAgLyoqIEhhbmRsZXIgKi9cbiAgICBwcml2YXRlIHNldEZvcm1EaXNhYmxlZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5kaXNhYmxlKCk7XG4gICAgICAgIHRoaXMuZGV0YWlsLmRpc2FibGUoKTtcbiAgICAgICAgdGhpcy5kZXRhaWwuZGlzYWJsZSgpO1xuICAgICAgICB0aGlzLmd1YXJhbnRlZURhdGUuZGlzYWJsZSgpO1xuICAgIH1cbiAgICBwcml2YXRlIHNldEZvcm1FbmFibGVkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnREYXRlLmVuYWJsZSgpO1xuICAgICAgICB0aGlzLmRldGFpbC5lbmFibGUoKTtcbiAgICAgICAgdGhpcy5kZXRhaWwuZW5hYmxlKCk7XG4gICAgICAgIHRoaXMuZ3VhcmFudGVlRGF0ZS5lbmFibGUoKTtcbiAgICB9XG5cbiAgICAvKiogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICogRmlsZSBoYW5kbGVyaW5nXG4gICAgICAgKiBAcGFyYW0gZWwgXG4gICAgICAgKi9cbiAgICBwdWJsaWMgaW5wdXRGaWxlcyhlbDogYW55KSB7XG4gICAgICAgIGNvbnN0IGZpbGVzOiBBcnJheTxGaWxlPiA9IGVsLnRhcmdldC5maWxlcztcbiAgICAgICAgY29uc3QgZmlsZXNBcnI6IEFycmF5PEZpbGVJdGVtPiA9IG5ldyBBcnJheTxGaWxlSXRlbT4oKTtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb246IHN0cmluZyA9IFN0cmluZyhmaWxlLm5hbWUpLnN1YnN0cmluZyhTdHJpbmcoZmlsZS5uYW1lKS5sYXN0SW5kZXhPZignLicpICsgMSk7XG4gICAgICAgICAgICBjb25zdCB0eXBlOiBzdHJpbmcgPSBTdHJpbmcoZmlsZS50eXBlKS5zcGxpdCgnLycpWzBdO1xuXG4gICAgICAgICAgICBjb25zdCBmb3JtYXQ6IEZpbGVJdGVtID0ge1xuICAgICAgICAgICAgICAgIHRodW1iOiBudWxsLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICBmaWxlOiBmaWxlLFxuICAgICAgICAgICAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgICAgICAgICAgICBwcm9ncmVzczogMFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlsZS50eXBlLm1hdGNoKC9pbWFnZVxcLyovKSAmJiB0eXBlICE9ICdzdmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkSW1hZ2UoZm9ybWF0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0LnRodW1iID0gSWNvbkZpbGVzLmljb25GaWxlKFN0cmluZyhleHRlbnNpb24pLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlsZXNBcnIudW5zaGlmdChmb3JtYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fem9uZS5ydW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5maWxlc1VwbG9hZCA9IFsuLi5maWxlc0FyciwgLi4udGhpcy5maWxlc1VwbG9hZF07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKiogUmVhbmRlciBpbWFnZSBmaWxlICovXG4gICAgcHJpdmF0ZSByZWFkSW1hZ2UoZmlsZTogRmlsZUl0ZW0pIHtcbiAgICAgICAgbGV0IHByZXZpZXdVcmw6IHN0cmluZyB8IEFycmF5QnVmZmVyID0gJydcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IChfZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGZpbGUudGh1bWIgPSByZWFkZXIucmVzdWx0XG4gICAgICAgIH1cbiAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZS5maWxlKTtcbiAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgfVxuICAgIC8qKiBEaXNwbGF5IHNpemUgdHlwZVxuICAgICAqIDEwIEtCIHwgTUIgfCBHQlxuICAgICovXG4gICAgcHVibGljIHJlYWRGaWxlU2l6ZShzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXNpemUpIHJldHVybiAnJztcbiAgICAgICAgaWYgKHNpemUgPD0gKCgyICoqIDEwKSAqIDEwMjQpKSByZXR1cm4gYCR7KHNpemUgLyAoMiAqKiAxMCkpLnRvRml4ZWQoMil9IEtCYDtcbiAgICAgICAgaWYgKHNpemUgPD0gKCgyICoqIDIwKSAqIDEwMjQpKSByZXR1cm4gYCR7KHNpemUgLyAoMiAqKiAyMCkpLnRvRml4ZWQoMil9IE1CYDtcbiAgICAgICAgcmV0dXJuIGAkeyhzaXplIC8gKDIgKiogMzApKS50b0ZpeGVkKDIpfSBHQmA7XG4gICAgfVxuICAgIC8qKiBWaWV3IGV4dGVudGlvbiAqL1xuICAgIHB1YmxpYyBnZXRGaWxlSWNvbihleHRlbnNpb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJY29uRmlsZXMuaWNvbkZpbGUoU3RyaW5nKGV4dGVuc2lvbikudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuICAgIC8qKiBEZWxldGUgZmlsZSBpdGVtICovXG4gICAgcHVibGljIGRlbEZpbGUocG9zaXRpb246IG51bWJlcikge1xuICAgICAgICB0aGlzLmZpbGVzVXBsb2FkLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgfVxuXG4gICAgLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgKiBEb3dubG9hZCBmaWxlXG4gICAgICovXG4gICAgcHVibGljIGRvd25sb2FmRmlsZShmaWxlOiBhbnkpIHtcbiAgICAgICAgY29uc3QgZXh0cmFjdDogc3RyaW5nW10gPSBTdHJpbmcoZmlsZT8uZmlsZVVybCkuc3BsaXQoJy8nKTtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBleHRyYWN0W2V4dHJhY3QubGVuZ3RoIC0gMV07XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5kb3dubG9hZEZpbGUgPSB0aGlzLl90aW1lbGluZUFQSS5kb3dubG9hZEZpbGUodGhpcy5fYXNzZXRUeXBlLCB0aGlzLl9hc3NldElkLCBmaWxlTmFtZSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBmaWxlLnByb2dyZXNzID0gTWF0aC5yb3VuZCgxMDAgKiByZXMgLyBOdW1iZXIoZmlsZT8uc2l6ZSkpOy8vY29uc29sZS5sb2coJ1BlcmNlbnRhZzonLCBNYXRoLnJvdW5kKDEwMCAqIHJlcyAvIE51bWJlcihmaWxlPy5zaXplKSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kb3dubG9hZEJsb2IocmVzLCBmaWxlPy5maWxlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnJWNSZXNwb25zZTonLCAnY29sb3I6b3JhbmdlJywgcmVzKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgZG93bmxvYWRCbG9iKGJsb2I6IEJsb2IsIGZpbGVuYW1lPzogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuICAgICAgICBhLmhyZWYgPSB1cmxcbiAgICAgICAgYS5kb3dubG9hZCA9IGZpbGVuYW1lIHx8ICdkb3dubG9hZCdcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBhLmNsaWNrKCk7IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7IH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgKiBTYXZlIGRhdGFcbiAgICAgKi9cbiAgICBwdWJsaWMgaXNJbWFnZVNhdmVkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc1NhdmVkICYmICF0aGlzLmZpbGVzVXBsb2FkPy5sZW5ndGgpIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoIXRoaXMuZmlsZXNVcGxvYWQ/Lmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBzYXZpbmcgPSB0aGlzLmZpbGVzVXBsb2FkLmV2ZXJ5KG8gPT4gby5wcm9ncmVzcyA9PSAxMDApO1xuICAgICAgICByZXR1cm4gc2F2aW5nO1xuICAgIH1cbiAgICBwdWJsaWMgc2F2ZURhdGEoKSB7XG4gICAgICAgIGlmKHRoaXMuaXNTYXZpbmcpIHJldHVybjtcbiAgICAgICAgY29uc3QgdG9vbHMgPSBuZXcgQXBwVG9vbHMoKTtcblxuICAgICAgICBpZiAodGhpcy5tb2RlRGlhbG9nID09PSAnbWFpbnRlbmFuY2UnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb3N0LmludmFsaWQgfHwgdGhpcy5kZXRhaWwuaW52YWxpZCkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5pc1NhdmluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNldEZvcm1EaXNhYmxlZCgpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBhc3NldElkOiB0aGlzLl9hc3NldElkLFxuICAgICAgICAgICAgICAgIGFzc2V0VHlwZTogdGhpcy5fYXNzZXRUeXBlLFxuICAgICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5fYXV0aGVkLmF1dGhVc2VyPy5hY2NvdW50X2lkLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRldGFpbC52YWx1ZSxcbiAgICAgICAgICAgICAgICByZXBhaXJDb3N0OiBOdW1iZXIoU3RyaW5nKHRoaXMuY29zdC52YWx1ZSkucmVwbGFjZSgvXFwsL2csICcnKSksXG4gICAgICAgICAgICAgICAgZ3VhcmFudGVlRGF0ZTogdG9vbHMuZGF0ZVRpbWVGb3JtYXQodGhpcy5ndWFyYW50ZWVEYXRlLnZhbHVlKSxcbiAgICAgICAgICAgICAgICByZXBvcnREYXRlOiB0b29scy5kYXRlVGltZUZvcm1hdCh0aGlzLmN1cnJlbnREYXRlLnZhbHVlKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnJWNQYXJhbXMnLCAnY29sb3I6dG9tYXRvJywgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl90aW1lbGluZUFQSS5jcmVhdGVNYWludGVuYW5jZShkYXRhKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LmlkKSB0aGlzLnVwbG9hZEFsbEZpbGUocmVzPy5pZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1NhdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kZURpYWxvZyA9PT0gJ2Fzc2V0cycpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRldGFpbC5pbnZhbGlkKSByZXR1cm47XG4gICAgICAgICAgICB0aGlzLmlzU2F2aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2V0Rm9ybURpc2FibGVkKCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICAgICAgICAgIGFzc2V0SWQ6IHRoaXMuX2Fzc2V0SWQsXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiB0aGlzLl9hc3NldFR5cGUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLl9hdXRoZWQuYXV0aFVzZXI/LmFjY291bnRfaWQsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGV0YWlsLnZhbHVlLFxuICAgICAgICAgICAgICAgIHJlcG9ydERhdGU6IHRvb2xzLmRhdGVUaW1lRm9ybWF0KHRoaXMuY3VycmVudERhdGUudmFsdWUpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCclY1BhcmFtcycsICdjb2xvcjp0b21hdG8nLCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lQVBJLmNyZWF0ZUNvbmRpdGlvblJlcG9ydChkYXRhKS50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXM/LmlkKSB0aGlzLnVwbG9hZEFsbEZpbGUocmVzPy5pZCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNTYXZlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBsb2FkQWxsRmlsZShtYWluSWQ6IHN0cmluZywgaXNNYWludGVuYW5jZTogYm9vbGVhbikge1xuICAgICAgICBsZXQgaWR4RmlsZSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0aGlzLmZpbGVzVXBsb2FkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb25bYHVwbG9hZC1pZHgtJHtpZHhGaWxlfWBdID0gdGhpcy5fdGltZWxpbmVBUEkudXBsb2FkRmlsZShcbiAgICAgICAgICAgICAgICBtYWluSWQsIHRoaXMuX2Fzc2V0VHlwZSwgdGhpcy5fYXNzZXRJZCwgaXRlbS5maWxlLCBpc01haW50ZW5hbmNlXG4gICAgICAgICAgICApLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnByb2dyZXNzID0gcmVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGVyciA9PiBjb25zb2xlLmxvZygnJWNFcnJvciBvY2N1cmVkIHdoaWxlIHVwbG9hZGluZyBmaWxlJywgJ2NvbG9yOnRvbWF0bycpKTtcbiAgICAgICAgICAgIGlkeEZpbGUrKztcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==