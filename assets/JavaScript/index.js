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
const Darkbtn = $(".darkmode");
const Lightbtn = $(".lightmode");
const ProfileWrapper = $(".profile_wrapper");
const previewInfo = $(".previewInfo");
var index = 0;
const app = {
    currentIndex: 0,
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
    RenderListSong: function () {

        const SongList = this.Songs.map((song) => {
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
        PLaySong.forEach((btn, index) => {
            // khi click play 
            btn.onclick = function () {
                app.currentIndex = index;
                app.GetcurrentSong(index);
                app.LoadingCurrrentSong(index);
                app.SongPlay();
                app.GettimeSong();
                return app.currentIndex;


                Nextbtn.onclick = function () {

                }

            }

        })

    },

    // tải bài hát hiện tại
    GetcurrentSong: function (SongIndex) {
        var currentSong = this.Songs[SongIndex];
        return currentSong;
    },
    LoadingCurrrentSong: function (SongIndex) {
        SongName.innerHTML = this.GetcurrentSong(SongIndex).name;
        SongAudio.src = this.GetcurrentSong(SongIndex).src;
        SongAuthor.innerHTML = this.GetcurrentSong(SongIndex).singer;
    },


    // Play Nhạc
    SongPlay: function () {
        SongAudio.play();

    },
    // Dừng nhạc
    SongPause: function () {
        SongAudio.pause();
    },
    // Chuyển bài kế tiếp
    SongNext: function (indexSong) {
        var newIndex = indexSong++;
        if (indexSong > app.Songs.length - 1) {
            indexSong = 0;
        }
        app.GetcurrentSong(newIndex);
        app.LoadingCurrrentSong(newIndex);
        app.SongPlay();
        app.GettimeSong();

    },

    SongPre: function () {
        var newIndex = index--;
        if (index < 0) {
            index = app.Songs.length - 1;
        }
        app.GetcurrentSong(newIndex);
        app.LoadingCurrrentSong(newIndex);
        app.SongPlay();
        app.GettimeSong()
    },

    // Sự kiện ấn các phím Phát,Dừng,Tiến,Lùi
    HandleEvent: function () {
        // Khi Play
        Playbtn.onclick = function () {
            app.SongPlay();
            app.GettimeSong();
        };
        // Khi Pause
        PauseBtn.onclick = function () {
            app.SongPause();
        };
        // ấn nút next 


        // ấn nút pre 
        PreBtn.onclick = function () {
            app.SongPre();
        }
        SongAudio.onended = function () {
            app.SongNext();
        }
        // Khi bài hát đang phát

    },
    // tải thời gian hiện tại
    GettimeSong: function () {
        SongAudio.ontimeupdate = function () {
            var perform = Math.floor((SongAudio.currentTime / SongAudio.duration * 100));
            if (!perform) {
                Songtime.innerHTML = "Chưa phát";
            }
            else if (perform >= 0) {
                SongPlayer.innerHTML = "Bài hát đang phát"
                Songtime.innerHTML = "Đã phát được" + " " + perform + "%";
            }
        }

    },


    // chế độ darkmode, light mode 
    HandleUI: function () {
        Darkbtn.onclick = function () {
            ProfileWrapper.style.backgroundColor = "black";
            ProfileWrapper.style.color = "white";
            previewInfo.style.color = "white";

        }
        Lightbtn.onclick = function () {
            ProfileWrapper.style.backgroundColor = "white";
            ProfileWrapper.style.color = "#333";
            previewInfo.style.color = "#333";

        }
    },

    // Kiểm tra thiết bị người dùng
    checkDevice: function () {
        function checkOs() {
            if (navigator.appVersion.indexOf("Win") != -1) OS = "Windows 10/11";
            if (navigator.appVersion.indexOf("Mac") != -1) OS = "MacOS";
            if (navigator.appVersion.indexOf("X11") != -1) OS = "UNIX";
            if (navigator.appVersion.indexOf("Linux") != -1) OS = "Linux";
            return OS;

        };
        function fnBrowserDetect() {
            let userAgent = navigator.userAgent;
            if (userAgent.match(/chrome|chromium|crios/i)) {
                browserName = "chrome";
            } else if (userAgent.match(/firefox|fxios/i)) {
                browserName = "firefox";
            } else if (userAgent.match(/safari/i)) {
                browserName = "safari";
            } else if (userAgent.match(/opr\//i)) {
                browserName = "opera";
            } else if (userAgent.match(/edg/i)) {
                browserName = "edge";
            } else {
                browserName = "No browser detection";
            }
            return browserName;
        };
        deviceUser.innerHTML = "Bạn đang sử dụng" + "</br>" +
            "Trình Duyệt:" + fnBrowserDetect() + "</br>" + "Hệ Điều Hành:" + checkOs();
    },
    // Khởi chạy ứng dụng
    start: function () {
        app.GetcurrentSong(index);
        app.LoadingCurrrentSong(index);
        app.RenderListSong();
        this.HandleEvent();
        this.checkDevice();
        app.HandleUI();
    }
};
app.start();