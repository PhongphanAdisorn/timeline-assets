import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimelineToolsModule } from './widgets/timeline-tools/timeline-tools.module';
import { DialogNewRecordModule } from './widgets/dialog-new-record/dialog-new-record.module';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogViewTaskModule } from './widgets/dialog-view-task/dialog-view-task.module';
import { AddBudgetCodeMaintenanceModule } from '../main-dialog/add-budget-code-maintenance/add-budget-code-maintenance.module';
export class TimelineModule {
}
TimelineModule.decorators = [
    { type: NgModule, args: [{
                declarations: [TimelineComponent],
                imports: [
                    CommonModule,
                    FlexLayoutModule,
                    MatRippleModule,
                    MatDialogModule,
                    MatIconModule,
                    MatSnackBarModule,
                    MatProgressBarModule,
                    /** Timeline Widgets */
                    TimelineToolsModule,
                    DialogNewRecordModule,
                    DialogViewTaskModule,
                    AddBudgetCodeMaintenanceModule
                ],
                exports: [TimelineComponent],
                providers: []
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvY29tcG9uZW50cy90aW1lbGluZS90aW1lbGluZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDckYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDN0YsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDMUYsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sK0VBQStFLENBQUM7QUFzQi9ILE1BQU0sT0FBTyxjQUFjOzs7WUFwQjFCLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixlQUFlO29CQUNmLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFFcEIsdUJBQXVCO29CQUN2QixtQkFBbUI7b0JBQ25CLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQiw4QkFBOEI7aUJBQy9CO2dCQUNELE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUFDO2dCQUM1QixTQUFTLEVBQUUsRUFBRzthQUNmIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUaW1lbGluZUNvbXBvbmVudCB9IGZyb20gJy4vdGltZWxpbmUuY29tcG9uZW50JztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBUaW1lbGluZVRvb2xzTW9kdWxlIH0gZnJvbSAnLi93aWRnZXRzL3RpbWVsaW5lLXRvb2xzL3RpbWVsaW5lLXRvb2xzLm1vZHVsZSc7XG5pbXBvcnQgeyBEaWFsb2dOZXdSZWNvcmRNb2R1bGUgfSBmcm9tICcuL3dpZGdldHMvZGlhbG9nLW5ldy1yZWNvcmQvZGlhbG9nLW5ldy1yZWNvcmQubW9kdWxlJztcbmltcG9ydCB7IE1hdFJpcHBsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc25hY2stYmFyJztcbmltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcHJvZ3Jlc3MtYmFyJztcbmltcG9ydCB7IERpYWxvZ1ZpZXdUYXNrTW9kdWxlIH0gZnJvbSAnLi93aWRnZXRzL2RpYWxvZy12aWV3LXRhc2svZGlhbG9nLXZpZXctdGFzay5tb2R1bGUnO1xuaW1wb3J0IHsgQWRkQnVkZ2V0Q29kZU1haW50ZW5hbmNlTW9kdWxlIH0gZnJvbSAnLi4vbWFpbi1kaWFsb2cvYWRkLWJ1ZGdldC1jb2RlLW1haW50ZW5hbmNlL2FkZC1idWRnZXQtY29kZS1tYWludGVuYW5jZS5tb2R1bGUnOyBcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVGltZWxpbmVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0UmlwcGxlTW9kdWxlLFxuICAgIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuXG4gICAgLyoqIFRpbWVsaW5lIFdpZGdldHMgKi9cbiAgICBUaW1lbGluZVRvb2xzTW9kdWxlLFxuICAgIERpYWxvZ05ld1JlY29yZE1vZHVsZSxcbiAgICBEaWFsb2dWaWV3VGFza01vZHVsZSxcbiAgICBBZGRCdWRnZXRDb2RlTWFpbnRlbmFuY2VNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW1RpbWVsaW5lQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbIF1cbn0pXG5leHBvcnQgY2xhc3MgVGltZWxpbmVNb2R1bGUgeyBcbn1cbiJdfQ==