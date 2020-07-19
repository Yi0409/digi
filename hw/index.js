var bgImg = document.getElementById('app');
var bgText = document.getElementsByClassName('num')[0];
var count = 0;
var imgdata = '';

function init(callback){
  axios.get('https://run.mocky.io/v3/08c763ab-5bb2-46b7-a504-b9f28a8ba050')
  .then(function (res) {
    imgdata = res.data.img;
        SetImgSrc(res.data.img);
        imgChange();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });
}
function SetImgSrc(imgList){
    var html = '';
    for(var i = 0; i < imgList.length; i++){
        html += `
            <div><img class='Img' src=${imgList[i]} alt='ERROR'/></div>
        `
    };
    document.getElementById('list').innerHTML = html;
    for(var i = 0; i < imgList.length; i++){
        var temp = document.getElementsByClassName('Img')[i]
        temp.addEventListener('click', clickHandle);
        temp.id = i;
    }
    document.getElementsByClassName('last')[0].addEventListener('click', function (){
        clickBtn(1);
    });
    document.getElementsByClassName('next')[0].addEventListener('click', function (){
        clickBtn(2);
    });
}
function imgChange(){
    bgImg.style.backgroundImage = `url('${imgdata[count]}')`;
    bgText.innerHTML = `${Number(count)+1}/${imgdata.length}`;
}
function clickHandle(){
    count = this.id;
    imgChange();
}
function clickBtn(way){
    if(way === 2){
        count++;
    }else{
        count--;
    }
    if(count > imgdata.length-1){
        count = 0;
    }else if(count < 0){
        count = imgdata.length-1;
    }

    imgChange();
}
init();