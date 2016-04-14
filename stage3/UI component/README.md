# UI组件

### **API**
___
#### **模态框**
### **html:**
  >
    <div class="modal" id="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>...</h4>                                 // add title
          </div>
          <div class="modal-body" data-content="...">    // data-content为不使用SUI时alert()的内容
            ...                                          // add content
          </div>
          <div class="modal-footer">
            ...                                          // add button or something
          </div>
        </div>
      </div>
    </div>

### **js:**

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

  `show()-显示模态框`

  `hide()-隐藏模态框`

##### Properties

  `modal.options`

  模态框的参数：

    <ul>
      <li>enable-{boolean}-是否启用SUI-modal</li>
      <li>mask-{number}-模态框遮罩的透明度(0-1)</li>
      <li>content-{string}-不启用SUI-modal时，弹出的内容</li>
    </ul>

___

### **任务描述**

  **任务目的**

  > 练习综合运用HTML、CSS、JavaScript实现局部功能
    练习对于代码的抽象与封装
    为第四阶段的RIA任务做准备

  **任务描述**

  1.  **浮出层** [http://rollaround.cn/demo/stage3/UI%20component/](http://rollaround.cn/demo/stage3/UI%20component/)

      参考如下设计图，实现一个浮出层的UI组件实现
      ![](img/task_3_37_1.jpg)

      > * 浮出层
        * 浮出层的中心默认在屏幕正中
        * 当浮出层显示时，屏幕滚动时，浮出层始终保持位置固定在屏幕正中，不随屏幕滚动而变化位置。或者禁止页面在有浮出层出现时滚动
        * 当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层。可以实现一个半透明的遮罩来挡住浮出层外的部分
        * 浮出层的样式、内容和逻辑尽量解耦
        * 提供使用JavaScript控制浮出层展现和关闭的接口
        * 浮出层的窗口大小可以是一个默认固定值，也可以是随内容变化而自适应变化，也可以是通过接口参数进行调整，自行根据自己能力进行选择
        * 有能力的同学可以实现浮出层的拖拽移动浮出窗口位置以及拖拽边缘来放大缩小浮出窗口的功能


  1. **排序表格**
