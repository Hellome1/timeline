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

/* 使用append方法和outerHTML实现 */

// function load(data){
//   let { reverse, activities } = data;
//   if (!activities) {
//     console.warn("渲染失败，请确认是否传入activities。");
//   }
  
//   let ulStart = `<ul class="timeline">`;
//   let ulEnd = `</ul>`;
//   if(reverse){
//     for(let i = activities.length - 1; i >= 0; i--){
//       let { content, timestamp, size, type, icon } = activities[i];
//       let iconhtml = icon ? `<i class="iconfont ${icon}"></i>` : "";
//       let last = i == 0 ? "last" : "";
//       let li = `<li class="timelineSection ${last}">
//           <div class="lineSpot">
//               <div class="spot ${size | ""} ${type | ""}">${iconhtml}</div>
//               <div class="line"></div>
//           </div>
//           <div class="contentContainer">
//               <div class="content">${content}</div>
//               <div class="timeStamp">${timestamp}</div>
//           </div>
//       </li>`;
//       ulStart += li;
//     }
//   }else{
//     for(let i = 0; i < activities.length; i++){
//       let { content, timestamp, size, type, icon, color } = activities[i];
//       let iconhtml = icon ? `<i class="iconfont ${icon}"></i>` : "";
//       let last = i == activities.length - 1 ? "last" : "";
//       let colorStyle = color ? "background-color: " + color : "";
//       let li = `<li class="timelineSection ${last}">
//           <div class="lineSpot">
//               <div class="spot ${size || ""} ${type || ""}" style="${colorStyle}">${iconhtml}</div>
//               <div class="line"></div>
//           </div>
//           <div class="contentContainer">
//               <div class="content">${content}</div>
//               <div class="timeStamp">${timestamp}</div>
//           </div>
//       </li>`;
//       ulStart += li;
//     }
//   }
//   ulStart += ulEnd;

//   let ulDom = document.createElement("ul");
//   containerDom.append(ulDom);
//   ulDom.outerHTML = ulStart;
// }


/**
 * @description 给逆序input节点添加checked，增加正序逆序点击事件
 */
 function addClick(){
  let reverse = document.getElementById("reverse");
  let positive = document.getElementById("positive");
  let ulS = document.getElementsByClassName("timeline");

  reverse.checked = true;

  reverse.onclick = function(){
    if(option1.reverse) return;
    option1.reverse = !option1.reverse;
    containerDom.removeChild(ulS[0]);
    let firstDom = containerDom.children[0];
    containerDom.insertBefore(timeline(option1), firstDom);
  }

  positive.onclick = function(){
    if(!option1.reverse) return;
    option1.reverse = !option1.reverse;
    containerDom.removeChild(ulS[0]);
    let firstDom = containerDom.children[0];
    containerDom.insertBefore(timeline(option1), firstDom);
  }
}

/**
 * @description 划线
 */
 function divideLine(){
  let divDom = document.createElement("div");
  divDom.className = "divisionSection";
  containerDom.appendChild(divDom);
}

let containerDom = document.getElementsByClassName("container")[0];
containerDom.appendChild(timeline(option1));
divideLine();
containerDom.appendChild(timeline(option2));
divideLine();
containerDom.appendChild(timeline(option3));
addClick();