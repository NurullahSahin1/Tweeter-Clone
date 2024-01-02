
// API'ye göndermemiz gereken ve API keyi içeren obje

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': ''
    }
};

export default class API {
    // kullanıcı isminden hesap bilgilerine ulaş

    // 1) Verileri Al
    static async getUser(username) {
        const res = await fetch(`https://twitter-api45.p.rapidapi.com/screenname.php?screenname=${username}`, options);

        //    2) json verisini javascript verisine çevir
        const data = await res.json();


        // 3) veriyi çağrıldığı yere gönder
        return data;
    }

    // 4) Parametre olarak gönderdiğimiz endpointteki verileri alır

    static async getData(endpoint) {
        try {
            const res = await fetch(`https://twitter-api45.p.rapidapi.com${endpoint}`, options);

            // Gelen veriyi işle ve döndür
            return await res.json();
        }
        catch (err) {
            console.log('verileri alırken hata', err);
        }
    }
}
