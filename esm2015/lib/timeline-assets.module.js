import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimelineModule } from './components/timeline/timeline.module';
import { TimelineAssetsComponent } from './timeline-assets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
export class TimelineAssetsModule {
}
TimelineAssetsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineAssetsComponent],
                imports: [
                    BrowserModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtYXNzZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL3RpbWVsaW5lLWFzc2V0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHNDQUFzQyxDQUFDLENBQUMsa0JBQWtCO0FBQ2xHLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQXFCN0QsTUFBTSxPQUFPLG9CQUFvQjs7O1lBbEJoQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDUCxhQUFhO29CQUNiLGdCQUFnQjtvQkFDaEIsdUJBQXVCO29CQUN2QixjQUFjO29CQUNkLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUVuQixPQUFPO29CQUNQLG1CQUFtQjtvQkFDbkIsbUJBQW1CO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDbEMsU0FBUyxFQUFFLEVBQ1Y7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgVGltZWxpbmVNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvdGltZWxpbmUvdGltZWxpbmUubW9kdWxlJztcbmltcG9ydCB7IFRpbWVsaW5lQXNzZXRzQ29tcG9uZW50IH0gZnJvbSAnLi90aW1lbGluZS1hc3NldHMuY29tcG9uZW50JztcbmltcG9ydCB7IEJyb3dzZXJBbmltYXRpb25zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zJzsgLy8gdGhpcyBpcyBuZWVkZWQhXG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtUaW1lbGluZUFzc2V0c0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUsXG4gICAgVGltZWxpbmVNb2R1bGUsIFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG5cbiAgICAvLyBtYXQgXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbVGltZWxpbmVBc3NldHNDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFsgXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVBc3NldHNNb2R1bGUgeyAgfVxuIl19