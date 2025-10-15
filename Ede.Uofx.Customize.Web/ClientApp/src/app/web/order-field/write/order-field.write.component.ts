/**
 * 請依照以下步驟完成 write 設定：
 *
 * 1. 將整段 @Component() 貼至下方 TODO 處
 * 2. component name 設定：至 export class ... 貼上 OrderFieldCompleteWriteComponent
 * 3. 至 OrderFieldCompleteModule 設定 design、write、view、print
 *
 */

import { Component, Input, OnInit } from "@angular/core";
import { BpmFwWriteComponent, UofxFormFieldLogic, UofxFormTools } from "@uofx/web-components/form";
import { Settings, UofxConsole } from '@uofx/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NorthWindService } from "@service/northwind.service";
import { UofxDialogController, UofxDialogOptions } from "@uofx/web-components/dialog";
import { ProductListComponent } from "./_dialog/product-list/product-list.component";
import { ProductModel } from "@model/northwind.model";
// import { YourExProps } from './path/to/your.model';

@Component({
  selector: 'app-order-field.write',
  templateUrl: './order-field.write.component.html',
  styleUrl: './order-field.write.component.scss'
})

export class OrderFieldWriteComponent extends BpmFwWriteComponent implements OnInit {

  /** 屬性資料 */
  // @Input() exProps: YourExProps;

  /** 登入者公司id */
  corpId = Settings.UserInfo.corpId;
  /** form group */
  form: FormGroup;
  /** 填寫model */
  // value: YourFieldModel;
  /** 錯誤訊息 */
  errorMessage = [];

  constructor(
    private fb: FormBuilder,
    private tools: UofxFormTools,
    private fieldLogic: UofxFormFieldLogic,
    private northWindServ: NorthWindService,
    private dialogCtrl: UofxDialogController
  ) {
    super();
  }

  ngOnInit() {
    //呼叫api之前要設定serverUrl為外掛欄位站台位址
    this.northWindServ.serverUrl = this.pluginSetting?.entryHost;

    this.initForm();

    // 訂閱parent form的status changes，送出時，一併顯示欄位內整張form的錯誤訊息
    // this.fieldLogic.parentFormBinding(this.parentForm, this.selfControl, this.form);
  }

  /** 初始化form */
  initForm() {
    this.form = this.fb.group({
      products: this.fb.array([])
    });
    this.setFormValue();
  }

  /** 填入資料 */
  setFormValue() {
    if (this.value && this.value.selectedProducts) {
      this.createFormArray(this.value.selectedProducts);
    }
  }

  showDialog() {
    /**
     * 請依照以下步驟完成 dialog function 設定：
     *
     * 1. 最上方 import 設定：import { UofxDialogController, UofxDialogOptions } from '@uofx/web-components/dialog';
     * 2. 在 constructor 中加入：private dialogCtrl: UofxDialogController
     * 3. 設定要開啟的 component
     * 4. 設定要帶入的參數
     * 5. 處理回傳參數
     *
     */

    this.dialogCtrl.create(<UofxDialogOptions>{
      component: ProductListComponent, /* TODO: 要開啟的 component */
      size: 'large',
      params: { data: this.form.value.products /* TODO: 要帶入的參數 */ }
    }).afterClose.subscribe({
      next: res => {
        /* TODO: 處理回傳參數 */
        UofxConsole.log('dialog result', res);
        if (res) this.createFormArray(res);
      }
    });
  }

  createFormArray(selectedProducts: ProductModel[]) {
    // 清空 FormArray
    const formArray = this.form.get('products') as FormArray;
    formArray.clear();

    selectedProducts.forEach(product => {
      let group = this.fb.group({
        productID: [product.productID ?? null],
        productName: [product.productName ?? null],
        unitsInStock: [product.unitsInStock ?? null],
        unitPrice: [product.unitPrice ?? null],
        quantity: [product.quantity ?? null, [Validators.required, Validators.min(1)]]
      })
      formArray.push(group);
    })

    // 綁定 ParentForm
    this.fieldLogic.parentFormBinding(this.parentForm, this.selfControl, this.form);
  }

  /**
   * 表單送出前會呼叫此函式做檢查
   * @param {boolean} checkValidator 按下表單下方按鈕時是否要檢查表單驗證
   * @return {*}  {Promise<boolean>}
   */
  checkBeforeSubmit(checkValidator: boolean): Promise<boolean> {
    this.errorMessage = [];
    let isValid: boolean = true;

    let order = {
      selectedProducts: this.form.value.products,
      orderDetails: this.form.value.products.map(product => ({
        productID: product.productID,
        quantity: product.quantity,
        unitPrice: product.unitPrice
      }))
    };


    // 驗證欄位
    this.tools.markFormGroup(this.form);
    // 放在checkBeforeSubmit中，如果是暫存就不需要驗證必填，且清除form control error
    this.fieldLogic.checkValidators(checkValidator, this.selfControl, this.form);
    // 真正送出欄位值變更的函式
    this.valueChanges.emit(order);

    if (checkValidator) {
      if (this.form.value.products.length === 0) {
        this.errorMessage.push(`至少選擇一筆商品。`);
        isValid = false;
      } else if (this.form.invalid) {
        this.errorMessage.push(`請填入商品數量，數量不可小於1。`);
        isValid = false;
      }
    }

    return new Promise(resolve => {
      resolve(isValid);
    });
  }
}
