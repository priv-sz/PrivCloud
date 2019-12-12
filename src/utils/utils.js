function accMul(arg1, arg2) {
  let m = 0;
  const s1 = arg1.toString();
  const s2 = arg2.toString();
  m += s1.split(".").length > 1 ? s1.split(".")[1].length : 0;
  m += s2.split(".").length > 1 ? s2.split(".")[1].length : 0;
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / 10 ** m;
}

export function digitUppercase(n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟', '万']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(accMul(num, 10 * 10 ** index)) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }

  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}


/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 计算提示框的宽度
 * @param str
 * @returns {number}
 */
export function calculateWidth(arr){
  return 30 + arr[0].length*15
}

/**
 * 图片预加载
 * @param arr
 * @constructor
 */
export function preloadingImages(arr) {
  arr.forEach(item=>{
    const img = new Image()
    img.src = item
  })
}


// 原生 utils

// export function randomNum(minNum,maxNum){
//   switch(arguments.length){
//     case 1:
//       return parseInt(Math.random()*minNum+1,10);
//       break;
//     case 2:
//       return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
//       break;
//     default:
//       return 0;
//       break;
//   }
// }

export function randomNum_f(minNum,maxNum){
  switch(arguments.length){
    case 1:
      return parseInt(Math.random()*minNum+1,10);
      break;
    case 2:
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      break;
    default:
      return 0;
      break;
  }
}


export let _fetch = async (url,data,resolve) =>{
  try {
    let response = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode:"cors",
      body: JSON.stringify({
        ...data
      })
    });
    let json  = await response.json();
    resolve(json);
  } catch(error) {
    console.log(error);
  }
};


export let _download_file = async (url,data,resolve) =>{
  try {
    let response = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode:"cors",
      body: JSON.stringify({
        data
      })
    });
    let blob  = await response.blob();
    resolve(blob);
  } catch(error) {
    console.log(error);
  }
};



export function get_state_count(count_arr, state) {
  // [非常, 比较, 正常, 非常不]
  if (state >70  && state <= 100){
    count_arr[0] = count_arr[0] + 1
  }
  if (state > 50 && state <= 70){
    count_arr[1] = count_arr[1] + 1
  }
  if (state > 30 && state <= 50){
    count_arr[2] = count_arr[2] + 1
  }
  if (state >= 0 && state <= 30){
    count_arr[3] = count_arr[3] + 1
  }
  return count_arr
}

export function get_2_float(x) {
  return  Math.round(x*10000)/100;
}

export function show_2_ste(s) {
  return s.toString().substr(0,2)

}

export function get_pie_data(count_arr, name) {

  // [非常, 比较, 正常, 非常不]

  // let aaa = [
  //     {
  //         item: "非常活跃",
  //         count: 30
  //     },
  //     {
  //         item: "非常不活跃",
  //         count: 20
  //     },
  //     {
  //         item: "正常活跃",
  //         count: 27
  //     },
  //     {
  //         item: "比较活跃",
  //         count: 23
  //     },
  // ];

  let total_count = count_arr[0] + count_arr[1] + count_arr[2] + count_arr[3]

  let count_arr_tmp = [
    get_2_float(count_arr[0]/total_count),
    get_2_float(count_arr[1]/total_count),
    get_2_float(count_arr[2]/total_count),
    get_2_float(count_arr[3]/total_count),
  ]

  let return_data = [
    {
      item:`非常${name}`,
      count:count_arr_tmp[0],
    },
    {
      item:`比较${name}`,
      count:count_arr_tmp[1],
    },
    {
      item:`正常${name}`,
      count:count_arr_tmp[2],
    },
    {
      item:`非常不${name}`,
      count:count_arr_tmp[3],
    }
  ]
  // console.log(return_data)
  return return_data

}

export function show_2_int(s){
  return s < 10 ? '0' + s: s;
}

export function deepCopy(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是一个对象
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj
}

/**
 * obj2 中的 obj1 属性是否相同
 * @param obj1
 * @param obj2
 * @returns {*|boolean|boolean}
 */

export function match_obj(obj1,obj2){
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  for (var o in obj1) {
    var t1 = obj1[o] instanceof Object;
    var t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}

export function diff(obj1,obj2){
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
  //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (var o in obj1) {
    var t1 = obj1[o] instanceof Object;
    var t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}

export function replace_space(str) {
  return str.replace(/\s+/g,"");
}

export function transform_grade(str) {
  let index_arr = replace_space(str).split('')
  if (index_arr.length != 2 ){
    return -1
  }
  try {
    let sum = 0
    switch (index_arr[0]) {
      case '研':
            sum += 0;
            break;
      case '博':
            sum += 4;
            break;
      default:
            sum += 0;
    }
    sum += Number(index_arr[1])
    return sum
  }
  catch (e) {
    return -1
  }


}

/**
 * 和PHP一样的时间戳格式化函数
 * @param {string} format 格式
 * @param {int} timestamp 要格式化的时间 默认为当前时间
 * @return {string}   格式化的时间字符串
 */
export function timestamp2Date(format, timestamp){
  var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
  var pad = function(n, c){
    if((n = n + "").length < c){
      return new Array(++c - n.length).join("0") + n;
    } else {
      return n;
    }
  };
  var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
  var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var f = {
    // Day
    d: function(){return pad(f.j(), 2)},
    D: function(){return f.l().substr(0,3)},
    j: function(){return jsdate.getDate()},
    l: function(){return txt_weekdays[f.w()]},
    N: function(){return f.w() + 1},
    S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
    w: function(){return jsdate.getDay()},
    z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},

    // Week
    W: function(){
      var a = f.z(), b = 364 + f.L() - a;
      var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
      if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
        return 1;
      } else{
        if(a <= 2 && nd >= 4 && a >= (6 - nd)){
          nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
          return timestamp2Date("W", Math.round(nd2.getTime()/1000));
        } else{
          return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
        }
      }
    },

    // Month
    F: function(){return txt_months[f.n()]},
    m: function(){return pad(f.n(), 2)},
    M: function(){return f.F().substr(0,3)},
    n: function(){return jsdate.getMonth() + 1},
    t: function(){
      var n;
      if( (n = jsdate.getMonth() + 1) == 2 ){
        return 28 + f.L();
      } else{
        if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
          return 31;
        } else{
          return 30;
        }
      }
    },

    // Year
    L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
    //o not supported yet
    Y: function(){return jsdate.getFullYear()},
    y: function(){return (jsdate.getFullYear() + "").slice(2)},

    // Time
    a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
    A: function(){return f.a().toUpperCase()},
    B: function(){
      // peter paul koch:
      var off = (jsdate.getTimezoneOffset() + 60)*60;
      var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
      var beat = Math.floor(theSeconds/86.4);
      if (beat > 1000) beat -= 1000;
      if (beat < 0) beat += 1000;
      if ((String(beat)).length == 1) beat = "00"+beat;
      if ((String(beat)).length == 2) beat = "0"+beat;
      return beat;
    },
    g: function(){return jsdate.getHours() % 12 || 12},
    G: function(){return jsdate.getHours()},
    h: function(){return pad(f.g(), 2)},
    H: function(){return pad(jsdate.getHours(), 2)},
    i: function(){return pad(jsdate.getMinutes(), 2)},
    s: function(){return pad(jsdate.getSeconds(), 2)},
    //u not supported yet

    // Timezone
    //e not supported yet
    //I not supported yet
    O: function(){
      var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
      if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
      return t;
    },
    P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
    //T not supported yet
    //Z not supported yet

    // Full Date/Time
    c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
    //r not supported yet
    U: function(){return Math.round(jsdate.getTime()/1000)}
  };

  return format.replace(/[\ ]?([a-zA-Z])/g, function(t, s){
    let ret ;
    if( t!=s ){
      // escaped
      ret = s;
    } else if( f[s] ){
      // a date function exists
      ret = f[s]();
    } else{
      // nothing special
      ret = s;
    }
    return ret;
  });
}