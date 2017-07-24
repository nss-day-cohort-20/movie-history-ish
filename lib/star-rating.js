/*
 * ---------------------------------------- *
 * jSimple Star Rating.min                  *
 * JavaScript                               *
 * v2.0.0                                   *
 * Matt O'Neill | www.matt-oneill.co.uk     *
 * ---------------------------------------- *
 */

(function (e) { e.fn.starRating = function (t) { return this.each(function () { var n = e(this); n.append("<ul />"); var r = e(this).children("ul"); for (var i = 0; i < n.data("rating-max") ; i++) { r.append("<li>") } $ratingFieldItem = r.children(); var o = 0; $ratingFieldItem.on({ click: function () { if (e(this).index() + 1 != o) { o = e(this).index() + 1; n.attr("data-val", o); e("li:lt(" + (e(this).index() + 1) + ")", r).addClass("active"); e("li:gt(" + e(this).index() + ")", r).removeClass("active") } else { e(this).parent().children("li").removeClass("active"); n.attr("data-val", null); o = 0 } }, mouseenter: function () { e("li:lt(" + (e(this).index() + 1) + ")", r).addClass("hover"); e("li:gt(" + e(this).index() + ")", r).removeClass("hover") }, mouseleave: function () { e(this).parent().children("li:gt(" + e(this).index() + ")").removeClass("hover") } }); r.on({ mouseleave: function () { $ratingFieldItem.removeClass("hover") } }); if (t.minus) { n.prepend("<span class='less'></span>"); e("span.less", n).on("click", function () { e("li.active:last", r).removeClass("active") }) } }) } })(jQuery)
