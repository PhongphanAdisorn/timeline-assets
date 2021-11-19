import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TimelineModule } from './components/timeline/timeline.module';
import { TimelineAssetsComponent } from './timeline-assets.component';
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
                    CommonModule,
                    HttpClientModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtYXNzZXRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL3RpbWVsaW5lLWFzc2V0cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDdkUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQW9CL0MsTUFBTSxPQUFPLG9CQUFvQjs7O1lBakJoQyxRQUFRLFNBQUM7Z0JBQ1IsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ3ZDLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGdCQUFnQjtvQkFDaEIsY0FBYztvQkFDZCxXQUFXO29CQUNYLG1CQUFtQjtvQkFFbkIsT0FBTztvQkFDUCxtQkFBbUI7b0JBQ25CLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsdUJBQXVCLENBQUM7Z0JBQ2xDLFNBQVMsRUFBRSxFQUNWO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJyb3dzZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IFRpbWVsaW5lTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3RpbWVsaW5lL3RpbWVsaW5lLm1vZHVsZSc7XG5pbXBvcnQgeyBUaW1lbGluZUFzc2V0c0NvbXBvbmVudCB9IGZyb20gJy4vdGltZWxpbmUtYXNzZXRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyQW5pbWF0aW9uc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvYW5pbWF0aW9ucyc7IC8vIHRoaXMgaXMgbmVlZGVkIVxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1RpbWVsaW5lQXNzZXRzQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIFRpbWVsaW5lTW9kdWxlLCBcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuXG4gICAgLy8gbWF0IFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW1RpbWVsaW5lQXNzZXRzQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbIFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQXNzZXRzTW9kdWxlIHsgIH1cbiJdfQ==