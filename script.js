let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

/* window.prompt = (message) => {
    $('.container').html(message);
    var PromisePrompt = $('.container').modal({
        keyboard: false,
        backdrop: 'static'
    }).modal('show');
    $('.container').focus();
    let prmpt = null;
    $('.container').on('click', e => {
        prmpt = $('.container').val();
    });
    return new Promise(function (resolve, reject) {
        PromisePrompt.on('hidden.bs.modal', (e) => {
            resolve(prmpt);
        });
    });
}; */

let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

function toWord(){
    let units=['','один','два','три','четыре','пять','шесть','семь','восемь','девять','десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'];
    let tens=['','','двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'];
    let hundreds=['','сто'];
    if (answerNumber==0){
        answerWord='ноль';
        return;
    }
    const hundredsNum=Math.floor(Math.abs(answerNumber)/ 100);
    const tensNum=Math.floor((Math.abs(answerNumber)-100*hundredsNum)/10);
    const unitsNum=Math.abs(answerNumber)-100*hundredsNum-10*tensNum;
    if (Math.abs(answerNumber)<=19){
        answerWord=units[Math.abs(answerNumber)];
    }else{
        answerWord=hundreds[hundredsNum]+' '+tens[tensNum]+' '+units[unitsNum];
    }
    if (answerNumber<0)
        answerWord=0;

    if (answerWord.length>20)
        answerWord=answerNumber;
}

orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${answerNumber }?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = 0;
    maxValue = 100;
    orderNumber = 0;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            toWord();
            answerField.innerText = `Наверное это число ${answerNumber }?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random()*2);
            switch (phraseRandom) {
                case 0:
                    answerField.innerText=`Вы загадали неправильное число!\n\u{1F914}`;
                    break;
                
                case 1:
                    answerField.innerText=`Я сдаюсь..\n\u{1F92F}`;
                    break;

                case 2:
                    answerField.innerText=`Слишком сложно для меня..\n\u{1F622}`;
                    break;

                default:
                    break;
            }
            gameRun = false;
        }   else {
            maxValue = answerNumber  - 1;
            answerNumber = Math.floor((maxValue + minValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const questionRandom = Math.round( Math.random()*2);
            toWord();
            switch (questionRandom){
                case 0:
                    answerField.innerText = `Мне думается, что Вы загадали число ${answerNumber}?`;
                    break;
                
                case 1:
                    answerField.innerText=`Может Вы загадали число ${answerNumber}?`;
                    break;

                case 2:
                    answerField.innerText=`А что если Вы загадали ${answerNumber}?`;
                    break;

                default:
                    break;
            }
            
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        orderNumberField.innerText = orderNumber;
        const answerRandom = Math.round( Math.random()*2);
        toWord();
            switch (answerRandom) {
                case 0:
                    answerField.innerText = `Я всегда угадываю\n\u{1F60E}`
                    break;
                
                case 1:
                    answerField.innerText=`Я надеюсь, что вы во мне не сомневались\n\u{1F609}`;
                    break;

                case 2:
                    answerField.innerText=`Ежу понятно, что это ${answerWord }\n\u{1f605}`;
                    break;

                default:
                    break;
            }
        gameRun = false;
    }
})

function refreshPage(){
    window.location.reload();
} 
