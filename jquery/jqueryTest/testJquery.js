function _$(str){
  if(str.indexOf("<") > -1){
    // 创建
  }else{
    let arr = _select(str);
    return {
      element: arr,
      css: function(styleName, styleValue){
        if(this.element.length){
          for(let i = 0; i < this.element.length; i++){
            this.element[i].style[styleName] = styleValue;
          }
        }
        return this;
      },
      text: function(textValue){
        if(this.element.length){
          for(let i = 0; i < this.element.length; i++){
            this.element[i].innerHTML = textValue;
          }
        }
        return this;
      }
    }
  }

  function _select(str){
    return document.getElementsByTagName(str);
  }
}