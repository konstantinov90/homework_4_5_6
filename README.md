Задание по Инфраструктуре
------------

1. Часть 1  
 
    настроены npm скрипты
    - npm run lint
    - npm run test

    JS файлы проверяются с помощью ESlint, с набором правил.  
    На данном этапе запускаются тесты, где тестируется всего 3 функции.   
    Остальные функции имеют внешнюю зависимость и будут протестированы в интеграционных тестах.

2. Сборка проекта  

    - Настроена dev-сборка.  
    Достаточно набрать npm run dev для запуска.  
    Под капотом запускается сборка через вебпак без минимизации кода + прослушивает файлы.  
    А так же запускается nodemon и перезапускает сервер при изменении кода.  
    - Настроена production-сборка.
    Неоходимо ввести "npm run build && npm start".
    Код на этапе сборки минимизируется, css сжимается и выносится в отдельный файл.

3. Контейнеризация приложения  
    Для создания docker контейнера предусмотрен файл Dockerfile.
    Образ создается в рабочем состоянии.
    
4. Continuous Integration
    - Trevis подключен к github проекту и успешно проходит тесты.
    - Настроенна pipeline между Trevis и Heroku
    - Сборка на Heroku завершается с ошибкой, перепробовал различные варианты, пока в поисках решения проблемы.

Задание по Node.js
------------

1. В корневой директории в файле config.js можно прописать следующий параметры:  
    ```
        1 myPath - путь к проекту с папкой .git  
        2 host
        3 port  
        4 timeFormat - формат даты  
        5 timeLocale - язык отображения даты
    ```
     4 и 5 пункты используют библиотеку [moment.js](http://momentjs.com/docs/#/displaying/format/) поэтому можно использовать любой формат/язык поддерживаемый этой библиотекой.

2. Обрабатываются все не существующие роутеры и показывается окно с ссылкой "вернуться на главную"

3. У роутеров следующая логика  
    1 При заходе на главную страницу "/" определяется ветка по умолчанию через .git/HEAD
    и происходит редирект на неё.  
    2 Все корневые пути для веток соответствуют такому формату: "/{branchName}"  
    3 url для директории ветки: "/{branchName}/tree/..."  
    4 url для файла ветки: "/{branchName}/blob/..."  
    5 Корневой путь для комитов: "/commit/{hash}/"  
    6 url для директории комитов: "/commit/{hash}/tree/..."  
    7 url для файла комита: "/commit/{hash}/blob/..."
    
4. Поддерживаются вложенные url, например такие: "/master/blob/public/js/index.js"
5. На стилевой оформление согласно заданию особое внимание не уделялось.


Задание по тестам
------------

1. Структура приложения описана чуть выше, в разделе Node.js (пункт №3)
2. Unit тестов мало, т.к. почти все функции завязаны на использовании внешних зависимостей.
3. Интеграционные тесты пронумерованы в сквозном порядке (для удобства соответствия с заданием) начиная с цифры 0 (тест который получает title страницы), остальной порядок функции соответствует номерам интеграционных тестов в задании ("1" соответствует тесту "3.1" и тд.)
4. Для запуска интеграционных тестов необходимо:  
    1 Запустить сервер (например npm run dev или npm run build && npm start)  
    2 Запустить selenium-standalone start  
    3 Запустить проверку "npm run test-hermione"  