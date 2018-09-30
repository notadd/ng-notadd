import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from '@angular/core';

import { notaddAnimations } from '@notadd/animations';
import { MatColors } from '@notadd/mat-colors';

@Component({
    selector: 'notadd-material-color-picker',
    templateUrl: './material-color-picker.component.html',
    styleUrls: ['./material-color-picker.component.scss'],
    animations: notaddAnimations,
    encapsulation: ViewEncapsulation.None
})
export class NotaddMaterialColorPickerComponent implements OnChanges {
    colors: any;
    hues: Array<string>;
    selectedColor: any;
    view: string;

    @Input()
    selectedPalette: string;

    @Input()
    selectedHue: string;

    @Input()
    selectedFg: string;

    @Input()
    value: any;

    @Output()
    valueChange: EventEmitter<any>;

    @Output()
    selectedPaletteChange: EventEmitter<any>;

    @Output()
    selectedHueChange: EventEmitter<any>;

    @Output()
    selectedClassChange: EventEmitter<any>;

    @Output()
    selectedBgChange: EventEmitter<any>;

    @Output()
    selectedFgChange: EventEmitter<any>;

    private _selectedClass: string;
    private _selectedBg: string;

    constructor() {
        // Set the defaults
        this.colors = MatColors.all;
        this.hues = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'A100', 'A200', 'A400', 'A700'];
        this.selectedFg = '';
        this.selectedHue = '';
        this.selectedPalette = '';
        this.view = 'palettes';

        this.valueChange = new EventEmitter();
        this.selectedPaletteChange = new EventEmitter();
        this.selectedHueChange = new EventEmitter();
        this.selectedClassChange = new EventEmitter();
        this.selectedBgChange = new EventEmitter();
        this.selectedFgChange = new EventEmitter();

        // Set the private defaults
        this._selectedClass = '';
        this._selectedBg = '';
    }

    /**
     * Selected class
     *
     * @param value
     */
    @Input()
    set selectedClass(value) {
        if (value && this._selectedClass !== value) {
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
     * Selected bg
     *
     * @param value
     */
    @Input()
    set selectedBg(value) {
        if (value && value !== '' && this._selectedBg !== value) {
            for (const palette in this.colors) {
                if (!this.colors.hasOwnProperty(palette)) {
                    continue;
                }

                for (const hue of this.hues) {
                    if (this.colors[palette][hue] === value) {
                        this.selectedPalette = palette;
                        this.selectedHue = hue;
                        break;
                    }
                }
            }
        }
        this._selectedBg = value;
    }

    get selectedBg(): string {
        return this._selectedBg;
    }

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: any): void {
        if (changes.selectedBg && changes.selectedBg.currentValue === '' ||
            changes.selectedClass && changes.selectedClass.currentValue === '' ||
            changes.selectedPalette && changes.selectedPalette.currentValue === '') {
            this.removeColor(void (0));
            return;
        }
        if (changes.selectedPalette || changes.selectedHue || changes.selectedClass || changes.selectedBg) {
            this.updateSelectedColor();
        }
    }

    /**
     * Select palette
     */
    selectPalette(e, palette): void {
        e.stopPropagation();

        this.selectedPalette = palette;
        this.updateSelectedColor();
        this.view = 'hues';
    }

    /**
     * Select hue
     */
    selectHue(e, hue): void {
        e.stopPropagation();

        this.selectedHue = hue;
        this.updateSelectedColor();
    }

    /**
     * Remove color
     */
    removeColor(e): void {
        e && e.stopPropagation();

        this.selectedPalette = '';
        this.selectedHue = '';
        this.updateSelectedColor();
        this.view = 'palettes';
    }

    /**
     * Update selected color
     */
    updateSelectedColor(): void {
        setTimeout(() => {

            if (this.selectedColor && this.selectedPalette === this.selectedColor.palette && this.selectedHue === this.selectedColor.hue) {
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

            this.selectedPaletteChange.emit(this.selectedPalette);
            this.selectedHueChange.emit(this.selectedHue);
            this.selectedClassChange.emit(this.selectedClass);
            this.selectedBgChange.emit(this.selectedBg);
            this.selectedFgChange.emit(this.selectedFg);

            this.value = this.selectedColor;
            this.valueChange.emit(this.selectedColor);
        });
    }

    /**
     * Go back to palette selection
     */
    backToPaletteSelection(e): void {
        e.stopPropagation();

        this.view = 'palettes';
    }

    /**
     * On menu open
     */
    onMenuOpen(): void {
        this.view = this.selectedPalette === '' ? 'palettes' : 'hues';
    }
}
