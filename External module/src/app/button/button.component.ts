import { Component, 
         Input,
         OnInit,
         ViewEncapsulation } from '@angular/core';

@Component({
    selector:'btn',
    templateUrl:'./button.component.html',
    styleUrls:['./button.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
    @Input('name') name : string;
    @Input('class') class: string;
    @Input('label') label : string;
    @Input('icon') icon : string;
    @Input('icon_align') icon_align: string;
    @Input('onPress') onPress: number;
    @Input('onTap') onTap: number;
    @Input('onRelease') onRelease: number;
    @Input('onFocus') onFocus: number; 
    @Input('onBlur') onBlur: number;
    @Input('shape') shape: string;
    @Input('type') type: string;
    @Input('default_state') default_state: string;
    @Input('size') size: string;
    @Input('stretch') stretch: string;
    @Input('orientation') orientation: string;

    isDisplayIconLeft: boolean;
    isDisplayIconRight: boolean;
    isDisplayDefault: boolean;

    rotate_icon: string;

    ngOnInit (): void {
        this.setPropertiesValueIfUndefined();
        this.setIconAndLabelAlignPosition();
        this.setIconRotation();
        this.setDefaultState();
        this.setButtonSize();

        if(this.onPress){
            this.printActionId(this.onPress);
        }
        if(this.onRelease){
            this.printActionId(this.onRelease);
        }
        if(this.onTap){
            this.printActionId(this.onTap);
        }
        if(this.onFocus){
            this.printActionId(this.onFocus);
        }
        if(this.onBlur){
            this.printActionId(this.onBlur);
        }
        if(this.default_state){
            this.printDefaultState();
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
            this.orientation='';
        }
        if(!this.label){
            this.label = 'Button';
        }
        if(!this.icon_align){
            this.icon_align = 'right'; 
        }
        if(!this.shape){
            this.shape = 'rounded-rectangle';
        }
        if(!this.type){
            this.type = 'info';
        }
        if(!this.default_state){
            this.default_state = 'enabled';
        }
    }

    setIconAndLabelAlignPosition(): void {
        if(this.icon){
            if ( (this.icon_align.match(/^right$/) == null) &&
                 (this.icon_align.match(/^left$/) == null) ){
                this.isDisplayIconRight = true;
                this.isDisplayIconLeft = false;
                this.isDisplayDefault = false;
            }else{
                if (this.icon_align.indexOf('right') >= 0){
                    this.isDisplayIconRight = true;
                    this.isDisplayIconLeft = false;
                    this.isDisplayDefault = false;
                } else if (this.icon_align.indexOf('left') >= 0) {
                    this.isDisplayIconLeft = true;
                    this.isDisplayIconRight = false;
                    this.isDisplayDefault = false;
                } 
            }
        }else{
            this.isDisplayDefault = true;
            this.isDisplayIconLeft = false;
            this.isDisplayIconRight = false;
        }
    }

    setDefaultState(): void {
        if( (this.default_state.match(/^enabled$/) == null)&&
            (this.default_state.match(/^disabled$/) == null)&&
            (this.default_state.match(/^pressed$/) == null) ){
                this.default_state = 'enabled';
            }
    }

    setIconRotation(): void {
        if ( this.orientation.match(/^vertical$/) != null ){
            this.rotate_icon = 'rotate';
        }
    }

    //if stretch and size are set, size will be deprecated
    //if stretch is set, it will be deprecated for circle and oval shapes
    setButtonSize() : void {
        if(this.stretch){
            if( (this.shape.match(/^circle$/) != null ) &&
                (this.shape.match(/^oval$/) != null) ){
                    this.stretch = '';
            }else{
                    this.size = '';
                    this.stretch = "stretch_" + this.stretch;
            }
        }else{
            switch(this.size){
                case "x-small": {
                    this.size = "btn-xs";
                    break;
                }
                case "small": {
                    this.size = "btn-sm";
                    break;
                }
                case "regular": {
                    this.size = "btn-sm";
                    break;
                }
                case "large" || "x-large" : {
                    this.size = "btn-lg";
                    break;
                }
                default: this.size = '';
            }
            this.stretch = '';
        }
    }

    printActionId(id: number): void {
        console.log(id);
    }

    printDefaultState(): void {
        console.log(this.default_state);
    }

}