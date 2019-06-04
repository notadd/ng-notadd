import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = false;
    inputAddOnBlur = true;
    separatorKeysCodes: Array<number> = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<Array<string>>;
    fruits: Array<string> = ['Lemon'];
    allFruits: Array<string> = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
    inputChips: Array<string> = ['chip1', 'chip2', 'chip3'];

    @ViewChild('fruitInput', { static: true }) fruitInput: ElementRef<HTMLInputElement>;

    constructor() {
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(void (0)),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
    }

    ngOnInit() {
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }

    inputChipAdd(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.inputChips.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }
    }

    inputChipRemove(chip): void {
        const index = this.inputChips.indexOf(chip);

        if (index >= 0) {
            this.inputChips.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(void (0));
    }

    private _filter(value: string): Array<string> {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }
}
