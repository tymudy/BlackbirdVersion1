import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualScrollModule } from './components/virtual-scroll';

import { ButtonComponent } from './components/button/button.component';
import { SliderComponent } from './components/slider/slider.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list/list-item.component';
import { VideoComponent } from './components/video/video.component';

import { WindowRefService } from './components/video/WindowRefService';
import { ShareService } from './services/share/shareService';
import { JoinsService } from './services/joins.service';
import { CommunicationService } from './services/communication.service';

import { ListController } from './controllers/list-controller';
import { ButtonController } from './controllers/button-controller';


@NgModule({
    imports: [
        CommonModule,
        VirtualScrollModule
    ],
    declarations: [
        ButtonComponent,
        SliderComponent,
        ListComponent,
        ListItemComponent,
        VideoComponent,
        ListController,
        ButtonController
    ],
    providers: [
        WindowRefService,
        ShareService,
        JoinsService,
        CommunicationService
    ],
    exports: [
        ButtonComponent,
        SliderComponent,
        ListComponent,
        VideoComponent,
        ButtonController,
        ListController
    ],
    entryComponents:[ ButtonComponent, SliderComponent ]
})
export class CrestronSdkModule{}
