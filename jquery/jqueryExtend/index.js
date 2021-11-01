$.extend({
  timeline: function(){
    /**
     * @description 关于jQuery链式操作的猜想，传入'tagName.className' string 或者 HTMLElement 返回具有众多方法的Dom实例。
     * @param {string | HTMLElement} strr 
     */
    function Dom(strr){
      this.value = this.createEl(strr);
    }
    Dom.prototype = {
      /**
       * @description 给this.value中存储的节点插入子节点，返回this Dom实例
       * @param {array | Dom | string | HTMLElement} params 
       * @returns 
       */
      append(params) {
        if (params instanceof Array) {
          if (params[0].text instanceof Object) {
            for(let i = 1; i >= 0; i--){
              if(i == 0){
                let con = this.createEl(params[i].selector);
                let h4 = this.createEl("h4.title", params[i].text.title);
                let p = this.createEl("p.desc", params[i].text.desc);

                con.appendChild(h4);
                con.appendChild(p);

                this.value.appendChild(con);
              }else{
                this.value.appendChild(this.createEl(params[i].selector, params[i].text));
              }
            }
          } else {
            params.forEach((item, index) => { // 箭头函数没有this所以this可以指向Dom
              if(item.text || item.selector){
                this.value.appendChild(this.createEl(item.selector, item.text));
              }else{
                this.value.appendChild(this.createEl(item));
              }
            })
          }
          return this;
        }
        if (params instanceof Dom) {
          this.value.appendChild(params.value);
          return this;
        }
        this.value.appendChild(this.createEl(params));
        return this;
      },
      /**
       * @description 找到this.value中存储节点的子节点，通过'.className'类选择器的方式，返回具有append css addClass 方法的数组
       * @param {string} selectStr 
       * @returns 
       */
      find(selectStr) {
        let str = selectStr.split(".")[1],
            doms = this.value.getElementsByClassName(str),
            arr = [];
        if(doms.length == 1) {
          let a = new Dom(doms[0]);
          return a;
        }
        for(let i = 0; i < doms.length; i++){
          arr.push(new Dom(doms[i]));
        }
        Array.prototype.append = function(){
          this.forEach((item) => {
            item.append(arguments[0]);
          })
          return this;
        }
        Array.prototype.css = function(){
          this.forEach((item) => {
            item.css(arguments[0]);
          })
          return this;
        }
        Array.prototype.addClass = function(){
          this.forEach((item) => {
            item.css(arguments[0]);
          })
          return this;
        }
        return arr;
      },
      /**
       * @description 给this.value中存储的节点遍历添加style，返回this Dom实例
       * @param {object} styleObj 
       * @returns 
       */
      css(styleObj) {
        for (let key in styleObj){
          this.value.style[key] = styleObj[key];
        }
        return this;
      },
      /**
       * @description 给this.value中存储的节点添加class，返回this Dom实例
       * @param {array | string} className 
       * @returns 
       */
      addClass(className) {
        if(className instanceof Array){
          let classStr = this.value.className;
          for(let i = 0; i < className.length; i++){
            classStr += " " + className[i];
          }
          this.value.className = classStr;
          return this;
        }
        if(typeof className === "string"){
          this.value.className += " " + className;
        }
        return this;
      },
      /**
       * @description 给this.value中存储的节点添加移入移出函数，返回this Dom实例
       * @param {function} cb1 
       * @param {function} cb2 
       * @returns 
       */
      hover(cb1, cb2){
        this.value.onmouseenter = cb1;
        this.value.onmouseleave=  cb2;
        return this;
      },
      /**
       * @description 通过传入'tagName.className' string 的方式创建节点，可选传入节点的innerHTML， 如果传入的节点则返回节点本身
       * @param {HTMLElement | string} strs 
       * @param {string} text 节点innerHTML
       * @returns 
       */
      createEl(strs, text) {
        try {
          if (strs instanceof HTMLElement) return strs;
          let name = strs.split(".")[0],
          arr = strs.split("."),
          className = "";
          for (let i = 1; i < arr.length; i++){
            className += " " + arr[i];
          }
          className = className.trim();
          dom = document.createElement(name);
          dom.className = className;
          if (text) dom.innerHTML = text;
          return dom;
        } catch (error) {
          console.log(strs);
          throw error;
        }
      }
    }
    
    // 如果没有传入参数，或者传入的参数不是对象，报错提示需要传入一个对象作为参数
    if (!(typeof arguments[0] === "object")) throw new Error("Please enter an Object as param.");

    // 重命名参数
    let param = arguments[0],
    reverse = param.reverse,
    activities = param.activities,
    hover = param.hover;
    // 如果reverse为true则调用Array的reverse方法反序
    if(reverse) activities = activities.reverse();

    // 创建class为timeline的ul节点。
    let ul = el("ul.timeline");
    
    // 遍历activities，渲染具体的timelineItem
    activities.forEach((item, index, arr) => {
      let li = item.content instanceof Object ? el("li.timelineSection.card") : el("li.timelineSection");
      if (index == arr.length - 1) li.addClass("last");
      let lineSpot = el("div.lineSpot").append([ "div.line", "div.spot" ]);
      let spot = lineSpot.find(".spot");

      // 自定义设置部分渲染
      if (item.icon) {
        spot.append("i.iconfont." + item.icon);
      }
      if (item.color) {
        spot.css({
          backgroundColor: item.color
        });
      }
      if (item.size) {
        spot.addClass(item.size);
      }
      if (item.type) {
        spot.addClass(item.type);
      }

      let contentContainer = el("div.contentContainer")
      .append([
        { 
          selector: "div.content",
          text: item.content || ""
        }, 
        { 
          selector: "div.timeStamp",
          text: item.timestamp || ""
        }
      ]);

      if (hover && hover.value) {
        contentContainer.hover(function(){
          el(this).css({
            backgroundColor: hover.color
          })
        },function(){
          el(this).css({
            backgroundColor: ""
          })
        })
      }

      [ lineSpot, contentContainer ].forEach(item => {
        li.append(item);
      })

      ul.append(li);
    })

    // 返回jQuery对象
    return $(ul.value);

    // 简化new Dom()的写法，返回Dom实例
    function el(str){
      try {
        return new Dom(str);
      } catch (error) {
        throw error;
      }
    }
  }
})

$(function(){
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
    value: [option1, option2, option3],
    render: function(){
      $(document.body).append('<div class="container"></div>');
      let con = $('.container');
      this.value.forEach((item, index) => {
        con.append($.timeline(item));
        if (index != this.value.length - 1) con.append(this.divideLine);
      })
    },
    /**
     * @description 返回分割线节点
     * @returns jQueryDom
     */
    divideLine() {
      return $('<div class="divisionSection"></div>');
    }
  }

  task.render();
})