import { Component,
         Input, 
         OnInit } from '@angular/core';
@Component({
    selector:'slider',
    templateUrl:'app/slider/slider.component.html',
    styleUrls:['app/assets/css/slider.component.css']
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
    @Input('shape') shape: string;
    @Input('state') state: string;
    @Input('size') size: string;
    @Input('stretch') stretch: string;
    @Input('initValuePair') initValuePair: string;
    @Input('onSlide') onSlide: string;
    @Input('onSlideEnd') onSlideEnd: string;

    ngOnInit (): void {
        this.setPropertiesValueIfUndefined();
        this.setMinMaxIntervalIfUndefined();
    }

    setMinMaxIntervalIfUndefined(): void {
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
        if(!this.isRange){
            this.isRange = true;
        }
    }


}