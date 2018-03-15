import {Component, ElementRef, QueryList, Renderer2, ViewChildren, ViewContainerRef} from '@angular/core';
import {RegisterUserViaEmail} from '../api/user';
import {Api} from '../api/api';
import {BsModalRef, TooltipConfig, TooltipDirective} from 'ngx-bootstrap';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader/component-loader.factory';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  command: RegisterUserViaEmail = new RegisterUserViaEmail();

  viewContainers: Map<string, ElementRef> = new Map<string, ElementRef>();
  tooltips: Map<string, TooltipDirective> = new Map<string, TooltipDirective>();

  @ViewChildren('fieldError')
  set onTooltipLoaded(list: QueryList<ElementRef>) {
    list.forEach(ref => {
      console.log('elem', ref);
      this.viewContainers.set(ref.nativeElement.id, ref);
    });
  }




  constructor(private api: Api, public modal: BsModalRef, public factory: ComponentLoaderFactory,
              public renderer: Renderer2, public viewContainer: ViewContainerRef) {
  }

  hideTooltips() {
    this.tooltips.forEach((value, key) => {
      console.log('hide', value);
    });
  }

  showTooltip(id, content){
    console.log('show', id, content);
    const ref = this.viewContainers.get(id);
    if (ref) {
      console.log('ref', ref);
      const config = new TooltipConfig();
      config.placement = 'right';
      config.triggers = 'focus manual';

      const tooltip = new TooltipDirective(this.viewContainer, this.renderer, ref, this.factory, config);
      tooltip.tooltip = content;
      tooltip.show();
      this.tooltips.set(id, tooltip);
    }
  }

  submitForm() {
    this.api.register(this.command).subscribe(response => {

      const errors = response['errors'];
      this.hideTooltips();
      Object.keys(errors).forEach(id => {
        this.showTooltip(id, errors[id].message);
      });
    });
  }

  close() {
    this.modal.hide();
  }
}
