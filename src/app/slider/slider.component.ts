import { Component,
         Input, 
         OnInit,
         AfterViewInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
    selector:'slider',
    templateUrl:'./slider.component.html',
    styleUrls:[
        './slider.component.css',
        './slider-range.component.css'
    ]
})
export class SliderComponent implements OnInit, AfterViewInit {
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
    @Input('handleShape') handleShape: string;
    @Input('default_state') default_state: string;
    @Input('size') size: string;
    @Input('stretch') stretch: string;
    @Input('initValue') initValue: number;
    @Input('initValuePair') initValuePair: string;
    @Input('onSlide') onSlide: number;
    @Input('onSlideEnd') onSlideEnd: number;

    uniqueID: string;

    valueLow: any;
    valueHigh: any;
    singleValue: any;

    input: any;
    ghost: any;

    icon_display_left: string;
    icon_display_right: string;
    slider_display: string;

    gradiant: any = [];
    tickmarks: string;

    rotate_icon: string;

    constructor() {
    }

    ngOnInit (): void {

        this.setPropertiesValueIfUndefined();

        this.uniqueID = this.name + Date.now();

        this.setSliderSizeIfStretchIsDefined();
        this.setIconsIfUndefined();
        this.setIconRotation();
        this.setMinMaxValues();
        this.setInputValues();
        this.setDefaultState();
        this.setTick();       

        if(this.onSlide){
            this.printActionId(this.onSlide);
        }

        if(this.onSlideEnd){
            this.printActionId(this.onSlideEnd);
        }

    }

    ngAfterViewInit() { 
        this.input = <HTMLElement>document.getElementById(this.uniqueID);
        this.ghost = <HTMLElement>document.getElementById(this.uniqueID + "_ghost");
     
        this.initializeRangeIfRangeIsRequired();
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
        if(!this.handleShape){
            this.handleShape = 'circle';
        }
        if(!this.isRange){
            this.isRange = false;
        }
        if(!this.default_state){
            this.default_state = 'enabled';
        }
    }

    setSliderSizeIfStretchIsDefined(): void{
        if (this.stretch){
            this.size = 'size-small';
            this.stretch = 'stretch_' + this.stretch;
        }else{
            this.stretch = '';
            if(!this.size){
                this.size = 'size-small';
            }
        }
    }

    setIconRotation(): void {
        if ( this.orientation.match(/^vertical$/) != null ){
            this.rotate_icon = 'rotate';
        }
    }

    setIconsIfUndefined(): void {
        if(this.minIcon && this.maxIcon){
            this.icon_display_left = 'left';
            this.icon_display_right = 'right';
            this.slider_display = 'range';
            return;
        }
        if(!this.minIcon && !this.maxIcon) {
            this.icon_display_left = 'display_none';
            this.icon_display_right = 'display_none';
            this.slider_display = 'default';
        }else{
            if(this.minIcon && !this.maxIcon){
                this.icon_display_left = 'left';
                 this.icon_display_right = 'display_none';
                this.slider_display = 'right';
            }else{
                if(this.maxIcon && !this.minIcon){
                    this.icon_display_right = 'right';
                    this.icon_display_left = 'display_none';
                    this.slider_display = 'left';
                }
            }
        }
    }

    setDefaultState(): void {
        if( (this.default_state.match(/^enabled$/) == null)&&
            (this.default_state.match(/^disabled$/) == null) ){
                this.default_state = 'enabled';
            }
    }

    setTick(): void {

    }

    populateGradiant(): void{
        let g = this.min;
        while(g <= this.max){
            this.gradiant.push(g);
            g += this.tick;
        }
    }

    setInputValues(): void {
        if (this.isRange){
            if (!this.initValuePair){
                this.initValuePair = this.min + " " + this.max;
            }
        }else{
            if (!this.initValue || this.initValue < this.min) {
               this.initValue = this.min;
            }
        }
    }

    setMinMaxValues(): void {
        if(this.min && this.max){
            return;
        }
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

    initializeRangeIfRangeIsRequired(): void {
         if (this.isRange){
             this.multirange();
             this.updateRange();
         }else{
             this.updateSingleRange();
         }
    }

     multirange(): void {

        let values = this.initValuePair.split(" "); 

        this.input.classList.add("multirange", "original");
	    this.ghost.classList.add("multirange", "ghost");

        this.input.setAttribute("value",  values[0] || (this.min + (this.max - this.min) / 2).toString());
        this.ghost.setAttribute("value",  values[1] || (this.min + (this.max - this.min) / 2).toString());

        this.input.parentNode.insertBefore(this.ghost, this.input.nextSibling);

    }

    updateRange(): void {
        let v1 = (<HTMLInputElement>document.getElementById(this.uniqueID)).value;
        let v2 = (<HTMLInputElement>document.getElementById(this.uniqueID + "_ghost")).value;

        this.valueLow = Math.min(Number(v1), Number(v2));
        this.valueHigh = Math.max(Number(v1), Number(v2));

        this.ghost.style.setProperty("--low", (100 * ( ( Number(this.valueLow) - this.min ) / ( this.max - this.min )) + 1).toString() + "%");
        this.ghost.style.setProperty("--high", (100 * ( ( Number(this.valueHigh) - this.min ) / ( this.max - this.min )) - 1).toString() + "%");  
    }

    updateSingleRange(): void{
        let v = (<HTMLInputElement>document.getElementById(this.uniqueID)).value;

        this.singleValue = Number(v);
        this.input.style.setProperty("--handle", (100 * ( ( Number(this.singleValue) - this.min ) / ( this.max - this.min )) + 1).toString() + "%");
    }

    printActionId(id: number): void {
        console.log(id);
    }
}