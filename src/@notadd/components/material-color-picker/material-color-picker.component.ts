import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { notaddAnimations } from '@notadd/animations';
import { MatColors } from '@notadd/mat-colors';

export const NOTADD_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NotaddMaterialColorPickerComponent),
    multi: true
};

@Component({
    selector: 'notadd-material-color-picker',
    templateUrl: './material-color-picker.component.html',
    styleUrls: ['./material-color-picker.component.scss'],
    animations: notaddAnimations,
    encapsulation: ViewEncapsulation.None,
    providers: [NOTADD_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR]
})
export class NotaddMaterialColorPickerComponent implements ControlValueAccessor {
    colors: any;
    hues: Array<string>;
    selectedColor: any;
    view: string;
    selectedPalette: string;
    selectedHue: string;
    selectedFg: string;
    selectedBg: string;

    @Output()
    colorChanged: EventEmitter<any>;

    private _selectedClass: string;
    private _modelChange: (value: any) => void;
    private _modelTouched: (value: any) => void;

    constructor() {
        this.colorChanged = new EventEmitter();
        this.colors = MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedHue = '500';
        this.view = 'palettes';

        this.selectedFg = '';
        this.selectedBg = '';
        this._selectedClass = '';
        this._modelChange = () => {
        };
        this._modelTouched = () => {
        };
    }

    /**
     * 选择class
     *
     * @param value
     */
    @Input()
    set selectedClass(value) {
        if (value && value !== '' && this._selectedClass !== value) {
            const color = value.split('-');
            if (color.length >= 5) {
                this.selectedPalette = color[1] + '-' + color[2];
                this.selectedHue = color[3];
            } else {
                this.selectedPalette = color[1];
                this.selectedHue = color[2];
            }
        }

        this._selectedClass = value;
    }

    get selectedClass(): string {
        return this._selectedClass;
    }

    /**
     * 注册由每次原生表单控件值更新时触发的回调函数
     *
     * @param fn
     */
    registerOnChange(fn: any): void {
        this._modelChange = fn;
    }

    /**
     * 注册用户和控件交互时触发的回调函数
     *
     * @param fn
     */
    registerOnTouched(fn: any): void {
        this._modelTouched = fn;
    }

    /**
     * 向视图写入数据
     *
     * @param selectedClass
     */
    writeValue(selectedClass: any): void {
        if (!selectedClass) {
            return;
        }

        this.selectedClass = selectedClass;

        this.updateSelectedColor();
    }

    /**
     * 选择palette
     */
    selectPalette(e, palette): void {
        e.stopPropagation();
        this.selectedPalette = palette;
        this.updateSelectedColor();
        this.view = 'hues';
    }

    /**
     * 选择hue
     */
    selectHue(e, hue): void {
        e.stopPropagation();

        this.selectedHue = hue;
        this.updateSelectedColor();
    }

    /**
     * 移除color
     */
    removeColor(e): void {
        e && e.stopPropagation();

        this.selectedPalette = '';
        this.selectedHue = '';
        this.updateSelectedColor();
        this.view = 'palettes';
    }

    /**
     * 更新选择的color
     */
    updateSelectedColor(): void {
        if (this.selectedColor && this.selectedColor.palette === this.selectedPalette && this.selectedColor.hue === this.selectedHue) {
            return;
        }
        if (this.selectedPalette !== '' && this.selectedHue !== '') {
            this.selectedBg = MatColors.getColor(this.selectedPalette)[this.selectedHue];
            this.selectedFg = MatColors.getColor(this.selectedPalette).contrast[this.selectedHue];
            this.selectedClass = 'mat-' + this.selectedPalette + '-' + this.selectedHue + '-bg';
        } else {
            this.selectedBg = '';
            this.selectedFg = '';
        }

        this.selectedColor = {
            palette: this.selectedPalette,
            hue: this.selectedHue,
            class: this.selectedClass,
            bg: this.selectedBg,
            fg: this.selectedFg
        };

        // 触发颜色改变的事件
        this.colorChanged.emit(this.selectedColor);

        // 将model标记为touched
        this._modelTouched(this.selectedColor.class);

        // 更新model
        this._modelChange(this.selectedColor.class);
    }

    goToPalettesView(event): void {
        event.stopPropagation();

        this.view = 'palettes';
    }

    onMenuOpen(): void {
        this.view = this.selectedPalette === '' ? 'palettes' : 'hues';
    }
}
