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
  console.log(bmi);
  if (bmi <= 18.5) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `BMI kamu: <b>${bmi}, Underweight</b> <br><br>
    Berat badan kamu masih di bawah ideal. Coba tambah porsi makan dikit dan jangan lupa olahraga yang rutin ya!`;
  } else if (bmi <= 22.9 && bmi > 18.5) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `BMI kamu: <b>${bmi}, Normal</b> <br><br>
    Mantap! Berat badan kamu udah ideal. Tinggal jaga pola makan dan tetap aktif aja.`;
  } else if (bmi <= 24.9 && bmi > 22.9) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `BMI kamu: <b>${bmi}, Overweight</b> <br><br>
    Berat badan kamu agak berlebih nih. Gak apa-apa, coba atur pola makan dan gerak lebih banyak pelan-pelan aja.`;
  } else if (bmi > 24.9) {
    document.querySelector(
      ".output-text"
    ).innerHTML = `BMI kamu: <b>${bmi}, Obese</b> <br><br>
    Berat badan udah masuk kategori obesitas. Nggak usah panik, mulai aja dari kurangi makan manis-manis dan tambah jalan kaki tiap hari.`;
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
  ).innerHTML = `<p><b>BMR</b> kamu: <b>${bmr} kkal/hari</b>. Karena aktivitasmu <b>${aktivitas}</b> (<b>${pesanAktivitas}</b>), kebutuhan kalori harianmu jadi <b>${bmt} kkal</b> — setara dengan <b>${setaraDengan} kue nastar!</b></p>
  
  <table class="bmr-table">
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
