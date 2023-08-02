const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submitButton');
const questions = [];

let score = 0;

// Data pertanyaan kuis
const quizQuestions = [
  {
    question: "Apa yang harus dilakukan saat melintasi jalan?",
    options: [
      "Menyeberang dengan mengecek kanan dan kiri terlebih dahulu",
      "Berjalan sembarangan",
      "Menerobos lampu merah"
    ],
    answer: "Menyeberang dengan mengecek kanan dan kiri terlebih dahulu",
    explanation: "Menyeberang dengan mengecek kanan dan kiri terlebih dahulu adalah tindakan yang aman."
  },
  // Tambahkan pertanyaan lainnya di sini...
  {
    question: "Siapakah yang berwenang menegakkan hukum di Indonesia?",
    options: [
      "Polisi",
      "Pengadilan",
      "Pengacara"
    ],
    answer: "Polisi",
    explanation: "Polisi memiliki wewenang untuk menegakkan hukum dan memberlakukan tindakan-tindakan kepolisian."
  },
  {
    question: "Apa yang dimaksud dengan hak asasi manusia?",
    options: [
      "Hak yang diberikan oleh pemerintah",
      "Hak yang melekat pada setiap manusia sejak lahir",
      "Hak yang hanya dimiliki oleh warga negara tertentu"
    ],
    answer: "Hak yang melekat pada setiap manusia sejak lahir",
    explanation: "Hak asasi manusia adalah hak-hak yang melekat pada setiap manusia sejak lahir dan tidak dapat dicabut."
  },
  {
    question: "Apa itu peradilan?",
    options: [
      "Sistem penyelenggaraan negara",
      "Proses penegakan hukum",
      "Institusi pemerintah"
    ],
    answer: "Proses penegakan hukum",
    explanation: "Peradilan adalah proses penegakan hukum yang dilakukan oleh lembaga peradilan untuk menyelesaikan sengketa dan melaksanakan hukum."
  },
  {
    question: "Apa yang dilakukan ketika ada orang yang mengalami kecelakaan?",
    options: [
      "Langsung meninggalkan tempat kejadian",
      "Mencari bantuan dan memberikan pertolongan",
      "Menghindari dan tidak peduli"
    ],
    answer: "Mencari bantuan dan memberikan pertolongan",
    explanation: "Ketika ada orang yang mengalami kecelakaan, kita harus segera mencari bantuan dan memberikan pertolongan untuk membantu korban."
  },
  {
    question: "Apa itu negara hukum?",
    options: [
      "Negara yang tidak memiliki hukum",
      "Negara yang mengikuti hukum internasional",
      "Negara yang kebijakannya diatur oleh hukum"
    ],
    answer: "Negara yang kebijakannya diatur oleh hukum",
    explanation: "Negara hukum adalah negara yang sistem kebijakannya diatur berdasarkan hukum, sehingga semua warga negara dan pemerintahan harus tunduk pada hukum yang berlaku."
  },
  {
    question: "Apa itu hukum pidana?",
    options: [
      "Hukum yang mengatur peradilan",
      "Hukum yang mengatur tindak pidana",
      "Hukum yang mengatur bisnis"
    ],
    answer: "Hukum yang mengatur tindak pidana",
    explanation: "Hukum pidana adalah cabang hukum yang mengatur tentang tindak pidana, sanksi, dan prosedur peradilan pidana."
  },
  {
    question: "Apa yang dimaksud dengan praduga tak bersalah?",
    options: [
      "Setiap orang dianggap bersalah sejak awal",
      "Setiap orang dianggap tidak bersalah sebelum terbukti bersalah",
      "Setiap orang dianggap tidak bersalah setelah dihukum"
    ],
    answer: "Setiap orang dianggap tidak bersalah sebelum terbukti bersalah",
    explanation: "Praduga tak bersalah adalah asas hukum yang menyatakan bahwa seseorang dianggap tidak bersalah sampai adanya bukti yang meyakinkan sebaliknya."
  },
  {
    question: "Apa yang harus dilakukan saat ada saksi mata suatu tindak kejahatan?",
    options: [
      "Tidak perlu memberi kesaksian",
      "Memberi kesaksian yang tidak benar",
      "Memberi kesaksian yang sebenar-benarnya"
    ],
    answer: "Memberi kesaksian yang sebenar-benarnya",
    explanation: "Sebagai saksi mata suatu tindak kejahatan, kita harus memberikan kesaksian yang sebenar-benarnya agar keadilan dapat terwujud dalam proses peradilan."
  },
  {
    question: "Apa yang seharusnya dilakukan seorang remaja ketika dihadapkan pada situasi yang memicu emosi dan kemarahan?",
    options: [
        "Mengungkapkan emosi dan kemarahan dengan melakukan tindakan agresif",
        "Menyimpan emosi dan kemarahan dalam diri tanpa mengutarakan kepada siapa pun",
        "Berbicara dengan tenang dan mencari pemahaman atas situasi yang terjadi",
        "Menjauh dari lingkungan yang memicu emosi dan kemarahan"
    ],
    answer: "Berbicara dengan tenang dan mencari pemahaman atas situasi yang terjadi",
    explanation: "Seorang remaja sebaiknya mencoba berbicara dengan tenang dan mencari pemahaman atas situasi yang memicu emosi dan kemarahan. Mengutarakannya secara agresif hanya akan memperburuk situasi, sedangkan menyimpan emosi sendiri dapat menimbulkan stres dan masalah kesehatan mental."
},
];

// Membangun kuis
function buildQuiz() {
  for (let i = 0; i < quizQuestions.length; i++) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.id = `question-${i}`;

    const questionText = document.createElement('p');
    questionText.textContent = `Nomor ${i + 1}: ${quizQuestions[i].question}`;
    questionElement.appendChild(questionText);

    for (let j = 0; j < quizQuestions[i].options.length; j++) {
      const option = quizQuestions[i].options[j];

      const optionLabel = document.createElement('label');
      optionLabel.textContent = option;

      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question${i}`;
      optionInput.value = option;

      optionInput.addEventListener('change', () => {
        submitButton.disabled = false;

        // Beri warna pada opsi jawaban yang dipilih
        const allOptions = document.querySelectorAll(`input[name="question${i}"]`);
        allOptions.forEach((opt) => {
          const label = opt.parentElement;
          label.style.backgroundColor = (opt.checked) ? '#007BFF' : '#555';
        });
      });

      optionLabel.appendChild(optionInput);
      questionElement.appendChild(optionLabel);
    }

    quizContainer.appendChild(questionElement);
  }
}

// Menampilkan hasil kuis
function showResults() {
  quizContainer.style.display = 'none';
  resultContainer.innerHTML = `<p class="result-text">Skor Anda: ${score} dari ${quizQuestions.length}</p>`;
  resultContainer.style.display = 'block';

  // Menampilkan penjelasan untuk jawaban yang salah
  for (let i = 0; i < quizQuestions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
    if (selectedOption && selectedOption.value !== quizQuestions[i].answer) {
      const explanationElement = document.createElement('p');
      explanationElement.className = 'result-text';
      explanationElement.textContent = `Pertanyaan ${i + 1}: ${quizQuestions[i].explanation}`;
      resultContainer.appendChild(explanationElement);
    }
  }
}

// Menghitung skor kuis
function calculateScore() {
  score = 0;
  for (let i = 0; i < quizQuestions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
    if (selectedOption && selectedOption.value === quizQuestions[i].answer) {
      score++;
    }
  }
}

// Tombol "Submit" ditekan
submitButton.addEventListener('click', () => {
  calculateScore();
  showResults();
});

// Memulai kuis
buildQuiz();
