// Local Storageye veri kaydeder
export const setLocal = (key, value) => {
    // stringe çevir
    const strData = JSON.stringify(value);

    // local'e kaydet

    localStorage.setItem(key, strData);
};

// lokal storagedan veri çeker

export const getLocal = (key) => {
    // localdeki veriye eriş
    const strData = localStorage.getItem(key);

    // string veriyi js verisine çevir ve döndür
    return JSON.parse(strData);

};