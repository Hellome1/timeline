/**
 * @description 传入参数返回timeline节点
 * @param {object} obj 配置参数
 */
function Timeline(obj){
  if (obj && obj.activities) this.value = this.init(obj);
}

Timeline.prototype = {
  value: null,
  createUl(params){
    let UL = this.createEle("ul.timeline");
    let _this = this;

    params.activities.forEach(function(item, index){
      UL.appendChild(_this.createLi(item))
    })

    return UL;
  },
  /**
   * @description 传入配置参数返回timelineItem
   * @param {object} activities 
   * @returns 
   */
  createLi(activities){
    let { title, desc, link, date, imgUrl } = activities;
    let LI = this.createEle("li.timelineItem");

    let divContentBox = this.createEle("div.contentBox");
    let h3Title = this.createEle("h3.title", title);
    let pDesc = this.createEle("p.desc", desc);
    let aMore = this.createEle("a.more", link.content);
    aMore.href = link.url;
    let spanDate = this.createEle("span.date", date);
    [h3Title, pDesc, aMore, spanDate].forEach(function(item, index){
      divContentBox.appendChild(item);
    })

    let divIconBox = this.createEle("div.iconBox");
    let img = this.createEle("img");
    img.src = imgUrl;
    divIconBox.appendChild(img);
    ["location", "movie"].forEach(function(item, index){
      if (imgUrl.indexOf(item) > -1) {
        divIconBox.className += " " + item;
      }
    })

    let line = this.createEle("div.line");

    [divContentBox, divIconBox, line].forEach(function(item, index){
      LI.appendChild(item);
    })

    return LI;
  },
  /**
   * @description 传入节点名创建节点通过 nodeName.className 添加class
   * @param {string} nodeName 
   * @param {string} text 
   * @returns 
   */
  createEle(nodeName, text){
    let name = nodeName.split(".")[0];
    let node = document.createElement(name);
    let classArr = nodeName.split(".").slice(1);
    let className = "";
    classArr.forEach(function(item, index){
      className += item;
    })
    node.className = className;
    if (text) node.innerHTML = text;
    return node;
  },
  init(obj){
    return this.createUl(obj);
  }
}
