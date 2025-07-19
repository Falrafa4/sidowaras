const bmr = localStorage.getItem("bmr");
const rentangBmr = document.getElementById("rentang-bmr");
const menuPagi = document.getElementById("pagi");
const menuSiang = document.getElementById("siang");
const menuMalam = document.getElementById("malam");
const menuSnack = document.getElementById("snack");
const menuKesimpulan = document.getElementById("kesimpulan");


function rangeBmr(bmr) {
    if (bmr == null || bmr == "null") return ["Rentang BMR: ", 6];
    if (bmr > 3500 || bmr < 1000) return ["Rentang BMR: Tidak Tersedia", 5];
    if (bmr > 3000) return ["Rentang BMR: 3001 - 3500", 4];
    if (bmr > 2500) return ["Rentang BMR: 2501 - 3000", 3];
    if (bmr > 2000) return ["Rentang BMR: 2001 - 2500", 2];
    if (bmr > 1500) return ["Rentang BMR: 1501 - 2000", 1];
    if (bmr > 1000) return ["Rentang BMR: 1000 - 1500", 0];
};


const menuHarian = [
    {
        totalKalori: 1150,
        menu: {
            pagi: ["Telur Rebus (2 butir)", "Susu (1 gelas)"],
            siang: ["Nasi (1 ½ gelas)", "Ayam (1 potong sedang)", "Sawi (1 gelas)", "Pisang (1 buah)"],
            malam: ["Nasi (1 ½ gelas)", "Daging Sapi (1 potong sedang)", "Kangkung (1 gelas)"],
            snack: null,
            kesimpulan: "Menu makanan ini sudah mencukupi kandungan makronutrien yang dibutuhkan per hari. Total kalori dari menu makanan tersebut adalah 1150 kalori."
        }
    },
    {
        totalKalori: 1625,
        menu: {
            pagi: ["Telur Rebus (2 butir)", "Susu (1 gelas)", "Roti (3 iris)"],
            siang: ["Nasi (1 ½ gelas)", "Ayam (1 potong sedang)", "Sawi (2 gelas)", "Pisang (2 buah)"],
            malam: ["Nasi (1 ½ gelas)", "Daging Sapi (1 potong sedang)", "Kangkung (2 gelas)"],
            snack: ["Biskuit (4 buah besar)", "Susu (1 gelas)"],
            kesimpulan: "Menu makanan ini sudah mencukupi kandungan makronutrien yang dibutuhkan per hari. Total kalori dari menu makanan tersebut adalah 1625 kalori."
        }
    },
    {
        totalKalori: 2142,
        menu: {
            pagi: ["Telur Rebus (2 butir)", "Susu (1 gelas)", "Roti (3 iris)"],
            siang: ["Nasi (2 ¼ gelas)", "Ayam (1 potong sedang)", "Sawi (2 gelas)", "Pisang (2 buah)"],
            malam: ["Nasi (2 ¼ gelas)", "Daging Sapi (1 potong sedang)", "Kangkung (2 gelas)", "Tempe (2 potong sedang)"],
            snack: ["Biskuit (4 buah besar)", "Susu (1 gelas)", "Kentang (1 buah sedang)"],
            kesimpulan: "Menu makanan ini sudah mencukupi kandungan makronutrien yang dibutuhkan per hari. Total kalori dari menu makanan tersebut adalah 2142 kalori."
        }
    },
    {
        totalKalori: 2617,
        menu: {
            pagi: ["Telur Rebus (2 butir)", "Susu (1 gelas)", "Roti (3 iris)"],
            siang: ["Nasi (2 ¼ gelas)", "Ayam (2 potong sedang)", "Sawi (2 gelas)", "Pisang (2 buah)"],
            malam: ["Nasi (2 ¼ gelas)", "Daging Sapi (1 potong sedang)", "Kangkung (2 gelas)", "Tempe (2 potong sedang)", "Krupuk Udang/Ikan (3 biji sedang)"],
            snack: ["Biskuit (4 buah besar)", "Kentang (1 buah sedang)", "Minyak Sawit (4 sendok teh)"],
            kesimpulan: "Menu makanan ini sudah mencukupi kandungan makronutrien yang dibutuhkan per hari. Total kalori dari menu makanan tersebut adalah 2617 kalori."
        }
    },
    {
        totalKalori: 3142,
        menu: {
            pagi: ["Telur Rebus (2 butir)", "Susu (1 gelas)", "Roti (3 iris)"],
            siang: ["Nasi (2 ¼ gelas)", "Ayam (2 potong sedang)", "Sawi (2 gelas)", "Pisang (2 buah)"],
            malam: ["Nasi (2 ¼ gelas)", "Daging Sapi (2 potong sedang)", "Kangkung (2 gelas)", "Tempe (2 potong sedang)", "Krupuk Udang/Ikan (6 biji sedang)"],
            snack: ["Biskuit (4 buah besar)", "Kentang (1 buah sedang)", "Minyak Sawit (6 sendok teh)", "Jagung (3 buah besar)"],
            kesimpulan: "Menu makanan ini sudah mencukupi kandungan makronutrien yang dibutuhkan per hari. Total kalori dari menu makanan tersebut adalah 3142 kalori."
        }
    }
]

rentangBmr.innerHTML = rangeBmr(bmr)[0];
const indexMenu = rangeBmr(bmr)[1];
const menu = menuHarian[indexMenu];

function tampilkanMenu(waktu, elemen){
    const items = menu.menu[waktu];
    
    for (let i=0; i < items.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = items[i];
        elemen.appendChild(li);
    }
}

if (menu) {
    tampilkanMenu("pagi", menuPagi);
    tampilkanMenu("siang", menuSiang);
    tampilkanMenu("malam", menuMalam);
    tampilkanMenu("snack", menuSnack);
    menuKesimpulan.textContent = menu.menu.kesimpulan;
}