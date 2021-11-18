const ListFilesModel = [
    { name: 'ai', icon: 'assets/icons/files/icon-ai.svg' },
    { name: 'avi', icon: 'assets/icons/files/icon-avi.svg' },
    { name: 'css', icon: 'assets/icons/files/icon-css.svg' },
    { name: 'csv', icon: 'assets/icons/files/icon-csv.svg' },
    { name: 'doc', icon: 'assets/icons/files/icon-doc.svg' },
    { name: 'docx', icon: 'assets/icons/files/icon-doc.svg' },
    { name: 'file', icon: 'assets/icons/files/icon-file.svg' },
    { name: 'html', icon: 'assets/icons/files/icon-html.svg' },
    { name: 'js', icon: 'assets/icons/files/icon-js.svg' },
    { name: 'jpg', icon: 'assets/icons/files/icon-jpg.svg' },
    { name: 'json', icon: 'assets/icons/files/icon-json-file.svg' },
    { name: 'mp3', icon: 'assets/icons/files/icon-mp3.svg' },
    { name: 'mp4', icon: 'assets/icons/files/icon-mp4.svg' },
    { name: 'pdf', icon: 'assets/icons/files/icon-pdf.svg' },
    { name: 'png', icon: 'assets/icons/files/icon-png.svg' },
    { name: 'ppt', icon: 'assets/icons/files/icon-ppt.svg' },
    { name: 'pptx', icon: 'assets/icons/files/icon-ppt.svg' },
    { name: 'psd', icon: 'assets/icons/files/icon-psd.svg' },
    { name: 'txt', icon: 'assets/icons/files/icon-txt.svg' },
    { name: 'text', icon: 'assets/icons/files/icon-txt.svg' },
    { name: 'xls', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xlsx', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xlsm', icon: 'assets/icons/files/icon-xls.svg' },
    { name: 'xml', icon: 'assets/icons/files/icon-xml.svg' },
    { name: 'zip', icon: 'assets/icons/files/icon-zip.svg' },
    { name: 'rar', icon: 'assets/icons/files/icon-zip.svg' }
];
export class IconFiles {
    /** Default 'icon-file' type none */
    static iconFile(extension) {
        let icon = ListFilesModel.find((obj) => obj.name === extension);
        if (!!icon) {
            return icon.icon;
        }
        else {
            icon = ListFilesModel.find((obj) => obj.name === 'file');
            return icon.icon;
        }
    }
    /** Default 'icon-file' type none */
    getIconFile(extension) {
        let icon = ListFilesModel.find((obj) => obj.name === extension);
        if (!!icon) {
            console.log('icon', icon);
            return icon.icon;
        }
        else {
            icon = ListFilesModel.find((obj) => obj.name === 'file');
            return icon.icon;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1maWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RpbWVsaW5lLWFzc2V0cy9zcmMvbGliL2NvbW1vbi9pY29uLWZpbGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sY0FBYyxHQUF5QjtJQUN6QyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGdDQUFnQyxFQUFFO0lBQ3RELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN6RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGtDQUFrQyxFQUFFO0lBQzFELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxnQ0FBZ0MsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsdUNBQXVDLEVBQUU7SUFDL0QsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3pELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7SUFDekQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxpQ0FBaUMsRUFBRTtJQUN4RCxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGlDQUFpQyxFQUFFO0lBQ3hELEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUU7Q0FDM0QsQ0FBQTtBQUVELE1BQU0sT0FBTyxTQUFTO0lBQ2xCLG9DQUFvQztJQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQWtCO1FBQ3JDLElBQUksSUFBSSxHQUFrQixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxDQUFBO1FBQzlFLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtZQUNSLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtTQUNuQjthQUFNO1lBQ0gsSUFBSSxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUE7WUFDeEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO1NBQ25CO0lBQ0wsQ0FBQztJQUVELG9DQUFvQztJQUM3QixXQUFXLENBQUMsU0FBa0I7UUFDakMsSUFBSSxJQUFJLEdBQWtCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUE7UUFDOUUsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO1NBRW5CO2FBQU07WUFDSCxJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQTtZQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUE7U0FDbkI7SUFDTCxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbnRlcmZhY2UgSWNvbkZpbGVNb2RlbCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBpY29uOiBzdHJpbmc7XHJcbn1cclxuY29uc3QgTGlzdEZpbGVzTW9kZWw6IEFycmF5PEljb25GaWxlTW9kZWw+ID0gW1xyXG4gICAgeyBuYW1lOiAnYWknLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24tYWkuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnYXZpJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLWF2aS5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdjc3MnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24tY3NzLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ2NzdicsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1jc3Yuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnZG9jJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLWRvYy5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdkb2N4JywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLWRvYy5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdmaWxlJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLWZpbGUuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnaHRtbCcsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1odG1sLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ2pzJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLWpzLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ2pwZycsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1qcGcuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnanNvbicsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1qc29uLWZpbGUuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnbXAzJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLW1wMy5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdtcDQnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24tbXA0LnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3BkZicsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1wZGYuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAncG5nJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLXBuZy5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdwcHQnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24tcHB0LnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3BwdHgnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24tcHB0LnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3BzZCcsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi1wc2Quc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAndHh0JywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLXR4dC5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICd0ZXh0JywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLXR4dC5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICd4bHMnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24teGxzLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3hsc3gnLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24teGxzLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3hsc20nLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24teGxzLnN2ZycgfSxcclxuICAgIHsgbmFtZTogJ3htbCcsIGljb246ICdhc3NldHMvaWNvbnMvZmlsZXMvaWNvbi14bWwuc3ZnJyB9LFxyXG4gICAgeyBuYW1lOiAnemlwJywgaWNvbjogJ2Fzc2V0cy9pY29ucy9maWxlcy9pY29uLXppcC5zdmcnIH0sXHJcbiAgICB7IG5hbWU6ICdyYXInLCBpY29uOiAnYXNzZXRzL2ljb25zL2ZpbGVzL2ljb24temlwLnN2ZycgfVxyXG5dXHJcblxyXG5leHBvcnQgY2xhc3MgSWNvbkZpbGVzIHtcclxuICAgIC8qKiBEZWZhdWx0ICdpY29uLWZpbGUnIHR5cGUgbm9uZSAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBpY29uRmlsZShleHRlbnNpb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaWNvbjogSWNvbkZpbGVNb2RlbCA9IExpc3RGaWxlc01vZGVsLmZpbmQoKG9iaikgPT4gb2JqLm5hbWUgPT09IGV4dGVuc2lvbilcclxuICAgICAgICBpZiAoISFpY29uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpY29uLmljb25cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpY29uID0gTGlzdEZpbGVzTW9kZWwuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gJ2ZpbGUnKVxyXG4gICAgICAgICAgICByZXR1cm4gaWNvbi5pY29uXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKiBEZWZhdWx0ICdpY29uLWZpbGUnIHR5cGUgbm9uZSAqL1xyXG4gICAgcHVibGljIGdldEljb25GaWxlKGV4dGVuc2lvbj86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBpY29uOiBJY29uRmlsZU1vZGVsID0gTGlzdEZpbGVzTW9kZWwuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gZXh0ZW5zaW9uKVxyXG4gICAgICAgIGlmICghIWljb24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ljb24nLCBpY29uKVxyXG4gICAgICAgICAgICByZXR1cm4gaWNvbi5pY29uXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGljb24gPSBMaXN0RmlsZXNNb2RlbC5maW5kKChvYmopID0+IG9iai5uYW1lID09PSAnZmlsZScpXHJcbiAgICAgICAgICAgIHJldHVybiBpY29uLmljb25cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=