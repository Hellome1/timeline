/* 
    构造函数改造
    传入参数生成timeline时间轴节点

    option = {
        reverse: false ,// 可选，是否反序排序，default false 
        contentCard: false ,// 可选，内容是否为卡片形式，default false
        activities: [  // 必选，时间轴的内容和时间以及条数
            {
                content: , // 必选，内容，一般为字符串，当contentCard为true时 content格式为 { title:  // 标题 , desc:  // 描述 }
                timestamp:  ,// 必选，时间戳
                size:  ,// 可选，时间轴轴线节点的大小，例如 "12px"
                type:  ,// 可选，时间轴轴线节点的主题样式，目前只有"primary"
                icon:  ,// 可选，时间轴轴线节点是否加入图标，默认使用 iconfont 图标 class 方法，传入 "iconfont xxx" xxx 部分，例如 "icon-xinwendongtai"
                color:  // 可选，时间轴轴线节点的颜色
            },
            {
                content: ,
                timestamp:
            }
        ],
        hover:  { // 可选，是否设置移入背景颜色
            value: false ,// 可选，是否设置移入背景色，默认 false
            color: 'rgba(150, 200, 200, 0.1)' // 可选，是否自定义颜色，默认 'rgba(150, 200, 200, 0.1)'
        }
    }
*/

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
  }],
  hover: {
    value: true,
    color: "rgba(150, 200, 200, 0.1)"
  }
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
  }]
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
  }]
}

let task = {
  value: [option1, option2, option3],
  render() {
    this.value.forEach((item, index) => {
      $(".container").append($.tl(item));
      if (index != this.value.length -1) $("<div></div>").addClass("divisionSection").appendTo(".container");
    })
    this.addClick();
  },
  /**
   * @description 使用jquery添加点击事件
   */
  addClick() {
    $("#reverse").attr("checked", true).on("click", function(){
      if (option1.reverse) return;
      option1.reverse = !option1.reverse;
      $(".timeline:first-of-type").remove();
      $(".container").prepend($.tl(option1));
    })
  
    $("#positive").on("click", function(){
      if (!option1.reverse) return;
      option1.reverse = !option1.reverse;
      // console.log(option1.reverse);
      $(".timeline:first-of-type").remove();
      $(".container").prepend($.tl(option1));
    })
  }
}

$(function(){
  console.log("JQuery is ready!")

  task.render();
})

$.extend({
  /**
   * @description 用jquery实现，传入参数返回相应时间轴节点
   * @param {object} data 
   */
  tl(data) {
    function Tl(dt){
      if (typeof dt === "object") this.value = this.init(dt);
    }

    Tl.prototype = {
      init() {
        let { reverse, activities, contentCard, hover } = data;
        if (!activities) {
          console.error("渲染失败，请确认是否传入activities。");
        }
        
        let ulDom = $(`<ul class="timeline"></ul>`);
        let actArr = activities.slice();
        actArr = reverse ? actArr.reverse() : actArr ;
        for(let i = 0; i < actArr.length; i++){
          let { content, timestamp, size, type, icon, color } = actArr[i];
          content = contentCard ? 
          `
            <h3 class="title">${content.title}</h3>
            <p class="desc">${content.desc}</p>` : content;
          let contentSection = contentCard ? 
          `<div class="timeStamp">${timestamp}</div>
          <div class="content">${content}</div>` :
          `<div class="content">${content}</div>
          <div class="timeStamp">${timestamp}</div>`;
          let iconhtml = icon ? `<i class="iconfont ${icon}"></i>` : "";
          let last = i == actArr.length - 1 ? "last" : "";
          let colorStyle = color ? "background-color: " + color : "";
          let li = `<li class="timelineSection ${last} ${contentCard ? " card" : ""}">
              <div class="lineSpot">
                  <div class="spot ${size || ""} ${type || ""}" style="${colorStyle}">${iconhtml}</div>
                  <div class="line"></div>
              </div>
              <div class="contentContainer">
                ${contentSection}
              </div>
          </li>`;

          let liDom = $(li);
          if(hover && hover.value && hover.color){
            liDom.hover(function(){
              $(this).css("backgroundColor", hover.color);
            },function(){
              $(this).css("backgroundColor", "");
            })
          }

          ulDom.append(liDom);
        }

        return ulDom;
      }
    }

    return new Tl(data).value;
  }
})
