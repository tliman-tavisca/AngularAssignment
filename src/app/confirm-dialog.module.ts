import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';

import { ConfirmDialogComponent } from './elements/app.dialog.element';
import { ConfirmDialogService } from './services/app.dialog.service';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        CommonModule
    ],
    exports: [
        ConfirmDialogComponent
    ],
    providers: [
        ConfirmDialogService
    ]
})
export class ConfirmDialogModule {
    constructor(private injector: Injector) {
        const modalElement = createCustomElement(ConfirmDialogComponent, { injector: this.injector });
        customElements.define('confirm-dialog', modalElement);
    }
}  