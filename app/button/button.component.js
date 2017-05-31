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
var ButtonComponent = (function () {
    function ButtonComponent() {
    }
    ButtonComponent.prototype.ngOnInit = function () {
        this.setPropertiesValueIfUndefined();
        this.setIconAndLabelAlignPosition();
        if (this.onPress) {
            this.printActionId(this.onPress);
        }
        if (this.onRelease) {
            this.printActionId(this.onRelease);
        }
        if (this.onTap) {
            this.printActionId(this.onTap);
        }
        if (this.onFocus) {
            this.printActionId(this.onFocus);
        }
        if (this.onBlur) {
            this.printActionId(this.onBlur);
        }
    };
    ButtonComponent.prototype.printActionId = function (id) {
        console.log(id);
    };
    ButtonComponent.prototype.removeIcon = function () {
        this.icon = 'display_none';
        this.label_align = 'default';
        this.icon_align = '';
    };
    ButtonComponent.prototype.setIconAndLabelAlignPosition = function () {
        if (this.icon) {
            if (this.icon_align.indexOf('right') >= 0) {
                this.label_align = 'left';
            }
            else if (this.icon_align.indexOf('left') >= 0) {
                this.label_align = 'right';
            }
        }
        else {
            this.removeIcon();
        }
    };
    ButtonComponent.prototype.setPropertiesValueIfUndefined = function () {
        if (!this.name) {
            this.name = '';
        }
        if (!this.class) {
            this.class = '';
        }
        if (!this.orientation) {
            this.orientation = '';
        }
        if (!this.label) {
            this.label = 'Button';
        }
        if (!this.icon_align) {
            this.icon_align = 'right';
        }
        if (!this.shape) {
            this.shape = 'rectangle';
        }
        if (!this.type) {
            this.type = 'primary';
        }
        if (!this.orientation) {
            this.orientation = 'regular';
        }
    };
    return ButtonComponent;
}());
__decorate([
    core_1.Input('name'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "name", void 0);
__decorate([
    core_1.Input('label'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "label", void 0);
__decorate([
    core_1.Input('class'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "class", void 0);
__decorate([
    core_1.Input('icon'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "icon", void 0);
__decorate([
    core_1.Input('icon_align'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "icon_align", void 0);
__decorate([
    core_1.Input('onPress'),
    __metadata("design:type", Number)
], ButtonComponent.prototype, "onPress", void 0);
__decorate([
    core_1.Input('onTap'),
    __metadata("design:type", Number)
], ButtonComponent.prototype, "onTap", void 0);
__decorate([
    core_1.Input('onRelease'),
    __metadata("design:type", Number)
], ButtonComponent.prototype, "onRelease", void 0);
__decorate([
    core_1.Input('onFocus'),
    __metadata("design:type", Number)
], ButtonComponent.prototype, "onFocus", void 0);
__decorate([
    core_1.Input('onBlur'),
    __metadata("design:type", Number)
], ButtonComponent.prototype, "onBlur", void 0);
__decorate([
    core_1.Input('shape'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "shape", void 0);
__decorate([
    core_1.Input('type'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "type", void 0);
__decorate([
    core_1.Input('default_state'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "default_state", void 0);
__decorate([
    core_1.Input('size'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "size", void 0);
__decorate([
    core_1.Input('stretch'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "stretch", void 0);
__decorate([
    core_1.Input('orientation'),
    __metadata("design:type", String)
], ButtonComponent.prototype, "orientation", void 0);
ButtonComponent = __decorate([
    core_1.Component({
        selector: 'btn',
        templateUrl: 'app/button/button.component.html',
        styleUrls: ['app/assets/css/button.component.css']
    })
], ButtonComponent);
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map