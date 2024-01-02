// 1) Lokal Storage'den veri alma(helpers.js'den)
import API from "./scripts/api.js";
import { getLocal } from "./scripts/helpers.js";
import { ele, renderUserInfo, renderTimeline, renderLoader, renderDetailLoader, renderDetail, renderUser } from "./scripts/ui.js";


const user = getLocal('user');

// Kullanıcının hangi sayfasını görececğine karar veren fonksiyon 'router'
const router = () => {
    // url'deki arama parametrelerine erişme

    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const query = params.get('q');

    // page'in değerine göre arayüze karar ver

    switch (page) {
        // tweet detay
        case "status":

            // loadingi ekrana bas
            renderDetailLoader('Gönderi');

            // tweet detaylarını API'den al
            API.getData(`/tweet.php?id=${query}`).then((data) => renderDetail(data, user));

            // ekrana detay sayfasını bas
            break;

        // arama sayfası
        case 'search':
            renderDetailLoader(`${query} için sonuçlar`);

            API.getData(`/search.php?query=${query}&search_type=top`).then((data) => renderTimeline(data, ele.main, 'user_info'));
            break;
        // kullanıcı detay sayfası

        case 'user':
            // sayfanın yüklendiğini belirt
            renderDetailLoader(query);

            // kulalncın bilgilerini api'dan al
            API.getUser(query).then((user) => {
                // kullanıcn hesap bilgilerini ekrana bas
                renderUser(user);
                // tweet'lerin geliceği yeri seçme
                const outlet = document.querySelector('.page-bottom');
                // kullanıcn attığı tweetleri al
                API.getData(`/timeline.php?screenname=${query}`).then(
                    (data) => renderTimeline(data, outlet, 'author')
                );
            });

            break;
        // eğer diğer sayfalarda değilsem anasayfayı bas
        default: // Loader'ı ekrana bas
            renderLoader(ele.tweetsArea);
            // 1) Kullanıcın tweet'lerini al
            API.getData(`/timeline.php?screenname=${user.profile}`).then((data) => renderTimeline(data, ele.tweetsArea, 'author'));;
    }


};


document.addEventListener("DOMContentLoaded", () => {
    if (user) {
        // kullanıcı oturum açtıysa bilgilerini ekrana bas
        renderUserInfo(user);
    } else {
        // oturum açmadıysa logine yönlendir (authorization)
        location = '/auth.html';
    }

    // ekrana basılacak sayfayı belirle
    router();


});

// Cıkış butonuna tıklayınca oturumu kapat
ele.logoutBtn.addEventListener("click", () => {
    // Kullanıcıyı lokal storageden kaldır
    localStorage.removeItem("user");
    location = '/auth.html';

});

// geri butonuna tıklanma olayını izle
ele.main.addEventListener("click", (e) => {
    if (e.target.id === "back-btn") {
        // bir adım geriye git
        history.back();
    }
})

// arama formunun gönderilmesini izle
ele.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = e.target[0].value;

    location = `?page=search&q=${query}`;
});