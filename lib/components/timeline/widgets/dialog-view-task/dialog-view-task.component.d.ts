import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
interface ImageInterface {
    imageUrl: string;
    name: string;
    title: string;
    description: string;
}
interface TaskinfoInterface {
    id: string;
    type: string;
    description: string;
    userName: string;
    reportDate: string;
    images: ImageInterface[];
}
export declare class DialogViewTaskComponent implements OnInit {
    private dialog;
    _title: string;
    _description: string;
    _images: ImageInterface[];
    constructor(dialog: MatDialogRef<DialogViewTaskComponent>, data: TaskinfoInterface);
    ngOnInit(): void;
    close(): void;
}
export {};
