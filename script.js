var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

// untuk memunculkan overlay div baru
function aktif(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = 'flex';
  }
}

function nonaktif(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = 'none';
  }

  document.querySelectorAll("input[type='number']").forEach(input => {
    input.value = "";
  });

  document.getElementById('output').style.display = 'none';
}

// untuk membatasi input
document.querySelectorAll("input[type='number']").forEach(input => {
    input.oninput = () => {
      if (input.value.length > input.maxLength) input.value = input.value.slice(0, input.maxLength);
      KaloriPerHari();
    }
  });

// untuk menambahkan function menghitung BMI
function outputBmi(id) {
  let element = document.getElementById(id);
  if (id) {
    element.style.display = 'flex';
  }

  let tinggiBadan = document.querySelector('.inputTb').value;
  let beratBadan = document.querySelector('.inputBb').value;
  let m = 100;
  let tinggiBadanMeterKuadrat = (tinggiBadan / m) * (tinggiBadan / m);
  let bmi = beratBadan / tinggiBadanMeterKuadrat;
  bmi = bmi.toFixed(2);
  if (bmi <= 18.5) {
    document.querySelector('.output-text').innerHTML = "Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>" + bmi + "</b>! Ini berarti kamu termasuk kategori underweight (berat badan kurang). Maka kamu harus surplus atau memperbanyak kalori harian kamu lebih dari biasanya!";
  } else if (bmi <= 22.9 && bmi > 18.5) {
    document.querySelector('.output-text').innerHTML = "Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>" + bmi + "</b>! Ini berarti kamu termasuk kategori ideal (berat badan ideal). Maka kamu harus mempertahankannya agar tidak kegemukan atau kekurusan!";
  } else if (bmi <= 24.9 && bmi > 23) {
    document.querySelector('.output-text').innerHTML = "Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>" + bmi + "</b>! Ini berarti kamu termasuk kategori overweight (berat badan berlebih). Maka kamu harus melakukan defisit kalori atau mengurangi asupan kalori kamu lebih dari biasanya!";
  } else if (bmi > 25) {
    document.querySelector('.output-text').innerHTML = "Berdasarkan perhitungan, Indeks Massa Tubuh kamu sebesar <b>" + bmi + "</b>! Wah gawat, kamu termasuk kategori obesitas. Maka kamu harus melakukan defisit kalori besar-besaran serta melakukan diet untuk mengurangi berat badanmu!";
  } else {
    document.querySelector('.output-text').innerHTML = 'Invalid input!';
  }
}