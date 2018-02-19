import { Component, OnInit } from '@angular/core';
import { RegisterUserViaEmail} from '../api/user'
import { Api } from '../api/api';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  command: RegisterUserViaEmail = new RegisterUserViaEmail();
  errors: Object = new Object();

  constructor(private api: Api) {
  }

  ngOnInit() {
  }

  submitForm(event){
    this.api.register(this.command).subscribe(response => {
      var errors = response['errors'];
      console.log('errors',response);
      this.errors = errors;
      $.each(errors, function(key, value) {
        $(event.target).find('[name='+key+']').each(function( index ) {
          console.log($(this));
          $(this).tooltip({html:value});
        });
      });
    });
  }
}
