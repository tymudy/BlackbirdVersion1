import { Component,
  OnInit, OnDestroy} from '@angular/core';
import {JoinsService} from '../services/joins.service';
import {CommunicationService} from '../services/communication.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'list-controller-component',
  template: '<span>list</span>',
})
export class ListController implements OnInit, OnDestroy{

  private subscription: Subscription = new Subscription();

  constructor(private joinsService: JoinsService, private communicationService: CommunicationService ){ }

  ngOnInit(): void {
    var me = this;

    setTimeout(function() {
      me.subscription.add(me.joinsService.getDigitalSubscribe(194, false).subscribe(
        (data) => {
          console.log('yess', data);
        }
      ));
      me.communicationService.sendCodeDigital(111, 1);

      setTimeout(function() {
        me.communicationService.sendCodeDigital(115, 1);

        me.subscription.add(me.joinsService.getDigitalSubscribe(180, false).subscribe(
          (data) => {
            console.log('115-180', data);
          }
        ));
      }, 50);
    }, 100);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
