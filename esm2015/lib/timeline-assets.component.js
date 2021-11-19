import { Component, Input } from '@angular/core';
import { UserAuthedService } from './services/user-auth.service';
export class TimelineAssetsComponent {
    constructor(_authSer) {
        this._authSer = _authSer;
        this._triggerNumber = null;
    }
    set AssetInfo(items) {
        this._assetInfo = items;
        // this._assetInfo = this.dataTest;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtYXNzZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL3RpbWVsaW5lLWFzc2V0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFPakUsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUNVLFFBQTJCO1FBQTNCLGFBQVEsR0FBUixRQUFRLENBQW1CO1FBSDlCLG1CQUFjLEdBQVcsSUFBSSxDQUFDO0lBSWpDLENBQUM7SUFFTCxJQUFhLFNBQVMsQ0FBQyxLQUFVO1FBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLG1DQUFtQztJQUNyQyxDQUFDO0lBRUQsSUFBYSxhQUFhLENBQUMsR0FBVztRQUNwQyxJQUFHLEdBQUc7WUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBYSxRQUFRLENBQUMsSUFBUztRQUM3QixJQUFHLElBQUk7WUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQyxDQUFDO0lBRUQsUUFBUTtJQUNSLENBQUM7OztZQTNCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IscUpBQStDOzthQUVoRDs7O1lBTlEsaUJBQWlCOzs7d0JBZXZCLEtBQUs7NEJBS0wsS0FBSzt1QkFJTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyQXV0aGVkU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdXNlci1hdXRoLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItdGltZWxpbmUtYXNzZXRzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLWFzc2V0cy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RpbWVsaW5lLWFzc2V0cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQXNzZXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIF9hc3NldEluZm86IGFueTtcbiAgcHVibGljIF90cmlnZ2VyTnVtYmVyOiBudW1iZXIgPSBudWxsO1xuICBcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYXV0aFNlcjogVXNlckF1dGhlZFNlcnZpY2VcbiAgKSB7IH1cblxuICBASW5wdXQoKSBzZXQgQXNzZXRJbmZvKGl0ZW1zOiBhbnkpe1xuICAgIHRoaXMuX2Fzc2V0SW5mbyA9IGl0ZW1zO1xuICAgIC8vIHRoaXMuX2Fzc2V0SW5mbyA9IHRoaXMuZGF0YVRlc3Q7XG4gIH1cblxuICBASW5wdXQoKSBzZXQgVHJpZ2dlck51bWJlcihudW06IG51bWJlcikge1xuICAgIGlmKG51bSkgdGhpcy5fdHJpZ2dlck51bWJlciA9IG51bTtcbiAgfVxuXG4gIEBJbnB1dCgpIHNldCB1c2VyVW50aCh1c2VyOiBhbnkpe1xuICAgIGlmKHVzZXIpICB0aGlzLl9hdXRoU2VyLnNldEF1dGhVc2VyKHVzZXIpXG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG59XG4iXX0=