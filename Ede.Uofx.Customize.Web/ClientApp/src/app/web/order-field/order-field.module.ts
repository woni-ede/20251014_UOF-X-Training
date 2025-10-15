/**
 * 請依照以下步驟完成 module 設定：
 *
 * 1. module name 設定：至 export class ... 貼上 OrderFieldCompleteModule
 * 2. 新增 props、write 等 component
 * 3. props component 設定：OrderFieldCompletePropsComponent
 * 4. design、write、view、print component 設定：OrderFieldCompleteWriteComponent
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BASIC_HTTP_HANDLER, MyHttpHandler } from '@service/basic/basic-http-handler';
import { BasicHttpClient } from '@service/basic/basic-http-client';
import { UofxFormFieldBaseModule } from '@uofx/web-components/form';
import { NorthWindService } from '@service/northwind.service';
import { EmployeeService } from '@service/employee.service';
import { UofxPluginApiService } from '@uofx/plugin/api';
// modules
import { UofxButtonModule } from '@uofx/web-components/button';
import { UofxDialogModule } from '@uofx/web-components/dialog';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { UofxFormModule } from '@uofx/web-components/form';
import { OrderFieldWriteComponent } from './write/order-field.write.component';
import { OrderFieldPropsComponent } from './props/order-field.props.component';
import { ProductListComponent } from './write/_dialog/product-list/product-list.component';

const UOF_MODULES = [
  UofxFormFieldBaseModule,
  UofxButtonModule,
  UofxDialogModule,
  UofxFormModule
];

const PRIMENG_MODULES = [
  TableModule,
  InputNumberModule
];

const EMP_SERVICES = [
  { provide: BASIC_HTTP_HANDLER, useClass: MyHttpHandler },
  BasicHttpClient,
  EmployeeService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...UOF_MODULES,
    ...PRIMENG_MODULES,
  ],
  providers: [
    UofxPluginApiService,
    NorthWindService,
    ...EMP_SERVICES,
  ],
  declarations: [
    OrderFieldWriteComponent,
    OrderFieldPropsComponent,
    ProductListComponent
  ],
  exports: []
})
export class OrderFieldModule {
  static comp = {
    props: OrderFieldPropsComponent /* TODO: 加入 props component, YourPropsComponent */,
    design: OrderFieldWriteComponent /* TODO: 加入 design component, YourDesignComponent */,
    write: OrderFieldWriteComponent /* TODO: 加入 write component, YourWriteComponent */,
    view: OrderFieldWriteComponent /* TODO: 加入 view component, YourViewComponent */,
    print: OrderFieldWriteComponent /* TODO: 加入 print component, YourPrintComponent */
  }
}
