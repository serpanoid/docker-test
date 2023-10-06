Ця інструкція допоможе вам запустити базу даних MongoDB в контейнері Docker та виконати різні дії з нею, такі як підключення, зупинка, перезапуск і перевірка стану даних.

## Крок 1: Підготовка Середовища

1. Впевніться, що ви маєте встановлене програмне забезпечення Docker на вашому комп'ютері. Якщо ні, ви можете завантажити його з офіційного сайту Docker: [https://www.docker.com/get-started](https://www.docker.com/get-started)

## Крок 2: Створення Dockerfile для MongoDB

1. Створіть Dockerfile для MongoDB у кореневій директорії вашого проекту або в окремій папці, яка містить налаштування для MongoDB.

```Dockerfile
# Використовуємо офіційний образ MongoDB
FROM mongo:latest

# Задаємо робочий каталог (не обов'язково, але може бути корисно)
WORKDIR /data/db

# Вказуємо порт, який буде відкритий для підключення (за замовчуванням 27017)
EXPOSE 27017

# Початкова команда для запуску MongoDB
CMD ["mongod"]
```

## Крок 3: Побудова Імеджу та Запуск Контейнера MongoDB
Відкрийте термінал або командний рядок.

Перейдіть до кореневої директорії вашого проекту, де знаходиться Dockerfile для MongoDB.

Виконайте наступну команду для створення імеджу MongoDB:
```
bash
Copy code
docker build -t my-mongodb-image .
```
Запустіть контейнер MongoDB:
```
bash
Copy code
docker run --name my-mongodb-container -d -p 27017:27017 my-mongodb-image
```

```--name my-mongodb-container```: Вказує ім'я контейнера.
```-d```: Запускає контейнер у фоновому режимі.
`-p 27017:27017`: Перенаправляє порт контейнера MongoDB 27017 на порт вашого комп'ютера 27017.

## Крок 4: Підключення до Бази Даних MongoDB та Виконання Запитів
Тепер, коли контейнер MongoDB працює, ви можете підключитися до бази даних за допомогою MongoDB-клієнта або іншого інструмента для роботи з MongoDB.

Хост: localhost
Порт: 27017


Крок 5: Зупинка Контейнера MongoDB
Щоб зупинити контейнер MongoDB, виконайте наступну команду:
```
bash
Copy code
docker stop my-mongodb-container
```


Крок 6: Перезапуск Контейнера MongoDB та Перевірка Даних
Щоб перезапустити контейнер після перезавантаження комп'ютера та перевірити, що дані в базі збереглись, виконайте наступні кроки:

Запустіть контейнер, як було описано у Кроці 4.

Підключіться до бази даних, як описано у Кроці 2.

Зауваження: Дані в базі MongoDB зберігаються в постійному зберіганні, тому вони повинні залишитися доступними після перезапуску контейнера.