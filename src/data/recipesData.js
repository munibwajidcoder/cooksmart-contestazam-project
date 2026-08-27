import { pakistaniRecipes } from './pakistaniRecipes.js';

export const categoriesData = [
  {
    id: 'breakfast',
    name: 'Breakfast',
    recipesCount: 12,
    image: '/images/cat_breakfast_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    badge: '12 recipes',
  },
  {
    id: 'lunch',
    name: 'Lunch',
    recipesCount: 12,
    image: '/images/cat_lunch_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    badge: '12 recipes',
  },
  {
    id: 'dinner',
    name: 'Dinner',
    recipesCount: 12,
    image: '/images/cat_dinner_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    badge: '12 recipes',
  },
  {
    id: 'snacks',
    name: 'Snacks',
    recipesCount: 12,
    image: '/images/cat_snacks_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    badge: '12 recipes',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    recipesCount: 12,
    image: '/images/cat_desserts_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    badge: '12 recipes',
  },
];

export const popularRecipes = [
  {
    id: 'chicken-biryani',
    name: 'Authentic Chicken Biryani',
    time: '45 min',
    difficulty: 'Medium',
    category: 'Dinner',
    image: '/images/recipe_chicken_biryani_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    calories: '650 kcal',
    protein: '35g',
    carbs: '70g',
    fat: '25g',
    servings: 4,
    rating: 5.0,
    description: 'The king of Pakistani cuisine. Aromatic basmati rice layered with spicy, tender chicken, infused with saffron, mint, and fried onions.',
    ingredients: [
      '500g Basmati rice, soaked',
      '750g Chicken, bone-in',
      '2 large onions, thinly sliced and fried',
      '1/2 cup yogurt',
      '2 tbsp ginger garlic paste',
      'Whole spices (cloves, cardamom, cinnamon)',
      'Fresh mint and coriander leaves',
      'Saffron milk & kewra water'
    ],
    steps: [
      { title: 'Marinate Chicken', desc: 'Marinate chicken with yogurt, spices, ginger garlic paste, and half of the fried onions for 30 minutes.' },
      { title: 'Cook Chicken', desc: 'Cook the marinated chicken until tender and oil separates.' },
      { title: 'Boil Rice', desc: 'Boil soaked basmati rice with whole spices until 70% cooked.' },
      { title: 'Layering (Dum)', desc: 'Layer rice over chicken gravy. Top with mint, coriander, saffron milk, and remaining fried onions.' },
      { title: 'Steam', desc: 'Cover tightly and cook on very low heat (dum) for 15 minutes.' }
    ],
    tips: 'Use aged, long-grain basmati rice and don\'t overboil it before the dum phase.'
  },
  {
    id: 'beef-nihari',
    name: 'Traditional Beef Nihari',
    time: '4 hrs',
    difficulty: 'Hard',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8517da1c0?w=800&q=80',
    videoId: 'hjH-Sl-UWPc',
    calories: '750 kcal',
    protein: '45g',
    carbs: '30g',
    fat: '40g',
    servings: 6,
    rating: 4.9,
    description: 'A slow-cooked, rich and spicy beef stew with melt-in-the-mouth meat and a thick, flavorful gravy. Served best with hot naan.',
    ingredients: [
      '1kg Beef shank (bong) with bone marrow',
      '1/2 cup wheat flour (atta)',
      '1 cup ghee or oil',
      '2 tbsp Nihari masala',
      '2 tbsp ginger garlic paste',
      'Garnish: ginger juliennes, green chilies, lemon'
    ],
    steps: [
      { title: 'Sear Meat', desc: 'Heat ghee and sear beef chunks with ginger garlic paste until browned.' },
      { title: 'Add Spices', desc: 'Add Nihari masala and roast well.' },
      { title: 'Slow Cook', desc: 'Add 6 cups of water and slow cook for 3-4 hours until meat is tender.' },
      { title: 'Thicken Gravy', desc: 'Mix wheat flour with water to make a slurry. Gradually stir into boiling gravy to thicken.' },
      { title: 'Tarka (Optional)', desc: 'Top with additional spiced hot ghee and serve with garnishes.' }
    ],
    tips: 'The secret to authentic Nihari is cooking it slowly overnight on low heat with bone marrow (nalli).'
  },
  {
    id: 'chicken-karahi',
    name: 'Peshawari Chicken Karahi',
    time: '35 min',
    difficulty: 'Easy',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80',
    videoId: 'hjH-Sl-UWPc',
    calories: '550 kcal',
    protein: '40g',
    carbs: '15g',
    fat: '35g',
    servings: 4,
    rating: 4.8,
    description: 'A fiery, tomato-based chicken curry cooked in a traditional wok (karahi) with fresh ginger, garlic, and green chilies.',
    ingredients: [
      '800g Chicken, curry cut',
      '5 large tomatoes, halved',
      '1/2 cup oil or ghee',
      '1 tbsp ginger garlic paste',
      '1 tsp coarsely ground black pepper',
      '1 tsp cumin & coriander powder',
      'Fresh green chilies & julienned ginger'
    ],
    steps: [
      { title: 'Fry Chicken', desc: 'Fry chicken in hot oil on high heat until it changes color.' },
      { title: 'Add Tomatoes', desc: 'Add tomato halves face down, cover and cook for 10 mins.' },
      { title: 'Peel Tomatoes', desc: 'Remove tomato skins and mash the pulp into a gravy.' },
      { title: 'Bhunai (Roasting)', desc: 'Add spices and cook on high heat until oil separates from the thick masala.' },
      { title: 'Garnish', desc: 'Top with black pepper, fresh ginger, and green chilies. Serve hot.' }
    ],
    tips: 'True Karahi uses no onions. It relies entirely on tomatoes, green chilies, and high-heat cooking.'
  },
  {
    id: 'halwa-puri',
    name: 'Classic Halwa Puri',
    time: '40 min',
    difficulty: 'Medium',
    category: 'Breakfast',
    image: '/images/aloo_paratha_3d.jpg',
    videoId: 'hjH-Sl-UWPc',
    calories: '850 kcal',
    protein: '15g',
    carbs: '110g',
    fat: '45g',
    servings: 4,
    rating: 4.9,
    description: 'The ultimate weekend breakfast. Deep-fried puffed bread (puri) served with sweet semolina halwa and spicy chickpea curry (cholay).',
    ingredients: [
      'For Puri: 2 cups all-purpose flour, water, salt',
      'For Halwa: 1 cup semolina (suji), 1 cup sugar, ghee, cardamom',
      'For Cholay: 2 cups boiled chickpeas, onion-tomato masala',
      'Oil for deep frying'
    ],
    steps: [
      { title: 'Make Cholay', desc: 'Cook boiled chickpeas in a spicy onion-tomato gravy until thick.' },
      { title: 'Prepare Halwa', desc: 'Roast semolina in ghee, add sugar syrup (chashni), and cook until fluffy.' },
      { title: 'Knead Dough', desc: 'Knead a soft dough for puris and let it rest for 15 minutes.' },
      { title: 'Fry Puris', desc: 'Roll out small discs and deep fry in very hot oil until they puff up.' },
      { title: 'Serve', desc: 'Serve piping hot puris immediately with halwa and cholay.' }
    ],
    tips: 'The oil must be smoking hot for the puris to puff up immediately without absorbing too much oil.'
  },
];

export const extraRecipes = [
  {
    id: 'honey-salmon',
    name: 'Honey Glazed Salmon',
    time: '30 min',
    difficulty: 'Medium',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
    videoId: 'hjH-Sl-UWPc',
    calories: '450 kcal',
    protein: '35g',
    carbs: '20g',
    fat: '25g',
    servings: 2,
    description: 'Sweet honey glazed salmon with a hint of garlic.',
    ingredients: [
      '2 salmon fillets',
      '2 tbsp honey',
      '1 tbsp soy sauce',
      '2 cloves garlic, minced',
      '1 tbsp olive oil'
    ],
    steps: [
      { title: 'Prepare glaze', desc: 'Mix honey, soy sauce, and garlic.' },
      { title: 'Sear salmon', desc: 'Heat oil in a pan and sear salmon for 4 mins each side.' },
      { title: 'Glaze', desc: 'Pour glaze over salmon and cook for 1 more minute until sticky.' }
    ],
    tips: 'Ensure the pan is fully hot before searing for a perfectly crispy skin.'
  },
  {
    id: 'beef-stir-fry',
    name: 'Beef Stir-Fry with Vegetables',
    time: '25 min',
    difficulty: 'Medium',
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
    videoId: 'hjH-Sl-UWPc',
    calories: '550 kcal',
    protein: '40g',
    carbs: '30g',
    fat: '25g',
    servings: 3,
    description: 'Juicy beef stir-fried with colorful veggies in a savory sauce.',
    ingredients: [
      '300g beef sirloin, sliced thin',
      '2 cups mixed veggies (broccoli, bell peppers)',
      '2 tbsp soy sauce',
      '1 tbsp oyster sauce',
      '1 tbsp sesame oil'
    ],
    steps: [
      { title: 'Marinate beef', desc: 'Toss beef in soy sauce and let sit for 10 minutes.' },
      { title: 'Stir fry beef', desc: 'Stir fry beef on high heat until browned. Remove from pan.' },
      { title: 'Cook veggies', desc: 'Stir fry veggies for 5 minutes.' },
      { title: 'Combine', desc: 'Add beef back in, add oyster sauce, and toss.' }
    ],
    tips: 'Slice beef against the grain for maximum tenderness.'
  },
  {
    id: 'quinoa-salad',
    name: 'Mediterranean Quinoa Salad',
    time: '20 min',
    difficulty: 'Easy',
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    videoId: 'hjH-Sl-UWPc',
    calories: '320 kcal',
    protein: '12g',
    carbs: '40g',
    fat: '14g',
    servings: 2,
    description: 'Fresh quinoa salad with feta, olives and lemon dressing.',
    ingredients: [
      '1 cup cooked quinoa',
      '1/2 cup cherry tomatoes, halved',
      '1/4 cup kalamata olives',
      '1/4 cup crumbled feta cheese',
      '2 tbsp olive oil & lemon juice'
    ],
    steps: [
      { title: 'Mix ingredients', desc: 'Toss quinoa, tomatoes, olives, and feta in a large bowl.' },
      { title: 'Dress', desc: 'Drizzle with olive oil and lemon juice, and season with salt and pepper.' }
    ],
    tips: 'Let the salad sit in the fridge for 30 minutes before serving so flavors meld.'
  }
];

// Deterministic Fisher-Yates shuffle — same random order every load, truly mixed across all pages
const shuffleRecipes = (recipes) => {
  const arr = [...recipes];
  // Fixed seed value so order is always the same (consistent UX), but looks random to the user
  let seed = 42;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const allRecipes = shuffleRecipes([...popularRecipes, ...extraRecipes, ...pakistaniRecipes]);

export const cookingTipsData = [
  {
    id: 'pasta-tip',
    title: 'How to properly boil pasta every time',
    category: 'Technique',
    image: '/images/cat_dinner_3d.jpg',
    readTime: '3 min read',
    summary: 'The secret to restaurant-quality pasta lies in heavily salting the boiling water (like the sea) and never adding oil to the pot.'
  },
  {
    id: 'knife-skills',
    title: '5 knife skills every home cook should know',
    category: 'Preparation',
    image: '/images/stat_plate_3d.jpg',
    readTime: '4 min read',
    summary: 'Master the claw grip, rock chop, and julienne cut to cut your prep time in half while keeping your fingertips completely safe.'
  },
  {
    id: 'meat-seasoning',
    title: 'The right way to season meat before cooking',
    category: 'Flavor',
    image: '/images/cat_lunch_3d.jpg',
    readTime: '5 min read',
    summary: 'Salting meat at least 40 minutes before cooking allows the salt to draw out moisture, dissolve, and get reabsorbed for deep juiciness.'
  },
];
