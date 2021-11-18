import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewRecordComponent } from '../dialog-new-record/dialog-new-record.component';
export class TimelineToolsComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtdG9vbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS93aWRnZXRzL3RpbWVsaW5lLXRvb2xzL3RpbWVsaW5lLXRvb2xzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBTzVGLE1BQU0sT0FBTyxzQkFBc0I7SUFhakMsWUFBb0IsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQVozQixrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWhFLCtCQUErQjtRQUN4QixXQUFNLEdBQWdCLElBQUksV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLGVBQVUsR0FBZ0IsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEUsbUJBQWMsR0FBNkMsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUU5RSxtQkFBbUI7UUFDWixrQkFBYSxHQUFrQyxFQUFFLENBQUM7UUFHdkQsSUFBSSxDQUFDLGNBQWMsR0FBRztZQUNwQixFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRTtZQUN0QyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUs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QUUsZ0JBQWdCO2dCQUMxQixtMEVBQThDOzthQUUvQzs7O1lBUlEsU0FBUzs7OzRCQVVmLE1BQU07c0JBcUJOLEtBQUs7d0JBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGlhbG9nTmV3UmVjb3JkQ29tcG9uZW50IH0gZnJvbSAnLi4vZGlhbG9nLW5ldy1yZWNvcmQvZGlhbG9nLW5ldy1yZWNvcmQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGltZWxpbmUtdG9vbHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUtdG9vbHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aW1lbGluZS10b29scy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lVG9vbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgdHJpZ2dlclJlbG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIHB1YmxpYyBfYXNzZXRJZDogc3RyaW5nO1xuICBwdWJsaWMgX2Fzc2V0VHlwZTogc3RyaW5nO1xuXG4gIC8qKiBQZXJpb2QgZm9yIHZpZXcgdGltZWxpbmUgKi9cbiAgcHVibGljIHBlcmlvZDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woMywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgcHVibGljIHR5cGVQZXJpb2Q6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCdEJywgW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcbiAgcHVibGljIGxpc3RQZXJpb2RUeXBlOiBBcnJheTx7IHR5cGU6IHN0cmluZywgY2FwdGlvbjogc3RyaW5nIH0+ID0gbmV3IEFycmF5KCk7XG5cbiAgLyoqIFN1YnNjcmlwdGlvbiAqL1xuICBwdWJsaWMgX3N1YnNjcmlwdGlvbjogeyBbeDogc3RyaW5nXTogU3Vic2NyaXB0aW9uIH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgdGhpcy5saXN0UGVyaW9kVHlwZSA9IFtcbiAgICAgIHsgdHlwZTogJ0QnLCBjYXB0aW9uOiAn4Lin4Lix4LiZLeC4ouC5ieC4reC4meC4q+C4peC4seC4hycgfSxcbiAgICAgIHsgdHlwZTogJ1cnLCBjYXB0aW9uOiAn4Liq4Lix4Lib4LiU4Liy4Lir4LmMLeC4ouC5ieC4reC4meC4q+C4peC4seC4hycgfSxcbiAgICAgIHsgdHlwZTogJ00nLCBjYXB0aW9uOiAn4LmA4LiU4Li34Lit4LiZLeC4ouC5ieC4reC4meC4q+C4peC4seC4hycgfSxcbiAgICAgIHsgdHlwZTogJ1knLCBjYXB0aW9uOiAn4Lib4Li1LeC4ouC5ieC4reC4meC4q+C4peC4seC4hycgfVxuICAgIF07XG4gIH1cblxuICBASW5wdXQoKSBzZXQgYXNzZXRJZChkYXRhOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hc3NldElkID0gZGF0YTtcbiAgfVxuICBASW5wdXQoKSBzZXQgYXNzZXRUeXBlKGRhdGE6IHN0cmluZykge1xuICAgIHRoaXMuX2Fzc2V0VHlwZSA9IGRhdGE7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9zdWJzY3JpcHRpb24pIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5fc3Vic2NyaXB0aW9uLCBrZXkpKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbltrZXldLnVuc3Vic2NyaWJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbG9hZERhdGEoKTp2b2lkIHtcbiAgICB0aGlzLnRyaWdnZXJSZWxvYWQuZW1pdCh7IHBlcmlvZDogdGhpcy5wZXJpb2QudmFsdWUsIHBlcmlvZFR5cGU6IHRoaXMudHlwZVBlcmlvZC52YWx1ZSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtYWludGVuYW5jZVJlY29yZCgpIHtcbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmRpYWxvZy5vcGVuKERpYWxvZ05ld1JlY29yZENvbXBvbmVudCwge1xuICAgICAgZGF0YToge1xuICAgICAgICBtb2RlRGlhbG9nOiAnbWFpbnRlbmFuY2UnLFxuICAgICAgICB2aWV3VHlwZTogJ0FkZCcsXG4gICAgICAgIGFzc2V0SWQ6IHRoaXMuX2Fzc2V0SWQsXG4gICAgICAgIGFzc2V0VHlwZTogdGhpcy5fYXNzZXRUeXBlXG4gICAgICB9LFxuICAgICAgd2lkdGg6ICc0NTBweCcsXG4gICAgICBwYW5lbENsYXNzOiAndGltZWxpbmUtZGlhbG9nLW5ldy1yZWNvcmQnLFxuICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLm1haW50ZW5hbmNlID0gZGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAocmVzKSB0aGlzLnRyaWdnZXJSZWxvYWQuZW1pdCh7IHBlcmlvZDogdGhpcy5wZXJpb2QudmFsdWUsIHBlcmlvZFR5cGU6IHRoaXMudHlwZVBlcmlvZC52YWx1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbnNlcnRBc3NldHMoKSB7XG4gICAgY29uc3QgZGlhbG9nID0gdGhpcy5kaWFsb2cub3BlbihEaWFsb2dOZXdSZWNvcmRDb21wb25lbnQsIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbW9kZURpYWxvZzogJ2Fzc2V0cycsXG4gICAgICAgIHZpZXdUeXBlOiAnQWRkJyxcbiAgICAgICAgYXNzZXRJZDogdGhpcy5fYXNzZXRJZCxcbiAgICAgICAgYXNzZXRUeXBlOiB0aGlzLl9hc3NldFR5cGVcbiAgICAgIH0sXG4gICAgICB3aWR0aDogJzQ1MHB4JyxcbiAgICAgIHBhbmVsQ2xhc3M6ICd0aW1lbGluZS1kaWFsb2ctbmV3LXJlY29yZCcsXG4gICAgICBkaXNhYmxlQ2xvc2U6IHRydWVcbiAgICB9KTtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24uY29uZGl0aW9uUmVwb3J0ID0gZGlhbG9nLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICBpZiAocmVzKSB0aGlzLnRyaWdnZXJSZWxvYWQuZW1pdCh7IHBlcmlvZDogdGhpcy5wZXJpb2QudmFsdWUsIHBlcmlvZFR5cGU6IHRoaXMudHlwZVBlcmlvZC52YWx1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=