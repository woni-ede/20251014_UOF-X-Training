import { Component } from '@angular/core';
import { UofxPluginAuthorize, UofxPluginPage } from '@uofx/plugin';

@UofxPluginAuthorize({ functionId: 'CUSTOMERMANAGEMENT' })
@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrl: './customer-management.component.scss'
})
export class CustomerManagementComponent extends UofxPluginPage{

}
