import { Injectable, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as html2canvas from 'html2canvas';

import { NotaddScreenshotComponent } from '@notadd/components/screenshot/screenshot.component';

@Injectable()
export class NotaddScreenshotService implements OnInit {

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
    }

    ngOnInit() {
    }

    capture(element: ElementRef) {
        this.captureDom(element)
            .then(canvas => {
                this.dialog.open(NotaddScreenshotComponent, {
                    data: {
                        canvas
                    }
                });
            }, err => {
                this.snackBar.open(err, '知道了', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            });
    }

    private captureDom(dom) {
        /* dom 宽度、高度、距离顶部的偏移量 */
        const { width, height, offsetTop } = dom;
        const canvas = document.createElement('canvas'); // 创建canvas 对象
        canvas.id = 'capture-canvas';
        const context = canvas.getContext('2d');
        const scaleBy = this.getPixelRatio(context); // 获取像素密度的方法 (也可以采用自定义缩放比例)
        canvas.width = width * scaleBy; // 这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
        canvas.height = (height + offsetTop) * scaleBy; // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
        context.scale(scaleBy, scaleBy);
        const options = {
            allowTaint: true, // 允许加载跨域的图片
            useCORS: true,
            tainttest: true, // 检测每张图片都已经加载完成
            scale: scaleBy, // 添加的scale 参数
            canvas, // 自定义 canvas
            logging: false, // 日志开关，发布的时候记得改成false
            width, // dom 原始宽度
            height // dom 原始高度
        };

        return html2canvas(dom, options);
    }

    private getPixelRatio(context) {
        const backingStore =
            context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio ||
            1;
        return (window.devicePixelRatio || 1) / backingStore;
    }
}
