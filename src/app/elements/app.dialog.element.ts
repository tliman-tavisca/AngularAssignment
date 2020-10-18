import { Component, Input, OnInit } from '@angular/core';
import { ConfirmDialogService } from '../services/app.dialog.service';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: 'app.dialog.element.html',
    styleUrls: ['app.dialog.element.css']
})

export class ConfirmDialogComponent implements OnInit {
    message: any;
    constructor(
        private confirmDialogService: ConfirmDialogService
    ) { }

    ngOnInit(): any {
        this.confirmDialogService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
}  