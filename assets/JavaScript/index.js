const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const deviceUser = $('.deviceUser');
console.log(deviceUser)
const app = {
song: [],

checkDevice: function(){
const Device =    window.navigator.userAgent;
deviceUser.innerHTML = "Bạn đang dùng thiết bị"+ " "+ Device +" để truy cập vào web của tôi";
deviceUser.style.color = "green";
deviceUser.style.FontSize = "20px";
},
start: function(){
    this.checkDevice();
    console.log(deviceUser.style)
}
};

app.start();