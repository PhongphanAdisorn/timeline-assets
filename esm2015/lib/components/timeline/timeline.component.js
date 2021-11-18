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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN0RSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxrRkFBa0YsQ0FBQztBQUNySSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNuRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQU9oRyxNQUFNLE9BQU8saUJBQWlCO0lBUTFCLFlBQ1ksWUFBbUMsRUFDbkMsT0FBa0I7UUFEbEIsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBQ25DLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFUdkIsYUFBUSxHQUFXLE9BQU8sQ0FBQyxDQUFBLE1BQU07UUFDakMsZUFBVSxHQUFXLGtCQUFrQixDQUFDO1FBRXhDLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsWUFBTyxHQUFlLElBQUksS0FBSyxFQUFFLENBQUM7UUFDakMsb0JBQWUsR0FBVyxHQUFHLENBQUM7UUFDOUIsd0JBQW1CLEdBQVcsR0FBRyxDQUFDO0lBSXRDLENBQUM7SUFFTCxRQUFRO1FBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxJQUFhLFNBQVMsQ0FBQyxJQUFTO1FBQzVCLElBQUksQ0FBQyxRQUFR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Q2pCO1lBQ0QsS0FBSyxFQUFFLE9BQU87WUFDZCxVQUFVLEVBQUUsNEJBQTRCO1lBQ3hDLFlBQVksRUFBRSxJQUFJO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTSxVQUFVLENBQUMsSUFBUztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUN2QyxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxPQUFPO1lBQ2QsVUFBVSxFQUFFLDRCQUE0QjtZQUN4QyxZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ00sU0FBUyxDQUFDLElBQVM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUU7WUFDakQsVUFBVSxFQUFFLHdCQUF3QjtZQUNwQyxLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsWUFBWSxFQUFFLElBQUk7WUFDbEIsSUFBSSxFQUFFO2dCQUNGLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixVQUFVLEVBQUUsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFVBQVU7Z0JBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDekIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO2dCQUMzQixRQUFRLEVBQUUsRUFBRTthQUNmO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBcEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsa3FHQUF3Qzs7YUFFM0M7OztZQVRRLHFCQUFxQjtZQURyQixTQUFTOzs7d0JBMkJiLEtBQUs7eUJBT0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIExPQ0FMRV9JRCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgVGltZWxpbmVBc3NldHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdGltZWxpbmUtYXNzZXRzLnNlcnZpY2UnOyBcbmltcG9ydCB7IEFkZEJ1ZGdldENvZGVNYWludGVuYW5jZUNvbXBvbmVudCB9IGZyb20gJy4uL21haW4tZGlhbG9nL2FkZC1idWRnZXQtY29kZS1tYWludGVuYW5jZS9hZGQtYnVkZ2V0LWNvZGUtbWFpbnRlbmFuY2UuY29tcG9uZW50JztcbmltcG9ydCB7IERpYWxvZ05ld1JlY29yZENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0cy9kaWFsb2ctbmV3LXJlY29yZC9kaWFsb2ctbmV3LXJlY29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlhbG9nVmlld1Rhc2tDb21wb25lbnQgfSBmcm9tICcuL3dpZGdldHMvZGlhbG9nLXZpZXctdGFzay9kaWFsb2ctdmlldy10YXNrLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXRpbWVsaW5lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3RpbWVsaW5lLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBfYXNzZXRJZDogc3RyaW5nID0gJzE2NjkwJzsvLyc1JztcbiAgICBwdWJsaWMgX2Fzc2V0VHlwZTogc3RyaW5nID0gJ2MwMV9zaWRld2F5X3R5cGUnO1xuICAgIHB1YmxpYyBfYXNzZXRDYXB0aW9uOiBzdHJpbmc7XG4gICAgcHVibGljIHByZUxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgbGlzdExvZzogQXJyYXk8YW55PiA9IG5ldyBBcnJheSgpO1xuICAgIHByaXZhdGUgX3RpbWVsaW5lUGVyaW9kOiBzdHJpbmcgPSAnMyc7XG4gICAgcHJpdmF0ZSBfdGltZWxpbmVQZXJpb2RUeXBlOiBzdHJpbmcgPSAnRCc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3RpbWVsaW5lQVBJOiBUaW1lbGluZUFzc2V0c1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxvYWREYXRhKHRoaXMuX3RpbWVsaW5lUGVyaW9kLCB0aGlzLl90aW1lbGluZVBlcmlvZFR5cGUpO1xuICAgIH1cbiAgICBASW5wdXQoKSBzZXQgYXNzZXRJbmZvKGluZm86IGFueSkge1xuICAgICAgICB0aGlzLl9hc3NldElkID0gaW5mbz8uaWQ7XG4gICAgICAgIHRoaXMuX2Fzc2V0VHlwZSA9IGluZm8/LnRhYmxlO1xuICAgICAgICB0aGlzLl9hc3NldENhcHRpb24gPSBpbmZvPy5jYXB0aW9uO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnQXNzZXQtSW5mbzonLCBpbmZvKTtcbiAgICAgICAgaWYgKGluZm8/LmlkICYmIGluZm8/LnRhYmxlKSB0aGlzLmxvYWREYXRhKCk7XG4gICAgfVxuICAgIEBJbnB1dCgpIHNldCB0cmlnZ2VyTnVtKG51bTogbnVtYmVyKSB7XG4gICAgICAgIGlmIChudW0pIHRoaXMubG9hZERhdGEodGhpcy5fdGltZWxpbmVQZXJpb2QsIHRoaXMuX3RpbWVsaW5lUGVyaW9kVHlwZSk7XG4gICAgfVxuICAgIHB1YmxpYyB0cmlnZ2VyUmVsb2FkKGV2OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2Py5wZXJpb2QgJiYgZXY/LnBlcmlvZFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lUGVyaW9kID0gZXY/LnBlcmlvZDtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVsaW5lUGVyaW9kVHlwZSA9IGV2Py5wZXJpb2RUeXBlO1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YShldj8ucGVyaW9kLCBldj8ucGVyaW9kVHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkRGF0YShwZXJpb2Q/OiBzdHJpbmcsIHBlcmlvZFR5cGU/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdGltZWxpbmVBUEkuZ2V0VGltZWxpbmUodGhpcy5fYXNzZXRUeXBlLCB0aGlzLl9hc3NldElkLCBwZXJpb2QsIHBlcmlvZFR5cGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzPy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChyZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RMb2cgPSByZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0TG9nID0gdGhpcy5saXN0TG9nLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZEEgPSBuZXcgRGF0ZShiLm1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZEIgPSBuZXcgRGF0ZShhLm1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkQiA+IGRBKSA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJlTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJyVjRXJyb3ItVGltZWxpbnNlOicsICdjb2xvcjp0b21hdG8nLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5wcmVMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBUaW1lbGluZSBjbGlja2VkICovXG4gICAgcHVibGljIHRpbWVsaW5lQ2xpY2tlZChkYXRhOiBhbnkpIHtcbiAgICAgICAgaWYgKGRhdGE/LnR5cGVLZXkgPT09ICdjb25kaXRpb24tcmVwb3J0JykgcmV0dXJuIHRoaXMuY29uZGl0aW9uUmVwb3J0KGRhdGE/LmlkKTtcbiAgICAgICAgaWYgKGRhdGE/LnR5cGVLZXkgPT09ICdtYWludGVuYW5jZS1oaXN0b3J5JykgcmV0dXJuIHRoaXMubWFpbnRlbmFuY2VSZWNvcmQoZGF0YT8uaWQpO1xuICAgICAgICBpZiAoZGF0YT8udHlwZUtleSA9PT0gJ3Rhc2snKSByZXR1cm4gdGhpcy50YXNrRGlhbG9nKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YT8udHlwZUtleSA9PT0gJ2J1ZGdldC1jb2RlJykgcmV0dXJuIHRoaXMuYnVnZXRDb2RlKGRhdGEpO1xuICAgIH1cblxuICAgIC8qKiBEaWFsb2cgKi9cbiAgICBwdWJsaWMgbWFpbnRlbmFuY2VSZWNvcmQodmlld0lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZURpYWxvZzogJ21haW50ZW5hbmNlJyxcbiAgICAgICAgICAgICAgICB2aWV3VHlwZTogJ1ZpZXcnLFxuICAgICAgICAgICAgICAgIGFzc2V0SWQ6IHRoaXMuX2Fzc2V0SWQsXG4gICAgICAgICAgICAgICAgYXNzZXRUeXBlOiB0aGlzLl9hc3NldFR5cGUsXG4gICAgICAgICAgICAgICAgdmlld0lkOiB2aWV3SWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBjb25kaXRpb25SZXBvcnQodmlld0lkOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbW9kZURpYWxvZzogJ2Fzc2V0cycsXG4gICAgICAgICAgICAgICAgdmlld1R5cGU6ICdWaWV3JyxcbiAgICAgICAgICAgICAgICBhc3NldElkOiB0aGlzLl9hc3NldElkLFxuICAgICAgICAgICAgICAgIGFzc2V0VHlwZTogdGhpcy5fYXNzZXRUeXBlLFxuICAgICAgICAgICAgICAgIHZpZXdJZDogdmlld0lkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6ICc0NTBweCcsXG4gICAgICAgICAgICBwYW5lbENsYXNzOiAndGltZWxpbmUtZGlhbG9nLW5ldy1yZWNvcmQnLFxuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgdGFza0RpYWxvZyhkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oRGlhbG9nVmlld1Rhc2tDb21wb25lbnQsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgICAgICAgIHBhbmVsQ2xhc3M6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgICAgICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBidWdldENvZGUoZGF0YTogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKEFkZEJ1ZGdldENvZGVNYWludGVuYW5jZUNvbXBvbmVudCwge1xuICAgICAgICAgICAgcGFuZWxDbGFzczogJ2RpYWxvZy1hZGQtY29kZS1idWRnZXQnLFxuICAgICAgICAgICAgd2lkdGg6ICc4MiUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnODIlJyxcbiAgICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBkaWFsb2dUeXBlOiAnVmlld2VyJyxcbiAgICAgICAgICAgICAgICBidWRnZXRDb2RlOiBkYXRhPy5idWRnZXRDb2RlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLl9hc3NldENhcHRpb24sXG4gICAgICAgICAgICAgICAgYXNzZXRUYWJsZTogdGhpcy5fYXNzZXRUeXBlLFxuICAgICAgICAgICAgICAgIGxpc3RHZW9tOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=