$(function(){
  let params = {
    activities: [
      {
        title: "17素材网 1",
        desc: "17素材网专注于提供免费素材下载,其内容涵盖设计素材,PSD素材,矢量素材,图片素材,图标素材,设计字体等免费素材.下载免费素材尽在17素材网免费素材网",
        link: {
          url: "#",
          content: "阅读更多"
        },
        date: "Jan 14",
        imgUrl: "./image/cd-icon-picture.svg"
      },
      {
        title: "17素材网 1",
        desc: "17素材网专注于提供免费素材下载,其内容涵盖设计素材,PSD素材,矢量素材,图片素材,图标素材,设计字体等免费素材.下载免费素材尽在17素材网免费素材网",
        link: {
          url: "#",
          content: "阅读更多"
        },
        date: "Jan 18",
        imgUrl: "./image/cd-icon-location.svg"
      },
      {
        title: "17素材网 1",
        desc: "17素材网专注于提供免费素材下载,其内容涵盖设计素材,PSD素材,矢量素材,图片素材,图标素材,设计字体等免费素材.下载免费素材尽在17素材网免费素材网",
        link: {
          url: "#",
          content: "阅读更多"
        },
        date: "Jan 20",
        imgUrl: "./image/cd-icon-movie.svg"
      },
      {
        title: "17素材网 1",
        desc: "17素材网专注于提供免费素材下载,其内容涵盖设计素材,PSD素材,矢量素材,图片素材,图标素材,设计字体等免费素材.下载免费素材尽在17素材网免费素材网",
        link: {
          url: "#",
          content: "阅读更多"
        },
        date: "Jan 22",
        imgUrl: "./image/cd-icon-picture.svg"
      }
    ]
  }
  let UL = new timeline(params);
  document.getElementsByClassName("container")[0].appendChild(UL);

  let itemList = $(".timelineItem");
  let first = itemList.eq(0);
  itemList.each(function(index, el){
    let top = $(el).offset().top;
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