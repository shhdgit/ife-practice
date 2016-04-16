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

  `modal.options-模态框的参数：`
  <ul>
    <li>enable-{boolean}-是否启用SUI-modal</li>
    <li>mask-{number}-模态框遮罩的透明度(0-1)</li>
    <li>content-{string}-不启用SUI-modal时，弹出的内容</li>
  </ul>

___

