import { Component, Injectable } from '@angular/core';
@Injectable()
export class SliderRangeComponent {

    multirange(input: any): void {

        if (input.classList.contains("multirange")) {
		    return;
	    }

        let values = input.getAttribute("value").split(" ");
        let min = +input.min || 0;
        let max = +input.max || 100;
        let ghost = input.cloneNode();

        input.classList.add("multirange", "original");
	    ghost.classList.add("multirange", "ghost");

        input.value = values[0] || min + (max - min) / 2;
	    ghost.value = values[1] || min + (max - min) / 2;

        input.parentNode.insertBefore(ghost, input.nextSibling);

        Object.defineProperties(input, {
            valueLow: {
                get: function() { return Math.min(this.originalValue, ghost.value); },
                set: function(v) { this.originalValue = v; },
                enumerable: true
            },
            valueHigh: {
                get: function() { return Math.max(this.originalValue, ghost.value); },
                set: function(v) { ghost.value = v; },
                enumerable: true
            }
	    });

       function update () {
            ghost.style.setProperty("--low", 100 * ((input.valueLow - min) / (max - min)) + 1 + "%");
            ghost.style.setProperty("--high", 100 * ((input.valueHigh - min) / (max - min)) - 1 + "%");  
        }

        input.addEventListener("input", update);
        ghost.addEventListener("input", update);

        update();
    } 

    init(): void {
        [].slice.call(document.querySelector("input[type=range][multiple]:not(.multirange)")).forEach(this.multirange);
    }
}