import { Injectable } from '@angular/core';  

@Injectable()
export class UniqueIdGeneratorService {  
    uniqueID: number = 0;

    getUniqueID(): number{
        return this.uniqueID++;
    }

    setUniqueID(): void{
        this.uniqueID++;
    }
} 