import { Component, 
         Input,
         OnInit } from '@angular/core';

@Component({
    selector:'btn',
    templateUrl:'./button.component.html',
    styleUrls:['./button.component.css']
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

    label_align: string;

    ngOnInit (): void {
        this.setPropertiesValueIfUndefined();
        this.setIconAndLabelAlignPosition();
        this.setDefaultState();

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
            this.shape = 'rectangle';
        }
        if(!this.type){
            this.type = 'primary';
        }
        if(!this.default_state){
            this.default_state = 'enabled';
        }
         if(!this.size){
            this.size = 'size-regular';
        }
    }

    removeIcon(): void {
        this.icon='display_none';
        this.label_align = 'default';
        this.icon_align = '';
    }

    setIconAndLabelAlignPosition(): void {
        if(this.icon){
            if ( (this.icon_align.match(/^right$/) == null) &&
                 (this.icon_align.match(/^left$/) == null) ){
                this.icon_align = 'right';
                this.label_align = 'left';
            }else{
                if (this.icon_align.indexOf('right') >= 0){
                    this.label_align = 'left';
                } else if (this.icon_align.indexOf('left') >= 0) {
                    this.label_align = 'right';
                } 
            }
        }else{
            this.removeIcon();
        }
    }

    setDefaultState(): void {
        if( (this.default_state.match(/^enabled$/) == null)&&
            (this.default_state.match(/^disabled$/) == null)&&
            (this.default_state.match(/^pressed$/) == null) ){
                this.default_state = 'enabled';
            }
    }

    printActionId(id: number): void {
        console.log(id);
    }

    printDefaultState(): void {
        console.log(this.default_state);
    }

}