import API from "./api.js";
import { setLocal } from "./helpers.js";
const authEle = {
    loginForm: document.querySelector("#login"),
    nameInp: document.querySelector("#name"),
    passInp: document.querySelector("#pass"),
    nameWarn: document.querySelector(".name-warning"),
    passWarn: document.querySelector(".pass-warning"),

};

// 3) Sifre için regex oluşturma
const regex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";


// 2) İsim ve şifre değerlerini kontrol et

const checkValues = (name, pass) => {
    let isPassError = false;
    let isNameError = false;

    // a)İsmi kontrol et hataları ekrana bas

    if (!name.trim()) {
        isNameError = true;
        authEle.nameWarn.innerHTML = "<p> Lütfen isim giriniz</p>";
    } else {
        isNameError = false;
        authEle.nameWarn.innerHTML = '';
    }


    // b) Sifreyi kontrol et hatayı ekrana bas

    if (!pass.trim()) {
        isPassError = true;
        authEle.passWarn.innerHTML = "<p> Lütfen Şifreyi Giriniz</p>";
    }
    else if (pass.length < 8) {
        isPassError = true;
        authEle.passWarn.innerHTML = "<p> Şifre En Az 8 Haneli Olmalı</p>";
    }
    else if (!pass.match(regex)) {
        isPassError = true;
        authEle.passWarn.innerHTML = "<p> Şifre Yeterince Güçlü Değil.</p>";
    }
    else {
        isPassError = false;
        authEle.passWarn.innerHTML = '';
    }
    //  c) Fonksiyonun döndüreceği değere karar ver

    if (isNameError || isPassError) {
        return false;
    } else {
        return true;
    }

};

// 1) Formun gönderilme olayını izleme

authEle.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // a)değerlere erişme
    const name = authEle.nameInp.value;
    const pass = authEle.passInp.value;

    // b) CheckValues fonksiyonunun sonucu form alanına aktarılacak.
    if (checkValues(name, pass)) {
        API.getUser(name)
            .then((data) => {
                if (data.status === "error") {
                    authEle.nameWarn.innerHTML = "<p> Kullanıcı Bulunamadı</p>";

                } else {
                    // kullanıcı bulunduysa locale'e kaydet ve anasayfaya yönlendir
                    setLocal("user", data);
                    // anasayfaya yönlendirir '/'
                    location = '/';
                }
            })
            .catch((err) => console.log(err));
    }
});