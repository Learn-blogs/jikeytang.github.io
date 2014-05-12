/**
 * @author: 豪情
 * @see: <a href="mailto:jikeytang@gmail.com">豪情</a>
 * @time: 2014-4-19 下午5:45
 * @info:
 */
;(function(win, undefined){
    var document = win.document,
        loc = win.location,
        docEle = document.documentElement,
        arr = [],
        slice = arr.slice,
        concat = arr.concat,
        push = arr.push,
        indexOf = arr.indexOf,// js 1.6新增加的方法
        version = '1.0',
        class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty,
        isIE6 = !win.XMLHttpRequest && !win.opera,
        support = {},
        _ = { // 私有方法集合
            isArraylike : function(obj){
                var length = obj.length,
                    type = $.type(obj);

                if(type == 'function' && $.isWindow(obj)){
                    return false;
                }

                if(obj.nodeType === 1 && length){
                    return true;
                }
                // http://bbs.csdn.net/topics/390413500
                return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
            }
        };

    win.$ = win.Jing = $ = function(selector, context){ // 力量的源泉源
        return new $.fn.init(selector, context);
    }
    
    $.fn = $.prototype = {
        jing : version,
        constructor : $,
        sort : arr.sort,
        push : push,
        splice : arr.splice,
        context : null,
        selector : '',
        length : 0,
        init : function(selector, context){
            var obj = null,
                context = context || document,
                select = '';

            // $(''), $(null), $(undefined), $(false)
            if(!selector){
                return this;
            }

            // HTML strings
            if(typeof selector === 'string'){
                if(selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3){
                    // 不能处理多标签的情况，如<p><span></span></p>
//                    return this.setArray([context.createElement(selector.slice(1, -2))]);
                    var div = document.createElement('div');
                    div.innerHTML = selector;
                    return this.setArray(this.makeArray(div.childNodes));
                }
            } else if(selector.nodeType || selector == win){ // $(window,document,document.body,tag)
                this.context = this[0] = selector;
                this.selector = selector;
                this.length = 1;
                return this;
            }

            selector = selector.toString();
            // $("#id")
            if(selector.indexOf('#') == 0){
                obj = context.getElementById(selector.slice(1));
            } else if(selector.indexOf('.') == 0){ // $(".className")
                obj = this.getElementsByClassName(context, selector.slice(1));

            } else { // $("tagName")
                obj = context.getElementsByTagName(selector);
            }
            this.context = document;
            this.selector = selector;

            return this.setArray(this.makeArray(obj));
        },
        toArray : function(){
            return slice.call(this);
        },
        /**
         * 如果num为负则返回this.length+num值；如果num为空，直接返回一个数组元素
         * @param num
         */
        get : function(num){
            return num != null ? (num < 0 ? this[num + this.length] : this[num]) : slice.call(this);
        },
        pushStack : function(elems){
            var ret = $.merge(this.constructor(), elems);

            ret.prevObject = this;
            ret.context = this.context;

            return ret;
        },
        setArray : function(obj){
            this.length = 0;
            Array.prototype.push.apply(this, obj);
            return this;
        },
        // 把传入参数变成数组
        makeArray : function(arr) {
            var ret = [];
            if( arr != null ){
                var i = arr.length;
                // 单个元素，但window, string、 function有 'length'的属性，加其它的判断
                if (i == null || arr.split || arr.setInterval || arr.call) {
                    ret[0] = arr;
                } else {
                    try {
                        ret = Array.prototype.slice.call(arr);
                    } catch (e) {
                        while (i) ret[--i] = arr[i]; // Clone数组
                    }
                }
            }
            return ret;
        },
        getElementsByClassName : function(context, name){
            if(context.getElementsByClassName){
                return context.getElementsByClassName(name);
            } else {
                var i = 0,
                    res = [],
                    child = null,
                    len = all.length,
                    all = context.all,
                    regex = new RegExp('(^|\\s)' + name + '(\\s|$)');

                for( ; i < len; i++){
                    child = all[i];
                    if(regex.test(child.className)){
                        res.push(child);
                    }
                }
                return res;
            }
        },

        each : function(callback, args){
            return $.each(this, callback, args);
        },
        map : function(callback){
            return this.pushStack($.map(this, function(elem, i){
                return callback.call(elem, i, elem);
            }));
        },
        /**
         * 确定elem在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
         * @param elem
         * @param arr
         * @param i 开始位置
         */
        inArray : function(elem, arr, i){
            var len;

            if(arr){
                if(indexOf){
                    return indexOf.call(elem, arr, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
                for( ; i < len; i++){
                    if(i in arr && arr[i] == elem){
                        return i;
                    }
                }
            }

            return -1;
        },
        now : function(){
            return +(new Date());
        },
        support : support
    }

    $.fn.init.prototype = $.fn;

    $.extend = $.fn.extend = function(){
        var target = arguments[0] || {},
            length = arguments.length,
            options,
            name,
            i = 1;

        if(length == i){
            target = this;
            --i;
        }
        for( ; i < length; i++){
            if((options = arguments[i]) != null){
                for(name in options){
                    if(options[name] != undefined){
                        target[name] = options[name];
                    }
                }
            }
        }

        return target;
    }

    var rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi;

    _.fcamelCase = function(all, letter){
        return letter.toUpperCase();
    }

    // 常用工具方法
    $.extend({
        // 非重复标志位
        expando : 'Jing' + (version + Math.random()).replace(/\D/g, ''),
        // 空函数快捷方式
        noop : function(){},
        isFunction : function(obj){
            return $.type(obj) === 'function';
        },
        isArray : Array.isArray || function(obj){
            return $.type(obj) === 'array';
        },
        // 是否为窗口
        isWindow : function(obj){
            return obj != null && obj == obj.window;
        },
        trim : function(text){
            return text.replace(/^\s+|\s+$/g, '');
        },
        type : function(obj){
            return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
        },
        each : function(obj, callback){
            var value,
                i = 0,
                length = obj.length,
                isArray = _.isArraylike(obj);

            if(isArray){ // 如果是数组
                for( ; i < length; i++){
                    value = callback.call(obj[i], i, obj[i]);
                    if(value === false){
                        break;
                    }
                }
            } else { // 如果不是数组
                for(i in obj){
                    value = callback.call(obj[i], i, obj[i]);
                    if(value === false){
                        break;
                    }
                }
            }

            return obj;
        },
        /**
         * 合并两个参数
         * @param first
         * @param end
         */
        merge : function(first, second){
            var len = second.length,
                i = first.length,
                j = 0;

            while(j < len){
                first[i++] = second[j++];
            }
            first.length = i;
            return first;
        },
        map : function(elems, callback, arg){
            var i = 0,
                value,
                ret = [],
                length = elems.length,
                isArray = _.isArraylike(elems);

            if(isArray){
                for( ; i < length; i++){
                    value = callback(elems[i], i, arg);
                    if(value != null){
                        ret.push(value);
                    }
                }
            } else {
                for(i in elems){
                    value = callback(elems[i], i, arg);
                    if(value != null){
                        ret.push(value);
                    }
                }
            }
            return concat.apply([], ret);
        },
        clone : function(elem, dataAndEvents){
            var clone;
            clone = elem.cloneNode(true);

            return clone;
        },
        /**
         * 加强版文档碎片处理
         * @param elems 要添加的元素
         * @param context 文档上下文
         * @param scripts 是否有script
         * @param selection
         * @returns {*|DocumentFragment}
         */
        buildFragment : function(elems, context, scripts, selection){
            var i = 0,
                nodes = [],
                elem = null,
                l = elems.length,
                safe = document.createDocumentFragment();

            for( ; i < l; i++){
                elem = elems[i];
                $.merge(nodes, elem);
            }

            i = 0;
            while((elem = nodes[i++])){
                safe.appendChild(elem);
            }

            return safe;
        },
        cleanData : function(elems, acceptData){

        },
        /**
         * 中划线转为大写
         * @param string
         * @returns {XML|string}
         */
        camelCase : function(string){
            return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, _.fcamelCase);
        },
        // 全局计数器对象
        guid : 1
    });

    /**
     * 多功能处理函数，setter,getter混合处理
     * @param elems
     * @param fn
     * @param key
     * @param value
     * @param chainable
     * @param emptyGet
     * @param raw // value值是否为函数的开关。如果是值，直接传递；如果是函数，则回调
     * @returns {*}
     */
    _.access = function(elems, fn, key, value, chainable, emptyGet, raw){
        var i = 0,
            length = elems.length,
            bulk = key == null;

        if($.type(key) === 'object'){ // 传递参数如{ color : 'red', fontSize : '20px' }
            chainable = true;
            for(i in key){
                _.access(elems, fn, i, key[i], true, emptyGet, raw);
            }
        } else if(value !== undefined){ // 设置data，即set
            chainable = true;

            if(!$.isFunction(value)){
                raw = true; // value不是函数，则raw设为true
            }
            
            if(bulk){ // data操作时必然true
                
            }

            if(fn){ // fn存在，开始正式执行fn
                for(; i < length; i++){
                    fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                }
            }
        }

        return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    }
    // DOM常规操作
    $.fn.extend({
        append : function(){
            return this.domManip(arguments, function(elem){
                if(this.nodeType == 1 || this.nodeType == 11 || this.nodeType == 9){
                    this.appendChild(elem);
                }
            });
        },
        prepend : function(){
            return this.domManip(arguments, function(elem){
                if(this.nodeType == 1 || this.nodeType == 11 || this.nodeType == 9){
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        before : function(){
            return this.domManip(arguments, function(elem){
                if(this.parentNode){
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },
        after : function(){
            return this.domManip(arguments, function(elem){
                if(this.parentNode){
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },
        /**
         * dom处理，将args转换为dom元素，并放在一个文档碎片中，
         * 执行callback，实现真正的回调插入操作
         * @param args
         * @param callback
         */
        domManip : function(args, callback){
            args = concat.apply([], args);

            var i = 0,
                l = this.length,
                fragment,
                first,
                node;

            if(l){
                fragment = $.buildFragment(args, this[0].ownerDocument, false, this);
                first = fragment.firstChild;
                /*var div = document.createElement('div');
                div.innerHTML = (args.length === 1 ? args.get() : args);
                node = div.childNodes[0];
                div = null;*/

                for( ; i < l; i++){
                    callback.call(this[i], first, i);
                }
            }

            return this;
        },
        clone : function(){
            return this.map(function(){
                return $.clone(this);
            });
        },
        empty : function(){
            var i = 0,
                elem;

            for( ; (elem = this[i]) != null; i++){
                while(elem.firstChild){
                    elem.removeChild(elem.firstChild);
                }
            }

            return this;
        },
        html : function(value){
            if(value === undefined){
                return this[0] && this[0].nodeType === 1 ? $.trim(this[0].innerHTML) : null;
            } else if(typeof value === 'string') {
                try{
                    for(var i = 0, l = this.length; i < l; i++){
                        if(this[i].nodeType === 1){
                            this[i].innerHTML = value;
                        }
                    }
                } catch(e) {
                    this.empty().append(value);
                }
            } else {
                this.empty().append(value);
            }

            return this;
        }
    });

    // dom反向操作
    $.each({
        appendTo : 'append', prependTo : 'prepend',
        insertBefore : 'before', insertAfter : 'after', replaceAll : 'replaceWith'
    }, function(name, original){
        $.fn[name] = function(selector){
            var i = 0,
                ret = [],
                elem = null,
                insert = $(selector),
                last = insert.length - 1;

            for( ; i <= last; i++){
                elem = i === last ? this : this.clone();
                $(insert[i])[original](elem);

                push.apply(ret, elem.get());
            }

            return this.pushStack(ret);
        }
    });

    // 'Boolean Number String Function Array Date RegExp Object Error'.split(' ')
    $.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name){
        class2type['[object ' + name + ']'] = name.toLowerCase();
    });


    // className 相关操作
    var rnotwhite = (/\S+/g);
    $.fn.extend({
        addClass : function(value){
            var i = 0,
                j,
                cur = '',
                elem = null,
                classes = [],
                clazz = '',
                len = this.length,
                finalValue = '',
                proceed = typeof value === 'string' && value;

            if(proceed){
                classes = value.match(rnotwhite);
                for( ; i < len; i++){
                    elem = this[i];

                    cur = elem.nodeType === 1 && (elem.className ? ' ' + elem.className + ' ' : ' ');
                    if(cur){
                        j = 0;

                        while((clazz = classes[j++])){
                            if(cur.indexOf(' ' + clazz + ' ') < 0){
                                cur += clazz + ' ';
                            }
                        }

                        finalValue = $.trim(cur);
                        if(elem.className !== finalValue){ // 为了防止重绘
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },
        removeClass : function(value){
            var i = 0,
                j,
                cur = '',
                elem = null,
                classes = [],
                clazz = '',
                len = this.length,
                finalValue = '',
                proceed = arguments.length === 0 || typeof value === 'string' && value;

            if(proceed){
                classes = value.match(rnotwhite);
                for( ; i < len; i++){
                    elem = this[i];

                    cur = elem.nodeType === 1 && (elem.className ? ' ' + elem.className + ' ' : ' ');
                    if(cur){
                        j = 0;

                        while((clazz = classes[j++])){
                            while(cur.indexOf(' ' + clazz + ' ') >= 0){
                                cur = cur.replace(' ' + clazz + ' ', ' ');
                            }
                        }

                        finalValue = value ? $.trim(cur) : '';
                        if(elem.className !== finalValue){ // 为了防止重绘
                            elem.className = finalValue;
                        }
                    }
                }
            }

            return this;
        },
        toggleClass : function(){

        },
        hasClass : function(selector){
            var i = 0,
                className = ' ' + selector + ' ',
                l = this.length;

            for( ; i < l; i++){
                if(this[i].nodeType === 1 && (' ' + this[i].className + ' ').indexOf(className) >= 0){
                    return true;
                }
            }

            return false;
        }
    });

    // 浏览器探测基本方法
    _.uaMatch = function(ua){
        ua = ua.toLowerCase();

        var match = /(chrome)[\/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) || [];

        return {
            browser : match[1] || '',
            version : match[2] || '0'
        }
    }
    var browser = {},
        matched = _.uaMatch(navigator.userAgent);

    if(matched.browser){
        browser[matched.browser] = true;
        browser.version = matched.version
    }

    if(browser.chrome){
        browser.webkit = true;
    } else if(browser.webkit){
        browser.safari = true;
    }
    $.browser = browser;

    var rposition = /^(top|right|bottom|left)$/;

    if(win.getComputedStyle){
        _.getStyles = function(elem){
            return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
        }
        
        _.curCSS = function(elem, name, computed){
            
        }
    } else {
    }

    _.vendorPropName = function(style, name){
        if(name in style){
            return name;
        }
    }

    // css静态方法
    $.extend({
        cssHooks : {
            opacity : {
                get : function(elem, computed){
                    if(computed){
                        var ret = _.curCSS(elem, 'opacity');
                        return ret === '' ? '1' : ret;
                    }
                }
            }
        },
        // 一个常量值，以下所有常量列表中是不需要自动添加'px'单位
        cssNumber : {
            'columnCount' : true,
            'fillOpacity' : true,
            'fontWeight' : true,
            'lineHeight' : true,
            'opacity' : true,
            'order' : true,
            'orphans' : true,
            'windows' : true,
            'zIndex' : true,
            'zoom' : true
        },
        cssProps : {
            'float' : support.cssFloat ? 'cssFloat' : 'styleFloat'
        },

        style : function(elem, name, value, extra){
            // 忽略不存在的节点，文本节点，注释节点
            if(!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style){
                return ;
            }

            var ret,
                type,
                hooks,
                style = elem.style,
                origName = $.camelCase(name);

            name = $.cssProps[origName] || ($.cssProps[origName] = _.vendorPropName(style, origName));

            hooks = $.cssHooks[name] || $.cssHooks[origName];

            if(value != undefined){
                type = typeof value;

                if(type === 'number' && !$.cssNumber[origName]){
                    value += 'px';
                }
                
                if(!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) != undefined){
                    try{
                        style[name] = '';
                        style[name] = value;
                    } catch(e) {
                    }
                }
            } else {
                if(!hooks || !('get' in hooks) || (value = hooks.get(elem, value, extra)) != undefined){
                    return ret;
                }
                
                return style[name];
            }
        },
        css : function(elem, name, extra, styles){
            var num,
                hooks,
                val,
                style = elem.style,
                origName = $.camelCase(name);

            name = $.cssProps[origName] || ($.cssProps[origName] = _.vendorPropName(style, origName));

            hooks = $.cssHooks[name] || $.cssHooks[origName];

            if(hooks && 'get' in hooks){
                val = hooks.get(elem, true, extra);
            }

            if(val === undefined){
                val = _.curCSS(elem, name, styles);
            }
            
            return val;
        }
    });

    $.each(['height', 'width'], function(i, name){
        $.cssHooks[name] = {
            get : function(elem, computed, extra){
                if(computed){
                    return elem['offset' + name.charAt(0).toUpperCase() + name.slice(1)];
                }
            },
            set : function(elem, value, extra){
                return value;
            }
        }
    });

    _.isHidden = function(elem, el){
        elem = el || elem;
        return $.css(elem, 'display') === 'none';
    }
    // css原型方法
    $.fn.extend({
        css : function(name, value){
            return _.access(this, function(elem, name, value){
                var i = 0,
                    len;

                return value !== undefined ? $.style(elem, name, value) : $.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show : function(){
            
        },
        hide : function(){
            
        },
        toggle : function(){
            
        }
    });

    // 检测相关
    (function(){
        var a = null,
            div = document.createElement('div');

        div.innerHTML = '<a href="a">a</a>';
        a = div.getElementsByTagName('a')[0];

        a.style.cssText = 'float:left;opacity:.5;';
        support.cssFloat = !!a.style.cssFloat;

        a = div = null;
    }());

    // 尺寸大小
    $.each({ Height : 'height', Width : 'width' }, function(name, type){
        $.each({ padding : 'inner' + name, content : type, '' : 'outer'+ name }, function(defaultExtra, funcName){
            $.fn[funcName] = function(margin, value){
                var chainable = arguments.length && (defaultExtra || typeof margin != 'boolean'),
                    extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');

                return _.access(this, function(elem, type, value){
                    var doc;

                    if($.isWindow(elem)){
                        return elem.document.documentElement['client' + name];
                    }

                    if(elem.nodeType === 9){
                        doc = elem.documentElement;
                        
                        return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
                    }
                    
                    return value === undefined ? $.css(elem, type, extra) : $.style(elem, type, value, extra);
                }, type, chainable ? margin : undefined, chainable, null);
            }
        });
    });


    // 事件
    $.event = {
        global : {},
        /**
         * 给选中元素注册事件处理程序
         * @param elem
         * @param types
         * @param hanlder
         * @param data
         * @param selector
         */
        add : function(elem, types, hanlder, data, selector){
            var t,
                tmp,
                events,
                elemData = $._data(elem),
                eventHandle;

            if(!handler.guid){
                handler.guid = $.guid++;
            }

            if(!(events = elemData.events)){
                events = elemData.events = {};
            }

            if(!(eventHandle = elemData.handle)){
                eventHandle.elem = elem;
            }

            types = (types || '').match(rnotwhite) || [''];
            t = types.length;
            while(t--){

            }
        },
        remove : function(){

        },
        trigger : function(){

        },
        /**
         * 分派(执行)事件处理函数
         */
        dispatch : function(){

        },
        /**
         * 组装事件处理器队列
         * 用来区分原生与委托事件
         * @param event
         * @param handlers
         */
        handlers : function(event, handlers){

        },
        /**
         * fix修正Event对象
         * 将原生的事件对象 event 修正为一个 可以读读写event 对象，并对该 event 的属性以及方法统一接口
         * @param event
         */
        fix : function(event){
            
        }
    }

    /**
     * 构造函数创建可读写的 jQuery事件对象 event， 该对象即可以是原生事件对象 event 的增强版，也可以是用户自定义事件
     * @constructor
     */
    $.Event = function(){
        
    }
    
    $.Event.prototype = {
        
    }

    _.returnTrue = function(){
        return true;
    }
    _.returnFalse = function(){
        return false;
    }

    $.fn.extend({
        /**
         * 事件绑定总入口
         * @param types 绑定类型
         * @param selector 选择器
         * @param data 传递数据
         * @param fn 事件处理函数
         * @param one
         * @returns {*}
         */
        on : function(types, selector, data, fn, one){
            var type,
                origFn;

            if(data == null && fn == null){
                fn = selector;
                data = selector = undefined;
            }

            return this.each(function(){
                $.event.add(this, types, fn, data, selector);
            });
        },
        one : function(){

        },
        off : function(){

        },
        trigger : function(){
            
        },
        triggerHandler : function(){
            
        }
    });

    /**
     * 缓存内部方法
     * @param elem
     * @param name
     * @param data
     * @param pvt Jing内部参数
     * @returns {*}
     */
    _.internalData = function(elem, name, data, pvt){
        var ret,
            thisCache,
            internalKey = $.expando,
            isNode = elem.nodeType,
            cache = isNode ? $.cache : elem,
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        if(!id){
            if(isNode){
                id = elem[internalKey] = arr.pop() || $.guid++;
            } else {
                id = internalKey;
            }
        }
        
        if(!cache[id]){
            cache[id] = isNode ? {} : { toJSON : $.noop };
        }

        thisCache = cache[id];

        if(!pvt){
            if(!thisCache.data){
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if(data !== undefined){
            thisCache[$.camelCase(name)] = data;
        }
        
        if(typeof name === 'string'){
            ret = thisCache[name];

            if(ret === null){
                ret = thisCache[$.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }
    /**
     * 清除缓存数据
     * @param elem
     * @param name
     * @param pvt
     * @returns {*}
     */
    _.internalRemoveData = function(elem, name, pvt){
        var ret;

        return ret;
    }

    // 缓存
    $.extend({
        cache : {},
        data : function(elem, name, data){
            return _.internalData(elem, name, data);
        },
        _data : function(elem, name, data){
            return _.internalData(elem, name, data, true);
        },
        removeData : function(elem, name){
            return _.internalRemoveData(elem, name);
        },
        _removeData : function(elem, name){
            return _.internalRemoveData(elem, name, true);
        }
    });

    /**
     * 获取html5 [data-key] 值
     * @param elem
     * @param key
     * @param data
     */
    _.dataAttr = function(elem, key, data){

    }
    $.fn.extend({
        data : function(key, value){
            var i,
                name,
                data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // key不存在，即为取值
            if(key === undefined){
                
            }

            // key是对象，则递归set所有键值对
            if(typeof key === 'object'){
                return this.each(function(){
                    $.data(this, key);
                });
            }

            return arguments.length > 1 ?
                this.each(function(){
                    $.data(this, key, value)
                }) :
                elem ? $.data(elem, key) : undefined;
//                elem ? _.dataAttr(elem, key, $.data(elem, key)) : undefined;
        },
        removeData : function(key){
            return this.each(function(){
                $.removeData(this, key);
            });
        }
    });

}(window));

// 2014-04-21 : 准备开发第一版
// 2014-04-30 : 完成$.type, $.each等方法
// 2014-05-04 : 增加$.get方法
// 2014-05-05 : 以精减的方式添加：append,prepend,before,after方法，但存在tbody问题未处理；添加addClass,removeClass
// 2014-05-06 : 增加$.browser方法
// 2014-05-07 : 增加$().appendTo,$().prependTo等方法，增加$().html();
// 2014-05-08 : 增加$().css({ color : 'red' }), $(window).width,height(), $(document).width,height();
// 2014-05-09 : 增加$().width()方法, event first;
// 2014-05-12 : 增加$().data(), $().removeData()方法