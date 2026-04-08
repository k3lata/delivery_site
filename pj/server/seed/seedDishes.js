const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('../models/Dish');

dotenv.config({ path: require('path').join(__dirname, '..', '.env') });

const dishes = [
  { name: 'Пицца Маргарита', cuisine: 'italian', category: 'main', texture: 'light', description: 'Классическая итальянская пицца на тонком тесте с томатным соусом, моцареллой и базиликом.', price: 5200, image: '/assets/italian-pizza.png', ingredients: ['тесто', 'томатный соус', 'моцарелла', 'базилик'] },
  { name: 'Паста Карбонара', cuisine: 'italian', category: 'main', texture: 'hearty', description: 'Сытная паста с яйцом, гуанчале, пармезаном и чёрным перцем.', price: 5400, image: '/assets/italian-carbonara.png', ingredients: ['паста', 'яйца', 'гуанчале', 'пармезан', 'перец'] },
  { name: 'Тирамису', cuisine: 'italian', category: 'dessert', texture: 'light', description: 'Нежный кофейный десерт из савоярди, маскарпоне и какао.', price: 3200, image: '/assets/italian-tiramisu.png', ingredients: ['савоярди', 'кофе', 'маскарпоне', 'какао'] },
  { name: 'Панна котта', cuisine: 'italian', category: 'dessert', texture: 'light', description: 'Мягкий сливочный десерт с ванилью.', price: 3000, image: '/assets/italian-panna-cotta.png', ingredients: ['сливки', 'сахар', 'желатин', 'ваниль'] },
  { name: 'Эспрессо', cuisine: 'italian', category: 'drink', texture: 'liquid', description: 'Крепкий итальянский кофе с насыщенным ароматом.', price: 1700, image: '/assets/italian-espresso.png', ingredients: ['молотый кофе', 'вода'] },

  { name: 'Круассан', cuisine: 'french', category: 'main', texture: 'light', description: 'Воздушный слоёный круассан с ярким сливочным вкусом.', price: 2400, image: '/assets/french-croissant.png', ingredients: ['слоёное тесто', 'масло'] },
  { name: 'Рататуй', cuisine: 'french', category: 'main', texture: 'light', description: 'Ароматные запечённые овощи по-французски в томатной основе.', price: 4300, image: '/assets/french-ratatouille.png', ingredients: ['баклажаны', 'кабачки', 'томаты', 'перец'] },
  { name: 'Луковый суп', cuisine: 'french', category: 'liquid', texture: 'hearty', description: 'Насыщенный суп с луком, бульоном, хлебом и расплавленным сыром.', price: 3900, image: '/assets/french-onion-soup.png', ingredients: ['лук', 'бульон', 'сыр', 'хлеб'] },
  { name: 'Крем-брюле', cuisine: 'french', category: 'dessert', texture: 'light', description: 'Нежный ванильный крем с тонкой карамельной корочкой.', price: 3100, image: '/assets/french-creme-brulee.png', ingredients: ['сливки', 'яйца', 'сахар', 'ваниль'] },
  { name: 'Горячий шоколад', cuisine: 'french', category: 'drink', texture: 'liquid', description: 'Плотный горячий шоколад с мягкой сладостью.', price: 2200, image: '/assets/french-hot-chocolate.png', ingredients: ['молоко', 'тёмный шоколад', 'сахар'] },

  { name: 'Хачапури по-аджарски', cuisine: 'georgian', category: 'main', texture: 'hearty', description: 'Лодочка из теста с сыром, яйцом и сливочным маслом.', price: 5200, image: '/assets/georgian-khachapuri.png', ingredients: ['тесто', 'сыр', 'яйцо', 'масло'] },
  { name: 'Хинкали', cuisine: 'georgian', category: 'main', texture: 'hearty', description: 'Сочные грузинские хинкали с мясом, бульоном и специями.', price: 4700, image: '/assets/georgian-khinkali.png', ingredients: ['тесто', 'мясо', 'бульон', 'специи'] },
  { name: 'Лобио', cuisine: 'georgian', category: 'main', texture: 'light', description: 'Пряная фасоль с луком и грузинскими специями.', price: 3500, image: '/assets/georgian-lobio.png', ingredients: ['фасоль', 'лук', 'специи'] },
  { name: 'Пеламуши', cuisine: 'georgian', category: 'dessert', texture: 'light', description: 'Традиционный десерт на виноградном соке.', price: 2600, image: '/assets/georgian-pelamushi.png', ingredients: ['виноградный сок', 'мука'] },
  { name: 'Тархун', cuisine: 'georgian', category: 'drink', texture: 'liquid', description: 'Освежающий напиток с эстрагоном.', price: 1800, image: '/assets/georgian-tarkhun.png', ingredients: ['эстрагон', 'сахар', 'вода'] },

  { name: 'Кимбап', cuisine: 'korean', category: 'main', texture: 'light', description: 'Роллы из риса, нори и начинки с овощами и мясом или тунцом.', price: 3900, image: '/assets/korean-kimbap.png', ingredients: ['рис', 'нори', 'овощи', 'яйцо', 'мясо/тунец'] },
  { name: 'Пибимпап', cuisine: 'korean', category: 'main', texture: 'hearty', description: 'Рис с овощами, мясом, яйцом и ярким соусом.', price: 4900, image: '/assets/korean-bibimbap.png', ingredients: ['рис', 'овощи', 'мясо', 'яйцо', 'соус'] },
  { name: 'Ттокпокки', cuisine: 'korean', category: 'main', texture: 'hearty', description: 'Рисовые палочки в остром корейском соусе.', price: 4100, image: '/assets/korean-tteokbokki.png', ingredients: ['рисовые палочки', 'острый соус'] },
  { name: 'Корейская жареная курица', cuisine: 'korean', category: 'main', texture: 'hearty', description: 'Хрустящая курица в насыщенном корейском соусе.', price: 5300, image: '/assets/korean-fried-chicken.png', ingredients: ['курица', 'соус'] },
  { name: 'Кимчи', cuisine: 'korean', category: 'main', texture: 'light', description: 'Ферментированная капуста с острыми специями.', price: 2400, image: '/assets/korean-kimchi.png', ingredients: ['ферментированная капуста', 'специи'] },

  { name: 'Греческий салат', cuisine: 'greek', category: 'main', texture: 'light', description: 'Свежий салат с фетой, овощами и оливками.', price: 3600, image: '/assets/greek-salad-page.png', ingredients: ['помидоры', 'огурцы', 'фета', 'оливки'] },
  { name: 'Мусака', cuisine: 'greek', category: 'main', texture: 'hearty', description: 'Слоёная запеканка с баклажанами, фаршем и соусом бешамель.', price: 5200, image: '/assets/greek-moussaka-page.png', ingredients: ['баклажаны', 'фарш', 'соус бешамель'] },
  { name: 'Долмадес', cuisine: 'greek', category: 'main', texture: 'light', description: 'Виноградные листья с рисом, мясом и специями.', price: 4100, image: '/assets/greek-dolma-page.png', ingredients: ['виноградные листья', 'рис', 'мясо', 'специи'] },
  { name: 'Пахлава', cuisine: 'greek', category: 'dessert', texture: 'hearty', description: 'Слоёный десерт с орехами и мёдом.', price: 2900, image: '/assets/greek-baklava-page.png', ingredients: ['тесто', 'орехи', 'мёд'] },
  { name: 'Греческий кофе', cuisine: 'greek', category: 'drink', texture: 'liquid', description: 'Крепкий традиционный кофе по-гречески.', price: 1700, image: '/assets/greek-coffee-page.png', ingredients: ['кофе', 'вода'] },

  { name: 'Суши', cuisine: 'japanese', category: 'main', texture: 'light', description: 'Японские суши с рисом, рыбой и водорослями.', price: 5200, image: '/assets/japanese-sushi.png', ingredients: ['рис', 'рыба', 'водоросли'] },
  { name: 'Рамен', cuisine: 'japanese', category: 'liquid', texture: 'hearty', description: 'Горячий бульон с лапшой, мясом и яйцом.', price: 4800, image: '/assets/japanese-ramen.png', ingredients: ['бульон', 'лапша', 'мясо', 'яйцо'] },
  { name: 'Темпура', cuisine: 'japanese', category: 'main', texture: 'light', description: 'Овощи и морепродукты в лёгком хрустящем кляре.', price: 4500, image: '/assets/japanese-tempura.png', ingredients: ['морепродукты/овощи', 'кляр'] },
  { name: 'Моти', cuisine: 'japanese', category: 'dessert', texture: 'light', description: 'Мягкий десерт из рисовой муки с начинкой.', price: 3000, image: '/assets/japanese-mochi.png', ingredients: ['рисовая мука', 'начинка анко'] },
  { name: 'Матча', cuisine: 'japanese', category: 'drink', texture: 'liquid', description: 'Традиционный напиток из зелёного чая матча.', price: 2200, image: '/assets/japanese-matcha.png', ingredients: ['зелёный чай'] },

  { name: 'Утка по-пекински', cuisine: 'chinese', category: 'main', texture: 'hearty', description: 'Знаменитое китайское блюдо с соусом хойсин и блинчиками.', price: 6200, image: '/assets/chinese-peking-duck.png', ingredients: ['утка', 'соус хойсин', 'блинчики'] },
  { name: 'Кунг Пао', cuisine: 'chinese', category: 'main', texture: 'hearty', description: 'Курица с арахисом, перцем и насыщенным соусом.', price: 5100, image: '/assets/chinese-kung-pao.png', ingredients: ['курица', 'арахис', 'перец', 'соус'] },
  { name: 'Жареный рис', cuisine: 'chinese', category: 'main', texture: 'light', description: 'Рис с яйцом, овощами и соевым соусом.', price: 3900, image: '/assets/chinese-fried-rice.png', ingredients: ['рис', 'яйцо', 'овощи', 'соевый соус'] },
  { name: 'Спринг-роллы', cuisine: 'chinese', category: 'main', texture: 'light', description: 'Хрустящие роллы с овощной или мясной начинкой.', price: 3400, image: '/assets/chinese-spring-rolls.png', ingredients: ['тесто', 'овощи/мясо'] },
  { name: 'Бабл-ти', cuisine: 'chinese', category: 'drink', texture: 'liquid', description: 'Чай с молоком и тапиокой. Можно сделать клубничный, карамельный, голубичный или молочный вкус.', price: 2600, image: '/assets/chinese-bubble-tea.png', ingredients: ['чай', 'молоко', 'тапиока'] },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Dish.deleteMany();
    await Dish.insertMany(dishes);
    console.log(`Добавлено блюд: ${dishes.length}`);
    process.exit(0);
  } catch (error) {
    console.error('Ошибка seed:', error);
    process.exit(1);
  }
}

seed();
