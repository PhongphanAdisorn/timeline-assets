import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TimelineModule } from './components/timeline/timeline.module';
import { TimelineAssetsComponent } from './timeline-assets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
export class TimelineAssetsModule {
}
TimelineAssetsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineAssetsComponent],
                imports: [
                    // BrowserModule,
                    CommonModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtYXNzZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL3RpbWVsaW5lLWFzc2V0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUMsQ0FBQyxrQkFBa0I7QUFDbEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQXNCL0MsTUFBTSxPQUFPLG9CQUFvQjs7O1lBbkJoQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDUCxpQkFBaUI7b0JBQ2pCLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQix1QkFBdUI7b0JBQ3ZCLGNBQWM7b0JBQ2QsV0FBVztvQkFDWCxtQkFBbUI7b0JBRW5CLE9BQU87b0JBQ1AsbUJBQW1CO29CQUNuQixtQkFBbUI7aUJBQ3BCO2dCQUNELE9BQU8sRUFBRSxDQUFDLHVCQUF1QixDQUFDO2dCQUNsQyxTQUFTLEVBQUUsRUFDVjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBUaW1lbGluZU1vZHVsZSB9IGZyb20gJy4vY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5tb2R1bGUnO1xuaW1wb3J0IHsgVGltZWxpbmVBc3NldHNDb21wb25lbnQgfSBmcm9tICcuL3RpbWVsaW5lLWFzc2V0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJvd3NlckFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL2FuaW1hdGlvbnMnOyAvLyB0aGlzIGlzIG5lZWRlZCFcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtUaW1lbGluZUFzc2V0c0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICAvLyBCcm93c2VyTW9kdWxlLFxuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEJyb3dzZXJBbmltYXRpb25zTW9kdWxlLFxuICAgIFRpbWVsaW5lTW9kdWxlLCBcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgLy8gbWF0IFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1RpbWVsaW5lQXNzZXRzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbIFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQXNzZXRzTW9kdWxlIHsgIH1cbiJdfQ==