import { Injectable,Output,EventEmitter } from '@angular/core';


@Injectable()
export class sessionCheck {
    refreshCount:number = 0;
    userRole: string = "";
    @Output() fire:EventEmitter<any>=new EventEmitter();

    constructor(){}

    change(data)
    {
        this.fire.emit(data);
    }

    getEmittedValue()
    {
        return this.fire;
    }

}