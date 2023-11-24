var words = []
var actualIndex = 0;

var getWords = () => {
    var mainCharacter = document.getElementById('mainCharacter').innerHTML;
    var characters = mainCharacter + ","
    var checksbox = document.getElementsByTagName('input')
    for (let item of checksbox) {
        if(item.checked && !characters.includes(item.id + ",")){
            characters = characters + item.id + ","
        }
    }
    fetch('https://leeme-api-1ea559c92ff4.herokuapp.com/api/v1/words/' + mainCharacter + '/' + characters + 'a,á,e,é,i,í,o,ó,u,ú,ü', {
        headers: {
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'mode':'no-cors'
        }
    })
    .then(res => res.json())
    .then(res => {
        words = unorderList(res.words)
        actualIndex = 0;
        document.getElementById('count').innerHTML = `${words.length} resultados`
        next()
    })
    .catch(err => console.log('Algo salió mal'));
}

var comparacionAleatoria = () => {
    return Math.random() - 0.5;
}

var unorderList = (words) => {
    words.sort(comparacionAleatoria);
    return words
}

var next = () => {
    var indexs = []
    if(words.length <= 10){
        indexs = Array.from({length:words.length}, (x, i) => i);
    }else{
        var max = actualIndex + 10;
        if(max < words.length){
            indexs = Array.from({length:10}, (x, i) => actualIndex+i);
            actualIndex = max;
        }else{
            indexs = Array.from({length:words.length-actualIndex}, (x, i) => actualIndex+i);
            actualIndex = 0;
        }
    }
    var randomWords = ''
    indexs.forEach(index => {
        let word = words[index];
        randomWords += `<p onclick="show_me('${word}')">${word}</p>`;
    });
    document.getElementById('randomList').innerHTML = randomWords
    show_me(words[indexs[0]]);
};

var show_me = (text) => {
    var parts = silabas(text);
    var html = ''
    parts.forEach(part => {
        html += '<span>' + part + '</span>'
    })
    document.getElementById('word').innerHTML = html
    document.getElementById('link').href = `https://dle.rae.es/${text}`
}

var vocales = 'aeiouáéíóú';
var gruposPermitidos = ['bl', 'br', 'cl', 'cr', 'dr', 'gü','fl','fr','gl', 'gr', 'pl', 'pr', 'tr', 'll', 'ch', 'rr'];
var silabas = (palabra) => {
    var silabas = [];
    var silaba = "";
    for (let i = 0 ; i < palabra.length ; i++) {
        var character = palabra.charAt(i);
        silaba = silaba + character;
        if(vocales.includes(character)){
            silabas.push(silaba);
            silaba = ""
        }
    }
    if(silaba != ''){
        silabas.push(silaba);
    }
    for (let i = 0 ; i < silabas.length ; i++){
        if(silabas[i].length == 1 && !vocales.includes(silabas[i])){
            silabas[i-1] = silabas[i-1] + silabas[i];
            silabas[i] = '';
        }else if(silabas[i].length == 3){
            if(!gruposPermitidos.includes(silabas[i].substring(0,2))){
                silabas[i-1] = silabas[i-1] + silabas[i].substring(0,1);
                silabas[i] = silabas[i].substring(1);
            }
        }
    }
    return silabas.filter(silaba => silaba != '')
}