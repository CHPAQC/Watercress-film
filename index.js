var top250 = {
    init:function(){
        this.$element = $('#top250')
        this.isLoading = false
        this.isFinish = false
        this.index = 0
        this.bind()
        this.start()
    },
    bind: function(){
        var _this = this
        _this.$element.on('scroll',function(){
            // _this.isToBottom()
            _this.start()
            if(_this.isToBottom()){
                _this.start()
            }
        })
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        if(this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/top250',
            // type:'GET',
            data: {
                start: _this.index || 0
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret)
            _this.index += 20
            if(_this.index >= ret.total){
                _this.inFinish = true
            }
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.isLoading = false
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            var tpl = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="detail">
                    <h1></h1>
                    <div class="extra"><span class="score">9.6</span>分 /<span class="collect"></span>收藏</div>
                    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                    <div class="extra">导演：<span class="directors"></span></div>
                    <div class="extra">主演：<span class="casts"></span></div>
                </div>
            </a>    
        </div>`
        var $node = $(tpl)
        $node.find('.cover img').attr('src',movie.images.medium)
        // console.log(movie.images.medium)
        $node.find('.detail h1').text(movie.title)
        $node.find('.year').text(movie.year)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.type').text(movie.genres.join(' / '))
        $node.find('.directors').text(function(){
            directorsArr = []
            movie.directors.forEach(function(item){
                // directorsArr = []
                directorsArr.push(item.name)
                // console.log(item.name) 
            })
            return directorsArr.join('、')
        })
        $node.find('.casts').text(function(){
            castsArr = []
            movie.casts.forEach(function(item){
                castsArr.push(item.name)
            })
            return castsArr.join('、')
        })
        _this.$element.find('.container').append($node)
        })
    },
    isToBottom: function(){
        var _this = this
        return _this.$element.find('.container').height() <= _this.$element.height() + $('main').scrollTop() + 10
    }
}
var usBox = {
    init:function(){
        this.$element = $('#beimei')
        this.start()
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
        var _this = this
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/us_box',
            // type:'GET',
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret)
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            movie = movie.subject
            var tpl = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="detail">
                    <h1></h1>
                    <div class="extra"><span class="score">9.6</span>分 /<span class="collect"></span>收藏</div>
                    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                    <div class="extra">导演：<span class="directors"></span></div>
                    <div class="extra">主演：<span class="casts"></span></div>
                </div>
            </a>    
        </div>`
        var $node = $(tpl)
        $node.find('.cover img').attr('src',movie.images.medium)
        // console.log(movie.images.medium)
        $node.find('.detail h1').text(movie.title)
        $node.find('.year').text(movie.year)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.type').text(movie.genres.join(' / '))
        $node.find('.directors').text(function(){
            directorsArr = []
            movie.directors.forEach(function(item){
                // directorsArr = []
                directorsArr.push(item.name)
                // console.log(item.name) 
            })
            return directorsArr.join('、')
        })
        $node.find('.casts').text(function(){
            castsArr = []
            movie.casts.forEach(function(item){
                castsArr.push(item.name)
            })
            return castsArr.join('、')
        })
        _this.$element.find('.container').append($node)
        })
    }
}
var search = {
    init:function(){
        this.$element = $('#search')
        this.keyword = ''
        this.bind()
        this.start()
    },
    bind: function(){
       var _this = this
        this.$element.find('.button').on('click',function(){
            _this.keyword = _this.$element.find('input').val()
            _this.start()
        })
    },
    start:function(){
        var _this = this
        this.getData(function(data){
            _this.render(data)
        })
    },
    getData: function(callback){
       var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url:'https://api.douban.com/v2/movie/search',
            // type:'GET',
            data:{
                q: _this.keyword
            },
            dataType:'jsonp'
        }).done(function(ret){
            console.log(ret)
            callback && callback(ret)
        }).fail(function(){
            console.log('数据异常')
        }).always(function(){
            _this.$element.find('.loading').hide()
        })
    },
    render: function(data){
        var _this = this
        data.subjects.forEach(function(movie){
            var tpl = `<div class="item">
            <a href="#">
                <div class="cover">
                    <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
                </div>
                <div class="detail">
                    <h1></h1>
                    <div class="extra"><span class="score">9.6</span>分 /<span class="collect"></span>收藏</div>
                    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                    <div class="extra">导演：<span class="directors"></span></div>
                    <div class="extra">主演：<span class="casts"></span></div>
                </div>
            </a>    
        </div>`
        var $node = $(tpl)
        $node.find('.cover img').attr('src',movie.images.medium)
        // console.log(movie.images.medium)
        $node.find('.detail h1').text(movie.title)
        $node.find('.year').text(movie.year)
        $node.find('.collect').text(movie.collect_count)
        $node.find('.type').text(movie.genres.join(' / '))
        $node.find('.directors').text(function(){
            directorsArr = []
            movie.directors.forEach(function(item){
                // directorsArr = []
                directorsArr.push(item.name)
                // console.log(item.name) 
            })
            return directorsArr.join('、')
        })
        $node.find('.casts').text(function(){
            castsArr = []
            movie.casts.forEach(function(item){
                castsArr.push(item.name)
            })
            return castsArr.join('、')
        })
        _this.$element.find('.search-result').append($node)
        })
    }
}
var app = {
    init: function(){
        this.$tabs = $('footer>div')
        this.$panels =$('section')
        this.bind()
        top250.init()
        usBox.init()
        search.init()
    },
    bind: function(){
        var _this = this  
        this.$tabs.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
        })
    }
}
app.init()
