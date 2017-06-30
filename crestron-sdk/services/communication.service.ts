import { Injectable } from '@angular/core';

declare var Crestron: any;

@Injectable( )

export class CommunicationService {

  constructor( ) { }

  private CJS:any = Crestron.UI.JoinService;
  private sygnalType: any = {
      analog: 'analogListener',
      serial: 'serialListener',
      digital: 'digitalListener'
  };


  public sendCodeAnalog ( code: number, value:number ) : void {
    console.log('Send Analog', code, value);
    this.CJS.analogListener.updateCS( code, value );
  }

  public sendCodeDigital ( code:number, value:number ) : void {
    console.log('Send Digital', code, value);
    this.CJS.digitalListener.updateCS( code, value );
  }

  public sendCodeSerial ( code: number, value: string ) : void {
    console.log('Send Serial', code, value);
    this.CJS.serialListener.updateCS( code, value );
  }

  public subscribeCodeAnalog ( code:number, cb: (code: number, value: number) => void ) : void {
    let analog = this.sygnalType['Analog'];

    this.CJS[this.sygnalType.analog].subscribe( code, cb );
  }

  public subscribeCodeDigital ( code:number, cb: (code: number, value: number) => void ): void {
    this.CJS[this.sygnalType.digital].subscribe( code, cb );
  }

  public subscribeCodeSerial ( code:number, cb: (code: number, value: number) => void ) : void {
    this.CJS[this.sygnalType.serial].subscribe( code, cb );
  }
}
