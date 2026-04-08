export const cuisines = [
  {
    id: 'italian',
    title: 'Italy',
    label: 'Итальянская',
    cupImage: '/assets/italian-cup.png',
    tileImage: '/assets/italian-tile-page.jpg',
    theme: '#d8c1aa',
  },
  {
    id: 'french',
    title: 'France',
    label: 'Французская',
    cupImage: '/assets/french-cup.png',
    tileImage: '/assets/french-tile-page.jpg',
    theme: '#d8c8b5',
  },
  {
    id: 'georgian',
    title: 'Georgia',
    label: 'Грузинская',
    cupImage: '/assets/georgian-cup.png',
    tileImage: '/assets/georgian-tile-page.jpg',
    theme: '#d2b89c',
  },
  {
    id: 'korean',
    title: 'Korea',
    label: 'Корейская',
    cupImage: '/assets/korean-cup.png',
    tileImage: '/assets/korean-tile-page.jpg',
    theme: '#d8c4bb',
  },
  {
    id: 'greek',
    title: 'Greece',
    label: 'Греческая',
    cupImage: '/assets/greek-cup.png',
    tileImage: '/assets/greek-tile-page.jpg',
    theme: '#d1ddd8',
  },
  {
    id: 'japanese',
    title: 'Japan',
    label: 'Японская',
    cupImage: '/assets/japanese-cup.png',
    tileImage: '/assets/japanese-tile-page.jpg',
    theme: '#d9e0cf',
  },
  {
    id: 'chinese',
    title: 'China',
    label: 'Китайская',
    cupImage: '/assets/chinese-cup.png',
    tileImage: '/assets/chinese-tile-page.jpg',
    theme: '#d2c0b4',
  },
];

export const dishes = [
  {
    _id: 'italian-1', cuisine: 'italian', name: 'Пицца Маргарита', price: 5200, category: 'main', texture: 'light',
    description: 'Классическая итальянская пицца на тонком тесте с томатным соусом, моцареллой и базиликом.',
    ingredients: ['тесто', 'томатный соус', 'моцарелла', 'базилик'], image: '/assets/italian-pizza.png'
  },
  {
    _id: 'italian-2', cuisine: 'italian', name: 'Паста Карбонара', price: 5400, category: 'main', texture: 'hearty',
    description: 'Сытная паста с яйцом, гуанчале, пармезаном и чёрным перцем.',
    ingredients: ['паста', 'яйца', 'гуанчале', 'пармезан', 'перец'], image: '/assets/italian-carbonara.png'
  },
  {
    _id: 'italian-3', cuisine: 'italian', name: 'Тирамису', price: 3200, category: 'dessert', texture: 'light',
    description: 'Нежный кофейный десерт из савоярди, маскарпоне и какао.',
    ingredients: ['савоярди', 'кофе', 'маскарпоне', 'какао'], image: '/assets/italian-tiramisu.png'
  },
  {
    _id: 'italian-4', cuisine: 'italian', name: 'Панна котта', price: 3000, category: 'dessert', texture: 'light',
    description: 'Мягкий сливочный десерт с ванилью.',
    ingredients: ['сливки', 'сахар', 'желатин', 'ваниль'], image: '/assets/italian-panna-cotta.png'
  },
  {
    _id: 'italian-5', cuisine: 'italian', name: 'Эспрессо', price: 1700, category: 'drink', texture: 'liquid',
    description: 'Крепкий итальянский кофе с насыщенным ароматом.',
    ingredients: ['молотый кофе', 'вода'], image: '/assets/italian-espresso.png'
  },

  {
    _id: 'french-1', cuisine: 'french', name: 'Круассан', price: 2400, category: 'main', texture: 'light',
    description: 'Воздушный слоёный круассан с ярким сливочным вкусом.',
    ingredients: ['слоёное тесто', 'масло'], image: '/assets/french-croissant.png'
  },
  {
    _id: 'french-2', cuisine: 'french', name: 'Рататуй', price: 4300, category: 'main', texture: 'light',
    description: 'Ароматные запечённые овощи по-французски в томатной основе.',
    ingredients: ['баклажаны', 'кабачки', 'томаты', 'перец'], image: '/assets/french-ratatouille.png'
  },
  {
    _id: 'french-3', cuisine: 'french', name: 'Луковый суп', price: 3900, category: 'liquid', texture: 'hearty',
    description: 'Насыщенный суп с луком, бульоном, хлебом и расплавленным сыром.',
    ingredients: ['лук', 'бульон', 'сыр', 'хлеб'], image: '/assets/french-onion-soup.png'
  },
  {
    _id: 'french-4', cuisine: 'french', name: 'Крем-брюле', price: 3100, category: 'dessert', texture: 'light',
    description: 'Нежный ванильный крем с тонкой карамельной корочкой.',
    ingredients: ['сливки', 'яйца', 'сахар', 'ваниль'], image: '/assets/french-creme-brulee.png'
  },
  {
    _id: 'french-5', cuisine: 'french', name: 'Горячий шоколад', price: 2200, category: 'drink', texture: 'liquid',
    description: 'Плотный горячий шоколад с мягкой сладостью.',
    ingredients: ['молоко', 'тёмный шоколад', 'сахар'], image: '/assets/french-hot-chocolate.png'
  },

  {
    _id: 'georgian-1', cuisine: 'georgian', name: 'Хачапури по-аджарски', price: 5200, category: 'main', texture: 'hearty',
    description: 'Лодочка из теста с сыром, яйцом и сливочным маслом.',
    ingredients: ['тесто', 'сыр', 'яйцо', 'масло'], image: '/assets/georgian-khachapuri.png'
  },
  {
    _id: 'georgian-2', cuisine: 'georgian', name: 'Хинкали', price: 4700, category: 'main', texture: 'hearty',
    description: 'Сочные грузинские хинкали с мясом, бульоном и специями.',
    ingredients: ['тесто', 'мясо', 'бульон', 'специи'], image: '/assets/georgian-khinkali.png'
  },
  {
    _id: 'georgian-3', cuisine: 'georgian', name: 'Лобио', price: 3500, category: 'main', texture: 'light',
    description: 'Пряная фасоль с луком и грузинскими специями.',
    ingredients: ['фасоль', 'лук', 'специи'], image: '/assets/georgian-lobio.png'
  },
  {
    _id: 'georgian-4', cuisine: 'georgian', name: 'Пеламуши', price: 2600, category: 'dessert', texture: 'light',
    description: 'Традиционный десерт на виноградном соке.',
    ingredients: ['виноградный сок', 'мука'], image: '/assets/georgian-pelamushi.png'
  },
  {
    _id: 'georgian-5', cuisine: 'georgian', name: 'Тархун', price: 1800, category: 'drink', texture: 'liquid',
    description: 'Освежающий напиток с эстрагоном.',
    ingredients: ['эстрагон', 'сахар', 'вода'], image: '/assets/georgian-tarkhun.png'
  },

  {
    _id: 'korean-1', cuisine: 'korean', name: 'Кимбап', price: 3900, category: 'main', texture: 'light',
    description: 'Роллы из риса, нори и начинки с овощами и мясом или тунцом.',
    ingredients: ['рис', 'нори', 'овощи', 'яйцо', 'мясо/тунец'], image: '/assets/korean-kimbap.png'
  },
  {
    _id: 'korean-2', cuisine: 'korean', name: 'Пибимпап', price: 4900, category: 'main', texture: 'hearty',
    description: 'Рис с овощами, мясом, яйцом и ярким соусом.',
    ingredients: ['рис', 'овощи', 'мясо', 'яйцо', 'соус'], image: '/assets/korean-bibimbap.png'
  },
  {
    _id: 'korean-3', cuisine: 'korean', name: 'Ттокпокки', price: 4100, category: 'main', texture: 'hearty',
    description: 'Рисовые палочки в остром корейском соусе.',
    ingredients: ['рисовые палочки', 'острый соус'], image: '/assets/korean-tteokbokki.png'
  },
  {
    _id: 'korean-4', cuisine: 'korean', name: 'Корейская жареная курица', price: 5300, category: 'main', texture: 'hearty',
    description: 'Хрустящая курица в насыщенном корейском соусе.',
    ingredients: ['курица', 'соус'], image: '/assets/korean-fried-chicken.png'
  },
  {
    _id: 'korean-5', cuisine: 'korean', name: 'Кимчи', price: 2400, category: 'main', texture: 'light',
    description: 'Ферментированная капуста с острыми специями.',
    ingredients: ['ферментированная капуста', 'специи'], image: '/assets/korean-kimchi.png'
  },

  {
    _id: 'greek-1', cuisine: 'greek', name: 'Греческий салат', price: 3600, category: 'main', texture: 'light',
    description: 'Свежий салат с фетой, овощами и оливками.',
    ingredients: ['помидоры', 'огурцы', 'фета', 'оливки'], image: '/assets/greek-salad-page.png'
  },
  {
    _id: 'greek-2', cuisine: 'greek', name: 'Мусака', price: 5200, category: 'main', texture: 'hearty',
    description: 'Слоёная запеканка с баклажанами, фаршем и соусом бешамель.',
    ingredients: ['баклажаны', 'фарш', 'соус бешамель'], image: '/assets/greek-moussaka-page.png'
  },
  {
    _id: 'greek-3', cuisine: 'greek', name: 'Долмадес', price: 4100, category: 'main', texture: 'light',
    description: 'Виноградные листья с рисом, мясом и специями.',
    ingredients: ['виноградные листья', 'рис', 'мясо', 'специи'], image: '/assets/greek-dolma-page.png'
  },
  {
    _id: 'greek-4', cuisine: 'greek', name: 'Пахлава', price: 2900, category: 'dessert', texture: 'hearty',
    description: 'Слоёный десерт с орехами и мёдом.',
    ingredients: ['тесто', 'орехи', 'мёд'], image: '/assets/greek-baklava-page.png'
  },
  {
    _id: 'greek-5', cuisine: 'greek', name: 'Греческий кофе', price: 1700, category: 'drink', texture: 'liquid',
    description: 'Крепкий традиционный кофе по-гречески.',
    ingredients: ['кофе', 'вода'], image: '/assets/greek-coffee-page.png'
  },

  {
    _id: 'japanese-1', cuisine: 'japanese', name: 'Суши', price: 5200, category: 'main', texture: 'light',
    description: 'Японские суши с рисом, рыбой и водорослями.',
    ingredients: ['рис', 'рыба', 'водоросли'], image: '/assets/japanese-sushi.png'
  },
  {
    _id: 'japanese-2', cuisine: 'japanese', name: 'Рамен', price: 4800, category: 'liquid', texture: 'hearty',
    description: 'Горячий бульон с лапшой, мясом и яйцом.',
    ingredients: ['бульон', 'лапша', 'мясо', 'яйцо'], image: '/assets/japanese-ramen.png'
  },
  {
    _id: 'japanese-3', cuisine: 'japanese', name: 'Темпура', price: 4500, category: 'main', texture: 'light',
    description: 'Овощи и морепродукты в лёгком хрустящем кляре.',
    ingredients: ['морепродукты/овощи', 'кляр'], image: '/assets/japanese-tempura.png'
  },
  {
    _id: 'japanese-4', cuisine: 'japanese', name: 'Моти', price: 3000, category: 'dessert', texture: 'light',
    description: 'Мягкий десерт из рисовой муки с начинкой.',
    ingredients: ['рисовая мука', 'начинка анко'], image: '/assets/japanese-mochi.png'
  },
  {
    _id: 'japanese-5', cuisine: 'japanese', name: 'Матча', price: 2200, category: 'drink', texture: 'liquid',
    description: 'Традиционный напиток из зелёного чая матча.',
    ingredients: ['зелёный чай'], image: '/assets/japanese-matcha.png'
  },

  {
    _id: 'chinese-1', cuisine: 'chinese', name: 'Утка по-пекински', price: 6200, category: 'main', texture: 'hearty',
    description: 'Знаменитое китайское блюдо с соусом хойсин и блинчиками.',
    ingredients: ['утка', 'соус хойсин', 'блинчики'], image: '/assets/chinese-peking-duck.png'
  },
  {
    _id: 'chinese-2', cuisine: 'chinese', name: 'Кунг Пао', price: 5100, category: 'main', texture: 'hearty',
    description: 'Курица с арахисом, перцем и насыщенным соусом.',
    ingredients: ['курица', 'арахис', 'перец', 'соус'], image: '/assets/chinese-kung-pao.png'
  },
  {
    _id: 'chinese-3', cuisine: 'chinese', name: 'Жареный рис', price: 3900, category: 'main', texture: 'light',
    description: 'Рис с яйцом, овощами и соевым соусом.',
    ingredients: ['рис', 'яйцо', 'овощи', 'соевый соус'], image: '/assets/chinese-fried-rice.png'
  },
  {
    _id: 'chinese-4', cuisine: 'chinese', name: 'Спринг-роллы', price: 3400, category: 'main', texture: 'light',
    description: 'Хрустящие роллы с овощной или мясной начинкой.',
    ingredients: ['тесто', 'овощи/мясо'], image: '/assets/chinese-spring-rolls.png'
  },
  {
    _id: 'chinese-5', cuisine: 'chinese', name: 'Бабл-ти', price: 2600, category: 'drink', texture: 'liquid',
    description: 'Чай с молоком и тапиокой. Можно сделать клубничный, карамельный, голубичный или молочный вкус.',
    ingredients: ['чай', 'молоко', 'тапиока'], image: '/assets/chinese-bubble-tea.png'
  },
];

export function getCuisineById(cuisineId) {
  return cuisines.find((item) => item.id === cuisineId);
}

export function getDishesByCuisine(cuisineId) {
  return dishes.filter((dish) => dish.cuisine === cuisineId);
}
