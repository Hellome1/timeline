/* 
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


/**
 * @description 传入选项返回对应时间轴节点
 * @param {object} data 
 * @param {boolean} insertBefore 
 */
function timeline(data){
  let { reverse, activities, contentCard, hover } = data;
  if (!activities) {
    console.error("渲染失败，请确认是否传入activities。");
  }
  
  let ulDom = createEle("ul", { className: "timeline"});
  
  if(reverse){
    for(let i = activities.length - 1; i >= 0; i--){
      activities[i].last = false;
      if(i == 0){
        activities[i].last = true;
      }

      let li = contentCard ? createItem(activities[i], contentCard) : createItem(activities[i]);

      if(hover && hover.value){
        let contentContainer = li.getElementsByClassName("contentContainer")[0]
        hoverColor(contentContainer, hover.color);
      }

      ulDom.appendChild(li);
    }
  }else{
    for(let i = 0; i < activities.length; i++){
      activities[i].last = false;
      if(i == activities.length - 1){
        activities[i].last = true;
      }

      let li = contentCard ? createItem(activities[i], contentCard) : createItem(activities[i]);

      if(hover && hover.value){
        let contentContainer = li.getElementsByClassName("contentContainer")[0]
        hoverColor(contentContainer, hover.color);
      }

      ulDom.appendChild(li);
    }
  }
  
  return ulDom;
}

/**
 * @description 创建时间轴的基本项
 * @param {object} itemData 
 * @param {boolean} cardJudge 
 * @returns 
 */
function createItem(itemData, cardJudge = false){
  let { content, timestamp, size, type, icon, color, last } = itemData;
  let lastStr = last ? " last" : "";
  let cardStr = cardJudge ? " card" : "";
  let liDom = createEle("li", { className: "timelineSection" + lastStr + cardStr});
  let div1 = createEle("div", { className: "lineSpot"});
  let sizeClass = size ? " " + size : "";
  let typeClass = type ? " " + type : "";
  let divSpot = createEle("div", { 
        className: "spot" + sizeClass + typeClass,
        style: {
          backgroundColor: color
        }
      });
  let divLine = createEle("div", { className: "line"});
  let div2 = createEle("div", { className: "contentContainer"});
  let divContent = createEle("div", { className: "content"});
  let divTimeStamp = createEle("div", { className: "timeStamp"});

  if(cardJudge){
    let hTitle = createEle("h4", { className: "title"});
    hTitle.innerHTML = content.title;
    let pDesc = createEle("p", { className: "desc"});
    pDesc.innerHTML = content.desc;
    divContent.appendChild(hTitle);
    divContent.appendChild(pDesc);
    div2.appendChild(divTimeStamp);
    div2.appendChild(divContent);
  }else{
    divContent.innerHTML = content;
    div2.appendChild(divContent);
    div2.appendChild(divTimeStamp);
  }

  divTimeStamp.innerHTML = timestamp;
  
  if(icon){
    let iconName = "iconfont " + icon;
    let iDom = createEle("i", { className: iconName});
    divSpot.appendChild(iDom);
  }
  div1.appendChild(divSpot);
  div1.appendChild(divLine);
  liDom.appendChild(div1);
  liDom.appendChild(div2);

  return liDom;
}

/**
 * @description 为传入dom添加hover效果，可选颜色
 * @param {HTMLElement} dom 
 * @param {string} color 
 */
function hoverColor(dom, color = "rgba(150, 200, 200, 0.1)"){
  dom.onmouseenter = function(){
    this.style.backgroundColor = color;
  }
  dom.onmouseleave = function(){
    this.style.backgroundColor = "";
  }
}

/**
 * @description 传入节点名称和属性对象创建节点
 * @param {string} domName 
 * @param {object} attrobj 
 * @returns 
 */
function createEle(domName, attrobj = {}){
  let { className, style } = attrobj;
  let dom = document.createElement(domName);
  if (className){
    dom.className = className;
  }
  if (style){
    for( key in style ){
      dom.style[key] = style[key];
    }
  }
  return dom;
}
