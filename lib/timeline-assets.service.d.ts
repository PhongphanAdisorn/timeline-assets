import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
export declare class TimelineAssetsService {
    private http;
    protected baseUrl: string;
    protected tools: AppTools;
    constructor(http: HttpClient);
    /**
        * Create new maintenance history
        * @param data | Object
        * @returns Promise
      */
    createMaintenance(data: object): Promise<any>;
    /**
      * Create new condition report
      * @param data | Object
      * @returns Promise
    */
    createConditionReport(data: object): Promise<any>;
    /** =========================================================================
     * Upload file to timline
     * @param assetType
     * @param assetId
     * @param file
     * @returns Observable
     */
    uploadFile(mainId: string, assetType: string, assetId: string, file: File, isMaintenance: boolean): Observable<HttpEvent<any>>;
    /** ======================================================================
     * Download file
     * */
    downloadFile(assetType: string, assetId: string, fileName: string): Observable<HttpEvent<any>>;
    /** ======================================================================
     * Load timeline data
     * =====================================================================*/
    getTimeline(assetType: string, assetId: string, period?: string, periodType?: string): Promise<any>;
    getMaintenanceHistoryWithFile(mainId: string): Promise<any>;
    getConditionReportWithFile(mainId: string): Promise<any>;
}
export declare class AppTools {
    constructor();
    genFormData(object: Object, form?: FormData, namespace?: string): FormData;
    private twoDigi;
    /** Create date time format
     * @param date : Date
     * @return string : 'yyyy-MM-dd HH:mm:ss'
    */
    dateTimeFormat(date: Date): string;
}
export declare class BudgetCodeService {
    private http;
    protected baseUrl: string;
    protected tools: AppTools;
    constructor(http: HttpClient);
    createWithUpdate(params: object): Promise<any>;
    /** =================================================================================================
     * Upload file with progress single file only.
     * @param assetTable
     * @param budgetCode
     * @param file
     * @returns Observable
     */
    uploadFile(assetTable: string, budgetCode: string, file: File): Observable<HttpEvent<any>>;
    /** ======================================================================
     * Download file
     * */
    downloadFile(assetType: string, fileName: string): Observable<HttpEvent<any>>;
    /** Finding budget-code */
    findBudgetCode(isAll: boolean, assetTable: string, budgetCode: string): Promise<any>;
    /** Get asset to used budget-code */
    getAssetUsedCode(budgetCode: string): Promise<any>;
}
