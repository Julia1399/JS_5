function serializeForm(formNode) {
  // массив обьектов с именем и значением из поле формы
    const { elements } = formNode
    const data = Array.from(elements)
        .filter((item) => !!item.name)
        .map((element) => {
        const { name, value } = element;
        return { name, value }
        })
    // запись колличества просмотренных фильмов и жанров в personalMovieDB
    if (iteration === 0){
      console.log(data)
        numberOfFilms = data[0].value;
        data.forEach(element => {
          if (element.name === 'genre'){
            personalMovieDB.genres.push(element.value);
          }
        });
    } 
    personalMovieDB.count = numberOfFilms;
    // вызов функции всплывающего окна
    if (iteration === 0){
    countStatus(numberOfFilms)
    }
    // запись фмльма и его оценки в personalMovieDB
    if (iteration === 1){
        personalMovieDB.movies[data[4].value] = data[5].value
        btn.disabled = true;
        // проверка статуса доступа
        if (personalMovieDB.privat === false){
          console.log(personalMovieDB);
        } 
    }
    // очистка формы
    applicantForm.reset() ;
  }
  // фунуция всплывающего окна и блокировки фона
  function countStatus(num){
    var div = document.createElement('div')
    div.classList.add('block');
    document.body.append(div);
    document.querySelector(".popup").style.display = 'block';
    document.querySelector(".block").style.display = 'block';
    closeBtn.insertAdjacentHTML('beforebegin', '<div class = "text"></div>');
    document.querySelector('.text').innerHTML = '<span class = "status">text</span>';
    closeBtn.insertAdjacentHTML('beforebegin', '<img class="icon icon-1" src = "img/status1.png" alt = "icon">');
    closeBtn.insertAdjacentHTML('beforebegin', '<img class="icon icon-2" src = "img/status2.png" alt = "icon">');
    closeBtn.insertAdjacentHTML('beforebegin', '<img class="icon icon-3" src = "img/status3.png" alt = "icon">');
    let icon = document.getElementsByClassName("icon");
    console.log(icon);
    for (i = 0; i<icon.length; i++){
      icon[i].style.cssText = 'width:30px; display: none; margin: 0 auto; margin-top: 10px';
    }
    text = document.querySelector(".status");
    if (num < 10) {
        document.querySelector('.icon-1').style.display = 'block';
        text.textContent = 'Просмотрено довольно мало фильмов';        
    } else if (num >= 10 && num < 30) {
        icon[0].replaceWith(icon[1]);
        document.querySelector('.icon-2').style.display = 'block';
        text.textContent = 'Вы классический зритель';
    } else if (num >= 30) {
        icon[1].replaceWith(icon[2]);
        document.querySelector('.icon-3').style.display = 'block';
        text.textContent = 'Вы киноман';
    } else {
        text.textContent = 'Произошла ошибка';
    }
  }
  // функция закрытия всплывающего окна
  function closeFunc(){
    secondPage[0].style.display = 'contents';
    firstPage[0].style.display = 'none';
    document.querySelector(".popup").style.display = 'none';
    document.querySelector('.block').remove();
    btn[0].setAttribute('disabled', true);
    iteration = 1;
  }
  
  // функция запрета отправки формы
  function handleFormSubmit(event) {
    event.preventDefault();
    serializeForm(applicantForm);
  }

  // функция, проверяющая заполненность полей
  function valueCheck(){
    if (inputFilm.value !== '' && inputRate.value !== ''){
        btn[0].disabled = false;
    }
    if (firstQuestions[0].value !== '' && firstQuestions[1].value !== '' && firstQuestions[2].value  !== '' && firstQuestions[3].value  !== ''){
      btn[0].disabled = false;
  }
  }
  
  const applicantForm = document.getElementById('movies');
  let closeBtn = document.querySelector('.close');
  var firstPage = document.getElementsByClassName('question-1');
  var secondPage = document.getElementsByClassName('question-2');
  var btn = applicantForm.getElementsByTagName('button');
  btn[0].disabled = true;
  const firstQuestions = firstPage[0].querySelectorAll('.q1');
  const inputFilm = document.getElementById('2');
  const inputRate = document.getElementById('3');
  applicantForm.addEventListener('mousemove', valueCheck);
  var numberOfFilms = '';
  var personalMovieDB = {
      count: numberOfFilms,
      movies: {},
      actors: {}, 
      genres: [], 
      privat: false
  }
  let iteration = 0;
  closeBtn.addEventListener('click', closeFunc);
  applicantForm.addEventListener('submit', handleFormSubmit);
