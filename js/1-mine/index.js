let option1 = {
  reverse: true,
  activities: [{
    content: '活动按期开始',
    timestamp: '2018-04-15'
  }, {
    content: '通过审核',
    timestamp: '2018-04-13'
  }, {
    content: '创建成功',
    timestamp: '2018-04-11'
  }]
};

let option2 = {
  activities: [{
    content: '支持使用图标',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: 'icon-xinwendongtai'
  }, {
    content: '支持自定义颜色',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87'
  }, {
    content: '支持自定义尺寸',
    timestamp: '2018-04-03 20:46',
    size: 'large'
  }, {
    content: '默认样式的节点',
    timestamp: '2018-04-03 20:46'
  }],
  hover: {
    value: true,
    color: "rgba(150, 200, 200, 0.15)"
  }
};

let option3 = {
  contentCard: true,
  activities: [{
    content: {
      title: '更新 Github 模板',
      desc: '王小虎 提交于 2018/4/12 20:46'
    },
    timestamp: '2018/4/12'
  },{
    content: {
      title: '更新 Github 模板',
      desc: '王小虎 提交于 2018/4/3 20:46'
    },
    timestamp: '2018/4/3'
  },{
    content: {
      title: '更新 Github 模板',
      desc: '王小虎 提交于 2018/4/2 20:46'
    },
    timestamp: '2018/4/2'
  }],
  hover: {
    value: true,
    color: "rgba(150, 200, 200, 0.1)"
  }
}

let task = {
  dom: document.getElementsByClassName("container")[0],
  value: [option1, option2, option3],
  render: function(){
    let _this = this;
    this.value.forEach(function(option, index, arr){ // 使用箭头函数则不需要使用_this
      _this.dom.appendChild(new Timeline(option).value);
      if(index != arr.length){
        _this.divideLine();
      }
    })
    this.addClick();
  },
  /**
   * @description 划线
   */
  divideLine(){
    let divDom = document.createElement("div");
    divDom.className = "divisionSection";
    this.dom.appendChild(divDom);
  },
  /**
   * @description 给逆序input节点添加checked，增加正序逆序点击事件
   */
  addClick(){
    let reverse = document.getElementById("reverse");
    let positive = document.getElementById("positive");
    let ulS = document.getElementsByClassName("timeline");
    let _this = this;

    reverse.checked = true;

    reverse.onclick = function(){
      if(option1.reverse) return;
      option1.reverse = !option1.reverse;
      _this.dom.removeChild(ulS[0]);
      let firstDom = _this.dom.children[0];
      _this.dom.insertBefore(new Timeline(_this.value[0]).value, firstDom);
    }

    positive.onclick = function(){
      if(!option1.reverse) return;
      option1.reverse = !option1.reverse;
      _this.dom.removeChild(ulS[0]);
      let firstDom = _this.dom.children[0];
      _this.dom.insertBefore(new Timeline(_this.value[0]).value, firstDom);
    }
  }
}

task.render();