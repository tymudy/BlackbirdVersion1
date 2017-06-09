"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SliderComponent = (function () {
    function SliderComponent() {
    }
    SliderComponent.prototype.ngOnInit = function () {
        this.setPropertiesValueIfUndefined();
        this.setMinMaxIntervalIfUndefined();
    };
    SliderComponent.prototype.setMinMaxIntervalIfUndefined = function () {
        if (!this.min && !this.max) {
            this.min = 0;
            this.max = 100;
        }
        else {
            if (this.min) {
                this.max = this.min + 100;
            }
            else {
                if (this.max) {
                    this.min = 0;
                }
            }
        }
    };
    SliderComponent.prototype.setPropertiesValueIfUndefined = function () {
        if (!this.name) {
            this.name = '';
        }
        if (!this.class) {
            this.class = '';
        }
        if (!this.orientation) {
            this.orientation = '';
        }
        if (!this.isRange) {
            this.isRange = true;
        }
    };
    return SliderComponent;
}());
__decorate([
    core_1.Input('name'),
    __metadata("design:type", String)
], SliderComponent.prototype, "name", void 0);
__decorate([
    core_1.Input('class'),
    __metadata("design:type", String)
], SliderComponent.prototype, "class", void 0);
__decorate([
    core_1.Input('min'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "min", void 0);
__decorate([
    core_1.Input('max'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "max", void 0);
__decorate([
    core_1.Input('isRange'),
    __metadata("design:type", Boolean)
], SliderComponent.prototype, "isRange", void 0);
__decorate([
    core_1.Input('orientation'),
    __metadata("design:type", String)
], SliderComponent.prototype, "orientation", void 0);
__decorate([
    core_1.Input('minIcon'),
    __metadata("design:type", String)
], SliderComponent.prototype, "minIcon", void 0);
__decorate([
    core_1.Input('maxIcon'),
    __metadata("design:type", String)
], SliderComponent.prototype, "maxIcon", void 0);
__decorate([
    core_1.Input('step'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "step", void 0);
__decorate([
    core_1.Input('tick'),
    __metadata("design:type", Number)
], SliderComponent.prototype, "tick", void 0);
__decorate([
    core_1.Input('shape'),
    __metadata("design:type", String)
], SliderComponent.prototype, "shape", void 0);
__decorate([
    core_1.Input('state'),
    __metadata("design:type", String)
], SliderComponent.prototype, "state", void 0);
__decorate([
    core_1.Input('size'),
    __metadata("design:type", String)
], SliderComponent.prototype, "size", void 0);
__decorate([
    core_1.Input('stretch'),
    __metadata("design:type", String)
], SliderComponent.prototype, "stretch", void 0);
__decorate([
    core_1.Input('initValuePair'),
    __metadata("design:type", String)
], SliderComponent.prototype, "initValuePair", void 0);
__decorate([
    core_1.Input('onSlide'),
    __metadata("design:type", String)
], SliderComponent.prototype, "onSlide", void 0);
__decorate([
    core_1.Input('onSlideEnd'),
    __metadata("design:type", String)
], SliderComponent.prototype, "onSlideEnd", void 0);
SliderComponent = __decorate([
    core_1.Component({
        selector: 'slider',
        templateUrl: 'app/slider/slider.component.html',
        styleUrls: ['app/assets/css/slider.component.css']
    })
], SliderComponent);
exports.SliderComponent = SliderComponent;
//# sourceMappingURL=slider.component.js.map