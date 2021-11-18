import { Component, Input } from '@angular/core';
import { UserAuthedService } from './services/user-auth.service';
export class TimelineAssetsComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtYXNzZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL3RpbWVsaW5lLWFzc2V0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFPakUsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUNVLFFBQTJCO1FBQTNCLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBSDlCLG1CQUFjLEdBQVcsSUFBSSxDQUFDO0lBSWpDLENBQUM7SUFFTCxJQUFhLFNBQVMsQ0FBQyxLQUFVO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFhLGFBQWEsQ0FBQyxHQUFXO1FBQ3BDLElBQUcsR0FBRztZQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFhLFFBQVEsQ0FBQyxJQUFTO1FBQzdCLElBQUcsSUFBSTtZQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7O1lBMUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixxSkFBK0M7O2FBRWhEOzs7WUFOUSxpQkFBaUI7Ozt3QkFldkIsS0FBSzs0QkFJTCxLQUFLO3VCQUlMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVzZXJBdXRoZWRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy91c2VyLWF1dGguc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi10aW1lbGluZS1hc3NldHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGltZWxpbmUtYXNzZXRzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGltZWxpbmUtYXNzZXRzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVBc3NldHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgX2Fzc2V0SW5mbzogYW55O1xuICBwdWJsaWMgX3RyaWdnZXJOdW1iZXI6IG51bWJlciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYXV0aFNlcjogVXNlckF1dGhlZFNlcnZpY2VcbiAgKSB7IH1cblxuICBASW5wdXQoKSBzZXQgQXNzZXRJbmZvKGl0ZW1zOiBhbnkpe1xuICAgIHRoaXMuX2Fzc2V0SW5mbyA9IGl0ZW1zO1xuICB9XG5cbiAgQElucHV0KCkgc2V0IFRyaWdnZXJOdW1iZXIobnVtOiBudW1iZXIpIHtcbiAgICBpZihudW0pIHRoaXMuX3RyaWdnZXJOdW1iZXIgPSBudW07XG4gIH1cblxuICBASW5wdXQoKSBzZXQgdXNlclVudGgodXNlcjogYW55KXtcbiAgICBpZih1c2VyKSAgdGhpcy5fYXV0aFNlci5zZXRBdXRoVXNlcih1c2VyKVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19