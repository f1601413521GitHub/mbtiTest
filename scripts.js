const questions = [
    {
        question: "你喜歡長時間躺著嗎？",
        choices: ["喜歡", "不喜歡"],
        category: "I" // Introversion (產生能量的方式)
    },
    {
        question: "你會偶爾翻身換個姿勢嗎？",
        choices: ["會", "不會"],
        category: "P" // Perceiving (反應態度)
    },
    {
        question: "你喜歡高脂肪含量的食物嗎？",
        choices: ["喜歡", "不喜歡"],
        category: "S" // Sensing (思維模式)
    },
    {
        question: "你在壓力大的時候會爆發嗎？",
        choices: ["會", "不會"],
        category: "T" // Thinking (做決策的依據)
    },
    {
        question: "你認為自己不太健康嗎？",
        choices: ["是", "否"],
        category: "F" // Feeling (做決策的依據)
    },
    {
        question: "你喜歡便宜廉價的東西嗎？",
        choices: ["喜歡", "不喜歡"],
        category: "S" // Sensing (思維模式)
    },
    {
        question: "你認為複雜的成分會讓食物更美味嗎？",
        choices: ["是", "否"],
        category: "N" // Intuition (思維模式)
    }
];

const results = {
    "INTJ": {
        description: "你是一個戰略家，有遠見，目標導向",
        image: "images/01_INTJ.jpg"
    },
    "INTP": {
        description: "你是一個創新者，分析型，追求知識",
        image: "images/02_INTP.jpg"
    },
    "ENTJ": {
        description: "你是一個領導者，自信，果斷",
        image: "images/03_ENTJ.jpg"
    },
    "ENTP": {
        description: "你是一個辯論者，富有創意，愛挑戰",
        image: "images/04_ENTP.jpg"
    },
    "INFJ": {
        description: "你是一個理想主義者，富有同情心，決心強",
        image: "images/05_INFJ.jpg"
    },
    "INFP": {
        description: "你是一個調解者，富有理想，追求和諧",
        image: "images/06_INFP.jpg"
    },
    "ENFJ": {
        description: "你是一個社會活動家，有魅力，激勵他人",
        image: "images/07_ENFJ.jpg"
    },
    "ENFP": {
        description: "你是一個熱情者，富有創意，追求自由",
        image: "images/08_ENFP.jpg"
    },
    "ISTJ": {
        description: "你是一個務實者，有責任心，細心",
        image: "images/09_ISTJ.jpg"
    },
    "ISFJ": {
        description: "你是一個保護者，可靠，有耐心",
        image: "images/10_ISFJ.jpg"
    },
    "ESTJ": {
        description: "你是一個管理者，有組織能力，果斷",
        image: "images/11_ESTJ.jpg"
    },
    "ESFJ": {
        description: "你是一個關懷者，樂於助人，外向",
        image: "images/12_ESFJ.jpg"
    },
    "ISTP": {
        description: "你是一個工匠，靈活，實用",
        image: "images/13_ISTP.jpg"
    },
    "ISFP": {
        description: "你是一個冒險家，自由奔放，藝術感",
        image: "images/14_ISFP.jpg"
    },
    "ESTP": {
        description: "你是一個企業家，自信，愛冒險",
        image: "images/15_ESTP.jpg"
    },
    "ESFP": {
        description: "你是一個表演者，外向，熱情",
        image: "images/16_ESFP.jpg"
    }
};

let currentQuestion = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

function renderQuestion() {
    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestion];
    document.getElementById('test').innerHTML = `
        <div class="question">${question.question}</div>
        <div class="choices">
            ${question.choices.map((choice, index) => `<button onclick="answer(${index})">${choice}</button>`).join('')}
        </div>
    `;
    document.getElementById('prev').style.display = currentQuestion > 0 ? 'inline-block' : 'none';
}

function answer(choiceIndex) {
    const question = questions[currentQuestion];
    if (choiceIndex === 0) {
        scores[question.category]++;
    } else {
        const oppositeCategory = getOppositeCategory(question.category);
        scores[oppositeCategory]++;
    }

    currentQuestion++;
    renderQuestion();
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function getOppositeCategory(category) {
    switch (category) {
        case 'E': return 'I';
        case 'I': return 'E';
        case 'S': return 'N';
        case 'N': return 'S';
        case 'T': return 'F';
        case 'F': return 'T';
        case 'J': return 'P';
        case 'P': return 'J';
    }
}

function showResult() {
    const mbti = (scores.E > scores.I ? 'E' : 'I') +
                 (scores.S > scores.N ? 'S' : 'N') +
                 (scores.T > scores.F ? 'T' : 'F') +
                 (scores.J > scores.P ? 'J' : 'P');
    
    const result = results[mbti];
    document.getElementById('test').innerHTML = `<h2>你的 MBTI 類型是：${mbti}</h2>
                                                 <p>${result.description}</p>
                                                 <div class="image-container"><img src="${result.image}" alt="${mbti} Image"></div>`;
    document.getElementById('prev').style.display = 'none';
    document.getElementById('next').style.display = 'none';
}

// 開始測驗
renderQuestion();

