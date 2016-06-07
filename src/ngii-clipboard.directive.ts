import {Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import Clipboard = require('clipboard');

@Directive({
    selector: '[ngIIclipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    clipboard: Clipboard;

    @Input('ngIIclipboard') targetElm: ElementRef;

    @Output('cbOnSuccess') onSuccess: EventEmitter<boolean> = new EventEmitter();

    @Output('cbOnError') onError: EventEmitter<boolean> = new EventEmitter();

    constructor(private elmRef: ElementRef) { }

    ngOnInit() {
        this.clipboard = new Clipboard(this.elmRef.nativeElement, {
            target: () => this.targetElm.nativeElement
        });

        this.clipboard.on('success', (e) => this.onSuccess.emit(true));

        this.clipboard.on('error', (e) => this.onError.emit(true));
    }

    ngOnDestroy() {
        !!this.clipboard && this.clipboard.destroy();
    }
}