import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export class DialogViewTaskComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXZpZXctdGFzay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lbGluZS1hc3NldHMvc3JjL2xpYi9jb21wb25lbnRzL3RpbWVsaW5lL3dpZGdldHMvZGlhbG9nLXZpZXctdGFzay9kaWFsb2ctdmlldy10YXNrLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBcUJ6RSxNQUFNLE9BQU8sdUJBQXVCO0lBS2xDLFlBQ1UsTUFBNkMsRUFDNUIsSUFBdUI7UUFEeEMsV0FBTSxHQUFOLE1BQU0sQ0FBdUM7UUFIaEQsWUFBTyxHQUFxQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBTTdDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQXhCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsNjhDQUFnRDs7YUFFakQ7OztZQXBCUSxZQUFZOzRDQTRCaEIsTUFBTSxTQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmludGVyZmFjZSBJbWFnZUludGVyZmFjZSB7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbn1cbmludGVyZmFjZSBUYXNraW5mb0ludGVyZmFjZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHR5cGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgdXNlck5hbWU6IHN0cmluZztcbiAgcmVwb3J0RGF0ZTogc3RyaW5nO1xuICBpbWFnZXM6IEltYWdlSW50ZXJmYWNlW11cbn1cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1kaWFsb2ctdmlldy10YXNrJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RpYWxvZy12aWV3LXRhc2suY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kaWFsb2ctdmlldy10YXNrLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nVmlld1Rhc2tDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgX3RpdGxlOiBzdHJpbmc7XG4gIHB1YmxpYyBfZGVzY3JpcHRpb246IHN0cmluZztcbiAgcHVibGljIF9pbWFnZXM6IEltYWdlSW50ZXJmYWNlW10gPSBuZXcgQXJyYXkoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nUmVmPERpYWxvZ1ZpZXdUYXNrQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgZGF0YTogVGFza2luZm9JbnRlcmZhY2VcbiAgKSB7XG4gICAgdGhpcy5fdGl0bGUgPSBkYXRhPy50eXBlO1xuICAgIHRoaXMuX2Rlc2NyaXB0aW9uID0gZGF0YT8uZGVzY3JpcHRpb247XG4gICAgdGhpcy5faW1hZ2VzID0gZGF0YT8uaW1hZ2VzO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5kaWFsb2cuY2xvc2UoKTtcbiAgfVxuXG59XG4iXX0=