require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Note = require('./models/Note');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes-manager';

const sampleNotes = [
  {
    title: 'The beginning of screenless design',
    content: "UI jobs to be taken over by Solution Architect and AI systems that intuitively understand user needs without traditional layouts.",
    color: '#fde882'
  },
  {
    title: '13 Things You Should Give Up',
    content: "If You Want To Be a Successful UX Designer: Give up the need for perfection on the first draft, give up ignoring analytics, give up skipping wireframes...",
    color: '#ffb499'
  },
  {
    title: 'The Psychology Principles',
    content: "Every UI/UX Designer Needs to Know. Cognitive load, Hick's Law, Fitts's Law, and how spacing affects user decisions.",
    color: '#d1f3b3'
  },
  {
    title: '10 UI & UX Lessons',
    content: "Lessons from Designing My Own Product. Iteration is key, always test with real users, and dark mode isn't just a color flip.",
    color: '#cbb2ff'
  },
  {
    title: '52 Research Terms',
    content: "You need to know as a UX Designer. Qualitative vs Quantitative, A/B Testing, Card Sorting, Contextual Inquiries...",
    color: '#70dfff'
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    let user = await User.findOne();
    if (!user) {
      user = await User.create({ name: 'Demo User', email: 'demo@demo.com', password: 'password123' });
    }
    
    // Assign user ID to notes
    const notesToInsert = sampleNotes.map(n => ({ ...n, userId: user._id }));
    
    await Note.insertMany(notesToInsert);
    console.log('Sample notes added successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
