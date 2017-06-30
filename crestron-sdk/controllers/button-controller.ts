import { Component,
         Input,
         OnInit,
         OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { JoinsService } from '../services/joins.service';
import { CommunicationService } from '../services/communication.service';


@Component({
  selector: 'btn-controller',
  template: ''
})
export class ButtonController implements OnInit, OnDestroy {

     @Input('name') name: string;

     @Input('onPress') onPress: number;
     @Input('onTap') onTap: number;
     @Input('onRelease') onRelease: number;
     @Input('onFocus') onFocus: number; 
     @Input('onBlur') onBlur: number;

    @Input('runClass') runClass: number;
    // @Input('runActive') runActive: number;
    @Input('runFocused') runFocused: number;
    @Input('runPressed') runPressed: number;
    @Input('runShow') runShow: number;
    @Input('runHide') runHide: number;

  
    private el: NodeListOf<HTMLElement>;

    private subscription: Subscription = new Subscription();

    private  lastRunClass: string = '';

    constructor(private joinsService: JoinsService, private communicationService: CommunicationService ){ 
    }

    ngOnInit(): void {
      this.el = document.getElementsByName(this.name);
    
      if (this.el){
        this.addListeners();
      }
    }

    private addListeners(): void {

      if (this.onPress) {
        this.el[0].addEventListener("mousedown", this.sendOnPress.bind(this));
      }

      if (this.onTap) {
        this.el[0].addEventListener("mousedown", this.sendOnTap.bind(this));
      }

      if (this.onRelease) {
        this.el[0].addEventListener("mouseup", this.sendOnRelease.bind(this));
      }

      if (this.onFocus) {
        this.el[0].addEventListener("mouseenter",  this.sendOnFocus.bind(this));
      }

      if (this.onBlur) {
        this.el[0].addEventListener("mouseleave", this.sendOnBlur.bind(this));
      }

     this.subscription = this.joinsService.getSerialSubscribe(this.runClass, false).subscribe(this.onReceived.bind(this)); 
     this.subscription = this.joinsService.getSerialSubscribe(this.runPressed, false).subscribe(this.onReceived.bind(this));
     this.subscription = this.joinsService.getSerialSubscribe(this.runHide, false).subscribe(this.onReceived.bind(this));
     this.subscription = this.joinsService.getSerialSubscribe(this.runShow, false).subscribe(this.onReceived.bind(this));
     this.subscription = this.joinsService.getSerialSubscribe(this.runFocused, false).subscribe(this.onReceived.bind(this))
    }


    onReceived(data:any): void {
      if(this.lastRunClass){
        this.el[0].classList.remove(this.lastRunClass);
      }
       this.el[0].classList.add(data.value);
       this.lastRunClass = data.value;
    };

    sendOnPress(): void {
      console.log('onPress');
      this.communicationService.sendCodeDigital(this.onPress, 1);
    }

    sendOnTap(): void {
      console.log('onTap');
      this.communicationService.sendCodeDigital(this.onTap, 1);
    }

    sendOnRelease(): void {
      console.log('onRelease');
      this.communicationService.sendCodeDigital(this.onRelease, 0);
    }

    sendOnFocus(): void {
      console.log('onFocus');
      this.communicationService.sendCodeDigital(this.onFocus, 1);
    }

    sendOnBlur(): void {
      console.log('onBlur');
      this.communicationService.sendCodeDigital(this.onBlur, 0);
    }

    ngOnDestroy(): void {
      this.el[0].removeEventListener ("mousedown" );
      this.subscription.unsubscribe();
    }
}