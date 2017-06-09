import { Component,
         Input, 
         OnInit } from '@angular/core';
import { SliderRangeComponent } from './slider-range.component';

@Component({
    selector:'slider',
    templateUrl:'./slider.component.html',
    styleUrls:['./slider.component.css']
})
export class SliderComponent implements OnInit {
    @Input('name') name: string;
    @Input('class') class: string;
    @Input('min') min: number;
    @Input('max') max: number;
    @Input('isRange') isRange: boolean;
    @Input('orientation') orientation: string;
    @Input('minIcon') minIcon: string;
    @Input('maxIcon') maxIcon: string;
    @Input('step') step: number;
    @Input('tick') tick: number;
    @Input('handle_shape') handle_shape: string;
    @Input('default_state') default_state: string;
    @Input('size') size: string;
    @Input('stretch') stretch: string;
    @Input('initValue') initValue: number;
    @Input('initValuePair') initValuePair: string;
    @Input('onSlide') onSlide: number;
    @Input('onSlideEnd') onSlideEnd: number;

    value: any;

    constructor(private sliderRangeComponent: SliderRangeComponent) {
    }

    ngOnInit (): void {
        this.setPropertiesValueIfUndefined();
        this.setIconsIfUndefined();
        this.setMinMaxValues();
        this.defValue();
        this.sliderRangeComponent.init;

        if(this.onSlide){
            this.printActionId(this.onSlide);
        }

        if(this.onSlideEnd){
            this.printActionId(this.onSlideEnd);
        }
    }

    setPropertiesValueIfUndefined(): void {
        if(!this.name){
            this.name = '';
        }
        if(!this.class){
            this.class = '';
        }
        if(!this.orientation){
            this.orientation = '';
        }
        if(!this.step){
            this.step = 1;
        }
        if(!this.handle_shape){
            this.handle_shape = 'circle';
        }
        if(!this.size){
            this.size = 'size-regular';
        }
        if(!this.isRange){
            this.isRange = false;
        }
    }

    setIconsIfUndefined(): void {
        if(!this.minIcon && !this.maxIcon) {
            this.minIcon = 'minus-circle';
            this.maxIcon = 'plus-circle';
        }else{
            if(this.minIcon && !this.maxIcon){
                this.maxIcon = 'plus-circle';
            }else{
                if(this.maxIcon && !this.minIcon){
                    this.minIcon = 'minus-circle';
                }
            }
        }
    }

    setMinMaxValues(): void {
        if(!this.min && !this.max){
            this.min = 0;
            this.max = 100;
        }else{
            if (this.min) {
                this.max = this.min + 100;
            }else{
                if (this.max) {
                    this.min = 0;
                }
            }
        }
    }

    decrementSlider(): void {
        var sliderValue = document.getElementsByTagName('input')[0].value;
        this.value = parseInt(sliderValue) - this.step;
    }

    incrementSlider(): void {
        var sliderValue = document.getElementsByTagName('input')[0].value;
        this.value = parseInt(sliderValue) + this.step;
    }

     validateDefaultState(): void {
        if( (this.default_state.match(/^enabled$/) == null)&&
            (this.default_state.match(/^disabled$/) == null) ){
                this.default_state = 'enabled';
            }
    }

     printActionId(id: number): void {
        console.log(id);
    }

    inRange(): string{
        let range;
        if (this.isRange){
            range = '';
        }else{
            range = null;
        }
        return range;
    }

    defValue(): void {
        if (this.isRange){
            if (this.initValuePair){
                this.value = this.initValuePair;
            }else{
                this.value = this.min + "," + this.max;
            }
        }else{
            if (this.initValue) {
               this.value = this.initValue; 
            }else {
                this.value = this.min;
            }
        }
    }

    

}