import { Category } from '../../types';

export const foodCategory: Category = {
  id: 'food',
  name: 'Food & Cooking',
  nameHebrew: 'אוכל ובישול',
  icon: '🍕',
  color: 'bg-yellow-500',
  words: [
    { id: 'foo-1', english: 'recipe', hebrew: 'מתכון', emoji: '📜', definition: 'Instructions for making a dish', sentence: 'I followed the ___ step by step' },
    { id: 'foo-2', english: 'ingredient', hebrew: 'מרכיב', emoji: '🥚', definition: 'A food item used in a recipe', sentence: 'The main ___ is tomato sauce' },
    { id: 'foo-3', english: 'snack', hebrew: 'חטיף', emoji: '🍿', definition: 'A small meal between main meals', sentence: 'I brought a ___ for the break' },
    { id: 'foo-4', english: 'flavor', hebrew: 'טעם', emoji: '👅', definition: 'The taste of food or drink', sentence: 'This ice cream has a great ___' },
    { id: 'foo-5', english: 'portion', hebrew: 'מנה', emoji: '🍽️', definition: 'The amount of food served', sentence: 'That ___ was way too big!' },
    { id: 'foo-6', english: 'dessert', hebrew: 'קינוח', emoji: '🍰', definition: 'A sweet dish eaten after a meal', sentence: 'We had chocolate cake for ___' },
    { id: 'foo-7', english: 'appetizer', hebrew: 'מנה ראשונה', emoji: '🥗', definition: 'A small dish served before the main course', sentence: 'The ___ was a delicious salad' },
    { id: 'foo-8', english: 'beverage', hebrew: 'משקה', emoji: '🥤', definition: 'A drink of any type', sentence: 'Would you like a hot or cold ___?' },
    { id: 'foo-9', english: 'utensils', hebrew: 'כלי אוכל', emoji: '🍴', definition: 'Forks, knives, and spoons', sentence: 'Set the ___ on the table please' },
    { id: 'foo-10', english: 'oven', hebrew: 'תנור', emoji: '🔥', definition: 'A machine used for baking or roasting', sentence: 'Preheat the ___ to 180 degrees' },
    { id: 'foo-11', english: 'blender', hebrew: 'בלנדר', emoji: '🫗', definition: 'A machine that mixes food into liquid', sentence: 'Make a smoothie with the ___' },
    { id: 'foo-12', english: 'spicy', hebrew: 'חריף', emoji: '🌶️', definition: 'Having a strong hot taste', sentence: 'This sauce is too ___ for me' },
    { id: 'foo-13', english: 'delicious', hebrew: 'טעים', emoji: '😋', definition: 'Tasting very good', sentence: 'This pizza is ___!' },
    { id: 'foo-14', english: 'leftovers', hebrew: 'שאריות', emoji: '📦', definition: 'Food remaining after a meal', sentence: 'We ate ___ for lunch the next day' },
    { id: 'foo-15', english: 'groceries', hebrew: 'מצרכים', emoji: '🛒', definition: 'Food and supplies bought from a store', sentence: 'Mom went to buy ___ for the week' },
  ],
};
