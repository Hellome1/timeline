$(function(){
  let itemList = $(".timelineItem");
  let first = itemList.eq(0);
  itemList.each(function(index, el){
    let top = $(el).offset().top;
    console.log(top, el);
    if(!index) {
      $(this).addClass("last");
    }else{
      $(this).addClass("none");
    }
    $(window).on("scroll", function(){
      let height = first.offset().top + first.height() + $(window).scrollTop();
      let index = $(el).index();
      if(height > top){
        $(el).removeClass("none");
        $(el).addClass("last");
        if(index) $(el).find(".contentBox").addClass("bounce");
        itemList.eq(index - 1).removeClass("last")
      }else{
        $(el).addClass("none");
        $(el).removeClass("last");
        $(el).find(".contentBox").removeClass("bounce");
        itemList.eq(index - 1).addClass("last")
      }
    })
  })
  $(document.body).height(1000);
})