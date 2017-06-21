import{ Directive, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Component} from "@angular/core";

@Directive({
  selector: '[templateRenderer]'
})
export class TemplateRendererDirective {

  constructor( private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private resolver: ComponentFactoryResolver ) { }

  @Input() set templateRenderer(time: number) {
    setTimeout(
      () => {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      },
      time);
  }
}
