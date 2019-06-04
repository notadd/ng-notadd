import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise, filter } from 'rxjs/operators';
import { cloneDeep } from 'lodash';

export interface DialogData {
    canvas: HTMLCanvasElement;
}

@Component({
    selector: 'screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class NotaddScreenshotComponent implements OnInit, AfterViewInit {

    @ViewChild('captureWrapper', { static: true }) captureWrapper: ElementRef;
    @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;

    isMark: boolean;
    private ctx: CanvasRenderingContext2D;

    constructor(
        private dialogRef: MatDialogRef<NotaddScreenshotComponent>,
        @Inject(MAT_DIALOG_DATA) private data: DialogData,
        private renderer: Renderer2,
        private snackBar: MatSnackBar
    ) {
        this.isMark = false;
    }

    ngOnInit() {
        this.init();
    }

    mark() {
        this.isMark = !this.isMark;
    }

    init() {
        this.renderer.appendChild(this.captureWrapper.nativeElement, this.data.canvas);
    }

    saveAsImg() {
        const canvas = this.data.canvas;
        let href;

        try {
            href = canvas.toDataURL('image/png');
        } catch (e) {
            this.snackBar.open(e, '知道了', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            return;
        }

        this.renderer.setAttribute(this.downloadLink.nativeElement, 'href', href);
        this.renderer.setAttribute(this.downloadLink.nativeElement, 'download', `capture_${new Date().getTime()}.png`);
        this.downloadLink.nativeElement.click();

        this.dialogRef.close();
    }

    ngAfterViewInit() {
        const canvasEl: HTMLCanvasElement = this.data.canvas;
        this.ctx = canvasEl.getContext('2d');

        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = '#F00';

        this.captureEvents(canvasEl);
    }

    private captureEvents(canvasEl: HTMLCanvasElement) {
        // this will capture all mousedown events from the canvas element
        fromEvent(canvasEl, 'mousedown')
            .pipe(
                filter(_ => this.isMark),
                switchMap(_ => {
                    // after a mouse down, we'll record all mouse moves
                    return fromEvent(canvasEl, 'mousemove')
                        .pipe(
                            // we'll stop (and unsubscribe) once the user releases the mouse
                            // this will trigger a 'mouseup' event
                            takeUntil(fromEvent(canvasEl, 'mouseup')),
                            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
                            takeUntil(fromEvent(canvasEl, 'mouseleave')),
                            // pairwise lets us get the previous value to draw a line from
                            // the previous point to the current point
                            pairwise()
                        );
                })
            )
            .subscribe((res: [MouseEvent, MouseEvent]) => {
                const rect = canvasEl.getBoundingClientRect();

                // previous and current position with the offset
                const prevPos = {
                    x: res[0].clientX - rect.left,
                    y: res[0].clientY - rect.top
                };

                const currentPos = {
                    x: res[1].clientX - rect.left,
                    y: res[1].clientY - rect.top
                };

                // this method we'll implement soon to do the actual drawing
                this.drawOnCanvas(prevPos, currentPos);
            });
    }

    private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
        if (!this.ctx) { return; }

        this.ctx.beginPath();

        if (prevPos) {
            this.ctx.moveTo(prevPos.x, prevPos.y); // from
            this.ctx.lineTo(currentPos.x, currentPos.y);
            this.ctx.stroke();
        }
    }
}
