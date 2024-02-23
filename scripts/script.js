const videos = [
    { url: "https://www.youtube.com/embed/4Lr-VnZ44U0?si=RZvRe0m6-E2ZsgGt", date: "2022-01-26" },
    { url: "https://www.youtube.com/embed/u_T-bxQiFrQ?si=wLn4MoLkW7pg2pwp", date: "2021-05-16" },
    // Adicione mais vídeos conforme necessário
];

let currentVideo = {};

const monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const checkButton = document.querySelector(".checkButton");
// const checkButton = document.getElementById(".guessButton");


checkButton.addEventListener("click", ()=>{
    const userMonth = parseInt(document.getElementById('yearRange').value);
    const userYear = parseInt(document.getElementById('dateRange').value);

    const videoDate = new Date(currentVideo.date);
    const videoMonth = videoDate.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então precisamos adicionar 1
    const videoYear = videoDate.getFullYear();

    if (userMonth === videoMonth && userYear === videoYear) {
        // document.getElementById('result').innerText = "Correct! Well done.";
        console.log("Dale marcio");
    } else {
        // document.getElementById('result').innerText = "Wrong! Try again.";
        console.log(videoYear, videoMonth);
    }

    const rangeValue = document.getElementById('dateRange').value;
    const yearValue = document.getElementById('yearRange').value;
    const totalMonths = 11; // 11 anos * 12 meses
    const monthsIndex = Math.floor(rangeValue / 100 * totalMonths); // Convertendo a faixa de 0-100 para índices de 0-131
    const month = (monthsIndex % 12) + 1; // Calculando o mês dentro do ano e adicionando 1 para compensar o índice base 0
    const date = `${monthsArray[month - 1]} ${yearValue}`; // Obtendo o nome do mês a partir do array de meses
    document.getElementById('currentDate').innerText = "Date: " + date

    alert(videoMonth);
})
// Função para atualizar o vídeo com base na posição da barra deslizante
function updateVideo() {
    const rangeValue = document.getElementById('dateRange').value;
    const yearValue = document.getElementById('yearRange').value;
    const totalMonths = 11; // 11 anos * 12 meses
    const monthsIndex = Math.floor(rangeValue / 100 * totalMonths); // Convertendo a faixa de 0-100 para índices de 0-131
    const month = (monthsIndex % 12) + 1; // Calculando o mês dentro do ano e adicionando 1 para compensar o índice base 0
    const date = `${monthsArray[month - 1]} ${yearValue}`; // Obtendo o nome do mês a partir do array de meses
    document.getElementById('currentDate').innerText = "Date: " + date
}

// Função para escolher um vídeo aleatório
function chooseVideo() {
    const index = Math.floor(Math.random() * videos.length);
    currentVideo = videos[index];
    document.getElementById('videoFrame').src = currentVideo.url;
    document.getElementById('currentDate').innerText = "Date: " + currentVideo.date;
}




// Função para verificar a resposta do usuário
// function checkAnswer() {
//     const userMonth = parseInt(document.getElementById('userMonth').value);
//     const userYear = parseInt(document.getElementById('userYear').value);

//     const videoDate = new Date(currentVideo.date);
//     const videoMonth = videoDate.getMonth() + 1; // Os meses em JavaScript são baseados em zero, então precisamos adicionar 1
//     const videoYear = videoDate.getFullYear();

//     if (userMonth === videoMonth && userYear === videoYear) {
//         document.getElementById('result').innerText = "Correct! Well done.";
//     } else {
//         document.getElementById('result').innerText = "Wrong! Try again.";
//     }
// }

// Inicializar o jogo escolhendo um vídeo
chooseVideo();