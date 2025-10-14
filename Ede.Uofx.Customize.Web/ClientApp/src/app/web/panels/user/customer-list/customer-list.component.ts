import { Component } from '@angular/core';
import { UofxPluginPanel } from '@uofx/plugin';
import { UofxButtonModule } from '@uofx/web-components/button';
import { NorthWindService } from '@service/northwind.service';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { CustomerModel } from '@model/northwind.model';
import { UofxConsole } from '@uofx/core';
import { DataViewModule } from 'primeng/dataview';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [UofxButtonModule, DataViewModule, RouterModule],
  providers: [
    { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
    NorthWindService,
    BasicHttpClient,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent extends UofxPluginPanel {

  customers: CustomerModel[] = [];
  targetLink: string;

  constructor(private northWindService: NorthWindService) {
    super();
  }

  ngOnInit() {
    this.northWindService.serverUrl = this.pluginSetting?.entryHost;
    this.getCustomers(1, 3);
    this.targetLink = `${this.baseUrl.adminPlugin}/customer`;
  }

  getCustomers(page: number, limit: number) {
    this.northWindService.getCustomers(page, limit).subscribe({
      next: (res) => {
        this.customers = res;
        UofxConsole.log('Customers loaded', res);
      }
    })
  }
}
