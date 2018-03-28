import {Component, ElementRef, QueryList, Renderer2, ViewChildren, ViewContainerRef} from '@angular/core';
import {RegisterUserViaEmailCommand} from '../../api/user';
import {ApiService} from '../../service/api.service';
import {BsModalRef, TooltipConfig, TooltipDirective} from 'ngx-bootstrap';
import {ComponentLoaderFactory} from 'ngx-bootstrap/component-loader/component-loader.factory';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent {
  command: RegisterUserViaEmailCommand = new RegisterUserViaEmailCommand();

  viewContainers: Map<string, ElementRef> = new Map<string, ElementRef>();
  tooltips: Map<string, TooltipDirective> = new Map<string, TooltipDirective>();

  @ViewChildren('fieldError')
  set onTooltipLoaded(list: QueryList<ElementRef>) {
    list.forEach(ref => {
      this.viewContainers.set(ref.nativeElement.id, ref);
    });
  }

  constructor(private api: ApiService,
              public modal: BsModalRef,
              public factory: ComponentLoaderFactory,
              public renderer: Renderer2,
              public viewContainer: ViewContainerRef,
              public translate: TranslateService) {
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
      config.placement = 'top';
      config.triggers = 'focus manual';

      const tooltip = new TooltipDirective(this.viewContainer, this.renderer, ref, this.factory, config);
      tooltip.tooltip = content;
      tooltip.show();
      this.tooltips.set(id, tooltip);
    }
  }

  submitForm() {
    this.api.register(this.command).subscribe(response => {
      const errors = response.errors;
      this.hideTooltips();
      Object.keys(errors).forEach(id => {
        this.showTooltip(id, this.translate.instant(
          'command.RegisterUserViaEmail.error.' + errors[id].message
        ));
      });
    });
  }

  close() {
    this.modal.hide();
  }
}
