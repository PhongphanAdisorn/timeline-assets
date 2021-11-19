import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TimelineAssetsService } from '../../timeline-assets.service';
import { AddBudgetCodeMaintenanceComponent } from '../main-dialog/add-budget-code-maintenance/add-budget-code-maintenance.component';
import { DialogNewRecordComponent } from './widgets/dialog-new-record/dialog-new-record.component';
import { DialogViewTaskComponent } from './widgets/dialog-view-task/dialog-view-task.component';
export class TimelineComponent {
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
        // this._assetId = info?.id;
        // this._assetType = info?.table;
        // private dataTest: any = {table: 'c02_footpath_type', id: '3198'}
        this._assetId = (info === null || info === void 0 ? void 0 : info.id) ? info === null || info === void 0 ? void 0 : info.id : 3198;
        this._assetType = (info === null || info === void 0 ? void 0 : info.table) ? info === null || info === void 0 ? void 0 : info.table : 'c02_footpath_type';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUNySSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNuRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQU9oRyxNQUFNLE9BQU8saUJBQWlCO0lBUTFCLFlBQ1ksWUFBbUMsRUFDbkMsT0FBa0I7UUFEbEIsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFUdkIsYUFBUSxHQUFXLE9BQU8sQ0FBQyxDQUFBLE1BQU07UUFDakMsZUFBVSxHQUFXLGtCQUFrQixDQUFDO1FBRXhDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFlLElBQUksS0FBSyxFQUFFLENBQUM7UUFDakMsb0JBQWUsR0FBVyxHQUFHLENBQUM7UUFDOUIsd0JBQW1CLEdBQVcsR0FBRyxDQUFDO0lBSXRDLENBQUM7SUFFTCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxJQUFhLFNBQVMsQ0FBQyxJQUFTO1FBQzVCLDRCQUE0QjtRQUM1Qixp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cUJBQXFCO1lBRHJCLFNBQVM7Ozt3QkEyQmIsS0FBSzt5QkFVTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgTE9DQUxFX0lELCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBUaW1lbGluZUFzc2V0c1NlcnZpY2UgfSBmcm9tICcuLi8uLi90aW1lbGluZS1hc3NldHMuc2VydmljZSc7IFxuaW1wb3J0IHsgQWRkQnVkZ2V0Q29kZU1haW50ZW5hbmNlQ29tcG9uZW50IH0gZnJvbSAnLi4vbWFpbi1kaWFsb2cvYWRkLWJ1ZGdldC1jb2RlLW1haW50ZW5hbmNlL2FkZC1idWRnZXQtY29kZS1tYWludGVuYW5jZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50IH0gZnJvbSAnLi93aWRnZXRzL2RpYWxvZy1uZXctcmVjb3JkL2RpYWxvZy1uZXctcmVjb3JkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEaWFsb2dWaWV3VGFza0NvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9kaWFsb2ctdmlldy10YXNrL2RpYWxvZy12aWV3LXRhc2suY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdGltZWxpbmUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lbGluZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHVibGljIF9hc3NldElkOiBzdHJpbmcgPSAnMTY2OTAnOy8vJzUnO1xuICAgIHB1YmxpYyBfYXNzZXRUeXBlOiBzdHJpbmcgPSAnYzAxX3NpZGV3YXlfdHlwZSc7XG4gICAgcHVibGljIF9hc3NldENhcHRpb246IHN0cmluZztcbiAgICBwdWJsaWMgcHJlTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBsaXN0TG9nOiBBcnJheTxhbnk+ID0gbmV3IEFycmF5KCk7XG4gICAgcHJpdmF0ZSBfdGltZWxpbmVQZXJpb2Q6IHN0cmluZyA9ICczJztcbiAgICBwcml2YXRlIF90aW1lbGluZVBlcmlvZFR5cGU6IHN0cmluZyA9ICdEJztcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfdGltZWxpbmVBUEk6IFRpbWVsaW5lQXNzZXRzU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZERhdGEodGhpcy5fdGltZWxpbmVQZXJpb2QsIHRoaXMuX3RpbWVsaW5lUGVyaW9kVHlwZSk7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCBhc3NldEluZm8oaW5mbzogYW55KSB7XG4gICAgICAgIC8vIHRoaXMuX2Fzc2V0SWQgPSBpbmZvPy5pZDtcbiAgICAgICAgLy8gdGhpcy5fYXNzZXRUeXBlID0gaW5mbz8udGFibGU7XG4gICAgICAgIC8vIHByaXZhdGUgZGF0YVRlc3Q6IGFueSA9IHt0YWJsZTogJ2MwMl9mb290cGF0aF90eXBlJywgaWQ6ICczMTk4J31cbiAgICAgICAgdGhpcy5fYXNzZXRJZCA9IChpbmZvPy5pZCkgPyBpbmZvPy5pZCA6IDMxOTggO1xuICAgICAgICB0aGlzLl9hc3NldFR5cGUgPSAoaW5mbz8udGFibGUpID8gaW5mbz8udGFibGUgOiAnYzAyX2Zvb3RwYXRoX3R5cGUnO1xuICAgICAgICB0aGlzLl9hc3NldENhcHRpb24gPSBpbmZvPy5jYXB0aW9uO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXNzZXQtSW5mbzonLCBpbmZvKTtcbiAgICAgICAgaWYgKGluZm8/LmlkICYmIGluZm8/LnRhYmxlKSB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCB0cmlnZ2VyTnVtKG51bTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChudW0pIHRoaXMubG9hZERhdGEodGhpcy5fdGltZWxpbmVQZXJpb2QsIHRoaXMuX3RpbWVsaW5lUGVyaW9kVHlwZSk7XG4gICAgfVxuICAgIHB1YmxpYyB0cmlnZ2VyUmVsb2FkKGV2OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2Py5wZXJpb2QgJiYgZXY/LnBlcmlvZFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lUGVyaW9kID0gZXY/LnBlcmlvZDtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lUGVyaW9kVHlwZSA9IGV2Py5wZXJpb2RUeXBlO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShldj8ucGVyaW9kLCBldj8ucGVyaW9kVHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkRGF0YShwZXJpb2Q/OiBzdHJpbmcsIHBlcmlvZFR5cGU/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGltZWxpbmVBUEkuZ2V0VGltZWxpbmUodGhpcy5fYXNzZXRUeXBlLCB0aGlzLl9hc3NldElkLCBwZXJpb2QsIHBlcmlvZFR5cGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChyZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RMb2cgPSByZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0TG9nID0gdGhpcy5saXN0TG9nLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZEEgPSBuZXcgRGF0ZShiLm1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZEIgPSBuZXcgRGF0ZShhLm1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkQiA+IGRBKSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJyVjRXJyb3ItVGltZWxpbnNlOicsICdjb2xvcjp0b21hdG8nLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBUaW1lbGluZSBjbGlja2VkICovXG4gICAgcHVibGljIHRpbWVsaW5lQ2xpY2tlZChkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKGRhdGE/LnR5cGVLZXkgPT09ICdjb25kaXRpb24tcmVwb3J0JykgcmV0dXJuIHRoaXMuY29uZGl0aW9uUmVwb3J0KGRhdGE/LmlkKTtcbiAgICAgICAgaWYgKGRhdGE/LnR5cGVLZXkgPT09ICdtYWludGVuYW5jZS1oaXN0b3J5JykgcmV0dXJuIHRoaXMubWFpbnRlbmFuY2VSZWNvcmQoZGF0YT8uaWQpO1xuICAgICAgICBpZiAoZGF0YT8udHlwZUtleSA9PT0gJ3Rhc2snKSByZXR1cm4gdGhpcy50YXNrRGlhbG9nKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YT8udHlwZUtleSA9PT0gJ2J1ZGdldC1jb2RlJykgcmV0dXJuIHRoaXMuYnVnZXRDb2RlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKiBEaWFsb2cgKi9cbiAgICBwdWJsaWMgbWFpbnRlbmFuY2VSZWNvcmQodmlld0lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZURpYWxvZzogJ21haW50ZW5hbmNlJyxcbiAgICAgICAgICAgICAgICB2aWV3VHlwZTogJ1ZpZXcnLFxuICAgICAgICAgICAgICAgIGFzc2V0SWQ6IHRoaXMuX2Fzc2V0SWQsXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiB0aGlzLl9hc3NldFR5cGUsXG4gICAgICAgICAgICAgICAgdmlld0lkOiB2aWV3SWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBjb25kaXRpb25SZXBvcnQodmlld0lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZURpYWxvZzogJ2Fzc2V0cycsXG4gICAgICAgICAgICAgICAgdmlld1R5cGU6ICdWaWV3JyxcbiAgICAgICAgICAgICAgICBhc3NldElkOiB0aGlzLl9hc3NldElkLFxuICAgICAgICAgICAgICAgIGFzc2V0VHlwZTogdGhpcy5fYXNzZXRUeXBlLFxuICAgICAgICAgICAgICAgIHZpZXdJZDogdmlld0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6ICc0NTBweCcsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAndGltZWxpbmUtZGlhbG9nLW5ldy1yZWNvcmQnLFxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgdGFza0RpYWxvZyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nVmlld1Rhc2tDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBidWdldENvZGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFkZEJ1ZGdldENvZGVNYWludGVuYW5jZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgcGFuZWxDbGFzczogJ2RpYWxvZy1hZGQtY29kZS1idWRnZXQnLFxuICAgICAgICAgICAgd2lkdGg6ICc4MiUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnODIlJyxcbiAgICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBkaWFsb2dUeXBlOiAnVmlld2VyJyxcbiAgICAgICAgICAgICAgICBidWRnZXRDb2RlOiBkYXRhPy5idWRnZXRDb2RlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLl9hc3NldENhcHRpb24sXG4gICAgICAgICAgICAgICAgYXNzZXRUYWJsZTogdGhpcy5fYXNzZXRUeXBlLFxuICAgICAgICAgICAgICAgIGxpc3RHZW9tOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=