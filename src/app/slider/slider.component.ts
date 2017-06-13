import { Component,
         Input, 
         Output,
         OnInit,
         OnChanges,
         AfterViewInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { SliderRangeComponent } from './slider-range.component';

@Component({
    selector:'slider',
    templateUrl:'./slider.component.html',
    styleUrls:[
        './slider.component.css',
        './slider-range.component.css'
    ]
})
export class SliderComponent implements OnInit, AfterViewInit, OnChanges {
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

    icon_display_left: string;
    icon_display_right: string;
    slider_display: string;

    uniqueID: string;
    input: any;
    ghost: any;
    minV: string; 
    maxV: string;

    constructor() {
    }

    ngOnInit (): void {
        this.uniqueID = "id_" + Date.now();
        this.setPropertiesValueIfUndefined();
        this.setIconsIfUndefined();
        this.setMinMaxValues();
        this.setValue();
        this.setDefaultState();       

        if(this.onSlide){
            this.printActionId(this.onSlide);
        }

        if(this.onSlideEnd){
            this.printActionId(this.onSlideEnd);
        }

    }

    ngOnChanges() {
    
    }

    ngAfterViewInit() { 
        this.input = <HTMLElement>document.getElementById(this.uniqueID);
        this.ghost = <HTMLElement>this.input.cloneNode();
        this.minV = this.input.getAttribute("min"); 
        this.maxV = this.input.getAttribute("max");
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
        if(!this.size){
            this.size = 'size-regular';
        }
        if(!this.isRange){
            this.isRange = false;
        }
        if(!this.default_state){
            this.default_state = 'enabled';
        }
    }

    setValue(): void {
        if (this.isRange){
            if (!this.initValuePair){
                this.initValuePair = this.min + " " + this.max;
            }
        }else{
            if (!this.initValue) {
               this.initValue = this.min;
            }
        }
    }

    setIconsIfUndefined(): void {
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

    setDefaultState(): void {
        if( (this.default_state.match(/^enabled$/) == null)&&
            (this.default_state.match(/^disabled$/) == null) ){
                this.default_state = 'enabled';
            }
    }

    initializeRangeIfRangeIsRequired(): void {
         if (this.isRange){
             this.multirange();
         }
    }

     multirange(): void {

        var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

        Object.defineProperty(this.input, "originalValue", descriptor.get ? descriptor : {
            get: function() { return this.value; },
            set: function(v) { this.value = v; }
        });

        Object.defineProperties(this.input, {
            valueLow: {
                get: function() { return Math.min(this.input.originalValue, Number(this.ghost.getAttribute("value"))); },
                set: function(v) { this.input.originalValue = v; },
                enumerable: true
            },
            valueHigh: {
                get: function() { return Math.max(this.input.originalValue, Number(this.ghost.getAttribute("value"))); },
                set: function(v) { this.ghost.setAttribute("value", v); },
                enumerable: true
            }
	    });

        let values = this.initValuePair.split(" "); 

        this.input.classList.add("multirange", "original");
	    this.ghost.classList.add("multirange", "ghost");

        this.input.setAttribute("value",  values[0] || (parseInt(this.minV) + (Number(this.maxV) - Number(this.minV)) / 2).toString());
        this.ghost.setAttribute("value",  values[1] || (parseInt(this.minV) + (Number(this.maxV) - Number(this.minV)) / 2).toString());

        this.input.parentNode.insertBefore(this.ghost, this.input.nextSibling);

    }

    update(): void {
        this.ghost.style.setProperty("--low", 100 * ( ( Number(this.input.getAttribute("valueLow")) - Number(this.minV) ) / ( Number(this.maxV) - Number(this.minV) ) + 1) + "%");
        this.ghost.style.setProperty("--high", 100 * ( ( Number(this.input.getAttribute("valueHigh")) - Number(this.minV) ) / ( Number(this.maxV) - Number(this.minV) ) - 1) + "%");  
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

    printActionId(id: number): void {
        console.log(id);
    }
}