(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common/http'), require('@angular/core'), require('rxjs/operators'), require('rxjs'), require('@angular/common'), require('@angular/material/dialog'), require('@angular/forms'), require('@angular/material/core'), require('@angular/animations'), require('@angular/material/snack-bar'), require('@angular/flex-layout'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/form-field'), require('@angular/material/input'), require('@angular/material/datepicker'), require('@angular/material/list'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/material/divider'), require('@angular/material/select'), require('@angular/material/tooltip'), require('@angular/material/chips')) :
    typeof define === 'function' && define.amd ? define('timeline-assets', ['exports', '@angular/common/http', '@angular/core', 'rxjs/operators', 'rxjs', '@angular/common', '@angular/material/dialog', '@angular/forms', '@angular/material/core', '@angular/animations', '@angular/material/snack-bar', '@angular/flex-layout', '@angular/material/button', '@angular/material/icon', '@angular/material/form-field', '@angular/material/input', '@angular/material/datepicker', '@angular/material/list', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/material/divider', '@angular/material/select', '@angular/material/tooltip', '@angular/material/chips'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["timeline-assets"] = {}, global.ng.common.http, global.ng.core, global.rxjs.operators, global.rxjs, global.ng.common, global.ng.material.dialog, global.ng.forms, global.ng.material.core, global.ng.animations, global.ng.material.snackBar, global.ng.flexLayout, global.ng.material.button, global.ng.material.icon, global.ng.material.formField, global.ng.material.input, global.ng.material.datepicker, global.ng.material.list, global.ng.material.progressBar, global.ng.material.progressSpinner, global.ng.material.divider, global.ng.material.select, global.ng.material.tooltip, global.ng.material.chips));
})(this, (function (exports, i1, i0, operators, rxjs, common, dialog, forms, core, animations, snackBar, flexLayout, button, icon, formField, input, datepicker, list, progressBar, progressSpinner, divider, select, tooltip, chips) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var BaseServer = "https://highwaydistrict.com/doh_district/api";
    var TimelineAssetsService = /** @class */ (function () {
        function TimelineAssetsService(http) {
            this.http = http;
            this.baseUrl = BaseServer;
            this.tools = new AppTools;
        }
        /**
            * Create new maintenance history
            * @param data | Object
            * @returns Promise
          */
        TimelineAssetsService.prototype.createMaintenance = function (data) {
            var url = this.baseUrl + "/timeline/create-maintenance";
            var params = this.tools.genFormData(data);
            return this.http.post(url, params).pipe(operators.map(function (res) { return res === null || res === void 0 ? void 0 : res.data; })).toPromise();
        };
        /**
          * Create new condition report
          * @param data | Object
          * @returns Promise
        */
        TimelineAssetsService.prototype.createConditionReport = function (data) {
            var url = this.baseUrl + "/timeline/create-condition";
            var params = this.tools.genFormData(data);
            return this.http.post(url, params).pipe(operators.map(function (res) { return res === null || res === void 0 ? void 0 : res.data; })).toPromise();
        };
        /** =========================================================================
         * Upload file to timline
         * @param assetType
         * @param assetId
         * @param file
         * @returns Observable
         */
        TimelineAssetsService.prototype.uploadFile = function (mainId, assetType, assetId, file, isMaintenance) {
            var formData = new FormData();
            formData.append('mainId', mainId);
            formData.append('assetType', assetType);
            formData.append('assetId', assetId);
            formData.append('file', file);
            var maintenance = (isMaintenance) ? '/maintenance' : '';
            var url = this.baseUrl + "/timeline/upload-file" + maintenance;
            var request = new i1.HttpRequest('POST', url, formData, {
                reportProgress: true,
                responseType: 'json'
            });
            return this.http.request(request).pipe(operators.map(function (event) {
                //-- Uploading...
                if (event.type === i1.HttpEventType.UploadProgress)
                    return Math.round(100 * event.loaded / event.total);
                //-- Uploaded
                // if (event.type === 3) return 100;
                //-- Uploaded response
                if (event instanceof i1.HttpResponse)
                    return event.body;
                //-- orther
                return event;
            }));
        };
        /** ======================================================================
         * Download file
         * */
        TimelineAssetsService.prototype.downloadFile = function (assetType, assetId, fileName) {
            var formData = new FormData();
            var url = this.baseUrl + "/timeline/download/" + assetType + "/" + assetId + "/" + fileName;
            var request = new i1.HttpRequest('POST', url, formData, {
                reportProgress: true,
                responseType: 'blob'
            });
            return this.http.request(request).pipe(operators.map(function (event) {
                //-- loading... HttpHeaderResponse
                if (event.type === i1.HttpEventType.DownloadProgress)
                    return event.loaded;
                //-- response
                if (event instanceof i1.HttpResponse)
                    return event.body;
                //-- orther
                return event;
            }));
        };
        /** ======================================================================
         * Load timeline data
         * =====================================================================*/
        TimelineAssetsService.prototype.getTimeline = function (assetType, assetId, period, periodType) {
            var formData = new FormData();
            formData.append('assetType', assetType);
            formData.append('assetId', assetId);
            if (period)
                formData.append('period', period);
            if (periodType)
                formData.append('periodType', periodType);
            var url = this.baseUrl + "/timeline/asset-timeline";
            return this.http.post(url, formData).pipe(operators.map(function (res) { return res === null || res === void 0 ? void 0 : res.data; })).toPromise();
        };
        TimelineAssetsService.prototype.getMaintenanceHistoryWithFile = function (mainId) {
            var url = this.baseUrl + "/timeline/maintenance-history/" + mainId;
            return this.http.get(url).pipe(operators.map(function (res) { return res === null || res === void 0 ? void 0 : res.data; })).toPromise();
        };
        TimelineAssetsService.prototype.getConditionReportWithFile = function (mainId) {
            var url = this.baseUrl + "/timeline/condition-report/" + mainId;
            return this.http.get(url).pipe(operators.map(function (res) { return res === null || res === void 0 ? void 0 : res.data; })).toPromise();
        };
        return TimelineAssetsService;
    }());
    TimelineAssetsService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function TimelineAssetsService_Factory() { return new TimelineAssetsService(i0__namespace.ɵɵinject(i1__namespace.HttpClient)); }, token: TimelineAssetsService, providedIn: "root" });
    TimelineAssetsService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    TimelineAssetsService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };
    // app tools gan form data
    var AppTools = /** @class */ (function () {
        function AppTools() {
            this.twoDigi = function (num) { return ("0" + num).slice(-2); };
        }
        // gan form data
        AppTools.prototype.genFormData = function (object, form, namespace) {
            var formData = form || new FormData();
            for (var property in object) {
                if (object.hasOwnProperty(property) && object[property] != null && object[property] !== undefined) {
                    var formKey = namespace ? namespace + "[" + property + "]" : property;
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
        };
        /** Create date time format
         * @param date : Date
         * @return string : 'yyyy-MM-dd HH:mm:ss'
        */
        AppTools.prototype.dateTimeFormat = function (date) {
            if (!date)
                return null;
            var fTime = this.twoDigi(date.getHours()) + ":" + this.twoDigi(date.getMinutes()) + ":00";
            return date.getFullYear() + "-" + this.twoDigi(date.getMonth() + 1) + "-" + this.twoDigi(date.getDate()) + " " + fTime;
        };
        return AppTools;
    }());
    // budget list api
    var BudgetCodeService = /** @class */ (function () {
        function BudgetCodeService(http) {
            this.http = http;
            this.baseUrl = BaseServer;
            this.tools = new AppTools;
        }
        BudgetCodeService.prototype.createWithUpdate = function (params) {
            var url = this.baseUrl + "/budget-code/create-update";
            var formData = this.tools.genFormData(params);
            return this.http.post(url, formData).pipe(operators.map(function (res) { return (res === null || res === void 0 ? void 0 : res.data) ? res.data : res; })).toPromise();
        };
        /** =================================================================================================
         * Upload file with progress single file only.
         * @param assetTable
         * @param budgetCode
         * @param file
         * @returns Observable
         */
        BudgetCodeService.prototype.uploadFile = function (assetTable, budgetCode, file) {
            var url = this.baseUrl + "/budget-code/upload-file";
            var formData = new FormData();
            formData.append('assetType', assetTable);
            formData.append('budgetCode', String(budgetCode).trim());
            formData.append('file', file);
            var request = new i1.HttpRequest('POST', url, formData, {
                reportProgress: true,
                responseType: 'json'
            });
            return this.http.request(request).pipe(operators.map(function (event) {
                //-- Uploading...
                if (event.type === i1.HttpEventType.UploadProgress)
                    return Math.round(100 * event.loaded / event.total);
                //-- Uploaded response
                if (event instanceof i1.HttpResponse)
                    return event.body;
                //-- orther
                return event;
            }));
        };
        /** ======================================================================
         * Download file
         * */
        BudgetCodeService.prototype.downloadFile = function (assetType, fileName) {
            var formData = new FormData();
            var url = this.baseUrl + "/budget-code/download/" + assetType + "/" + fileName;
            var request = new i1.HttpRequest('POST', url, formData, {
                reportProgress: true,
                responseType: 'blob'
            });
            return this.http.request(request).pipe(operators.map(function (event) {
                //-- loading... HttpHeaderResponse
                if (event.type === i1.HttpEventType.DownloadProgress)
                    return event.loaded;
                //-- response
                if (event instanceof i1.HttpResponse)
                    return event.body;
                //-- orther
                return event;
            }));
        };
        /** Finding budget-code */
        BudgetCodeService.prototype.findBudgetCode = function (isAll, assetTable, budgetCode) {
            var findAll = (isAll) ? '/all' : '';
            var url = this.baseUrl + "/budget-code/find-code" + findAll;
            var formData = this.tools.genFormData({ assetType: assetTable, findCode: String(budgetCode).trim() });
            return this.http.post(url, formData).pipe(operators.map(function (res) { return (res === null || res === void 0 ? void 0 : res.data) ? res.data : res; })).toPromise();
        };
        /** Get asset to used budget-code */
        BudgetCodeService.prototype.getAssetUsedCode = function (budgetCode) {
            var url = this.baseUrl + "/budget-code/asset-used";
            var formData = this.tools.genFormData({ budgetCode: budgetCode });
            return this.http.post(url, formData).pipe(operators.map(function (res) { return (res === null || res === void 0 ? void 0 : res.data) ? res.data : res; })).toPromise();
        };
        return BudgetCodeService;
    }());
    BudgetCodeService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function BudgetCodeService_Factory() { return new BudgetCodeService(i0__namespace.ɵɵinject(i1__namespace.HttpClient)); }, token: BudgetCodeService, providedIn: "root" });
    BudgetCodeService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    BudgetCodeService.ctorParameters = function () { return [
        { type: i1.HttpClient }
    ]; };

    var UserAuthedService = /** @class */ (function () {
        function UserAuthedService() {
            this.AUTH_KEY = 'AUTHED_ASSETS';
            this._observe = new rxjs.Subscriber();
        }
        Object.defineProperty(UserAuthedService.prototype, "watchUserAccount", {
            get: function () {
                var _this = this;
                return new rxjs.Observable(function (observe) {
                    _this._observe = observe;
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(UserAuthedService.prototype, "authUser", {
            get: function () {
                if (sessionStorage.getItem(this.AUTH_KEY) !== undefined) {
                    this._authUser = JSON.parse(sessionStorage.getItem(this.AUTH_KEY));
                }
                return this._authUser;
            },
            enumerable: false,
            configurable: true
        });
        UserAuthedService.prototype.setAuthUser = function (user) {
            this._authUser = user;
            sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
            try {
                this._observe.next(this._authUser);
            }
            catch (error) { }
        };
        return UserAuthedService;
    }());
    UserAuthedService.ɵprov = i0__namespace.ɵɵdefineInjectable({ factory: function UserAuthedService_Factory() { return new UserAuthedService(); }, token: UserAuthedService, providedIn: "root" });
    UserAuthedService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    UserAuthedService.ctorParameters = function () { return []; };

    var TimelineAssetsComponent = /** @class */ (function () {
        function TimelineAssetsComponent(_authSer) {
            this._authSer = _authSer;
            this._triggerNumber = null;
        }
        Object.defineProperty(TimelineAssetsComponent.prototype, "AssetInfo", {
            set: function (items) {
                this._assetInfo = items;
                // this._assetInfo = this.dataTest;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimelineAssetsComponent.prototype, "TriggerNumber", {
            set: function (num) {
                if (num)
                    this._triggerNumber = num;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimelineAssetsComponent.prototype, "userUnth", {
            set: function (user) {
                if (user)
                    this._authSer.setAuthUser(user);
            },
            enumerable: false,
            configurable: true
        });
        TimelineAssetsComponent.prototype.ngOnInit = function () {
        };
        return TimelineAssetsComponent;
    }());
    TimelineAssetsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-timeline-assets',
                    template: "<div class=\"timeline-assets\" [style.height.%]=\"100\" [style.width.%]=\"100\">\r\n    <app-timeline [assetInfo]=\"_assetInfo\" [triggerNum]=\"_triggerNumber\" [style.height.%]=\"100\" [style.width.%]=\"100\"></app-timeline>\r\n</div>",
                    styles: [""]
                },] }
    ];
    TimelineAssetsComponent.ctorParameters = function () { return [
        { type: UserAuthedService }
    ]; };
    TimelineAssetsComponent.propDecorators = {
        AssetInfo: [{ type: i0.Input }],
        TriggerNumber: [{ type: i0.Input }],
        userUnth: [{ type: i0.Input }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var ListFilesModel = [
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
    var IconFiles = /** @class */ (function () {
        function IconFiles() {
        }
        /** Default 'icon-file' type none */
        IconFiles.iconFile = function (extension) {
            var icon = ListFilesModel.find(function (obj) { return obj.name === extension; });
            if (!!icon) {
                return icon.icon;
            }
            else {
                icon = ListFilesModel.find(function (obj) { return obj.name === 'file'; });
                return icon.icon;
            }
        };
        /** Default 'icon-file' type none */
        IconFiles.prototype.getIconFile = function (extension) {
            var icon = ListFilesModel.find(function (obj) { return obj.name === extension; });
            if (!!icon) {
                console.log('icon', icon);
                return icon.icon;
            }
            else {
                icon = ListFilesModel.find(function (obj) { return obj.name === 'file'; });
                return icon.icon;
            }
        };
        return IconFiles;
    }());

    var ExitStyle$1 = { opacity: 0, transform: 'scale(0.8)' };
    var EnterStyle$1 = { opacity: 1, transform: 'scale(1)' };
    var FadeInOut$1 = animations.trigger('fadeInOut', [
        animations.transition(':enter', [
            animations.style({ opacity: 0 }),
            animations.animate('500ms', animations.style({ opacity: 1 })),
        ]),
        animations.transition(':leave', [animations.animate('500ms', animations.style({ opacity: 0 }))]),
    ]);
    var FadeInGrow$1 = animations.trigger('fadeInGrow', [
        animations.transition(':enter', [
            animations.query(':enter', [
                animations.style(ExitStyle$1),
                animations.stagger('100ms', [animations.animate('500ms', animations.style(EnterStyle$1))]),
            ]),
        ]),
        animations.transition(':leave', [
            animations.query(':leave', [
                animations.stagger('-100ms', [animations.animate('500ms', animations.style(ExitStyle$1))]),
            ]),
        ]),
    ]);

    var CUSTOM_DATE_FORMATS$1 = {
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
    var ɵ0$1 = CUSTOM_DATE_FORMATS$1;
    var AddBudgetCodeMaintenanceComponent = /** @class */ (function () {
        function AddBudgetCodeMaintenanceComponent(_ref, _zone, _dialog, data, _dateAdapter, _authed, _budgetCodeAPI) {
            this._ref = _ref;
            this._zone = _zone;
            this._dialog = _dialog;
            this._dateAdapter = _dateAdapter;
            this._authed = _authed;
            this._budgetCodeAPI = _budgetCodeAPI;
            this.dialogType = 'Viewer';
            this.currentDate = new forms.FormControl(new Date(), [forms.Validators.required]);
            this.searchBudgetCode = new forms.FormControl(null, [forms.Validators.required]);
            this.searchAsset = new forms.FormControl(null);
            this.selectedOptions = new forms.FormControl(new Array(), [forms.Validators.required]);
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
        AddBudgetCodeMaintenanceComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.filteredAssets = this.searchAsset.valueChanges.pipe(operators.debounceTime(400), operators.distinctUntilChanged(), operators.map(function (value) {
                var keyword = value.toLowerCase();
                if (keyword === null || keyword === void 0 ? void 0 : keyword.length)
                    return _this.listGeom.filter(function (obj) { return obj.title.toLowerCase().indexOf(keyword) !== -1; });
                return _this.listGeom.slice();
            }));
        };
        AddBudgetCodeMaintenanceComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.searchAsset.setValue('', { emitEvent: true }); //-- Trigger asset search box
            this._subscription.searchBudgetCode = this.searchBudgetCode.valueChanges.pipe(operators.debounceTime(400), operators.distinctUntilChanged()).subscribe(function (value) {
                var _a;
                if ((_a = _this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode) {
                    _this.activeBudgetCode = null;
                    _this.selectedOptions.setValue([]);
                    _this._ref.detectChanges();
                }
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.ngOnDestroy = function () {
            this._dateAdapter.setLocale('en-EN');
            for (var key in this._subscription) {
                if (Object.prototype.hasOwnProperty.call(this._subscription, key))
                    this._subscription[key].unsubscribe();
            }
        };
        AddBudgetCodeMaintenanceComponent.prototype.mapFormat = function (arr) {
            return arr.sort(function (a, b) {
                var sA = (a === null || a === void 0 ? void 0 : a.skm) ? Number(String(a === null || a === void 0 ? void 0 : a.skm).replace('+', '.')) : Number(String(a === null || a === void 0 ? void 0 : a.km_location).replace('+', '.'));
                var sB = (b === null || b === void 0 ? void 0 : b.skm) ? Number(String(b === null || b === void 0 ? void 0 : b.skm).replace('+', '.')) : Number(String(b === null || b === void 0 ? void 0 : b.km_location).replace('+', '.'));
                return (sB < sA) ? 1 : -1;
            });
        };
        /** Handler Form */
        AddBudgetCodeMaintenanceComponent.prototype.setFormDisabled = function () {
            this.currentDate.disable();
            this.searchBudgetCode.disable();
            this.selectedOptions.disable();
        };
        AddBudgetCodeMaintenanceComponent.prototype.setFormEnabled = function () {
            this.currentDate.enable();
            this.searchBudgetCode.enable();
            this.selectedOptions.enable();
        };
        AddBudgetCodeMaintenanceComponent.prototype.getViewBudgetCode = function (budgetCode) {
            var _this = this;
            this.preLoading = true;
            this._budgetCodeAPI.findBudgetCode(false, this.assetTable, budgetCode).then(function (res) {
                var _a;
                if (res === null || res === void 0 ? void 0 : res.length) {
                    _this.setActiveBudgetCode(res[0]);
                    var reportDate = (_a = res[0]) === null || _a === void 0 ? void 0 : _a.reportDate;
                    _this.searchBudgetCode.setValue(budgetCode, { emitEvent: false });
                    _this.currentDate.setValue(new Date(reportDate), { emitEvent: false });
                }
                _this.preLoading = false;
            }, function (err) {
                _this.preLoading = false;
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.findingBudgetCode = function () {
            var _this = this;
            this.loadingSearch = true;
            this._budgetCodeAPI.findBudgetCode(true, this.assetTable, this.searchBudgetCode.value).then(function (res) {
                _this.listBudgetCode = (res === null || res === void 0 ? void 0 : res.length) ? res : [];
                _this.loadingSearch = false;
                _this.errFindMessage = null;
            }, function (err) {
                var _a;
                _this.errFindMessage = 'ไม่พบรหัสงประมาณ';
                _this.listBudgetCode = new Array();
                _this.loadingSearch = false;
                if ((_a = _this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode) {
                    _this.activeBudgetCode = null;
                    _this.selectedOptions.setValue([]);
                    _this._ref.detectChanges();
                }
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.getAssetUsedCode = function () {
            var _this = this;
            var _a;
            this.preLoading = true;
            this._budgetCodeAPI.getAssetUsedCode((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.budgetCode).then(function (res) {
                _this.assetsUseBudgetCode = (res === null || res === void 0 ? void 0 : res.length) ? res : [];
                if (res === null || res === void 0 ? void 0 : res.length) {
                    var assetIds_1 = _this.assetsUseBudgetCode.filter(function (o) { var _a; return ((o === null || o === void 0 ? void 0 : o.assetTable) === _this.assetTable && ((_a = o === null || o === void 0 ? void 0 : o.assets) === null || _a === void 0 ? void 0 : _a.length)); }).map(function (o) { return o.assets; });
                    assetIds_1 = ((assetIds_1 === null || assetIds_1 === void 0 ? void 0 : assetIds_1.length) > 0) ? assetIds_1[0].map(function (o) { return o.assetId; }) : [];
                    var selected = _this.listGeom.filter(function (o) { return assetIds_1.includes(o === null || o === void 0 ? void 0 : o.id); });
                    if (selected === null || selected === void 0 ? void 0 : selected.length) {
                        _this.selectedOptions.setValue(selected);
                        _this._ref.detectChanges();
                    }
                }
                _this.preLoading = false;
            }, function (err) {
                _this.preLoading = false;
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.setActiveBudgetCode = function (budgetCode) {
            var _a, _b;
            if (((_a = this.activeBudgetCode) === null || _a === void 0 ? void 0 : _a.title) === (budgetCode === null || budgetCode === void 0 ? void 0 : budgetCode.title)) {
                this.activeBudgetCode = null;
                this.selectedOptions.setValue([]);
                this._ref.detectChanges();
                return;
            }
            this.activeBudgetCode = budgetCode;
            this.getAssetUsedCode();
            var assetIds = ((_b = budgetCode === null || budgetCode === void 0 ? void 0 : budgetCode.assetIds) === null || _b === void 0 ? void 0 : _b.length) ? budgetCode.assetIds : [];
            var selected = this.listGeom.filter(function (o) { return assetIds.includes(String(o === null || o === void 0 ? void 0 : o.id)); });
            if (selected === null || selected === void 0 ? void 0 : selected.length)
                this.selectedOptions.setValue(selected);
        };
        /** ===============================================================================
           * File handlering
           * @param el
           */
        AddBudgetCodeMaintenanceComponent.prototype.inputFiles = function (el) {
            var e_1, _e;
            var _this = this;
            var files = el.target.files;
            var filesArr = new Array();
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    var extension = String(file.name).substring(String(file.name).lastIndexOf('.') + 1);
                    var type = String(file.type).split('/')[0];
                    var format = {
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_e = files_1.return)) _e.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._zone.run(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_e) {
                    this.filesUpload = __spread(filesArr, this.filesUpload);
                    return [2 /*return*/];
                });
            }); });
        };
        /** Reander image file */
        AddBudgetCodeMaintenanceComponent.prototype.readImage = function (file) {
            var previewUrl = '';
            var reader = new FileReader();
            reader.onload = function (_event) {
                file.thumb = reader.result;
            };
            reader.readAsDataURL(file.file);
            return file;
        };
        /** Display size type
         * 10 KB | MB | GB
        */
        AddBudgetCodeMaintenanceComponent.prototype.readFileSize = function (size) {
            if (!size)
                return '';
            if (size <= ((Math.pow(2, 10)) * 1024))
                return (size / (Math.pow(2, 10))).toFixed(2) + " KB";
            if (size <= ((Math.pow(2, 20)) * 1024))
                return (size / (Math.pow(2, 20))).toFixed(2) + " MB";
            return (size / (Math.pow(2, 30))).toFixed(2) + " GB";
        };
        /** View extention */
        AddBudgetCodeMaintenanceComponent.prototype.getFileIcon = function (extension, fileUrl) {
            var isImage = ['jpg', 'png', 'jpeg', 'gif', 'svg'].includes(String(extension).toLowerCase());
            if (isImage && fileUrl)
                return fileUrl;
            return IconFiles.iconFile(String(extension).toLowerCase());
        };
        /** Delete file item */
        AddBudgetCodeMaintenanceComponent.prototype.delFile = function (position) {
            this.filesUpload.splice(position, 1);
        };
        /** Select item */
        AddBudgetCodeMaintenanceComponent.prototype.selectionChanged = function (selected) {
            // console.log('selected:', selected, this.selectedOptions.value);
        };
        //---------------------------------------------------------------------------------------------------
        AddBudgetCodeMaintenanceComponent.prototype.isImageSaved = function () {
            var _a, _b;
            if (this.isSaved && !((_a = this.filesUpload) === null || _a === void 0 ? void 0 : _a.length))
                return true;
            if (!((_b = this.filesUpload) === null || _b === void 0 ? void 0 : _b.length))
                return false;
            var saving = this.filesUpload.every(function (o) { return o.progress == 100; });
            return saving;
        };
        AddBudgetCodeMaintenanceComponent.prototype.saveData = function () {
            var _this = this;
            var _a, _b, _c, _d;
            if (this.isSaving)
                return;
            if (!((_a = this.selectedOptions.value) === null || _a === void 0 ? void 0 : _a.length))
                return;
            if (this.currentDate.invalid || this.searchBudgetCode.invalid)
                return;
            var tools = new AppTools();
            var assetIds = this.selectedOptions.value.filter(function (o) { return (o === null || o === void 0 ? void 0 : o.id); }).map(function (o) { return String(o === null || o === void 0 ? void 0 : o.id); });
            // console.log('Asset-Ids:', this.assetTable, this.searchBudgetCode.value, assetIds);
            var budgetCode = (_c = (_b = this.activeBudgetCode) === null || _b === void 0 ? void 0 : _b.budgetCode) !== null && _c !== void 0 ? _c : this.searchBudgetCode.value;
            var params = {
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
            this._budgetCodeAPI.createWithUpdate(params).then(function (res) {
                _this.isSaved = true;
                if (res === null || res === void 0 ? void 0 : res.budget_code)
                    _this.uploadAllFile(res === null || res === void 0 ? void 0 : res.budget_code);
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.uploadAllFile = function (budgetCode) {
            var e_2, _e;
            var idxFile = 0;
            var _loop_1 = function (item) {
                this_1._subscription["upload-idx-" + idxFile] = this_1._budgetCodeAPI.uploadFile(this_1.assetTable, budgetCode, item.file).subscribe(function (res) {
                    if (typeof res === 'number') {
                        item.progress = res;
                    }
                }, function (err) { return console.log('%cError occured while uploading file', 'color:tomato'); });
                idxFile++;
            };
            var this_1 = this;
            try {
                for (var _f = __values(this.filesUpload), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    _loop_1(item);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_e = _f.return)) _e.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        AddBudgetCodeMaintenanceComponent.prototype.downloafFile = function (file) {
            var _this = this;
            var extract = String(file === null || file === void 0 ? void 0 : file.fileUrl).split('/');
            var fileName = extract[extract.length - 1];
            this._subscription.downloadFile = this._budgetCodeAPI.downloadFile(this.assetTable, fileName).subscribe(function (res) {
                if (typeof res === 'number') {
                    file.progress = Math.round(100 * res / Number(file === null || file === void 0 ? void 0 : file.size)); //console.log('Percentag:', Math.round(100 * res / Number(file?.size)));
                }
                else if (res instanceof Blob) {
                    _this.downloadBlob(res, file === null || file === void 0 ? void 0 : file.fileName);
                }
            });
        };
        AddBudgetCodeMaintenanceComponent.prototype.downloadBlob = function (blob, filename) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename || 'download';
            document.body.appendChild(a);
            setTimeout(function () { a.click(); document.body.removeChild(a); }, 100);
        };
        return AddBudgetCodeMaintenanceComponent;
    }());
    AddBudgetCodeMaintenanceComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-add-budget-code-maintenance',
                    template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 *ngIf=\"dialogType === 'Editor'\" class=\"m-0\">\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07 {{ title }}</h4>\n        <h4 *ngIf=\"dialogType === 'Viewer'\" class=\"m-0\">\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07{{ title }}: {{\n            activeBudgetCode?.budgetCode }}</h4>\n        <span fxFlex></span>\n        <mat-icon *ngIf=\"dialogType === 'Viewer'\" [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n    <mat-progress-bar *ngIf=\"preLoading\" color=\"warn\" mode=\"indeterminate\" [style.height.px]=\"2\"></mat-progress-bar>\n</div>\n\n<mat-dialog-content class=\"w-100 h-100 m-0\">\n    <div fxLayout=\"row\" fxLayout.sm=\"column\" fxLayoutGap=\"16px\" class=\"w-100 h-100\">\n        <div fxLayout=\"column\" fxFlex=\"50%\" fxFlex.sm=\"65%\" class=\"h-100\">\n            <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n                <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</mat-label>\n                <input matInput [formControl]=\"currentDate\" [matDatepicker]=\"addDate\" readonly\n                    (click)=\"(dialogType === 'Editor') ? addDate.open() : null\">\n                <mat-datepicker-toggle matSuffix [for]=\"addDate\" [disabled]=\"dialogType === 'Viewer'\">\n                </mat-datepicker-toggle>\n                <mat-datepicker #addDate color=\"warn\" panelClass=\"custom-datepicker-color\"></mat-datepicker>\n            </mat-form-field>\n\n            <div *ngIf=\"dialogType === 'Editor'\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"10px\">\n                <div fxFlex=\"none\">\n                    <strong>\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13</strong>\n                </div>\n                <div fxFlex>\n                    <div class=\"w-100\" style.display=\"block\">\n                        <input matInput [formControl]=\"searchBudgetCode\" placeholder=\"\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\"\n                            class=\"input-search-code\">\n                        <!-- <mat-error>aofxta</mat-error> -->\n                    </div>\n                </div>\n                <div *ngIf=\"dialogType === 'Editor'\" fxFlex=\"none\">\n                    <button mat-flat-button [disabled]=\"isSaving || loadingSearch\" (click)=\"findingBudgetCode()\"\n                        [style.background-color]=\"'var(--primary-orange)'\">\n                        <mat-icon *ngIf=\"loadingSearch\">\n                            <mat-spinner [diameter]=\"24\"></mat-spinner>\n                        </mat-icon>\n                        <mat-icon *ngIf=\"!loadingSearch\">search</mat-icon>\n                        <strong>&nbsp;\u0E04\u0E49\u0E19\u0E2B\u0E32</strong>\n                    </button>\n                </div>\n            </div>\n            <div *ngIf=\"dialogType === 'Editor'\" [style.padding]=\"'5px 0'\" [style.min-height.px]=\"40\"\n                [style.overflow]=\"'hidden auto'\">\n                <!-- class=\"mat-chip-list-stacked\" -->\n                <small *ngIf=\"errFindMessage\" [style.color]=\"'var(--danger)'\">{{ errFindMessage }}</small>\n                <mat-chip-list *ngIf=\"listBudgetCode?.length\" aria-label=\"Color selection\">\n                    <ng-container *ngFor=\"let item of listBudgetCode\">\n                        <mat-chip (click)=\"setActiveBudgetCode(item)\"\n                            [selected]=\"item?.title === activeBudgetCode?.title\" [disabled]=\"isSaving\" color=\"accent\">\n                            <strong>{{ item?.budgetCode }}</strong>\n                            <small *ngIf=\"item?.assetCaption\">\n                                <i>({{ item?.assetCaption }})</i>\n                            </small>\n                            <span>&nbsp;</span>\n                            <mat-icon [style.color]=\"'#404040'\">vpn_key</mat-icon>\n                        </mat-chip>\n                    </ng-container>\n                </mat-chip-list>\n            </div>\n\n            <ng-container *ngIf=\"dialogType === 'Editor'\">\n                <div [style.margin-top.px]=\"16\">\n                    <strong [style.color]=\"'#404040'\">\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13</strong>\n                    <span fxFlex></span>\n                    <strong *ngIf=\"selectedOptions.value?.length\" [style.color]=\"'#404040'\">\n                        {{ selectedOptions.value?.length }} \u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\n                    </strong>\n                </div>\n                <div class=\"w-100\">\n                    <mat-form-field appearance=\"none\" color=\"warn\" class=\"search-box-asset\">\n                        <input matInput [formControl]=\"searchAsset\" placeholder=\"\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19...\">\n                        <mat-icon matSuffix>search</mat-icon>\n                    </mat-form-field>\n                </div>\n                <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n                    <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n                        <mat-selection-list dense color=\"warn\" [formControl]=\"selectedOptions\"\n                            (selectionChange)=\"selectionChanged($event)\">\n                            <ng-container *ngFor=\"let item of filteredAssets | async; last as isLast\">\n                                <mat-list-option checkboxPosition=\"before\" [value]=\"item\">\n                                    <div mat-line>\n                                        <strong>{{ item?.title }}</strong>\n                                    </div>\n                                    <div *ngIf=\"item?.linkpath_detail\" mat-line>\u0E17\u0E32\u0E07\u0E40\u0E0A\u0E37\u0E48\u0E2D\u0E21: {{ item?.linkpath_detail }}\n                                    </div>\n                                </mat-list-option>\n                                <mat-divider *ngIf=\"!isLast\"></mat-divider>\n                            </ng-container>\n                        </mat-selection-list>\n                    </div>\n                </div>\n            </ng-container>\n\n            <!--=== Asset in budget-code ===-->\n            <ng-container *ngIf=\"dialogType === 'Viewer' && activeBudgetCode?.budgetCode\">\n                <ng-container *ngTemplateOutlet=\"tempAssetListFoBudget\"></ng-container>\n            </ng-container>\n        </div>\n\n        <div fxLayout=\"column\" fxFlex=\"50%\" fxFlex.sm=\"35%\" class=\"h-100\" [style.padding-top.px]=\"4\">\n            <div fxLayout=\"row\" fxLayoutGap=\"16px\" class=\"w-100\">\n                <ng-container *ngIf=\"dialogType === 'Viewer'\">\n                    <strong>\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n                    <span fxFlex></span>\n                    <strong>{{ activeBudgetCode?.files?.length || 0 }} \u0E44\u0E1F\u0E25\u0E4C</strong>\n                </ng-container>\n\n                <ng-container *ngIf=\"dialogType === 'Editor'\">\n                    <button fxFlex=\"70%\" mat-flat-button (click)=\"fileMultiple.click()\" [disabled]=\"isSaving\"\n                        [style.background-color]=\"'var(--primary-orange)'\">\n                        <mat-icon>attach_file</mat-icon>\n                        <strong>\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C</strong>\n                        <input #fileMultiple type=\"file\" name=\"file[]\" multiple (change)=\"inputFiles($event)\"\n                            style=\"display: none\">\n                    </button>\n\n                    <button fxFlex=\"30%\" mat-button>\n                        <strong>{{ filesUpload?.length }} \u0E44\u0E1F\u0E25\u0E4C</strong>\n                    </button>\n                </ng-container>\n            </div>\n\n            <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n                <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n                    <mat-list dense>\n                        <div *ngIf=\"filesUpload?.length\" [@fadeInGrow]>\n                            <ng-container *ngFor=\"let file of filesUpload; let idx = index;\">\n                                <mat-list-item>\n                                    <img matListAvatar [src]=\"file?.thumb\" [style.borderRadius.px]=\"5\">\n                                    <div matLine>{{ file?.name }}</div>\n                                    <div matLine>\n                                        <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                        <small fxFlex></small>\n                                        <small *ngIf=\"file?.progress && file?.progress < 100\">{{ file?.progress }}\n                                            %</small>\n                                    </div>\n                                    <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                        <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                        </mat-progress-bar>\n                                    </div>\n                                    <mat-icon *ngIf=\"file?.progress === 100\" [style.color]=\"'var(--success)'\">\n                                        check_circle\n                                    </mat-icon>\n                                    <button *ngIf=\"!isSaving\" mat-icon-button matSuffix (click)=\"delFile(idx)\"\n                                        [style.color]=\"'gray'\">\n                                        <mat-icon>cancel</mat-icon>\n                                    </button>\n                                </mat-list-item>\n                            </ng-container>\n                        </div>\n\n                        <div *ngIf=\"activeBudgetCode?.files?.length\" [@fadeInGrow]>\n                            <ng-container *ngFor=\"let file of activeBudgetCode.files;\">\n                                <mat-list-item>\n                                    <img matListAvatar [src]=\"getFileIcon(file?.extension, file?.fileUrl)\"\n                                        [style.borderRadius.px]=\"5\">\n                                    <div matLine>&nbsp;&nbsp;{{ file?.fileName }}</div>\n                                    <div matLine>&nbsp;&nbsp;\n                                        <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                    </div>\n                                    <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                        <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                        </mat-progress-bar>\n                                    </div>\n                                    <button mat-icon-button [style.color]=\"'gray'\"\n                                        [disabled]=\"file?.progress && file?.progress !== 100\"\n                                        (click)=\"downloafFile(file)\">\n                                        <mat-icon>download</mat-icon>\n                                    </button>\n                                </mat-list-item>\n                            </ng-container>\n                        </div>\n                    </mat-list>\n                </div>\n            </div>\n\n            <!--=== Asset in budget-code ===-->\n            <ng-container *ngIf=\"dialogType === 'Editor' && activeBudgetCode?.budgetCode\">\n                <ng-container *ngTemplateOutlet=\"tempAssetListFoBudget\"></ng-container>\n            </ng-container>\n        </div>\n    </div>\n</mat-dialog-content>\n\n<mat-dialog-actions *ngIf=\"dialogType === 'Editor'\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <span fxFlex></span>\n\n        <button mat-button mat-dialog-close [disabled]=\"isSaving\">\n            <strong>\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01</strong>\n        </button>\n\n        <div matTooltip=\"\u0E42\u0E1B\u0E23\u0E14\u0E23\u0E30\u0E1A\u0E38\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13\" [matTooltipDisabled]=\"activeBudgetCode?.budgetCode\">\n            <button *ngIf=\"!isImageSaved()\"\n                [disabled]=\"!activeBudgetCode?.budgetCode\" mat-flat-button (click)=\"saveData()\"\n                [style.background-color]=\"'var(--primary-orange)'\">\n                <mat-icon *ngIf=\"isSaving\">\n                    <mat-spinner [diameter]=\"24\"></mat-spinner>\n                </mat-icon>\n                <strong *ngIf=\"!isSaving\">\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01</strong>\n            </button>\n        </div>\n\n        <button *ngIf=\"isSaved && isImageSaved()\" mat-flat-button [mat-dialog-close]=\"true\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <strong>\u0E1B\u0E34\u0E14\u0E1F\u0E2D\u0E23\u0E4C\u0E21</strong>\n        </button>\n    </div>\n</mat-dialog-actions>\n\n<!--============================-->\n<!--=== Asset in budget-code ===-->\n<!--============================-->\n<ng-template #tempAssetListFoBudget>\n    <div>\n        <strong [style.color]=\"'#404040'\" [style.font-size.px]=\"14\">\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19\u0E17\u0E35\u0E48\u0E43\u0E0A\u0E49\u0E23\u0E2B\u0E31\u0E2A\u0E07\u0E1A\u0E1B\u0E23\u0E30\u0E21\u0E32\u0E13: {{\n            activeBudgetCode?.budgetCode }}</strong>\n    </div>\n    <div fxFlex=\"grow\" [style.position]=\"'relative'\">\n        <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n            <mat-list dense color=\"warn\">\n                <ng-container *ngFor=\"let item of assetsUseBudgetCode; last as isLast\">\n                    <div mat-subheader [style.font-size.px]=\"14\">\n                        <strong>{{ item?.caption }}</strong>\n                    </div>\n                    <mat-list-item *ngFor=\"let itemAss of item?.assets\">\n                        <mat-icon mat-list-icon [style.color]=\"'#404040'\">beenhere</mat-icon>\n                        <div mat-line>\n                            <strong>{{ itemAss?.title }}</strong>\n                        </div>\n                        <div *ngIf=\"itemAss?.description\" mat-line>{{ itemAss?.description }}</div>\n                    </mat-list-item>\n                    <mat-divider *ngIf=\"!isLast\"></mat-divider>\n                </ng-container>\n            </mat-list>\n        </div>\n    </div>\n</ng-template>",
                    animations: [FadeInOut$1, FadeInGrow$1],
                    providers: [{ provide: core.MAT_DATE_FORMATS, useValue: ɵ0$1 }],
                    styles: [":host{position:relative;width:100%;height:100%}::ng-deep .dialog-add-code-budget mat-dialog-container{border-radius:12px;padding:16px;overflow:hidden}:host::ng-deep mat-form-field .mat-form-field-infix{padding:.5rem 0}:host::ng-deep mat-calendar.custom-datepicker-color .mat-calendar-body-selected{background-color:var(--primary-orange)!important;color:#fff;font-weight:700}:host::ng-deep mat-form-field.search-box-asset{width:100%}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-wrapper{background-color:hsla(0,0%,82.7%,.8);border-radius:3px;padding:8px}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-wrapper .mat-form-field-flex{padding:3px 16px;border-radius:30px;background-color:#fff}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-infix{top:-.15rem;padding:0!important;border-top-width:0!important}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-infix input{line-height:24px}:host::ng-deep mat-form-field.search-box-asset .mat-form-field-suffix{top:.15rem}.input-search-code{width:90%;border:2px solid #404040;border-radius:5px;padding:7px 10px}.input-search-code:disabled{border:1px solid rgba(64,64,64,.1)}:host::ng-deep .mat-list-base[dense] mat-list-option{min-height:40px}:host::ng-deep .mat-list-base[dense] mat-list-option mat-pseudo-checkbox.mat-pseudo-checkbox-checked{background-color:var(--primary-orange)}:host::ng-deep mat-spinner circle{stroke:#404040}"]
                },] }
    ];
    AddBudgetCodeMaintenanceComponent.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.NgZone },
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] },
        { type: core.DateAdapter },
        { type: UserAuthedService },
        { type: BudgetCodeService }
    ]; };

    var ExitStyle = { opacity: 0, transform: 'scale(0.8)' };
    var EnterStyle = { opacity: 1, transform: 'scale(1)' };
    var FadeInOut = animations.trigger('fadeInOut', [
        animations.transition(':enter', [
            animations.style({ opacity: 0 }),
            animations.animate('500ms', animations.style({ opacity: 1 })),
        ]),
        animations.transition(':leave', [animations.animate('500ms', animations.style({ opacity: 0 }))]),
    ]);
    var FadeInGrow = animations.trigger('fadeInGrow', [
        animations.transition(':enter', [
            animations.query(':enter', [
                animations.style(ExitStyle),
                animations.stagger('100ms', [animations.animate('500ms', animations.style(EnterStyle))]),
            ]),
        ]),
        animations.transition(':leave', [
            animations.query(':leave', [
                animations.stagger('-100ms', [animations.animate('500ms', animations.style(ExitStyle))]),
            ]),
        ]),
    ]);

    var CUSTOM_DATE_FORMATS = {
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
    var ɵ0 = CUSTOM_DATE_FORMATS;
    var DialogNewRecordComponent = /** @class */ (function () {
        function DialogNewRecordComponent(_dialog, data, _dateAdapter, _snackBar, _zone, _timelineAPI, _authed) {
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
            this.currentDate = new forms.FormControl(new Date(), [forms.Validators.required]);
            this.detail = new forms.FormControl(null, [forms.Validators.required]);
            this.cost = new forms.FormControl(null, [forms.Validators.required]);
            this.guaranteeDate = new forms.FormControl(null);
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
        DialogNewRecordComponent.prototype.ngOnInit = function () {
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
        };
        DialogNewRecordComponent.prototype.ngAfterViewInit = function () {
        };
        DialogNewRecordComponent.prototype.ngOnDestroy = function () {
            this._dateAdapter.setLocale('en-EN');
            for (var key in this._subscription) {
                if (Object.prototype.hasOwnProperty.call(this._subscription, key)) {
                    this._subscription[key].unsubscribe();
                }
            }
        };
        DialogNewRecordComponent.prototype.loadFormData = function () {
            var _this = this;
            if (this.modeDialog === 'maintenance') {
                this.preLoading = true;
                this._timelineAPI.getMaintenanceHistoryWithFile(this._viewId).then(function (res) {
                    if (!(res === null || res === void 0 ? void 0 : res.reportDate))
                        return;
                    if (res === null || res === void 0 ? void 0 : res.reportDate)
                        _this.currentDate.setValue(new Date(res === null || res === void 0 ? void 0 : res.reportDate), { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.description)
                        _this.detail.setValue(res === null || res === void 0 ? void 0 : res.description, { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.repairCost)
                        _this.cost.setValue(res === null || res === void 0 ? void 0 : res.repairCost, { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.guaranteeDate)
                        _this.guaranteeDate.setValue(res === null || res === void 0 ? void 0 : res.guaranteeDate, { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.files)
                        _this.filesView = res === null || res === void 0 ? void 0 : res.files;
                    if (res === null || res === void 0 ? void 0 : res.images)
                        _this.imagesView = res === null || res === void 0 ? void 0 : res.images;
                    _this.preLoading = false;
                });
            }
            if (this.modeDialog === 'assets') {
                this.preLoading = true;
                this._timelineAPI.getConditionReportWithFile(this._viewId).then(function (res) {
                    if (!(res === null || res === void 0 ? void 0 : res.reportDate))
                        return;
                    if (res === null || res === void 0 ? void 0 : res.reportDate)
                        _this.currentDate.setValue(new Date(res === null || res === void 0 ? void 0 : res.reportDate), { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.description)
                        _this.detail.setValue(res === null || res === void 0 ? void 0 : res.description, { emitEvent: false });
                    if (res === null || res === void 0 ? void 0 : res.files)
                        _this.filesView = res === null || res === void 0 ? void 0 : res.files;
                    if (res === null || res === void 0 ? void 0 : res.images)
                        _this.imagesView = res === null || res === void 0 ? void 0 : res.images;
                    _this.preLoading = false;
                });
            }
        };
        /** Replace number */
        DialogNewRecordComponent.prototype.numberOnly = function (ev) {
            return new RegExp(/^[0-9]*\.?[0-9]*$/).test(ev.key);
        };
        DialogNewRecordComponent.prototype.costNumber = function () {
            return Number(String(this.cost.value).replace(/\,/g, ''));
        };
        /** Handler */
        DialogNewRecordComponent.prototype.setFormDisabled = function () {
            this.currentDate.disable();
            this.detail.disable();
            this.detail.disable();
            this.guaranteeDate.disable();
        };
        DialogNewRecordComponent.prototype.setFormEnabled = function () {
            this.currentDate.enable();
            this.detail.enable();
            this.detail.enable();
            this.guaranteeDate.enable();
        };
        /** ===============================================================================
           * File handlering
           * @param el
           */
        DialogNewRecordComponent.prototype.inputFiles = function (el) {
            var e_1, _c;
            var _this = this;
            var files = el.target.files;
            var filesArr = new Array();
            try {
                for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                    var file = files_1_1.value;
                    var extension = String(file.name).substring(String(file.name).lastIndexOf('.') + 1);
                    var type = String(file.type).split('/')[0];
                    var format = {
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
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (files_1_1 && !files_1_1.done && (_c = files_1.return)) _c.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._zone.run(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_c) {
                    this.filesUpload = __spread(filesArr, this.filesUpload);
                    return [2 /*return*/];
                });
            }); });
        };
        /** Reander image file */
        DialogNewRecordComponent.prototype.readImage = function (file) {
            var previewUrl = '';
            var reader = new FileReader();
            reader.onload = function (_event) {
                file.thumb = reader.result;
            };
            reader.readAsDataURL(file.file);
            return file;
        };
        /** Display size type
         * 10 KB | MB | GB
        */
        DialogNewRecordComponent.prototype.readFileSize = function (size) {
            if (!size)
                return '';
            if (size <= ((Math.pow(2, 10)) * 1024))
                return (size / (Math.pow(2, 10))).toFixed(2) + " KB";
            if (size <= ((Math.pow(2, 20)) * 1024))
                return (size / (Math.pow(2, 20))).toFixed(2) + " MB";
            return (size / (Math.pow(2, 30))).toFixed(2) + " GB";
        };
        /** View extention */
        DialogNewRecordComponent.prototype.getFileIcon = function (extension) {
            return IconFiles.iconFile(String(extension).toLowerCase());
        };
        /** Delete file item */
        DialogNewRecordComponent.prototype.delFile = function (position) {
            this.filesUpload.splice(position, 1);
        };
        /** ==========================================================
         * Download file
         */
        DialogNewRecordComponent.prototype.downloafFile = function (file) {
            var _this = this;
            var extract = String(file === null || file === void 0 ? void 0 : file.fileUrl).split('/');
            var fileName = extract[extract.length - 1];
            this._subscription.downloadFile = this._timelineAPI.downloadFile(this._assetType, this._assetId, fileName).subscribe(function (res) {
                if (typeof res === 'number') {
                    file.progress = Math.round(100 * res / Number(file === null || file === void 0 ? void 0 : file.size)); //console.log('Percentag:', Math.round(100 * res / Number(file?.size)));
                }
                else if (res instanceof Blob) {
                    _this.downloadBlob(res, file === null || file === void 0 ? void 0 : file.fileName);
                }
                // else {
                //     console.log('%cResponse:', 'color:orange', res);
                // }
            });
        };
        DialogNewRecordComponent.prototype.downloadBlob = function (blob, filename) {
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename || 'download';
            document.body.appendChild(a);
            setTimeout(function () { a.click(); document.body.removeChild(a); }, 100);
        };
        /** ==========================================================
         * Save data
         */
        DialogNewRecordComponent.prototype.isImageSaved = function () {
            var _a, _b;
            if (this.isSaved && !((_a = this.filesUpload) === null || _a === void 0 ? void 0 : _a.length))
                return true;
            if (!((_b = this.filesUpload) === null || _b === void 0 ? void 0 : _b.length))
                return false;
            var saving = this.filesUpload.every(function (o) { return o.progress == 100; });
            return saving;
        };
        DialogNewRecordComponent.prototype.saveData = function () {
            var _this = this;
            var _a, _b;
            if (this.isSaving)
                return;
            var tools = new AppTools();
            if (this.modeDialog === 'maintenance') {
                if (this.cost.invalid || this.detail.invalid)
                    return;
                this.isSaving = true;
                this.setFormDisabled();
                var data = {
                    assetId: this._assetId,
                    assetType: this._assetType,
                    userId: (_a = this._authed.authUser) === null || _a === void 0 ? void 0 : _a.account_id,
                    description: this.detail.value,
                    repairCost: Number(String(this.cost.value).replace(/\,/g, '')),
                    guaranteeDate: tools.dateTimeFormat(this.guaranteeDate.value),
                    reportDate: tools.dateTimeFormat(this.currentDate.value),
                };
                // console.log('%cParams', 'color:tomato', data);
                this._timelineAPI.createMaintenance(data).then(function (res) {
                    if (res === null || res === void 0 ? void 0 : res.id)
                        _this.uploadAllFile(res === null || res === void 0 ? void 0 : res.id, true);
                    _this.isSaved = true;
                });
            }
            if (this.modeDialog === 'assets') {
                if (this.detail.invalid)
                    return;
                this.isSaving = true;
                this.setFormDisabled();
                var data = {
                    assetId: this._assetId,
                    assetType: this._assetType,
                    userId: (_b = this._authed.authUser) === null || _b === void 0 ? void 0 : _b.account_id,
                    description: this.detail.value,
                    reportDate: tools.dateTimeFormat(this.currentDate.value),
                };
                // console.log('%cParams', 'color:tomato', data);
                this._timelineAPI.createConditionReport(data).then(function (res) {
                    if (res === null || res === void 0 ? void 0 : res.id)
                        _this.uploadAllFile(res === null || res === void 0 ? void 0 : res.id, false);
                    _this.isSaved = true;
                });
            }
        };
        DialogNewRecordComponent.prototype.uploadAllFile = function (mainId, isMaintenance) {
            var e_2, _c;
            var idxFile = 0;
            var _loop_1 = function (item) {
                this_1._subscription["upload-idx-" + idxFile] = this_1._timelineAPI.uploadFile(mainId, this_1._assetType, this_1._assetId, item.file, isMaintenance).subscribe(function (res) {
                    if (typeof res === 'number') {
                        item.progress = res;
                    }
                }, function (err) { return console.log('%cError occured while uploading file', 'color:tomato'); });
                idxFile++;
            };
            var this_1 = this;
            try {
                for (var _d = __values(this.filesUpload), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    _loop_1(item);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return DialogNewRecordComponent;
    }());
    DialogNewRecordComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'timeline-dialog-new-record',
                    template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 class=\"m-0\">{{ capText?.title }}</h4>\n        <span fxFlex></span>\n        <mat-icon *ngIf=\"(viewType === 'View')\" [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n    <mat-progress-bar *ngIf=\"preLoading\" color=\"warn\" mode=\"indeterminate\" [style.height.px]=\"2\"></mat-progress-bar>\n</div>\n\n<mat-dialog-content>\n    <div fxLayout=\"column\" [style.width.%]=\"100\">\n        <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n            <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</mat-label>\n            <input matInput [formControl]=\"currentDate\" [matDatepicker]=\"addDate\" [readonly]=\"(viewType === 'View')\"\n                (click)=\"(viewType === 'Add')? addDate.open() : null\">\n            <mat-datepicker-toggle matSuffix [disabled]=\"(viewType === 'View')\" [for]=\"addDate\"></mat-datepicker-toggle>\n            <mat-datepicker #addDate color=\"accent\" panelClass=\"custom-datepicker-color\"></mat-datepicker>\n        </mat-form-field>\n\n        <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n            <mat-label>{{ capText.detail }}</mat-label>\n            <textarea matInput [formControl]=\"detail\" [mat-autosize]=\"true\" placeholder=\"\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14...\"\n                [readonly]=\"(viewType === 'View')\"></textarea>\n        </mat-form-field>\n\n        <ng-container *ngIf=\"modeDialog === 'maintenance'\">\n            <div fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"w-100\">\n                <div fxFlex=\"50%\">\n                    <!-- <mat-label>\n                        <small>\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21</small>\n                    </mat-label> -->\n                    <mat-form-field appearance=\"outline\" color=\"warn\" floatLabel=\"always\" class=\"w-100\">\n                        <mat-label>\u0E04\u0E48\u0E32\u0E43\u0E0A\u0E49\u0E08\u0E48\u0E32\u0E22\u0E43\u0E19\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21</mat-label>\n                        <input matInput [align]=\"'right'\" [formControl]=\"cost\" [value]=\"costNumber() | number\"\n                            (keypress)=\"numberOnly($event)\" placeholder=\"100,000.00\" class=\"text-right\"\n                            [readonly]=\"(viewType === 'View')\">\n                        <span matPrefix>\u0E3F&nbsp;</span>\n                    </mat-form-field>\n                </div>\n\n                <div fxFlex=\"50%\">\n                    <!-- <mat-label>\n                        <small>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E04\u0E49\u0E33\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19</small>\n                    </mat-label> -->\n                    <mat-form-field appearance=\"outline\" color=\"warn\" class=\"w-100\">\n                        <mat-label>\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E34\u0E49\u0E19\u0E2A\u0E38\u0E14\u0E04\u0E49\u0E33\u0E1B\u0E23\u0E30\u0E01\u0E31\u0E19</mat-label>\n                        <input matInput [formControl]=\"guaranteeDate\" [matDatepicker]=\"dateGuarantee\"\n                            [readonly]=\"(viewType === 'View')\"\n                            (click)=\"(viewType === 'Add')? dateGuarantee.open() : null\">\n                        <mat-datepicker-toggle matSuffix [disabled]=\"(viewType === 'View')\" [for]=\"dateGuarantee\">\n                        </mat-datepicker-toggle>\n                        <mat-datepicker #dateGuarantee color=\"accent\" panelClass=\"custom-datepicker-color\">\n                        </mat-datepicker>\n                    </mat-form-field>\n                </div>\n            </div>\n        </ng-container>\n    </div>\n\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n        <div [style.width.%]=\"100\">\n            <mat-list>\n                <div *ngIf=\"filesUpload.length\" [@fadeInGrow]>\n                    <ng-container *ngFor=\"let file of filesUpload; let idx = index;\">\n                        <mat-list-item>\n                            <img matListAvatar [src]=\"file?.thumb\" [style.borderRadius.px]=\"5\">\n                            <div matLine>&nbsp;&nbsp;{{ file?.name }}</div>\n                            <div matLine>&nbsp;&nbsp;\n                                <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                            </div>\n                            <div *ngIf=\"isSaving && file?.progress !== 100\" mat-line>\n                                <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                </mat-progress-bar>\n                            </div>\n                            <mat-icon *ngIf=\"isSaving && file?.progress === 100\" [style.color]=\"'var(--success)'\">\n                                check_circle</mat-icon>\n                            <button *ngIf=\"!isSaving\" mat-icon-button matSuffix (click)=\"delFile(idx)\"\n                                [style.color]=\"'gray'\">\n                                <mat-icon>cancel</mat-icon>\n                            </button>\n                        </mat-list-item>\n                    </ng-container>\n                </div>\n            </mat-list>\n        </div>\n    </div>\n\n    <!-- ====== View images ====== -->\n    <ng-container *ngIf=\"imagesView?.length\">\n        <div>\n            <strong>\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"flex-start\" [style.paddingLeft.px]=\"10\"\n                    [style.marginTop.px]=\"10\">\n                    <ng-container *ngFor=\"let file of imagesView; let idx = index;\">\n                        <div fxFlex=\"0 1 calc(33.33% - 10px)\">\n                            <img error-img [default]=\"'assets/img/dummy.png'\" [src]=\"file?.fileUrl\"\n                                style=\"width: 100%; height: 100%; object-fit: cover; margin-bottom: 10px;\">\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    </ng-container>\n\n    <!-- ====== View files ====== -->\n    <ng-container *ngIf=\"filesView?.length\">\n        <div>\n            <strong>\u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <mat-list>\n                    <div *ngIf=\"filesView.length\" [@fadeInGrow]>\n                        <ng-container *ngFor=\"let file of filesView;\">\n                            <mat-list-item>\n                                <img matListAvatar [src]=\"getFileIcon(file?.extension)\" [style.borderRadius.px]=\"5\">\n                                <div matLine>&nbsp;&nbsp;{{ file?.fileName }}</div>\n                                <div matLine>&nbsp;&nbsp;\n                                    <small>Size:&nbsp;{{ readFileSize(file?.size) }}</small>\n                                </div>\n                                <div *ngIf=\"file?.progress > 0 && file?.progress < 100\" mat-line>\n                                    <mat-progress-bar mode=\"determinate\" [value]=\"file?.progress\" color=\"warn\">\n                                    </mat-progress-bar>\n                                </div>\n                                <button mat-icon-button [style.color]=\"'gray'\"\n                                    [disabled]=\"file?.progress && file?.progress !== 100\" (click)=\"downloafFile(file)\">\n                                    <mat-icon>download</mat-icon>\n                                </button>\n                            </mat-list-item>\n                        </ng-container>\n                    </div>\n                </mat-list>\n            </div>\n        </div>\n    </ng-container>\n</mat-dialog-content>\n\n<mat-dialog-actions *ngIf=\"(viewType === 'Add')\">\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <button mat-button (click)=\"fileMultiple.click()\" [disabled]=\"isSaving\">\n            <mat-icon>attach_file</mat-icon>\n            <strong>\u0E41\u0E19\u0E1A\u0E44\u0E1F\u0E25\u0E4C</strong>\n            <input #fileMultiple type=\"file\" name=\"file[]\" multiple (change)=\"inputFiles($event)\" style=\"display: none\">\n        </button>\n\n        <span fxFlex></span>\n\n        <button mat-button mat-dialog-close [disabled]=\"isSaving\">\n            <strong>\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01</strong>\n        </button>\n\n        <button *ngIf=\"!isImageSaved()\" mat-flat-button (click)=\"saveData()\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <mat-icon *ngIf=\"isSaving\">\n                <mat-spinner [diameter]=\"24\"></mat-spinner>\n            </mat-icon>\n            <strong *ngIf=\"!isSaving\">\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01</strong>\n        </button>\n\n        <button *ngIf=\"isSaved && isImageSaved()\" mat-flat-button [mat-dialog-close]=\"true\"\n            [style.background-color]=\"'var(--primary-orange)'\">\n            <strong>\u0E1B\u0E34\u0E14\u0E1F\u0E2D\u0E23\u0E4C\u0E21</strong>\n        </button>\n    </div>\n</mat-dialog-actions>",
                    animations: [FadeInOut, FadeInGrow],
                    providers: [
                        { provide: core.MAT_DATE_FORMATS, useValue: ɵ0 }
                    ],
                    styles: ["::ng-deep .timeline-dialog-new-record mat-dialog-container{border-radius:12px;padding:16px;overflow:hidden}::ng-deep mat-calendar.custom-datepicker-color .mat-calendar-body-selected{background-color:var(--primary-orange)!important;color:#fff;font-weight:700}"]
                },] }
    ];
    DialogNewRecordComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] },
        { type: core.DateAdapter },
        { type: snackBar.MatSnackBar },
        { type: i0.NgZone },
        { type: TimelineAssetsService },
        { type: UserAuthedService }
    ]; };

    var DialogViewTaskComponent = /** @class */ (function () {
        function DialogViewTaskComponent(dialog, data) {
            this.dialog = dialog;
            this._images = new Array();
            this._title = data === null || data === void 0 ? void 0 : data.type;
            this._description = data === null || data === void 0 ? void 0 : data.description;
            this._images = data === null || data === void 0 ? void 0 : data.images;
        }
        DialogViewTaskComponent.prototype.ngOnInit = function () {
        };
        DialogViewTaskComponent.prototype.close = function () {
            this.dialog.close();
        };
        return DialogViewTaskComponent;
    }());
    DialogViewTaskComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-dialog-view-task',
                    template: "<div mat-dialog-title>\n    <div fxLayout=\"row\" fxLayoutAlign=\"start center\" fxLayoutGap=\"16px\" [style.width.%]=\"100\">\n        <h4 class=\"m-0\">{{ _title }}</h4>\n        <span fxFlex></span>\n        <mat-icon [style.color]=\"'gray'\" mat-dialog-close>close</mat-icon>\n    </div>\n</div>\n\n<mat-dialog-content>\n    <p>\n        {{ _description }}\n    </p>\n    <!-- ====== View images ====== -->\n    <ng-container *ngIf=\"_images?.length\">\n        <div>\n            <strong>\u0E23\u0E39\u0E1B\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32</strong>\n        </div>\n        <div fxLayout=\"row\" fxLayoutAlign=\"start center\" style=\"position: relative; margin-bottom: 16px;\">\n            <div [style.width.%]=\"100\">\n                <div fxLayout=\"row wrap\" fxLayoutGap=\"10px\" fxLayoutAlign=\"flex-start\" [style.paddingLeft.px]=\"10\"\n                    [style.marginTop.px]=\"10\">\n                    <ng-container *ngFor=\"let image of _images\">\n                        <div fxFlex=\"0 1 calc(33.33% - 10px)\">\n                            <img error-img [default]=\"'assets/img/dummy.png'\" [src]=\"image?.imageUrl\" [default]=\"image?.description\"\n                                style=\"width: 100%; height: 100%; object-fit: cover; margin-bottom: 10px;\">\n                        </div>\n                    </ng-container>\n                </div>\n            </div>\n        </div>\n    </ng-container>\n</mat-dialog-content>",
                    styles: [""]
                },] }
    ];
    DialogViewTaskComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
    ]; };

    var TimelineComponent = /** @class */ (function () {
        function TimelineComponent(_timelineAPI, _dialog) {
            this._timelineAPI = _timelineAPI;
            this._dialog = _dialog;
            this._assetId = '16690'; //'5';
            this._assetType = 'c01_sideway_type';
            this.preLoading = false;
            this.listLog = new Array();
            this._timelinePeriod = '3';
            this._timelinePeriodType = 'D';
        }
        TimelineComponent.prototype.ngOnInit = function () {
            this.loadData(this._timelinePeriod, this._timelinePeriodType);
        };
        Object.defineProperty(TimelineComponent.prototype, "assetInfo", {
            set: function (info) {
                // this._assetId = info?.id;
                // this._assetType = info?.table;
                // private dataTest: any = {table: 'c02_footpath_type', id: '3198'}
                this._assetId = (info === null || info === void 0 ? void 0 : info.id) ? info === null || info === void 0 ? void 0 : info.id : 3198;
                this._assetType = (info === null || info === void 0 ? void 0 : info.table) ? info === null || info === void 0 ? void 0 : info.table : 'c02_footpath_type';
                this._assetCaption = info === null || info === void 0 ? void 0 : info.caption;
                // console.log('Asset-Info:', info);
                if ((info === null || info === void 0 ? void 0 : info.id) && (info === null || info === void 0 ? void 0 : info.table))
                    this.loadData();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimelineComponent.prototype, "triggerNum", {
            set: function (num) {
                if (num)
                    this.loadData(this._timelinePeriod, this._timelinePeriodType);
            },
            enumerable: false,
            configurable: true
        });
        TimelineComponent.prototype.triggerReload = function (ev) {
            if ((ev === null || ev === void 0 ? void 0 : ev.period) && (ev === null || ev === void 0 ? void 0 : ev.periodType)) {
                this._timelinePeriod = ev === null || ev === void 0 ? void 0 : ev.period;
                this._timelinePeriodType = ev === null || ev === void 0 ? void 0 : ev.periodType;
                this.loadData(ev === null || ev === void 0 ? void 0 : ev.period, ev === null || ev === void 0 ? void 0 : ev.periodType);
            }
        };
        TimelineComponent.prototype.loadData = function (period, periodType) {
            var _this = this;
            this.preLoading = true;
            this._timelineAPI.getTimeline(this._assetType, this._assetId, period, periodType).then(function (res) {
                // if (Array.isArray(res) && res?.length) {
                if ((res === null || res === void 0 ? void 0 : res.length) > 0) {
                    _this.listLog = res;
                    _this.listLog = _this.listLog.sort(function (a, b) {
                        var dA = new Date(b.month);
                        var dB = new Date(a.month);
                        return (dB > dA) ? 1 : -1;
                    });
                }
                _this.preLoading = false;
            }, function (err) {
                // console.log('%cError-Timelinse:', 'color:tomato', err);
                _this.preLoading = false;
            });
        };
        /** Timeline clicked */
        TimelineComponent.prototype.timelineClicked = function (data) {
            if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'condition-report')
                return this.conditionReport(data === null || data === void 0 ? void 0 : data.id);
            if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'maintenance-history')
                return this.maintenanceRecord(data === null || data === void 0 ? void 0 : data.id);
            if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'task')
                return this.taskDialog(data);
            if ((data === null || data === void 0 ? void 0 : data.typeKey) === 'budget-code')
                return this.bugetCode(data);
        };
        /** Dialog */
        TimelineComponent.prototype.maintenanceRecord = function (viewId) {
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
        };
        TimelineComponent.prototype.conditionReport = function (viewId) {
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
        };
        TimelineComponent.prototype.taskDialog = function (data) {
            this._dialog.open(DialogViewTaskComponent, {
                data: data,
                width: '450px',
                panelClass: 'timeline-dialog-new-record',
                disableClose: true
            });
        };
        TimelineComponent.prototype.bugetCode = function (data) {
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
        };
        return TimelineComponent;
    }());
    TimelineComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'app-timeline',
                    template: "<!-- <div id=\"content-timeline\" style.overflow=\"hidden\"> -->\n<main fxLayout=\"column\" fxLayoutAlign=\"10px\" [style.height.%]=\"100\">\n    <div>\n        <timeline-tools [assetId]=\"_assetId\" [assetType]=\"_assetType\" (triggerReload)=\"triggerReload($event)\">\n        </timeline-tools>\n        <mat-progress-bar *ngIf=\"preLoading\" mode=\"indeterminate\" color=\"warn\" [style.height.px]=\"2\">\n        </mat-progress-bar>\n    </div>\n\n    <div fxFlex=\"grow\" [style.width.%]=\"100\" [style.position]=\"'relative'\">\n        <!-- class=\"layout-timeline\" -->\n        <div class=\"w-100 h-100\" [style.position]=\"'absolute'\" [style.overflow-y]=\"'auto'\">\n            <div style=\"position: relative; width: 100%; height: 100%;\" [style.width.%]=\"100\">\n                <ul class=\"timeline\">\n                    <ng-container *ngFor=\"let log of listLog; let i = index;\">\n                        <li class=\"event\" [attr.data-date]=\"log?.month | date:'MMM yyyy'\">\n                            <ng-container *ngFor=\"let block of log?.childrens\">\n                                <div matRipple class=\"event-item pb-3\" [style.border-radius.px]=\"5\"\n                                    (click)=\"timelineClicked(block)\">\n                                    <h3>{{block?.type}}</h3>\n                                    <p *ngIf=\"block?.description\">\n                                        <small>\n                                            <strong>\u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14:&nbsp;</strong>\n                                        </small>\n                                        {{ block?.description }}\n                                    </p>\n                                    <div *ngIf=\"block?.attachCount\" fxLayoutAlign=\"start center\"\n                                        [style.padding]=\"'0 10px'\" [style.font-size.px]=\"14\">\n                                        <mat-icon inline=\"true\">attach_file</mat-icon>\n                                        \u0E44\u0E1F\u0E25\u0E4C\u0E17\u0E35\u0E48\u0E41\u0E19\u0E1A\u0E21\u0E32 {{ block?.attachCount }} \u0E44\u0E1F\u0E25\u0E4C\n                                    </div>\n                                    <div [style.padding]=\"'3px 10px'\">\n                                        <ng-container *ngIf=\"block?.userName\">\n                                            <small>\n                                                <strong>\u0E1C\u0E39\u0E49\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19:&nbsp;</strong>\n                                            </small>\n                                            <small>{{ block?.userName }}</small>\n                                        </ng-container>\n                                        <span fxFlex></span>\n                                        <small>{{ block?.reportDate | date:'dd / MM / yyyy':'+0700' }}</small>\n                                    </div>\n                                </div>\n                            </ng-container>\n                        </li>\n                    </ng-container>\n                </ul>\n            </div>\n        </div>\n    </div>\n</main>\n<!-- </div> -->",
                    styles: [":host,:host::ng-deep .layout-timeline{position:relative;width:100%;height:100%}:host::ng-deep .layout-timeline{max-height:100%;overflow-y:auto}.timeline{border-left:3px solid #ff9800;border-bottom-right-radius:4px;border-top-right-radius:4px;margin:0 auto;letter-spacing:.2px;position:relative;line-height:1.4em;font-size:1.03em;padding:10px 10px 3.2rem;list-style:none;text-align:left;width:calc(100% - 3rem);max-width:calc(100% - 3rem);float:right}@media (max-width:767px){.timeline{max-width:98%;padding:25px}}.timeline h1{font-weight:300;font-size:1.4em}.timeline h2,.timeline h3{font-weight:600;font-size:1rem;margin-bottom:10px;margin-left:10px;margin-top:10px}.timeline p{margin-left:10px;margin-bottom:0}.timeline .event-item{border:2px dashed #ff9800;border-radius:10px;background:rgba(255,152,0,.07058823529411765);cursor:pointer}.timeline .event,.timeline .event-item{position:relative;margin-bottom:25px}@media (max-width:767px){.timeline .event{padding-top:30px}}.timeline .event:last-of-type{padding-bottom:25px;margin-bottom:-10px}.timeline .event:after,.timeline .event:before{position:absolute;display:block;top:0}.timeline .event:before{left:-4.5rem;content:attr(data-date);text-align:right;font-weight:100;font-size:.9em;overflow:hidden;text-overflow:ellipsis;white-space:pre-wrap;font-weight:700;width:3rem}@media (max-width:767px){.timeline .event:before{left:0;text-align:left}}.timeline .event:after{box-shadow:0 0 0 3px #ff9800;background:#fff;border-radius:50%;left:-20px;height:15px;width:15px;content:\"\";top:5px}@media (max-width:767px){.timeline .event:after{left:-31.8px}}.rtl .timeline{border-left:0;text-align:right;border-bottom-right-radius:0;border-top-right-radius:0;border-bottom-left-radius:4px;border-top-left-radius:4px;border-right:3px solid #ff9800}.rtl .timeline .event:before{left:0;right:-170px}.rtl .timeline .event:after{left:0;right:-55.8px}"]
                },] }
    ];
    TimelineComponent.ctorParameters = function () { return [
        { type: TimelineAssetsService },
        { type: dialog.MatDialog }
    ]; };
    TimelineComponent.propDecorators = {
        assetInfo: [{ type: i0.Input }],
        triggerNum: [{ type: i0.Input }]
    };

    var TimelineToolsComponent = /** @class */ (function () {
        function TimelineToolsComponent(dialog) {
            this.dialog = dialog;
            this.triggerReload = new i0.EventEmitter();
            /** Period for view timeline */
            this.period = new forms.FormControl(3, [forms.Validators.required]);
            this.typePeriod = new forms.FormControl('D', [forms.Validators.required]);
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
        Object.defineProperty(TimelineToolsComponent.prototype, "assetId", {
            set: function (data) {
                this._assetId = data;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TimelineToolsComponent.prototype, "assetType", {
            set: function (data) {
                this._assetType = data;
            },
            enumerable: false,
            configurable: true
        });
        TimelineToolsComponent.prototype.ngOnInit = function () {
        };
        TimelineToolsComponent.prototype.ngOnDestroy = function () {
            for (var key in this._subscription) {
                if (Object.prototype.hasOwnProperty.call(this._subscription, key)) {
                    this._subscription[key].unsubscribe();
                }
            }
        };
        TimelineToolsComponent.prototype.reloadData = function () {
            this.triggerReload.emit({ period: this.period.value, periodType: this.typePeriod.value });
        };
        TimelineToolsComponent.prototype.maintenanceRecord = function () {
            var _this = this;
            var dialog = this.dialog.open(DialogNewRecordComponent, {
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
            this._subscription.maintenance = dialog.afterClosed().subscribe(function (res) {
                if (res)
                    _this.triggerReload.emit({ period: _this.period.value, periodType: _this.typePeriod.value });
            });
        };
        TimelineToolsComponent.prototype.insertAssets = function () {
            var _this = this;
            var dialog = this.dialog.open(DialogNewRecordComponent, {
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
            this._subscription.conditionReport = dialog.afterClosed().subscribe(function (res) {
                if (res)
                    _this.triggerReload.emit({ period: _this.period.value, periodType: _this.typePeriod.value });
            });
        };
        return TimelineToolsComponent;
    }());
    TimelineToolsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'timeline-tools',
                    template: "<div fxLayout=\"row\" fxLayoutGap=\"10px\">\n    <button mat-button class=\"w-100\" (click)=\"maintenanceRecord()\">\n        <!-- <mat-icon>receipt_long</mat-icon> -->\n        <img src=\"assets/icons/maintenance-create.png\" height=\"24\">\n        <strong>&nbsp;\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07</strong>\n        <!-- <strong>\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E0B\u0E48\u0E2D\u0E21\u0E1A\u0E33\u0E23\u0E38\u0E07</strong> -->\n    </button>\n\n    <button mat-button class=\"w-100\" (click)=\"insertAssets()\">\n        <!-- <mat-icon>history_edu</mat-icon> -->\n        <img src=\"assets/icons/condition-report.png\" height=\"24\">\n        <strong>&nbsp;\u0E2A\u0E20\u0E32\u0E1E\u0E17\u0E23\u0E31\u0E1E\u0E22\u0E4C\u0E2A\u0E34\u0E19</strong>\n    </button>\n</div>\n<mat-divider class=\"my-2\"></mat-divider>\n<div fxLayout=\"row\" fxLayoutGap=\"10px\" class=\"w-100\">\n    <div fxFlex=\"25%\">\n        <mat-form-field appearance=\"outline\" class=\"w-100\">\n            <mat-label>\n                <strong>\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32</strong>\n            </mat-label>\n            <input [formControl]=\"period\" matInput type=\"number\" min=\"1\" class=\"text-center\">\n        </mat-form-field>\n    </div>\n\n    <div fxFlex=\"auto\">\n        <mat-form-field appearance=\"outline\" class=\"w-100\">\n            <mat-label>\n                <strong>\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E23\u0E30\u0E22\u0E30\u0E40\u0E27\u0E25\u0E32</strong>\n            </mat-label>\n            <mat-select [formControl]=\"typePeriod\">\n                <ng-container *ngFor=\"let item of listPeriodType\">\n                    <mat-option [value]=\"item.type\">\n                        <strong>{{ item?.caption }}</strong>\n                    </mat-option>\n                </ng-container>\n            </mat-select>\n        </mat-form-field>\n    </div>\n\n    <div fxFlex=\"15%\" [style.padding-top.px]=\"5\">\n        <button mat-icon-button (click)=\"reloadData()\" [style.background-color]=\"'var(--primary-orange)'\">\n            <!-- <strong>\u0E14\u0E39\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25</strong> -->\n            <mat-icon>update</mat-icon>\n        </button>\n    </div>\n</div>",
                    styles: [":host{position:relative;width:100%}:host::ng-deep mat-form-field .mat-form-field-infix{padding:.5rem 0}"]
                },] }
    ];
    TimelineToolsComponent.ctorParameters = function () { return [
        { type: dialog.MatDialog }
    ]; };
    TimelineToolsComponent.propDecorators = {
        triggerReload: [{ type: i0.Output }],
        assetId: [{ type: i0.Input }],
        assetType: [{ type: i0.Input }]
    };

    var ErrorImgDirective = /** @class */ (function () {
        function ErrorImgDirective() {
            this.src = null;
            this.default = null;
        }
        ErrorImgDirective.prototype.onError = function () {
            this.src = (!this.default) ? "https://highwaydistrict.com/doh_district/resources/img/img-default.jpg" : this.default;
        };
        return ErrorImgDirective;
    }());
    ErrorImgDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[error-img]',
                    host: {
                        '(error)': 'onError()',
                        '[src]': 'src'
                    }
                },] }
    ];
    ErrorImgDirective.ctorParameters = function () { return []; };
    ErrorImgDirective.propDecorators = {
        src: [{ type: i0.Input }],
        default: [{ type: i0.Input }]
    };

    var ErrorImgUserDirective = /** @class */ (function () {
        function ErrorImgUserDirective() {
            this.src = null;
            this.default = null;
        }
        ErrorImgUserDirective.prototype.onError = function () {
            this.src = (!this.default) ? "https://highwaydistrict.com/doh_district/resources/img/user-default.png" : this.default;
        };
        return ErrorImgUserDirective;
    }());
    ErrorImgUserDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[error-img-user]',
                    host: {
                        '(error)': 'onError()',
                        '[src]': 'src'
                    }
                },] }
    ];
    ErrorImgUserDirective.ctorParameters = function () { return []; };
    ErrorImgUserDirective.propDecorators = {
        src: [{ type: i0.Input }],
        default: [{ type: i0.Input }]
    };

    var DirectivesModule = /** @class */ (function () {
        function DirectivesModule() {
        }
        return DirectivesModule;
    }());
    DirectivesModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        ErrorImgDirective,
                        ErrorImgUserDirective
                    ],
                    imports: [
                        common.CommonModule,
                    ],
                    exports: [
                        ErrorImgDirective,
                        ErrorImgUserDirective
                    ]
                },] }
    ];

    var DialogNewRecordModule = /** @class */ (function () {
        function DialogNewRecordModule() {
        }
        return DialogNewRecordModule;
    }());
    DialogNewRecordModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [DialogNewRecordComponent],
                    imports: [
                        common.CommonModule,
                        dialog.MatDialogModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        flexLayout.FlexLayoutModule,
                        snackBar.MatSnackBarModule,
                        datepicker.MatDatepickerModule,
                        list.MatListModule,
                        progressBar.MatProgressBarModule,
                        progressSpinner.MatProgressSpinnerModule,
                        /** Directives */
                        DirectivesModule
                    ],
                    exports: [DialogNewRecordComponent],
                    providers: []
                },] }
    ];

    var TimelineToolsModule = /** @class */ (function () {
        function TimelineToolsModule() {
        }
        return TimelineToolsModule;
    }());
    TimelineToolsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [TimelineToolsComponent],
                    imports: [
                        common.CommonModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        dialog.MatDialogModule,
                        flexLayout.FlexLayoutModule,
                        divider.MatDividerModule,
                        formField.MatFormFieldModule,
                        select.MatSelectModule,
                        input.MatInputModule,
                        /** Widgets */
                        DialogNewRecordModule
                    ],
                    exports: [TimelineToolsComponent]
                },] }
    ];

    var DialogViewTaskModule = /** @class */ (function () {
        function DialogViewTaskModule() {
        }
        return DialogViewTaskModule;
    }());
    DialogViewTaskModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [DialogViewTaskComponent],
                    imports: [
                        common.CommonModule,
                        dialog.MatDialogModule,
                        flexLayout.FlexLayoutModule,
                        icon.MatIconModule,
                        button.MatButtonModule,
                        tooltip.MatTooltipModule,
                        /** Directives */
                        DirectivesModule
                    ],
                    exports: [DialogViewTaskComponent]
                },] }
    ];

    var AddBudgetCodeMaintenanceModule = /** @class */ (function () {
        function AddBudgetCodeMaintenanceModule() {
        }
        return AddBudgetCodeMaintenanceModule;
    }());
    AddBudgetCodeMaintenanceModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [AddBudgetCodeMaintenanceComponent],
                    imports: [
                        common.CommonModule,
                        dialog.MatDialogModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        flexLayout.FlexLayoutModule,
                        snackBar.MatSnackBarModule,
                        datepicker.MatDatepickerModule,
                        list.MatListModule,
                        progressBar.MatProgressBarModule,
                        progressSpinner.MatProgressSpinnerModule,
                        chips.MatChipsModule,
                        tooltip.MatTooltipModule,
                        /** Directives */
                        DirectivesModule
                    ],
                    exports: [AddBudgetCodeMaintenanceComponent]
                },] }
    ];

    var TimelineModule = /** @class */ (function () {
        function TimelineModule() {
        }
        return TimelineModule;
    }());
    TimelineModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [TimelineComponent],
                    imports: [
                        common.CommonModule,
                        flexLayout.FlexLayoutModule,
                        core.MatRippleModule,
                        dialog.MatDialogModule,
                        icon.MatIconModule,
                        snackBar.MatSnackBarModule,
                        progressBar.MatProgressBarModule,
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

    var TimelineAssetsModule = /** @class */ (function () {
        function TimelineAssetsModule() {
        }
        return TimelineAssetsModule;
    }());
    TimelineAssetsModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [TimelineAssetsComponent],
                    imports: [
                        common.CommonModule,
                        i1.HttpClientModule,
                        TimelineModule,
                        forms.FormsModule,
                        forms.ReactiveFormsModule,
                        // mat 
                        datepicker.MatDatepickerModule,
                        core.MatNativeDateModule,
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

    exports.AppTools = AppTools;
    exports.BudgetCodeService = BudgetCodeService;
    exports.TimelineAssetsComponent = TimelineAssetsComponent;
    exports.TimelineAssetsModule = TimelineAssetsModule;
    exports.TimelineAssetsService = TimelineAssetsService;
    exports["ɵa"] = UserAuthedService;
    exports["ɵb"] = TimelineModule;
    exports["ɵc"] = TimelineComponent;
    exports["ɵd"] = TimelineToolsModule;
    exports["ɵe"] = TimelineToolsComponent;
    exports["ɵf"] = DialogNewRecordModule;
    exports["ɵg"] = DialogNewRecordComponent;
    exports["ɵh"] = FadeInOut;
    exports["ɵi"] = FadeInGrow;
    exports["ɵj"] = DirectivesModule;
    exports["ɵk"] = ErrorImgDirective;
    exports["ɵl"] = ErrorImgUserDirective;
    exports["ɵm"] = DialogViewTaskModule;
    exports["ɵn"] = DialogViewTaskComponent;
    exports["ɵo"] = AddBudgetCodeMaintenanceModule;
    exports["ɵp"] = AddBudgetCodeMaintenanceComponent;
    exports["ɵq"] = FadeInOut$1;
    exports["ɵr"] = FadeInGrow$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=timeline-assets.umd.js.map
