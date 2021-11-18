import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogViewTaskComponent } from './dialog-view-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirectivesModule } from 'projects/timeline-assets/src/lib/directives/directives.module';
export class DialogViewTaskModule {
}
DialogViewTaskModule.decorators = [
    { type: NgModule, args: [{
                declarations: [DialogViewTaskComponent],
                imports: [
                    CommonModule,
                    MatDialogModule,
                    FlexLayoutModule,
                    MatIconModule,
                    MatButtonModule,
                    MatTooltipModule,
                    /** Directives */
                    DirectivesModule
                ],
                exports: [DialogViewTaskComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXZpZXctdGFzay5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lbGluZS1hc3NldHMvc3JjL2xpYi9jb21wb25lbnRzL3RpbWVsaW5lL3dpZGdldHMvZGlhbG9nLXZpZXctdGFzay9kaWFsb2ctdmlldy10YXNrLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwrREFBK0QsQ0FBQztBQW1CakcsTUFBTSxPQUFPLG9CQUFvQjs7O1lBZmhDLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztnQkFDdkMsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osZUFBZTtvQkFDZixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixnQkFBZ0I7b0JBRWhCLGlCQUFpQjtvQkFDakIsZ0JBQWdCO2lCQUNqQjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQzthQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRGlhbG9nVmlld1Rhc2tDb21wb25lbnQgfSBmcm9tICcuL2RpYWxvZy12aWV3LXRhc2suY29tcG9uZW50JztcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBGbGV4TGF5b3V0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnOyBcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5pbXBvcnQgeyBEaXJlY3RpdmVzTW9kdWxlIH0gZnJvbSAncHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLm1vZHVsZSc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtEaWFsb2dWaWV3VGFza0NvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxuICAgIEZsZXhMYXlvdXRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0VG9vbHRpcE1vZHVsZSxcblxuICAgIC8qKiBEaXJlY3RpdmVzICovXG4gICAgRGlyZWN0aXZlc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRGlhbG9nVmlld1Rhc2tDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ1ZpZXdUYXNrTW9kdWxlIHsgfVxuIl19