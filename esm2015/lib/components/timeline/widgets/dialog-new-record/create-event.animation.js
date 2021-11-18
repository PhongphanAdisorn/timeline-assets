import { animate, query, stagger, style, transition, trigger } from "@angular/animations";
const ExitStyle = { opacity: 0, transform: 'scale(0.8)' };
const EnterStyle = { opacity: 1, transform: 'scale(1)' };
export const FadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('500ms', style({ opacity: 0 }))]),
]);
export const FadeInGrow = trigger('fadeInGrow', [
    transition(':enter', [
        query(':enter', [
            style(ExitStyle),
            stagger('100ms', [animate('500ms', style(EnterStyle))]),
        ]),
    ]),
    transition(':leave', [
        query(':leave', [
            stagger('-100ms', [animate('500ms', style(ExitStyle))]),
        ]),
    ]),
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWV2ZW50LmFuaW1hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL2NvbXBvbmVudHMvdGltZWxpbmUvd2lkZ2V0cy9kaWFsb2ctbmV3LXJlY29yZC9jcmVhdGUtZXZlbnQuYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzFGLE1BQU0sU0FBUyxHQUFHLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFDMUQsTUFBTSxVQUFVLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQztBQUd6RCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRTtJQUMxQyxVQUFVLENBQUMsUUFBUSxFQUFFO1FBQ2pCLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzFDLENBQUM7SUFDRixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLEVBQUU7SUFDNUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtRQUNqQixLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ1osS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNoQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFELENBQUM7S0FDTCxDQUFDO0lBQ0YsVUFBVSxDQUFDLFFBQVEsRUFBRTtRQUNqQixLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ1osT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxRCxDQUFDO0tBQ0wsQ0FBQztDQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHF1ZXJ5LCBzdGFnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gXCJAYW5ndWxhci9hbmltYXRpb25zXCI7XHJcbmNvbnN0IEV4aXRTdHlsZSA9IHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAnc2NhbGUoMC44KScgfTtcclxuY29uc3QgRW50ZXJTdHlsZSA9IHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAnc2NhbGUoMSknIH07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEZhZGVJbk91dCA9IHRyaWdnZXIoJ2ZhZGVJbk91dCcsIFtcclxuICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXHJcbiAgICAgICAgYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxyXG4gICAgXSksXHJcbiAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXSksXHJcbl0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZhZGVJbkdyb3cgPSB0cmlnZ2VyKCdmYWRlSW5Hcm93JywgW1xyXG4gICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgIHF1ZXJ5KCc6ZW50ZXInLCBbXHJcbiAgICAgICAgICAgIHN0eWxlKEV4aXRTdHlsZSksXHJcbiAgICAgICAgICAgIHN0YWdnZXIoJzEwMG1zJywgW2FuaW1hdGUoJzUwMG1zJywgc3R5bGUoRW50ZXJTdHlsZSkpXSksXHJcbiAgICAgICAgXSksXHJcbiAgICBdKSxcclxuICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcclxuICAgICAgICBxdWVyeSgnOmxlYXZlJywgW1xyXG4gICAgICAgICAgICBzdGFnZ2VyKCctMTAwbXMnLCBbYW5pbWF0ZSgnNTAwbXMnLCBzdHlsZShFeGl0U3R5bGUpKV0pLFxyXG4gICAgICAgIF0pLFxyXG4gICAgXSksXHJcbl0pOyJdfQ==