import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Creature from './models/Creature.js';

dotenv.config();

const creatures = [
  {
    name: 'Dragon',
    species: 'Reptile',
    habitat: 'Mountains',
    rarity: 'rare',
    description: 'A mythical creature that breathes fire.',
  },
  {
    name: 'Unicorn',
    species: 'Mammal',
    habitat: 'Forests',
    rarity: 'rare',
    description: 'A legendary horse with a single horn on its forehead.',
  },
  {
    name: 'Phoenix',
    species: 'Bird',
    habitat: 'Deserts',
    rarity: 'rare',
    description: 'A mythical bird that regenerates from its ashes.',
  },
];

try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/creatureDB');
    await Creature.deleteMany({});
    await Creature.insertMany(creatures);
    console.log('Database seeded successfully!');
} catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
}finally {
    await mongoose.disconnect();
}