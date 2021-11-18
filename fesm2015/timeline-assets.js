import * as i1 from '@angular/common/http';
import { HttpRequest, HttpEventType, HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import * as i0 from '@angular/core';
import { Injectable, Component, Input, ChangeDetectorRef, NgZone, Inject, EventEmitter, Output, Directive, NgModule } from '@angular/core';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscriber, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { __awaiter } from 'tslib';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const BaseServer = "https://highwaydistrict.com/doh_district/api";
class TimelineAssetsService {
    constructor(http) {
        this.http = http;
        this.baseUrl = BaseServer;
        this.tools = new AppTools;
    }
    /**
        * Create new maintenance history
        * @param data | Object
        * @returns Promise
      */
    createMaintenance(data) {
        const url = `${this.baseUrl}/timeline/create-maintenance`;
        const params = this.tools.genFormData(data);
        return this.http.post(url, params).pipe(map((res) => res === null || res === void 0 ? void 0 : res.data)).toPromise();
    }
    /**
      * Create new condition report
      * @param data | Object
      * @returns Promise
    */
    createConditionReport(data) {
        const url = `${this.baseUrl}/timeline/create-condition`;
        const params = this.tools.genFormData(data);
        return this.http.post(url, params).pipe(map((res) => res === null || res === void 0 ? void 0 : res.data)).toPromise();
    }
    /** =========================================================================
     * Upload file to timline
     * @param assetType
     * @param assetId
     * @param file
     * @returns Observable
     */
    uploadFile(mainId, assetType, assetId, file, isMaintenance) {
        const formData = new FormData();
        formData.append('mainId', mainId);
        formData.append('assetType', assetType);
        formData.append('assetId', assetId);
        formData.append('file', file);
        const maintenance = (isMaintenance) ? '/maintenance' : '';
        const url = `${this.baseUrl}/timeline/upload-file${maintenance}`;
        const request = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(request).pipe(map((event) => {
            //-- Uploading...
            if (event.type === HttpEventType.UploadProgress)
                return Math.round(100 * event.loaded / event.total);
            //-- Uploaded
            // if (event.type === 3) return 100;
            //-- Uploaded response
            if (event instanceof HttpResponse)
                return event.body;
            //-- orther
            return event;
        }));
    }
    /** ======================================================================
     * Download file
     * */
    downloadFile(assetType, assetId, fileName) {
        const formData = new FormData();
        const url = `${this.baseUrl}/timeline/download/${assetType}/${assetId}/${fileName}`;
        const request = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'blob'
        });
        return this.http.request(request).pipe(map((event) => {
            //-- loading... HttpHeaderResponse
            if (event.type === HttpEventType.DownloadProgress)
                return event.loaded;
            //-- response
            if (event instanceof HttpResponse)
                return event.body;
            //-- orther
            return event;
        }));
    }
    /** ======================================================================
     * Load timeline data
     * =====================================================================*/
    getTimeline(assetType, assetId, period, periodType) {
        const formData = new FormData();
        formData.append('assetType', assetType);
        formData.append('assetId', assetId);
        if (period)
            formData.append('period', period);
        if (periodType)
            formData.append('periodType', periodType);
        const url = `${this.baseUrl}/timeline/asset-timeline`;
        return this.http.post(url, formData).pipe(map((res) => res === null || res === void 0 ? void 0 : res.data)).toPromise();
    }
    getMaintenanceHistoryWithFile(mainId) {
        const url = `${this.baseUrl}/timeline/maintenance-history/${mainId}`;
        return this.http.get(url).pipe(map((res) => res === null || res === void 0 ? void 0 : res.data)).toPromise();
    }
    getConditionReportWithFile(mainId) {
        const url = `${this.baseUrl}/timeline/condition-report/${mainId}`;
        return this.http.get(url).pipe(map((res) => res === null || res === void 0 ? void 0 : res.data)).toPromise();
    }
}
TimelineAssetsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function TimelineAssetsService_Factory() { return new TimelineAssetsService(i0.ɵɵinject(i1.HttpClient)); }, token: TimelineAssetsService, providedIn: "root" });
TimelineAssetsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
TimelineAssetsService.ctorParameters = () => [
    { type: HttpClient }
];
// app tools gan form data
class AppTools {
    constructor() {
        this.twoDigi = (num) => (`0${num}`).slice(-2);
    }
    // gan form data
    genFormData(object, form, namespace) {
        const formData = form || new FormData();
        for (let property in object) {
            if (object.hasOwnProperty(property) && object[property] != null && object[property] !== undefined) {
                const formKey = namespace ? `${namespace}[${property}]` : property;
                if (object[property] instanceof Date) {
                    formData.append(formKey, object[property].toISOString());
                }
                else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                    this.genFormData(object[property], formData, formKey);
                }
                else {
                    formData.append(formKey, object[property]);
                }
                continue;
            }
        }
        return formData;
    }
    /** Create date time format
     * @param date : Date
     * @return string : 'yyyy-MM-dd HH:mm:ss'
    */
    dateTimeFormat(date) {
        if (!date)
            return null;
        const fTime = `${this.twoDigi(date.getHours())}:${this.twoDigi(date.getMinutes())}:00`;
        return `${date.getFullYear()}-${this.twoDigi(date.getMonth() + 1)}-${this.twoDigi(date.getDate())} ${fTime}`;
    }
}
// budget list api
class BudgetCodeService {
    constructor(http) {
        this.http = http;
        this.baseUrl = BaseServer;
        this.tools = new AppTools;
    }
    createWithUpdate(params) {
        const url = `${this.baseUrl}/budget-code/create-update`;
        const formData = this.tools.genFormData(params);
        return this.http.post(url, formData).pipe(map((res) => (res === null || res === void 0 ? void 0 : res.data) ? res.data : res)).toPromise();
    }
    /** =================================================================================================
     * Upload file with progress single file only.
     * @param assetTable
     * @param budgetCode
     * @param file
     * @returns Observable
     */
    uploadFile(assetTable, budgetCode, file) {
        const url = `${this.baseUrl}/budget-code/upload-file`;
        const formData = new FormData();
        formData.append('assetType', assetTable);
        formData.append('budgetCode', String(budgetCode).trim());
        formData.append('file', file);
        const request = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(request).pipe(map((event) => {
            //-- Uploading...
            if (event.type === HttpEventType.UploadProgress)
                return Math.round(100 * event.loaded / event.total);
            //-- Uploaded response
            if (event instanceof HttpResponse)
                return event.body;
            //-- orther
            return event;
        }));
    }
    /** ======================================================================
     * Download file
     * */
    downloadFile(assetType, fileName) {
        const formData = new FormData();
        const url = `${this.baseUrl}/budget-code/download/${assetType}/${fileName}`;
        const request = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'blob'
        });
        return this.http.request(request).pipe(map((event) => {
            //-- loading... HttpHeaderResponse
            if (event.type === HttpEventType.DownloadProgress)
                return event.loaded;
            //-- response
            if (event instanceof HttpResponse)
                return event.body;
            //-- orther
            return event;
        }));
    }
    /** Finding budget-code */
    findBudgetCode(isAll, assetTable, budgetCode) {
        const findAll = (isAll) ? '/all' : '';
        const url = `${this.baseUrl}/budget-code/find-code${findAll}`;
        const formData = this.tools.genFormData({ assetType: assetTable, findCode: String(budgetCode).trim() });
        return this.http.post(url, formData).pipe(map((res) => (res === null || res === void 0 ? void 0 : res.data) ? res.data : res)).toPromise();
    }
    /** Get asset to used budget-code */
    getAssetUsedCode(budgetCode) {
        const url = `${this.baseUrl}/budget-code/asset-used`;
        const formData = this.tools.genFormData({ budgetCode: budgetCode });
        return this.http.post(url, formData).pipe(map((res) => (res === null || res === void 0 ? void 0 : res.data) ? res.data : res)).toPromise();
    }
}
BudgetCodeService.ɵprov = i0.ɵɵdefineInjectable({ factory: function BudgetCodeService_Factory() { return new BudgetCodeService(i0.ɵɵinject(i1.HttpClient)); }, token: BudgetCodeService, providedIn: "root" });
BudgetCodeService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
BudgetCodeService.ctorParameters = () => [
    { type: HttpClient }
];

class UserAuthedService {
    constructor() {
        this.AUTH_KEY = 'AUTHED_ASSETS';
        this._observe = new Subscriber();
    }
    get watchUserAccount() {
        return new Observable((observe) => {
            this._observe = observe;
        });
    }
    get authUser() {
        if (sessionStorage.getItem(this.AUTH_KEY) !== undefined) {
            this._authUser = JSON.parse(sessionStorage.getItem(this.AUTH_KEY));
        }
        return this._authUser;
    }
    setAuthUser(user) {
        this._authUser = user;
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
        try {
            this._observe.next(this._authUser);
        }
        catch (error) { }
    }
}
UserAuthedService.ɵprov = i0.ɵɵdefineInjectable({ factory: function UserAuthedService_Factory() { return new UserAuthedService(); }, token: UserAuthedService, providedIn: "root" });
UserAuthedService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
UserAuthedService.ctorParameters = () => [];

class TimelineAssetsComponent {
    constructor(_authSer) {
        this._authSer = _authSer;
        this._triggerNumber = null;
    }
    set AssetInfo(items) {
        this._assetInfo = items;
    }
    set TriggerNumber(num) {
        if (num)
            this._triggerNumber = num;
    }
    set userUnth(user) {
        if (user)
            this._authSer.setAuthUser(user);
    }
    ngOnInit() {
    }
}
TimelineAssetsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-timeline-assets',
                template: "<div class=\"timeline-assets\">\r\n    <app-timeline [assetInfo]=\"_assetInfo\" [triggerNum]=\"_triggerNumber\"></app-timeline>\r\n</div>",
                styles: [""]
            },] }
];
TimelineAssetsComponent.ctorParameters = () => [
    { type: UserAuthedService }
];
TimelineAssetsComponent.propDecorators = {
    AssetInfo: [{ type: Input }],
    TriggerNumber: [{ type: Input }],
    userUnth: [{ type: Input }]
};

const ListFilesModel = [
    { name: 'ai', icon: 'assets/icons/files/icon-ai.svg' },
    { name: 'avi', icon: 'assets/icons/files/icon-avi.svg' },
    { name: 'css', icon: 'assets/icons/files/icon-css.svg' },
    { name: 'csv', icon: 'assets/icons/files/icon-csv.svg' },
    { name: 'doc', icon: 'assets/icons/files/icon-doc.svg' },
    { name: 'docx', icon: 'assets/icons/files/icon-doc.svg' },
    { name: 'file', icon: 'assets/icons/files/icon-file.svg' },
    { name: 'html', icon: 'assets/icons/files/icon-html.svg' },
    { name: 'js', icon: 'assets/icons/files/icon-js.svg' },
    { name: 'jpg', icon: 'assets/icons/files/icon-jpg.svg' },
    { name: 'json', icon: 'assets/icons/files/icon-json-file.svg' },
    { name: 'mp3', icon: 'assets/icons/files/icon-mp3.svg' },
    { name: 'mp4', icon: 'assets/icons/files/icon-mp4.svg' },
    { name: 'pdf', icon: 'assets/icons/files/icon-pdf.svg' },
    { name: 'png', icon: 'assets/icons/files/icon-png.svg' },
    { name: 'ppt', icon: 'assets/icons/files/icon-ppt.svg' },
    { name: 'pptx', icon: 'assets/icons/files/icon-ppt.svg' },
    { name: 'psd', icon: 'assets/icons/files/icon-psd.svg' },
    { name: 'txt', icon: 'assets/icons/files/icon-txt.svg' },
    { name: 'text', icon: 'assets/icons/files/icon-txt.svg' },
    { name: 'xls', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xlsx', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xlsm', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xml', icon: 'assets/icons/files/icon-xml.svg' },
    { name: 'zip', icon: 'assets/icons/files/icon-zip.svg' },
    { name: 'rar', icon: 'assets/icons/files/icon-zip.svg' }
];
class IconFiles {
    /** Default 'icon-file' type none */
    static iconFile(extension) {
        let icon = ListFilesModel.find((obj) => obj.name === extension);
        if (!!icon) {
            return icon.icon;
        }
        else {
            icon = ListFilesModel.find((obj) => obj.name === 'file');
            return icon.icon;
        }
    }
    /** Default 'icon-file' type none */
    getIconFile(extension) {
        let icon = ListFilesModel.find((obj) => obj.name === extension);
        if (!!icon) {
            console.log('icon', icon);
            return icon.icon;
        }
        else {
            icon = ListFilesModel.find((obj) => obj.name === 'file');
            return icon.icon;
        }
    }
}

const ExitStyle$1 = { opacity: 0, transform: 'scale(0.8)' };
const EnterStyle$1 = { opacity: 1, transform: 'scale(1)' };
const FadeInOut$1 = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
]);
const FadeInGrow$1 = trigger('fadeInGrow', [
    transition(':enter', [
        query(':enter', [
            style(ExitStyle$1),
            stagger('100ms', [animate('500ms', style(EnterStyle$1))]),
        ]),
    ]),
    transition(':leave', [
        query(':leave', [
            stagger('-100ms', [animate('500ms', style(ExitStyle$1))]),
        ]),
    ]),
]);

const CUSTOM_DATE_FORMATS$1 = {
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
const ɵ0$1 = CUSTOM_DATE_FORMATS$1;
class AddBudgetCodeMaintenanceComponent {
    constructor(_ref, _zone, _dialog, data, _dateAdapter, _authed, _budgetCodeAPI) {
        this._ref = _ref;
        this._zone = _zone;
        this._dialog = _dialog;
        this._dateAdapter = _dateAdapter;
        this._authed = _authed;
        this._budgetCodeAPI = _budgetCodeAPI;
        this.dialogType = 'Viewer';
        this.currentDate = new FormControl(new Date(), [Validators.required]);
        this.searchBudgetCode = new FormControl(null, [Validators.required]);
        this.searchAsset = new FormControl(null);
        this.selectedOptions = new FormControl(new Array(), [Validators.required]);
        this.listBudgetCode = new Array();
        this.assetsUseBudgetCode = new Array();
        // public listGeomCopy: Array<any> = new Array();
        this.listGeom = new Array();
        this.filesUpload = new Array();
        /** Subscription */
        this._subscription = {};
        this._dateAdapter.setLocale('th-TH');
        // console.log('Dialog-Data:', data);
        this.title = data === null || data === void 0 ? void 0 : data.title;
        this.assetTable = data === null || data === void 0 ? void 0 : data.assetTable;
        this.dialogType = data === null || data === void 0 ? void 0 : data.dialogType;
        this.listGeom = this.mapFormat(data === null || data === void 0 ? void 0 : data.listGeom);
        if (data === null || data === void 0 ? void 0 : data.budgetCode)
            this.getViewBudgetCode(data === null || data === void 0 ? void 0 : data.budgetCode);
        // this.listGeomCopy = this.listGeom.filter(o => o?.id);
        // const selected = this.listGeom.filter(o => [7407, 7410, 7412].includes(o?.id));
        // this.selectedOptions.setValue(selected);
    }
    ngOnInit() {
        this.filteredAssets = this.searchAsset.valueChanges.pipe(debounceTime(400), distinctUntilChanged(), map(value => {
            const keyword = value.toLowerCase();
            if (keyword === null || keyword === void 0 ? void 0 : keyword.length)
                return this.listGeom.filter(obj => obj.title.toLowerCase().indexOf(keyword) !== -1);
            return this.listGeom.slice();
        }));
    }
    ngAfterViewInit() {
        this.searchAsset.setValue('', { emitEvent: true }); //-- Trigger asset search box
        this._subscription.searchBudgetCode = this.searchBudgetCode.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(value => {
            var _a;
            if ((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode) {
                this.activeBudgetCode = null;
                this.selectedOptions.setValue([]);
                this._ref.detectChanges();
            }
        });
    }
    ngOnDestroy() {
        this._dateAdapter.setLocale('en-EN');
        for (const key in this._subscription) {
            if (Object.prototype.hasOwnProperty.call(this._subscription, key))
                this._subscription[key].unsubscribe();
        }
    }
    mapFormat(arr) {
        return arr.sort((a, b) => {
            const sA = (a === null || a === void 0 ? void 0 : a.skm) ? Number(String(a === null || a === void 0 ? void 0 : a.skm).replace('+', '.')) : Number(String(a === null || a === void 0 ? void 0 : a.km_location).replace('+', '.'));
            const sB = (b === null || b === void 0 ? void 0 : b.skm) ? Number(String(b === null || b === void 0 ? void 0 : b.skm).replace('+', '.')) : Number(String(b === null || b === void 0 ? void 0 : b.km_location).replace('+', '.'));
            return (sB < sA) ? 1 : -1;
        });
    }
    /** Handler Form */
    setFormDisabled() {
        this.currentDate.disable();
        this.searchBudgetCode.disable();
        this.selectedOptions.disable();
    }
    setFormEnabled() {
        this.currentDate.enable();
        this.searchBudgetCode.enable();
        this.selectedOptions.enable();
    }
    getViewBudgetCode(budgetCode) {
        this.preLoading = true;
        this._budgetCodeAPI.findBudgetCode(false, this.assetTable, budgetCode).then(res => {
            var _a;
            if (res === null || res === void 0 ? void 0 : res.length) {
                this.setActiveBudgetCode(res[0]);
                const reportDate = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.reportDate;
                this.searchBudgetCode.setValue(budgetCode, { emitEvent: false });
                this.currentDate.setValue(new Date(reportDate), { emitEvent: false });
            }
            this.preLoading = false;
        }, err => {
            this.preLoading = false;
        });
    }
    findingBudgetCode() {
        this.loadingSearch = true;
        this._budgetCodeAPI.findBudgetCode(true, this.assetTable, this.searchBudgetCode.value).then(res => {
            this.listBudgetCode = (res === null || res === void 0 ? void 0 : res.length) ? res : [];
            this.loadingSearch = false;
            this.errFindMessage = null;
        }, err => {
            var _a;
            this.errFindMessage = 'ไม่พบรหัสงประมาณ';
            this.listBudgetCode = new Array();
            this.loadingSearch = false;
            if ((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode) {
                this.activeBudgetCode = null;
                this.selectedOptions.setValue([]);
                this._ref.detectChanges();
            }
        });
    }
    getAssetUsedCode() {
        var _a;
        this.preLoading = true;
        this._budgetCodeAPI.getAssetUsedCode((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode).then(res => {
            this.assetsUseBudgetCode = (res === null || res === void 0 ? void 0 : res.length) ? res : [];
            if (res === null || res === void 0 ? void 0 : res.length) {
                let assetIds = this.assetsUseBudgetCode.filter(o => { var _a; return ((o === null || o === void 0 ? void 0 : o.assetTable) === this.assetTable && ((_a = o === null || o === void 0 ? void 0 : o.assets) === null || _a === void 0 ? void 0 : _a.length)); }).map(o => o.assets);
                assetIds = ((assetIds === null || assetIds === void 0 ? void 0 : assetIds.length) > 0) ? assetIds[0].map(o => o.assetId) : [];
                const selected = this.listGeom.filter(o => assetIds.includes(o === null || o === void 0 ? void 0 : o.id));
                if (selected === null || selected === void 0 ? void 0 : selected.length) {
                    this.selectedOptions.setValue(selected);
                    this._ref.detectChanges();
                }
            }
            this.preLoading = false;
        }, err => {
            this.preLoading = false;
        });
    }
    setActiveBudgetCode(budgetCode) {
        var _a, _b;
        if (((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.title) === (budgetCode === null || budgetCode === void 0 ? void 0 : budgetCode.title)) {
            this.activeBudgetCode = null;
            this.selectedOptions.setValue([]);
            this._ref.detectChanges();
            return;
        }
        this.activeBudgetCode = budgetCode;
        this.getAssetUsedCode();
        const assetIds = ((_b = budgetCode === null || budgetCode === void 0 ? void 0 : budgetCode.assetIds) === null || _b === void 0 ? void 0 : _b.length) ? budgetCode.assetIds : [];
        const selected = this.listGeom.filter(o => assetIds.includes(String(o === null || o === void 0 ? void 0 : o.id)));
        if (selected === null || selected === void 0 ? void 0 : selected.length)
            this.selectedOptions.setValue(selected);
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
    getFileIcon(extension, fileUrl) {
        const isImage = ['jpg', 'png', 'jpeg', 'gif', 'svg'].includes(String(extension).toLowerCase());
        if (isImage && fileUrl)
            return fileUrl;
        return IconFiles.iconFile(String(extension).toLowerCase());
    }
    /** Delete file item */
    delFile(position) {
        this.filesUpload.splice(position, 1);
    }
    /** Select item */
    selectionChanged(selected) {
        // console.log('selected:', selected, this.selectedOptions.value);
    }
    //---------------------------------------------------------------------------------------------------
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
        var _a, _b, _c, _d;
        if (this.isSaving)
            return;
        if (!((_a = this.selectedOptions.value) === null || _a === void 0 ? void 0 : _a.length))
            return;
        if (this.currentDate.invalid || this.searchBudgetCode.invalid)
            return;
        const tools = new AppTools();
        const assetIds = this.selectedOptions.value.filter(o => (o === null || o === void 0 ? void 0 : o.id)).map(o => String(o === null || o === void 0 ? void 0 : o.id));
        // console.log('Asset-Ids:', this.assetTable, this.searchBudgetCode.value, assetIds);
        const budgetCode = (_c = (_b = this.activeBudgetCode) === null || _b === void 0 ? void 0 : _b.budgetCode) !== null && _c !== void 0 ? _c : this.searchBudgetCode.value;
        const params = {
            assetType: this.assetTable,
            budgetCode: String(budgetCode).trim(),
            assetIds: assetIds,
            userId: (_d = this._authed.authUser) === null || _d === void 0 ? void 0 : _d.account_id,
            reportDate: tools.dateTimeFormat(this.currentDate.value)
        };
        this.isSaving = true;
        this.setFormDisabled();
        // return;
        console.log('Asset-Ids:', params);
        this._budgetCodeAPI.createWithUpdate(params).then(res => {
            this.isSaved = true;
            if (res === null || res === void 0 ? void 0 : res.budget_code)
                this.uploadAllFile(res === null || res === void 0 ? void 0 : res.budget_code);
        });
    }
    uploadAllFile(budgetCode) {
        let idxFile = 0;
        for (const item of this.filesUpload) {
            this._subscription[`upload-idx-${idxFile}`] = this._budgetCodeAPI.uploadFile(this.assetTable, budgetCode, item.file).subscribe(res => {
                if (typeof res === 'number') {
                    item.progress = res;
                }
            }, err => console.log('%cError occured while uploading file', 'color:tomato'));
            idxFile++;
        }
    }
    downloafFile(file) {
        const extract = String(file === null || file === void 0 ? void 0 : file.fileUrl).split('/');
        const fileName = extract[extract.length - 1];
        this._subscription.downloadFile = this._budgetCodeAPI.downloadFile(this.assetTable, fileName).subscribe(res => {
            if (typeof res === 'number') {
                file.progress = Math.round(100 * res / Number(file === null || file === void 0 ? void 0 : file.size)); //console.log('Percentag:', Math.round(100 * res / Number(file?.size)));
            }
            else if (res instanceof Blob) {
                this.downloadBlob(res, file === null || file === void 0 ? void 0 : file.fileName);
            }
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
}
AddBudgetCodeMaintenanceComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-add-budget-code-maintenance',
                template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 *ngIf=\"dialogType === 'Editor'\" class=\"m-0\">\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07 {{ title }}</h4>\n        <h4 *ngIf=\"dialogType === 'Viewer'\" class=\"m-0\">\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07{{ title }}: {{\n            activeBudgetCode?.budgetCode }}</h4>\n        <span fxFlex></span>\n        <mat-icon *ngIf=\"dialogType === 'Viewer'\" [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n    <mat-progress-bar *ngIf=\"preLoading\" color=\"warn\" mode=\"indeterminate\" [style.height.px]=\"2\"></mat-progress-bar>\n</div>\n\n<mat-dialog-content class=\"w-100 h-100 m-0\">\n    <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayoutGap=\"16px\" class=\"w-100 h-100\">\n        <div fxLayout=\"column\" fxFlex=\"50%\" fxFlex.sm=\"65%\" class=\"h-100\">\n            <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n                <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</mat-label>\n                <input matInput [formControl]=\"currentDate\" [matDatepicker]=\"addDate\" readonly\n                    (click)=\"(dialogType === 'Editor') ? addDate.open() : null\">\n                <mat-datepicker-toggle matSuffix [for]=\"addDate\" [disabled]=\"dialogType === 'Viewer'\">\n                </mat-datepicker-toggle>\n                <mat-datepicker #addDate color=\"warn\" panelClass=\"custom-datepicker-color\"></mat-datepicker>\n            </mat-form-field>\n\n            <div *ngIf=\"dialogType === 'Editor'\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"10px\">\n                <div fxFlex=\"none\">\n                    <strong>\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13</strong>\n                </div>\n                <div fxFlex>\n                    <div class=\"w-100\" style.display=\"block\">\n                        <input matInput [formControl]=\"searchBudgetCode\" placeholder=\"\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\"\n                            class=\"input-search-code\">\n                        <!-- <mat-error>aofxta</mat-error> -->\n                    </div>\n                </div>\n                <div *ngIf=\"dialogType === 'Editor'\" fxFlex=\"none\">\n                    <button mat-flat-button [disabled]=\"isSaving || loadingSearch\" (click)=\"findingBudgetCode()\"\n                        [style.background-color]=\"'var(--primary-orange)'\">\n                        <mat-icon *ngIf=\"loadingSearch\">\n                            <mat-spinner [diameter]=\"24\"></mat-spinner>\n                        </mat-icon>\n                        <mat-icon *ngIf=\"!loadingSearch\">search</mat-icon>\n                        <strong>&nbsp;\u0E04\u0E49\u0E19\u0E2B\u0E32</strong>\n                    </button>\n                </div>\n            </div>\n            <div *ngIf=\"dialogType === 'Editor'\" [style.padding]=\"'5px 0'\" [style.min-height.px]=\"40\"\n                [style.overflow]=\"'hidden auto'\">\n                <!-- class=\"mat-chip-list-stacked\" -->\n                <small *ngIf=\"errFindMessage\" [style.color]=\"'var(--danger)'\">{{ errFindMessage }}</small>\n                <mat-chip-list *ngIf=\"listBudgetCode?.length\" aria-label=\"Color selection\">\n                    <ng-container *ngFor=\"let item of listBudgetCode\">\n                        <mat-chip (click)=\"setActiveBudgetCode(item)\"\n                            [selected]=\"item?.title === activeBudgetCode?.title\" [disabled]=\"isSaving\" color=\"accent\">\n                            <strong>{{ item?.budgetCode }}</strong>\n                            <small *ngIf=\"item?.assetCaption\">\n                                <i>({{ item?.assetCaption }})</i>\n                            </small>\n                            <span>&nbsp;</span>\n                            <mat-icon [style.color]=\"'#404040'\">vpn_key</mat-icon>\n                        </mat-chip>\n                    </ng-container>\n                </mat-chip-list>\n            </div>\n\n            <ng-container *ngIf=\"dialogType === 'Editor'\">\n                <div [style.margin-top.px]=\"16\">\n                    <strong [style.color]=\"'#404040'\">\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13</strong>\n                    <span fxFlex></span>\n                    <strong *ngIf=\"selectedOptions.value?.length\" [style.color]=\"'#404040'\">\n                        {{ selectedOptions.value?.length }} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\n                    </strong>\n                </div>\n                <div class=\"w-100\">\n                    <mat-form-field appearance=\"none\" color=\"warn\" class=\"search-box-asset\">\n                        <input matInput [formControl]=\"searchAsset\" placeholder=\"\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19...\">\n                        <mat-icon matSuffix>search</mat-icon>\n                    </mat-form-field>\n                </div>\n                <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n                    <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n                        <mat-selection-list dense color=\"warn\" [formControl]=\"selectedOptions\"\n                            (selectionChange)=\"selectionChanged($event)\">\n                            <ng-container *ngFor=\"let item of filteredAssets | async; last as isLast\">\n                                <mat-list-option checkboxPosition=\"before\" [value]=\"item\">\n                                    <div mat-line>\n                                        <strong>{{ item?.title }}</strong>\n                                    </div>\n                                    <div *ngIf=\"item?.linkpath_detail\" mat-line>\u0E17\u0E32\u0E07\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21: {{ item?.linkpath_detail }}\n                                    </div>\n                                </mat-list-option>\n                                <mat-divider *ngIf=\"!isLast\"></mat-divider>\n                            </ng-container>\n                        </mat-selection-list>\n                    </div>\n                </div>\n            </ng-container>\n\n            <!--=== Asset in budget-code ===-->\n            <ng-container *ngIf=\"dialogType === 'Viewer' && activeBudgetCode?.budgetCode\">\n                <ng-container *ngTemplateOutlet=\"tempAssetListFoBudget\"></ng-container>\n            </ng-container>\n        </div>\n\n        <div fxLayout=\"column\" fxFlex=\"50%\" fxFlex.sm=\"35%\" class=\"h-100\" [style.padding-top.px]=\"4\">\n            <div fxLayout=\"row\" fxLayoutGap=\"16px\" class=\"w-100\">\n                <ng-container *ngIf=\"dialogType === 'Viewer'\">\n                    <strong>\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n                    <span fxFlex></span>\n                    <strong>{{ activeBudgetCode?.files?.length || 0 }} \u0E44\u0E1F\u0E25\u0E4C</strong>\n                </ng-container>\n\n                <ng-container *ngIf=\"dialogType === 'Editor'\">\n                    <button fxFlex=\"70%\" mat-flat-button (click)=\"fileMultiple.click()\" [disabled]=\"isSaving\"\n                        [style.background-color]=\"'var(--primary-orange)'\">\n                        <mat-icon>attach_file</mat-icon>\n                        <strong>\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C</strong>\n                        <input #fileMultiple type=\"file\" name=\"file[]\" multiple (change)=\"inputFiles($event)\"\n                            style=\"display: none\">\n                    </button>\n\n                    <button fxFlex=\"30%\" mat-button>\n                        <strong>{{ filesUpload?.length }} \u0E44\u0E1F\u0E25\u0E4C</strong>\n                    </button>\n                </ng-container>\n            </div>\n\n            <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n                <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n                    <mat-list dense>\n                        <div *ngIf=\"filesUpload?.length\" [@fadeInGrow]>\n                            <ng-container *ngFor=\"let file of filesUpload; let idx = index;\">\n                                <mat-list-item>\n                                    <img matListAvatar [src]=\"file?.thumb\" [style.borderRadius.px]=\"5\">\n                                    <div matLine>{{ file?.name }}</div>\n                                    <div matLine>\n                                        <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                        <small fxFlex></small>\n                                        <small *ngIf=\"file?.progress && file?.progress < 100\">{{ file?.progress }}\n                                            %</small>\n                                    </div>\n                                    <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                        <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                        </mat-progress-bar>\n                                    </div>\n                                    <mat-icon *ngIf=\"file?.progress === 100\" [style.color]=\"'var(--success)'\">\n                                        check_circle\n                                    </mat-icon>\n                                    <button *ngIf=\"!isSaving\" mat-icon-button matSuffix (click)=\"delFile(idx)\"\n                                        [style.color]=\"'gray'\">\n                                        <mat-icon>cancel</mat-icon>\n                                    </button>\n                                </mat-list-item>\n                            </ng-container>\n                        </div>\n\n                        <div *ngIf=\"activeBudgetCode?.files?.length\" [@fadeInGrow]>\n                            <ng-container *ngFor=\"let file of activeBudgetCode.files;\">\n                                <mat-list-item>\n                                    <img matListAvatar [src]=\"getFileIcon(file?.extension, file?.fileUrl)\"\n                                        [style.borderRadius.px]=\"5\">\n                                    <div matLine>&nbsp;&nbsp;{{ file?.fileName }}</div>\n                                    <div matLine>&nbsp;&nbsp;\n                                        <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                    </div>\n                                    <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                        <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                        </mat-progress-bar>\n                                    </div>\n                                    <button mat-icon-button [style.color]=\"'gray'\"\n                                        [disabled]=\"file?.progress && file?.progress !== 100\"\n                                        (click)=\"downloafFile(file)\">\n                                        <mat-icon>download</mat-icon>\n                                    </button>\n                                </mat-list-item>\n                            </ng-container>\n                        </div>\n                    </mat-list>\n                </div>\n            </div>\n\n            <!--=== Asset in budget-code ===-->\n            <ng-container *ngIf=\"dialogType === 'Editor' && activeBudgetCode?.budgetCode\">\n                <ng-container *ngTemplateOutlet=\"tempAssetListFoBudget\"></ng-container>\n            </ng-container>\n        </div>\n    </div>\n</mat-dialog-content>\n\n<mat-dialog-actions *ngIf=\"dialogType === 'Editor'\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <span fxFlex></span>\n\n        <button mat-button mat-dialog-close [disabled]=\"isSaving\">\n            <strong>\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01</strong>\n        </button>\n\n        <div matTooltip=\"\u0E42\u0E1B\u0E23\u0E14\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\" [matTooltipDisabled]=\"activeBudgetCode?.budgetCode\">\n            <button *ngIf=\"!isImageSaved()\"\n                [disabled]=\"!activeBudgetCode?.budgetCode\" mat-flat-button (click)=\"saveData()\"\n                [style.background-color]=\"'var(--primary-orange)'\">\n                <mat-icon *ngIf=\"isSaving\">\n                    <mat-spinner [diameter]=\"24\"></mat-spinner>\n                </mat-icon>\n                <strong *ngIf=\"!isSaving\">\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01</strong>\n            </button>\n        </div>\n\n        <button *ngIf=\"isSaved && isImageSaved()\" mat-flat-button [mat-dialog-close]=\"true\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <strong>\u0E1B\u0E34\u0E14\u0E1F\u0E2D\u0E23\u0E4C\u0E21</strong>\n        </button>\n    </div>\n</mat-dialog-actions>\n\n<!--============================-->\n<!--=== Asset in budget-code ===-->\n<!--============================-->\n<ng-template #tempAssetListFoBudget>\n    <div>\n        <strong [style.color]=\"'#404040'\" [style.font-size.px]=\"14\">\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13: {{\n            activeBudgetCode?.budgetCode }}</strong>\n    </div>\n    <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n        <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n            <mat-list dense color=\"warn\">\n                <ng-container *ngFor=\"let item of assetsUseBudgetCode; last as isLast\">\n                    <div mat-subheader [style.font-size.px]=\"14\">\n                        <strong>{{ item?.caption }}</strong>\n                    </div>\n                    <mat-list-item *ngFor=\"let itemAss of item?.assets\">\n                        <mat-icon mat-list-icon [style.color]=\"'#404040'\">beenhere</mat-icon>\n                        <div mat-line>\n                            <strong>{{ itemAss?.title }}</strong>\n                        </div>\n                        <div *ngIf=\"itemAss?.description\" mat-line>{{ itemAss?.description }}</div>\n                    </mat-list-item>\n                    <mat-divider *ngIf=\"!isLast\"></mat-divider>\n                </ng-container>\n            </mat-list>\n        </div>\n    </div>\n</ng-template>",
                animations: [FadeInOut$1, FadeInGrow$1],
                providers: [{ provide: MAT_DATE_FORMATS, useValue: ɵ0$1 }],
                styles: [":host{position:relative;width:100%;height:100%}::ng-deep .dialog-add-code-budget mat-dialog-container{border-radius:12px;padding:16px;overflow:hidden}:host::ng-deep mat-form-field .mat-form-field-infix{padding:.5rem 0}:host::ng-deep mat-calendar.custom-datepicker-color .mat-calendar-body-selected{background-color:var(--primary-orange)!important;color:#fff;font-weight:700}:host::ng-deep mat-form-field.search-box-asset{width:100%}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-wrapper{background-color:hsla(0,0%,82.7%,.8);border-radius:3px;padding:8px}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-wrapper .mat-form-field-flex{padding:3px 16px;border-radius:30px;background-color:#fff}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-infix{top:-.15rem;padding:0!important;border-top-width:0!important}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-infix input{line-height:24px}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-suffix{top:.15rem}.input-search-code{width:90%;border:2px solid #404040;border-radius:5px;padding:7px 10px}.input-search-code:disabled{border:1px solid rgba(64,64,64,.1)}:host::ng-deep .mat-list-base[dense] mat-list-option{min-height:40px}:host::ng-deep .mat-list-base[dense] mat-list-option mat-pseudo-checkbox.mat-pseudo-checkbox-checked{background-color:var(--primary-orange)}:host::ng-deep mat-spinner circle{stroke:#404040}"]
            },] }
];
AddBudgetCodeMaintenanceComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: DateAdapter },
    { type: UserAuthedService },
    { type: BudgetCodeService }
];

const ExitStyle = { opacity: 0, transform: 'scale(0.8)' };
const EnterStyle = { opacity: 1, transform: 'scale(1)' };
const FadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
]);
const FadeInGrow = trigger('fadeInGrow', [
    transition(':enter', [
        query(':enter', [
            style(ExitStyle),
            stagger('100ms', [animate('500ms', style(EnterStyle))]),
        ]),
    ]),
    transition(':leave', [
        query(':leave', [
            stagger('-100ms', [animate('500ms', style(ExitStyle))]),
        ]),
    ]),
]);

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
class DialogNewRecordComponent {
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

class DialogViewTaskComponent {
    constructor(dialog, data) {
        this.dialog = dialog;
        this._images = new Array();
        this._title = data === null || data === void 0 ? void 0 : data.type;
        this._description = data === null || data === void 0 ? void 0 : data.description;
        this._images = data === null || data === void 0 ? void 0 : data.images;
    }
    ngOnInit() {
    }
    close() {
        this.dialog.close();
    }
}
DialogViewTaskComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-dialog-view-task',
                template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 class=\"m-0\">{{ _title }}</h4>\n        <span fxFlex></span>\n        <mat-icon [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n</div>\n\n<mat-dialog-content>\n    <p>\n        {{ _description }}\n    </p>\n    <!-- ====== View images ====== -->\n    <ng-container *ngIf=\"_images?.length\">\n        <div>\n            <strong>\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"flex-start\" [style.paddingLeft.px]=\"10\"\n                    [style.marginTop.px]=\"10\">\n                    <ng-container *ngFor=\"let image of _images\">\n                        <div fxFlex=\"0 1 calc(33.33% - 10px)\">\n                            <img error-img [default]=\"'assets/img/dummy.png'\" [src]=\"image?.imageUrl\" [default]=\"image?.description\"\n                                style=\"width: 100%; height: 100%; object-fit: cover; margin-bottom: 10px;\">\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    </ng-container>\n</mat-dialog-content>",
                styles: [""]
            },] }
];
DialogViewTaskComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

class TimelineComponent {
    constructor(_timelineAPI, _dialog) {
        this._timelineAPI = _timelineAPI;
        this._dialog = _dialog;
        this._assetId = '16690'; //'5';
        this._assetType = 'c01_sideway_type';
        this.preLoading = false;
        this.listLog = new Array();
        this._timelinePeriod = '3';
        this._timelinePeriodType = 'D';
    }
    ngOnInit() {
        this.loadData(this._timelinePeriod, this._timelinePeriodType);
    }
    set assetInfo(info) {
        this._assetId = info === null || info === void 0 ? void 0 : info.id;
        this._assetType = info === null || info === void 0 ? void 0 : info.table;
        this._assetCaption = info === null || info === void 0 ? void 0 : info.caption;
        // console.log('Asset-Info:', info);
        if ((info === null || info === void 0 ? void 0 : info.id) && (info === null || info === void 0 ? void 0 : info.table))
            this.loadData();
    }
    set triggerNum(num) {
        if (num)
            this.loadData(this._timelinePeriod, this._timelinePeriodType);
    }
    triggerReload(ev) {
        if ((ev === null || ev === void 0 ? void 0 : ev.period) && (ev === null || ev === void 0 ? void 0 : ev.periodType)) {
            this._timelinePeriod = ev === null || ev === void 0 ? void 0 : ev.period;
            this._timelinePeriodType = ev === null || ev === void 0 ? void 0 : ev.periodType;
            this.loadData(ev === null || ev === void 0 ? void 0 : ev.period, ev === null || ev === void 0 ? void 0 : ev.periodType);
        }
    }
    loadData(period, periodType) {
        this.preLoading = true;
        this._timelineAPI.getTimeline(this._assetType, this._assetId, period, periodType).then(res => {
            // if (Array.isArray(res) && res?.length) {
            if ((res === null || res === void 0 ? void 0 : res.length) > 0) {
                this.listLog = res;
                this.listLog = this.listLog.sort((a, b) => {
                    const dA = new Date(b.month);
                    const dB = new Date(a.month);
                    return (dB > dA) ? 1 : -1;
                });
            }
            this.preLoading = false;
        }, err => {
            // console.log('%cError-Timelinse:', 'color:tomato', err);
            this.preLoading = false;
        });
    }
    /** Timeline clicked */
    timelineClicked(data) {
        if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'condition-report')
            return this.conditionReport(data === null || data === void 0 ? void 0 : data.id);
        if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'maintenance-history')
            return this.maintenanceRecord(data === null || data === void 0 ? void 0 : data.id);
        if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'task')
            return this.taskDialog(data);
        if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'budget-code')
            return this.bugetCode(data);
    }
    /** Dialog */
    maintenanceRecord(viewId) {
        this._dialog.open(DialogNewRecordComponent, {
            data: {
                modeDialog: 'maintenance',
                viewType: 'View',
                assetId: this._assetId,
                assetType: this._assetType,
                viewId: viewId
            },
            width: '450px',
            panelClass: 'timeline-dialog-new-record',
            disableClose: true
        });
    }
    conditionReport(viewId) {
        this._dialog.open(DialogNewRecordComponent, {
            data: {
                modeDialog: 'assets',
                viewType: 'View',
                assetId: this._assetId,
                assetType: this._assetType,
                viewId: viewId
            },
            width: '450px',
            panelClass: 'timeline-dialog-new-record',
            disableClose: true
        });
    }
    taskDialog(data) {
        this._dialog.open(DialogViewTaskComponent, {
            data: data,
            width: '450px',
            panelClass: 'timeline-dialog-new-record',
            disableClose: true
        });
    }
    bugetCode(data) {
        this._dialog.open(AddBudgetCodeMaintenanceComponent, {
            panelClass: 'dialog-add-code-budget',
            width: '82%',
            height: '82%',
            disableClose: true,
            data: {
                dialogType: 'Viewer',
                budgetCode: data === null || data === void 0 ? void 0 : data.budgetCode,
                title: this._assetCaption,
                assetTable: this._assetType,
                listGeom: []
            }
        });
    }
}
TimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-timeline',
                template: "<!-- <div id=\"content-timeline\" style.overflow=\"hidden\"> -->\n<main fxLayout=\"column\" fxLayoutAlign=\"10px\" [style.height.%]=\"100\">\n    <div>\n        <timeline-tools [assetId]=\"_assetId\" [assetType]=\"_assetType\" (triggerReload)=\"triggerReload($event)\">\n        </timeline-tools>\n        <mat-progress-bar *ngIf=\"preLoading\" mode=\"indeterminate\" color=\"warn\" [style.height.px]=\"2\">\n        </mat-progress-bar>\n    </div>\n\n    <div fxFlex=\"grow\" [style.width.%]=\"100\" [style.position]=\"'relative'\">\n        <!-- class=\"layout-timeline\" -->\n        <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n            <div style=\"position: relative; width: 100%; height: 100%;\" [style.width.%]=\"100\">\n                <ul class=\"timeline\">\n                    <ng-container *ngFor=\"let log of listLog; let i = index;\">\n                        <li class=\"event\" [attr.data-date]=\"log?.month | date:'MMM yyyy'\">\n                            <ng-container *ngFor=\"let block of log?.childrens\">\n                                <div matRipple class=\"event-item pb-3\" [style.border-radius.px]=\"5\"\n                                    (click)=\"timelineClicked(block)\">\n                                    <h3>{{block?.type}}</h3>\n                                    <p *ngIf=\"block?.description\">\n                                        <small>\n                                            <strong>\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14:&nbsp;</strong>\n                                        </small>\n                                        {{ block?.description }}\n                                    </p>\n                                    <div *ngIf=\"block?.attachCount\" fxLayoutAlign=\"start center\"\n                                        [style.padding]=\"'0 10px'\" [style.font-size.px]=\"14\">\n                                        <mat-icon inline=\"true\">attach_file</mat-icon>\n                                        \u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32 {{ block?.attachCount }} \u0E44\u0E1F\u0E25\u0E4C\n                                    </div>\n                                    <div [style.padding]=\"'3px 10px'\">\n                                        <ng-container *ngIf=\"block?.userName\">\n                                            <small>\n                                                <strong>\u0E1C\u0E39\u0E49\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19:&nbsp;</strong>\n                                            </small>\n                                            <small>{{ block?.userName }}</small>\n                                        </ng-container>\n                                        <span fxFlex></span>\n                                        <small>{{ block?.reportDate | date:'dd / MM / yyyy':'+0700' }}</small>\n                                    </div>\n                                </div>\n                            </ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n        </div>\n    </div>\n</main>\n<!-- </div> -->",
                styles: [":host,:host::ng-deep .layout-timeline{position:relative;width:100%;height:100%}:host::ng-deep .layout-timeline{max-height:100%;overflow-y:auto}.timeline{border-left:3px solid #ff9800;border-bottom-right-radius:4px;border-top-right-radius:4px;margin:0 auto;letter-spacing:.2px;position:relative;line-height:1.4em;font-size:1.03em;padding:10px 10px 3.2rem;list-style:none;text-align:left;width:calc(100% - 3rem);max-width:calc(100% - 3rem);float:right}@media (max-width:767px){.timeline{max-width:98%;padding:25px}}.timeline h1{font-weight:300;font-size:1.4em}.timeline h2,.timeline h3{font-weight:600;font-size:1rem;margin-bottom:10px;margin-left:10px;margin-top:10px}.timeline p{margin-left:10px;margin-bottom:0}.timeline .event-item{border:2px dashed #ff9800;border-radius:10px;background:rgba(255,152,0,.07058823529411765);cursor:pointer}.timeline .event,.timeline .event-item{position:relative;margin-bottom:25px}@media (max-width:767px){.timeline .event{padding-top:30px}}.timeline .event:last-of-type{padding-bottom:25px;margin-bottom:-10px}.timeline .event:after,.timeline .event:before{position:absolute;display:block;top:0}.timeline .event:before{left:-4.5rem;content:attr(data-date);text-align:right;font-weight:100;font-size:.9em;overflow:hidden;text-overflow:ellipsis;white-space:pre-wrap;font-weight:700;width:3rem}@media (max-width:767px){.timeline .event:before{left:0;text-align:left}}.timeline .event:after{box-shadow:0 0 0 3px #ff9800;background:#fff;border-radius:50%;left:-20px;height:15px;width:15px;content:\"\";top:5px}@media (max-width:767px){.timeline .event:after{left:-31.8px}}.rtl .timeline{border-left:0;text-align:right;border-bottom-right-radius:0;border-top-right-radius:0;border-bottom-left-radius:4px;border-top-left-radius:4px;border-right:3px solid #ff9800}.rtl .timeline .event:before{left:0;right:-170px}.rtl .timeline .event:after{left:0;right:-55.8px}"]
            },] }
];
TimelineComponent.ctorParameters = () => [
    { type: TimelineAssetsService },
    { type: MatDialog }
];
TimelineComponent.propDecorators = {
    assetInfo: [{ type: Input }],
    triggerNum: [{ type: Input }]
};

class TimelineToolsComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.triggerReload = new EventEmitter();
        /** Period for view timeline */
        this.period = new FormControl(3, [Validators.required]);
        this.typePeriod = new FormControl('D', [Validators.required]);
        this.listPeriodType = new Array();
        /** Subscription */
        this._subscription = {};
        this.listPeriodType = [
            { type: 'D', caption: 'วัน-ย้อนหลัง' },
            { type: 'W', caption: 'สัปดาห์-ย้อนหลัง' },
            { type: 'M', caption: 'เดือน-ย้อนหลัง' },
            { type: 'Y', caption: 'ปี-ย้อนหลัง' }
        ];
    }
    set assetId(data) {
        this._assetId = data;
    }
    set assetType(data) {
        this._assetType = data;
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        for (const key in this._subscription) {
            if (Object.prototype.hasOwnProperty.call(this._subscription, key)) {
                this._subscription[key].unsubscribe();
            }
        }
    }
    reloadData() {
        this.triggerReload.emit({ period: this.period.value, periodType: this.typePeriod.value });
    }
    maintenanceRecord() {
        const dialog = this.dialog.open(DialogNewRecordComponent, {
            data: {
                modeDialog: 'maintenance',
                viewType: 'Add',
                assetId: this._assetId,
                assetType: this._assetType
            },
            width: '450px',
            panelClass: 'timeline-dialog-new-record',
            disableClose: true
        });
        this._subscription.maintenance = dialog.afterClosed().subscribe(res => {
            if (res)
                this.triggerReload.emit({ period: this.period.value, periodType: this.typePeriod.value });
        });
    }
    insertAssets() {
        const dialog = this.dialog.open(DialogNewRecordComponent, {
            data: {
                modeDialog: 'assets',
                viewType: 'Add',
                assetId: this._assetId,
                assetType: this._assetType
            },
            width: '450px',
            panelClass: 'timeline-dialog-new-record',
            disableClose: true
        });
        this._subscription.conditionReport = dialog.afterClosed().subscribe(res => {
            if (res)
                this.triggerReload.emit({ period: this.period.value, periodType: this.typePeriod.value });
        });
    }
}
TimelineToolsComponent.decorators = [
    { type: Component, args: [{
                selector: 'timeline-tools',
                template: "<div fxLayout=\"row\" fxLayoutGap=\"10px\">\n    <button mat-button class=\"w-100\" (click)=\"maintenanceRecord()\">\n        <!-- <mat-icon>receipt_long</mat-icon> -->\n        <img src=\"assets/icons/maintenance-create.png\" height=\"24\">\n        <strong>&nbsp;\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07</strong>\n        <!-- <strong>\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07</strong> -->\n    </button>\n\n    <button mat-button class=\"w-100\" (click)=\"insertAssets()\">\n        <!-- <mat-icon>history_edu</mat-icon> -->\n        <img src=\"assets/icons/condition-report.png\" height=\"24\">\n        <strong>&nbsp;\u0E2A\u0E20\u0E32\u0E1E\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19</strong>\n    </button>\n</div>\n<mat-divider class=\"my-2\"></mat-divider>\n<div fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"w-100\">\n    <div fxFlex=\"25%\">\n        <mat-form-field appearance=\"outline\" class=\"w-100\">\n            <mat-label>\n                <strong>\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32</strong>\n            </mat-label>\n            <input [formControl]=\"period\" matInput type=\"number\" min=\"1\" class=\"text-center\">\n        </mat-form-field>\n    </div>\n\n    <div fxFlex=\"auto\">\n        <mat-form-field appearance=\"outline\" class=\"w-100\">\n            <mat-label>\n                <strong>\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32</strong>\n            </mat-label>\n            <mat-select [formControl]=\"typePeriod\">\n                <ng-container *ngFor=\"let item of listPeriodType\">\n                    <mat-option [value]=\"item.type\">\n                        <strong>{{ item?.caption }}</strong>\n                    </mat-option>\n                </ng-container>\n            </mat-select>\n        </mat-form-field>\n    </div>\n\n    <div fxFlex=\"15%\" [style.padding-top.px]=\"5\">\n        <button mat-icon-button (click)=\"reloadData()\" [style.background-color]=\"'var(--primary-orange)'\">\n            <!-- <strong>\u0E14\u0E39\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</strong> -->\n            <mat-icon>update</mat-icon>\n        </button>\n    </div>\n</div>",
                styles: [":host{position:relative;width:100%}:host::ng-deep mat-form-field .mat-form-field-infix{padding:.5rem 0}"]
            },] }
];
TimelineToolsComponent.ctorParameters = () => [
    { type: MatDialog }
];
TimelineToolsComponent.propDecorators = {
    triggerReload: [{ type: Output }],
    assetId: [{ type: Input }],
    assetType: [{ type: Input }]
};

class ErrorImgDirective {
    constructor() {
        this.src = null;
        this.default = null;
    }
    onError() {
        this.src = (!this.default) ? `https://highwaydistrict.com/doh_district/resources/img/img-default.jpg` : this.default;
    }
}
ErrorImgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[error-img]',
                host: {
                    '(error)': 'onError()',
                    '[src]': 'src'
                }
            },] }
];
ErrorImgDirective.ctorParameters = () => [];
ErrorImgDirective.propDecorators = {
    src: [{ type: Input }],
    default: [{ type: Input }]
};

class ErrorImgUserDirective {
    constructor() {
        this.src = null;
        this.default = null;
    }
    onError() {
        this.src = (!this.default) ? `https://highwaydistrict.com/doh_district/resources/img/user-default.png` : this.default;
    }
}
ErrorImgUserDirective.decorators = [
    { type: Directive, args: [{
                selector: '[error-img-user]',
                host: {
                    '(error)': 'onError()',
                    '[src]': 'src'
                }
            },] }
];
ErrorImgUserDirective.ctorParameters = () => [];
ErrorImgUserDirective.propDecorators = {
    src: [{ type: Input }],
    default: [{ type: Input }]
};

class DirectivesModule {
}
DirectivesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ErrorImgDirective,
                    ErrorImgUserDirective
                ],
                imports: [
                    CommonModule,
                ],
                exports: [
                    ErrorImgDirective,
                    ErrorImgUserDirective
                ]
            },] }
];

class DialogNewRecordModule {
}
DialogNewRecordModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DialogNewRecordComponent],
                imports: [
                    CommonModule,
                    MatDialogModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    MatIconModule,
                    FlexLayoutModule,
                    MatSnackBarModule,
                    MatDatepickerModule,
                    MatListModule,
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    /** Directives */
                    DirectivesModule
                ],
                exports: [DialogNewRecordComponent],
                providers: []
            },] }
];

class TimelineToolsModule {
}
TimelineToolsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineToolsComponent],
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatButtonModule,
                    MatIconModule,
                    MatDialogModule,
                    FlexLayoutModule,
                    MatDividerModule,
                    MatFormFieldModule,
                    MatSelectModule,
                    MatInputModule,
                    /** Widgets */
                    DialogNewRecordModule
                ],
                exports: [TimelineToolsComponent]
            },] }
];

class DialogViewTaskModule {
}
DialogViewTaskModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DialogViewTaskComponent],
                imports: [
                    CommonModule,
                    MatDialogModule,
                    FlexLayoutModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    /** Directives */
                    DirectivesModule
                ],
                exports: [DialogViewTaskComponent]
            },] }
];

class AddBudgetCodeMaintenanceModule {
}
AddBudgetCodeMaintenanceModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AddBudgetCodeMaintenanceComponent],
                imports: [
                    CommonModule,
                    MatDialogModule,
                    FormsModule,
                    ReactiveFormsModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatButtonModule,
                    MatIconModule,
                    FlexLayoutModule,
                    MatSnackBarModule,
                    MatDatepickerModule,
                    MatListModule,
                    MatProgressBarModule,
                    MatProgressSpinnerModule,
                    MatChipsModule,
                    MatTooltipModule,
                    /** Directives */
                    DirectivesModule
                ],
                exports: [AddBudgetCodeMaintenanceComponent]
            },] }
];

class TimelineModule {
}
TimelineModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineComponent],
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatRippleModule,
                    MatDialogModule,
                    MatIconModule,
                    MatSnackBarModule,
                    MatProgressBarModule,
                    /** Timeline Widgets */
                    TimelineToolsModule,
                    DialogNewRecordModule,
                    DialogViewTaskModule,
                    AddBudgetCodeMaintenanceModule
                ],
                exports: [TimelineComponent],
                providers: []
            },] }
];

class TimelineAssetsModule {
}
TimelineAssetsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineAssetsComponent],
                imports: [
                    // BrowserModule,
                    HttpClientModule,
                    BrowserAnimationsModule,
                    TimelineModule,
                    FormsModule,
                    ReactiveFormsModule,
                    // mat 
                    MatDatepickerModule,
                    MatNativeDateModule,
                ],
                exports: [TimelineAssetsComponent],
                providers: []
            },] }
];

/*
 * Public API Surface of timeline-assets
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AppTools, BudgetCodeService, TimelineAssetsComponent, TimelineAssetsModule, TimelineAssetsService, UserAuthedService as ɵa, TimelineModule as ɵb, TimelineComponent as ɵc, TimelineToolsModule as ɵd, TimelineToolsComponent as ɵe, DialogNewRecordModule as ɵf, DialogNewRecordComponent as ɵg, FadeInOut as ɵh, FadeInGrow as ɵi, DirectivesModule as ɵj, ErrorImgDirective as ɵk, ErrorImgUserDirective as ɵl, DialogViewTaskModule as ɵm, DialogViewTaskComponent as ɵn, AddBudgetCodeMaintenanceModule as ɵo, AddBudgetCodeMaintenanceComponent as ɵp, FadeInOut$1 as ɵq, FadeInGrow$1 as ɵr };
//# sourceMappingURL=timeline-assets.js.map
