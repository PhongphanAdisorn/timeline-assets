import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorImgDirective } from './error-img/error-img';
import { ErrorImgUserDirective } from './error-img/error-img-user';
export class DirectivesModule {
}
DirectivesModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ErrorImgDirective,
                    ErrorImgUserDirective
                ],
                imports: [
                    CommonModule,
                ],
                exports: [
                    ErrorImgDirective,
                    ErrorImgUserDirective
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lbGluZS1hc3NldHMvc3JjL2xpYi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBZW5FLE1BQU0sT0FBTyxnQkFBZ0I7OztZQWI1QixRQUFRLFNBQUM7Z0JBQ04sWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtvQkFDakIscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixxQkFBcUI7aUJBQ3hCO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEVycm9ySW1nRGlyZWN0aXZlIH0gZnJvbSAnLi9lcnJvci1pbWcvZXJyb3ItaW1nJztcbmltcG9ydCB7IEVycm9ySW1nVXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZXJyb3ItaW1nL2Vycm9yLWltZy11c2VyJztcblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRXJyb3JJbWdEaXJlY3RpdmUsXG4gICAgICAgIEVycm9ySW1nVXNlckRpcmVjdGl2ZVxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIEVycm9ySW1nRGlyZWN0aXZlLFxuICAgICAgICBFcnJvckltZ1VzZXJEaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIERpcmVjdGl2ZXNNb2R1bGUgeyB9XG4iXX0=