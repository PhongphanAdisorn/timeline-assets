import { Directive, Input } from '@angular/core';
export class ErrorImgUserDirective {
    constructor() {
        this.src = null;
        this.default = null;
    }
    onError() {
        this.src = (!this.default) ? `https://highwaydistrict.com/doh_district/resources/img/user-default.png` : this.default;
    }
}
ErrorImgUserDirective.decorators = [
    { type: Directive, args: [{
                selector: '[error-img-user]',
                host: {
                    '(error)': 'onError()',
                    '[src]': 'src'
                }
            },] }
];
ErrorImgUserDirective.ctorParameters = () => [];
ErrorImgUserDirective.propDecorators = {
    src: [{ type: Input }],
    default: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaW1nLXVzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90aW1lbGluZS1hc3NldHMvc3JjL2xpYi9kaXJlY3RpdmVzL2Vycm9yLWltZy9lcnJvci1pbWctdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVNqRCxNQUFNLE9BQU8scUJBQXFCO0lBSTlCO1FBSFMsUUFBRyxHQUFXLElBQUksQ0FBQztRQUNuQixZQUFPLEdBQVcsSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFFVCxPQUFPO1FBQ1gsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMxSCxDQUFDOzs7WUFmSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxXQUFXO29CQUN0QixPQUFPLEVBQUUsS0FBSztpQkFDakI7YUFDSjs7OztrQkFFSSxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2Vycm9yLWltZy11c2VyXScsIC8vIEF0dHJpYnV0ZSBzZWxlY3RvclxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoZXJyb3IpJzogJ29uRXJyb3IoKScsXHJcbiAgICAgICAgJ1tzcmNdJzogJ3NyYydcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIEVycm9ySW1nVXNlckRpcmVjdGl2ZSB7XHJcbiAgICBASW5wdXQoKSBzcmM6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBkZWZhdWx0OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuc3JjID0gKCF0aGlzLmRlZmF1bHQpID8gYGh0dHBzOi8vaGlnaHdheWRpc3RyaWN0LmNvbS9kb2hfZGlzdHJpY3QvcmVzb3VyY2VzL2ltZy91c2VyLWRlZmF1bHQucG5nYCA6IHRoaXMuZGVmYXVsdDtcclxuICAgIH1cclxufVxyXG4iXX0=