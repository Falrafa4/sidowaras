let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// function untuk sidebar responsive
const hamburger = document.getElementById("toggleSideBar");
let ulNav = document.querySelector("nav ul");
// untuk mengaktifkan sidebar
hamburger.addEventListener("click", function () {
  ulNav.classList.toggle("active");
});

// untuk mengaktifkan untuk menonaktifkan sidebar responsive kalau ditekan di layar selain di sidebarnya
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    ulNav.classList.remove("active");
  }
});

// untuk memunculkan overlay div baru
function aktif(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = "flex";
  }
}

function nonaktif(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = "none";
  }

  document.querySelectorAll("input[type='number']").forEach((input) => {
    input.value = "";
  });

  document.getElementById("output").style.display = "none";
  document.getElementById("outputBmr").style.display = "none";
}

// untuk membatasi input
document.querySelectorAll("input[type='number']").forEach((input) => {
  input.oninput = () => {
    if (input.value.length > input.maxLength)
      input.value = input.value.slice(0, input.maxLength);
  };
});

// untuk menambahkan function menghitung BMI
function outputBmi(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = "flex";
  }

  let tinggiBadan = document.querySelector(".inputTb").value;
  let beratBadan = document.querySelector(".inputBb").value;

  if (!beratBadan || !tinggiBadan) {
    alert("input tidak valid atau kosong, harap isi semua sesuai ketentuan");
    return;
  }

  let m = 100;
  let tinggiBadanMeterKuadrat = (tinggiBadan / m) * (tinggiBadan / m);
  let bmi = beratBadan / tinggiBadanMeterKuadrat;
  bmi = bmi.toFixed(2);
  if (bmi <= 18.5) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>${bmi}</b>! Ini berarti kamu termasuk kategori underweight (berat badan kurang). Maka kamu harus surplus atau memperbanyak kalori harian kamu lebih dari biasanya!`;
  } else if (bmi <= 22.9 && bmi > 18.5) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>${bmi}</b>! Ini berarti kamu termasuk kategori ideal (berat badan ideal). Maka kamu harus mempertahankannya agar tidak kegemukan atau kekurusan!`;
  } else if (bmi <= 24.9 && bmi > 23) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>${bmi}</b>! Ini berarti kamu termasuk kategori overweight (berat badan berlebih). Maka kamu harus melakukan defisit kalori atau mengurangi asupan kalori kamu lebih dari biasanya!`;
  } else if (bmi > 25) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>${bmi}</b>! Wah gawat, kamu termasuk kategori obesitas. Maka kamu harus melakukan defisit kalori besar-besaran serta melakukan diet untuk mengurangi berat badanmu!`;
  } else {
    document.querySelector(".output-text").innerHTML = "Invalid input!";
  }
}

document.querySelectorAll(".inputTb, .inputBb").forEach((input) => {
  input.addEventListener("keydown", function (outputBmi) {
    if (event.key === "Enter") {
      document.querySelector(".submitBmi").click();
    }
  });
});

// function untuk menghitung BMR

function outputBmr(id) {
  // memunculkan element pada id variable id
  let element = document.getElementById(id);
  if (id) {
    element.style.display = "flex";
  }

  let beratBadan = document.querySelector(".inputBbBmr").value;
  let tinggiBadan = document.querySelector(".inputTbBmr").value;
  let usia = document.querySelector(".inputUsia").value;
  let jenisKelamin = document.querySelector(".jekel").value;
  let aktivitas = document.querySelector(".tingkatAktivitas").value;
  let pesanAktivitas;

  if (!beratBadan || !tinggiBadan || !usia) {
    alert("input tidak valid, harap isi semua sesuai ketentuan");
    return;
  }
  // deklarasi aktivitas
  if (aktivitas == "Ringan") {
    aktivitas = 1.5;
    pesanAktivitas = "ringan";
  } else if (aktivitas == "Sedang") {
    aktivitas = 1.6;
    pesanAktivitas = "sedang";
  } else if (aktivitas == "Aktif") {
    aktivitas = 1.85;
    pesanAktivitas = "aktif";
  } else {
    aktivitas = 1.2;
    pesanAktivitas = "tidak aktif/jarang";
  }
  let nastar = 75;
  let bmr = 0;

  // BMR Pria = 66,5 + (13,7 × berat badan) + (5 × tinggi badan) – (6,8 × usia).
  // BMR Wanita = 655 + (9,6 × berat badan) + (1,8 × tinggi badan) – (4,7 × usia).
  // 1 nastar = 70-80 kkal (rata-rata 75 kkal)
  // sumber https://m.kumparan.com/berita-terkini/hitung-hitungan-kalori-nastar-1-biji-dan-kebutuhan-kalori-manusia-22VpnDIxsrm/3

  if (jenisKelamin == "Laki-laki") {
    bmr = 66.5 + 13.7 * beratBadan + 5 * tinggiBadan - 6.8 * usia;
  } else if (jenisKelamin == "Perempuan") {
    bmr = 655 + 9.6 * beratBadan + 1.8 * tinggiBadan - 4.7 * usia;
  } else {
    alert("harap pilih jenis kelamin");
    return;
  }
  bmr = bmr.toFixed(2);
  let bmt = Math.round(bmr * aktivitas);
  let setaraDengan = bmt / nastar;
  setaraDengan = Math.round(setaraDengan);

  let ifSedentary = Math.round(bmr * 1.2);
  let ifRingan = Math.round(bmr * 1.5);
  let ifSedang = Math.round(bmr * 1.6);
  let ifAktif = Math.round(bmr * 1.85);


  document.querySelector(
    ".outputBmr"
  ).innerHTML = `<p class="output-text-bmr">Berdasarkan perhitungan, <b>Basal Metabolic Rate</b> kamu sebesar <b> ${bmr} kkal/hari</b>! karena level aktivitasmu adalah <b>${aktivitas}</b> yang berarti <b>${pesanAktivitas}</b>, maka kebutuhan kalori harian kamu adalah <b>${bmt} kkal/hari</b>, setara dengan <b>${setaraDengan} kue nastar!</b></p>
  
  <table>
            <tr>
              <th>Tingkat Aktivitas</th>
              <th>Level Aktivitas</th>
              <th>BMR</th>
              <th>TDEE</th>
            </tr>
            <tr>
              <td>Sedentary</td>
              <td>1.2</td>
              <td>${bmr}</td>
              <td>${ifSedentary}</td>
            </tr>
            <tr>
              <td>Ringan</td>
              <td>1.5</td>
              <td>${bmr}</td>
              <td>${ifRingan}</td>
            </tr>
            <tr>
              <td>Sedang</td>
              <td>1.6</td>
              <td>${bmr}</td>
              <td>${ifSedang}</td>
            </tr>
            <tr>
              <td>Aktif</td>
              <td>1.85</td>
              <td>${bmr}</td>
              <td>${ifAktif}</td>
            </tr>
  </table>
  `;
}

inputBmr = document.querySelector(".bmrInputContainer .input");
buttonBmr = document.querySelector(".submitBmr");
inputBmr.addEventListener("keydown", function (outputBmr) {
  if (outputBmr.key == "Enter") {
    buttonBmr.click();
  }
});
