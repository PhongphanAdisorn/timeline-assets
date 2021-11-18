import { Directive, Input } from '@angular/core';
export class ErrorImgDirective {
    constructor() {
        this.src = null;
        this.default = null;
    }
    onError() {
        this.src = (!this.default) ? `https://highwaydistrict.com/doh_district/resources/img/img-default.jpg` : this.default;
    }
}
ErrorImgDirective.decorators = [
    { type: Directive, args: [{
                selector: '[error-img]',
                host: {
                    '(error)': 'onError()',
                    '[src]': 'src'
                }
            },] }
];
ErrorImgDirective.ctorParameters = () => [];
ErrorImgDirective.propDecorators = {
    src: [{ type: Input }],
    default: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaW1nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGltZWxpbmUtYXNzZXRzL3NyYy9saWIvZGlyZWN0aXZlcy9lcnJvci1pbWcvZXJyb3ItaW1nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU2pELE1BQU0sT0FBTyxpQkFBaUI7SUFJMUI7UUFIUyxRQUFHLEdBQVcsSUFBSSxDQUFDO1FBQ25CLFlBQU8sR0FBVyxJQUFJLENBQUM7SUFFaEIsQ0FBQztJQUVULE9BQU87UUFDWCxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdFQUF3RSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3pILENBQUM7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsSUFBSSxFQUFFO29CQUNGLFNBQVMsRUFBRSxXQUFXO29CQUN0QixPQUFPLEVBQUUsS0FBSztpQkFDakI7YUFDSjs7OztrQkFFSSxLQUFLO3NCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW2Vycm9yLWltZ10nLCAvLyBBdHRyaWJ1dGUgc2VsZWN0b3JcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnKGVycm9yKSc6ICdvbkVycm9yKCknLFxyXG4gICAgICAgICdbc3JjXSc6ICdzcmMnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBFcnJvckltZ0RpcmVjdGl2ZSB7XHJcbiAgICBASW5wdXQoKSBzcmM6IHN0cmluZyA9IG51bGw7XHJcbiAgICBASW5wdXQoKSBkZWZhdWx0OiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuc3JjID0gKCF0aGlzLmRlZmF1bHQpID8gYGh0dHBzOi8vaGlnaHdheWRpc3RyaWN0LmNvbS9kb2hfZGlzdHJpY3QvcmVzb3VyY2VzL2ltZy9pbWctZGVmYXVsdC5qcGdgIDogdGhpcy5kZWZhdWx0O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==