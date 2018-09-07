const pics = [
    'https://cdn.fishki.net/upload/post/2017/03/19/2245758/tn/02-funny-cat-wallpapercat-wallpaper.jpg',
    'https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg',
    'http://www.radionetplus.ru/uploads/posts/2013-05/1369460621_panda-26.jpg',
    'http://s1.1zoom.me/big0/930/Coast_Sunrises_and_sunsets_Waves_USA_Ocean_Kaneohe_521540_1280x775.jpg',
    'http://bm.img.com.ua/nxs/img/prikol/images/large/0/0/307600.jpg'
];

const barLi = document.querySelectorAll('.photo-bar .photos li');
const barImg = document.querySelectorAll('.photo-bar .photos li img');

function setImgSrc(n) {
    pics[n-1] ? document.querySelector('.left img').setAttribute('src', pics[n-1]) : document.querySelector('.left img').setAttribute('src', '');
    document.querySelector('.center img').setAttribute('src', pics[n]);
    pics[n+1] ? document.querySelector('.right img').setAttribute('src', pics[n+1]) : document.querySelector('.right img').setAttribute('src', '');
}

let n = Math.round(pics.length / 2 - 1);
setImgSrc(n);

barImg[n].parentNode.classList.add('outlined');

for (let i = 0; i < barImg.length; i++) {
    barImg[i].setAttribute('src', pics[i]);

    barImg[i].parentElement.addEventListener('click', (e) => {
        n = Array.from(barLi).indexOf(e.currentTarget);
        setImgSrc(n);

        barLi.forEach(el => el.classList.remove('outlined'));
        barLi[n].classList.add('outlined');
    });
}

document.querySelector('.right-btn').addEventListener('click', () => {
    if (n < pics.length-1) {
        n++;
        setImgSrc(n);
        
        barLi[n-1].classList.remove('outlined');
        barLi[n].classList.add('outlined');
    }
});

document.querySelector('.left-btn').addEventListener('click', () => {
    if (n > 0) {
        n--;
        setImgSrc(n);

        barLi[n+1].classList.remove('outlined');
        barLi[n].classList.add('outlined');
    }
});