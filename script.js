const forumContent = document.getElementById('forumContent');
const forumInput = document.getElementById('forumInput');

function submitForm() {
    const actionRadios = document.querySelectorAll('input[type="radio"][name="action"]');
    const selectedAction = Array.from(actionRadios).find(radio => radio.checked).value;

    const content = forumInput.value.trim();

    if (content) {
        if (selectedAction === 'ask') {
            const questionDiv = createQuestionElement(content);
            forumContent.appendChild(questionDiv);
        } else if (selectedAction === 'answer') {
            const selectedQuestions = document.querySelectorAll('.question');
            if (selectedQuestions.length === 0) {
                alert('Harap pilih setidaknya satu pertanyaan untuk dijawab.');
                return;
            }

            for (const question of selectedQuestions) {
                if (question.querySelector('input[type="checkbox"]').checked) {
                    const answerDiv = createAnswerElement(content, question);
                    forumContent.appendChild(answerDiv);
                }
            }
        }

        forumInput.value = '';
        saveForumContent();
    } else {
        alert('Harap isi pertanyaan atau jawaban sesuai opsi yang dipilih.');
    }
}

function createQuestionElement(questionText) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `
        <input type="checkbox">
        <span class="user">Pengguna Anonim:</span> ${questionText}
        <button class="delete-btn" onclick="deleteElement(this)">Hapus</button>
    `;
    return questionDiv;
}

function createAnswerElement(answerText, questionElement) {
    const questionLabel = questionElement.querySelector('span.user').textContent;
    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer';
    answerDiv.innerHTML = `
        <span class="user">Pengguna Anonim:</span> Jawaban untuk "${questionLabel}": ${answerText}
        <button class="delete-btn" onclick="deleteElement(this)">Hapus</button>
    `;
    return answerDiv;
}

function deleteElement(element) {
    const parentElement = element.parentElement;
    parentElement.remove();
    saveForumContent();
}

function saveForumContent() {
    const forumData = forumContent.innerHTML;
    localStorage.setItem('forumContent', forumData);
}

function loadForumContent() {
    const savedData = localStorage.getItem('forumContent');
    if (savedData) {
        forumContent.innerHTML = savedData;
    }
}

// Load saved forum content on page load
loadForumContent();
