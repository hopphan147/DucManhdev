const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const deviceUser = $('.deviceUser');
const ListSong = $(".Song_List");
const SongPlaying = $('.Song_playing');
const Playbtn = $(".play");
const PauseBtn = $(".pause");
const SongName = $(".Song_name");
const SongAuthor = $(".Song_author");
const SongAudio = $(".audio1");
const Songtime = $(".Song_Time");
const SongPlayer = $('.Song_player');
const PreBtn = $(".pre");
const Nextbtn = $(".next");
var index = 0;
const app = {
Songs: [
    {
     name: 'Em Là Của Anh',
     singer: 'Hồ Quang Hiếu',
     src: './assets/mp3/Emlacuaanh.mp3'
    },

    {
        name: 'Hồn Quê',
        singer: 'Hiền Thục',
        src: './assets/mp3/HonQue.mp3'
       },

       {
        name: 'Yosobi',
        singer: 'AV',
        src: './assets/mp3/YOASOBI.mp3'
       },
       {
        name: 'Kiếp Má Hồng',
        singer: "",
        src: './assets/mp3/Kiếp Má Hồng.mp3'
       },
       {
        name: 'Chạnh Lòng Thương Cô',
        singer: "",
        src: "./assets/mp3/ChanhLongThuongCo.mp3"
       },
       {
        name: 'Chạnh Lòng Thương Cô 4',
        singer: "",
        src: "./assets/mp3/ChanhLongThuongCo4.mp3"
       },
       {
        name: 'Tình Bạn Doremon',
        singer: "",
        src: "./assets/mp3/TinhbanDoremon.mp3"
       },
     

],
// Render danh sách bài hát
RenderListSong: function(){
const SongList = this.Songs.map((song)=> {
    return `
    <div class="Song_wrapper">
    <div class="Song_Name">${song.name}</div>
    <div class="song_Author">${song.singer}</div>
    <button class="PlaySong">Phát</button>
</div>
    `
})
ListSong.innerHTML = SongList.join();
const PLaySong = $$(".PlaySong");
PLaySong.forEach((btn,index)=> {
btn.onclick = function(){
 app.GetcurrentSong(index);
 app.LoadingCurrrentSong(index);
 app.SongPlay();
 app.GettimeSong();
}
})
},
// tải bài hát hiện tại
GetcurrentSong: function(SongIndex){
var currentSong = this.Songs[SongIndex];
return currentSong;
},
LoadingCurrrentSong: function(SongIndex){
SongName.innerHTML = this.GetcurrentSong(SongIndex).name;
SongAudio.src = this.GetcurrentSong(SongIndex).src;
SongAuthor.innerHTML = this.GetcurrentSong(SongIndex).singer;
},


// Play Nhạc
SongPlay: function(){
SongAudio.play();

},
// Dừng nhạc
SongPause: function(){
SongAudio.pause();
},
// Chuyển bài kế tiếp
SongNext: function(){
    var newIndex = index++; 
if (index > app.Songs.length - 1){
   index = 0;
}
app.GetcurrentSong(newIndex);
app.LoadingCurrrentSong(newIndex);
app.SongPlay();
app.GettimeSong();

},

SongPre: function(){
    var newIndex = index--; 
if (index < 0){
   index = app.Songs.length - 1;
}
app.GetcurrentSong(newIndex);
app.LoadingCurrrentSong(newIndex);
app.SongPlay();
app.GettimeSong()},

// Sự kiện ấn các phím Phát,Dừng,Tiến,Lùi
HandleEvent: function(){
    // Khi Play
Playbtn.onclick = function(){
app.SongPlay();
app.GettimeSong();
};
// Khi Pause
PauseBtn.onclick = function(){
app.SongPause();
};
// ấn nút next 
Nextbtn.onclick = function(){
   app.SongNext();
}

// ấn nút pre 
PreBtn.onclick = function(){
app.SongPre();
}
// Khi bài hát đang phát

},
// tải thời gian hiện tại
GettimeSong: function(){
SongAudio.ontimeupdate = function(){
    var perform = Math.floor((SongAudio.currentTime/SongAudio.duration*100));
if(!perform) {
    Songtime.innerHTML = "Chưa phát";
}
else if (perform>=0) {
    SongPlayer.innerHTML = "Bài hát đang phát"
    Songtime.innerHTML = "Đã phát được"+" " + perform+ "%";
}
}

},
// Kiểm tra thiết bị người dùng
checkDevice: function(){
const Device =  window.navigator.userAgent;
deviceUser.innerHTML = "Bạn đang dùng thiết bị"+ " "+ Device +" để truy cập vào web của Đức Mạnh"+"</br>"+
"Dữ liệu thiết bị của bạn không lưu trữ trên server, cảm ơn!";
deviceUser.style.color = "#333";
deviceUser.style.fontWeight = "500";
deviceUser.style.FontSize = "20px";
},
// Khởi chạy ứng dụng
start: function(){
app.GetcurrentSong(index);
app.LoadingCurrrentSong(index);
this.RenderListSong();
this.HandleEvent();
this.checkDevice();
this.SongNext();
}
};
app.start();