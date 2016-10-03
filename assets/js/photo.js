var photoBox={

    page: 1,
    offset: 20,
    init: function () {
        var that = this;
        $.getJSON("/photo/output.json", function (data) {
            that.render(that.page, data);

            that.scroll(data);
        });
    },

    render: function (page, data) {
        var begin = (page - 1) * this.offset;
        var end = page * this.offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li>' +
                '<a class="img-bg" rel="example_group" href="https://github.com/wcl1237/wcl1237.github.io/blob/master/photos/' + data[i] + '?raw=true">' +
                '<img src="https://github.com/wcl1237/wcl1237.github.io/blob/master/photos/' + data[i] + '?raw=true" /></a>' +
                '</li>'
        }

        $(".img-box-ul").append(li);

 
    },

    scroll: function (data) {
        var that = this;
        $(window).scroll(function() {
            var windowPageYOffset = window.pageYOffset;
            var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
            var sensitivity = 0;

            var offsetTop = $(".instagram").offset().top + $(".instagram").height();

            if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                that.render(++that.page, data);
            }
        })
    }
}
window.onload=function() {
    if($(".instagram").length) {
        photoBox.init();
         Galleria.loadTheme('https://wcl1237.github.io/assets/lib/photo/themes/lightbox/galleria.lightbox.js');
            $('#galleria').galleria({
               data_source: '.instagram',
               extend: function() {
                    this.bind(Galleria.LOADFINISH, function(e) {
                        $(e.imageTarget).click(this.proxy(function(e) {
                            e.preventDefault();
                            this.next();
                        }))
                    })
                },
               keep_source: true,
               data_config: function(img) {
                   return {
                       description: $(img).next('.caption').html()||''
                   }
               }
           });
    }


}
