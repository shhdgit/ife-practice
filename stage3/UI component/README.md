# UI组件
demo -- [http://rollaround.cn/demo/stage3/UI%20component/](http://rollaround.cn/demo/stage3/UI%20component/)

### **API**
___
#### **模态框**
## **html:**
    <div class="modal" id="modal">
      <div class="modal-dialog" id="modal-dialog">
        <div class="modal-content" id="modal-content">
          <div class="modal-header" id="modal-header">
            <h4>...</h4>                      // add title
          </div>
          <div class="modal-body" id="modal-body" data-content="...">
                                              // data-content为不使用SUI时alert()的内容
            ...                               // add content
          </div>
          <div class="modal-footer">
            ...                               // add button or something
          </div>
        </div>
      </div>
    </div>

## **js:**

##### Usage

  `sUI.modal.init(id, {options})`

##### Arguments
  <table>
    <tbody>
      <tr>
        <th>Param</th>
        <th>Type</th>
        <th>Detail</th>
      </tr>
      <tr>
        <td>id</td>
        <td>string</td>
        <td>最外层modal的id</td>
      </tr>
      <tr>
        <td>options</td>
        <td>object</td>
        <td>模态框参数设置：</br>
          <ul>
            <li>enable-{boolean}-是否启用SUI-modal</li>
            <li>mask-{number}-模态框遮罩的透明度(0-1)</li>
            <li>content-{string}-不启用SUI-modal时，弹出的内容</li>
          </ul>
        </td>
      </tr>
    </tbody>
  <table>

##### Returns
  modal object

##### Methods

  `modal.show()-显示模态框`

  `modal.hide()-隐藏模态框`

##### Properties
  `modal.options-模态框的参数：(例：modal.options.enable)`

  <table>
    <tbody>
      <tr>
        <th>Param</th>
        <th>Type</th>
        <th>Detail</th>
      </tr>
      <tr>
        <td>enable</td>
        <td>boolean</td>
        <td>是否启用SUI-modal</td>
      </tr>
      <tr>
        <td>mask</td>
        <td>number</td>
        <td>模态框遮罩的透明度(0-1)</td>
      </tr>
      <tr>
        <td>content</td>
        <td>string</td>
        <td>不启用SUI-modal时，弹出的内容</td>
      </tr>
    </tbody>
  <table>

___
#### **表格**
## **html:**
    <table class="form" id="form">
      <tbody id="form-header">
        <tr>
          <th>姓名</th>
          <th>语文</th>
          <th>数学</th>
          <th>英语</th>
          <th>总分</th>
          ...
        </tr>
      </tbody>
      <tbody id="form-body">
        <tr>
          <td>小明</td>
          <td>80</td>
          <td>90</td>
          <td>70</td>
          <td>240</td>
          ...
        </tr>
        ...
      </tbody>
    </table>

## **js:**

##### Usage

  `sUI.form.init(id, {options})`

##### Arguments
  <table>
    <tbody>
      <tr>
        <th>Param</th>
        <th>Type</th>
        <th>Detail</th>
      </tr>
      <tr>
        <td>id</td>
        <td>string</td>
        <td>最外层modal的id</td>
      </tr>
      <tr>
        <td>options</td>
        <td>object</td>
        <td>表格参数设置：</br>
          <ul>
            <li>enableline-{string}-哪几列启用排序('all'-全部启用，'1,2,3...'-1,2,3...列启用)</li>
            <li>algo-{function}-排序算法</li>
          </ul>
        </td>
      </tr>
    </tbody>
  <table>

##### Returns
  form object



