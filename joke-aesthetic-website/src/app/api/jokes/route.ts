import { NextRequest } from 'next/server';

// Define joke type
type Joke = {
  id: number;
  text: string;
  category: string;
};

// Sample jokes database
const jokesDatabase: Joke[] = [
  { id: 1, text: "Why don't scientists trust atoms? Because they make up everything!", category: "Science" },
  { id: 2, text: "What did one ocean say to the other ocean? Nothing, they just waved!", category: "Puns" },
  { id: 3, text: "Why did the scarecrow win an award? He was outstanding in his field!", category: "Puns" },
  { id: 4, text: "I'm reading a book about anti-gravity. It's impossible to put down!", category: "Books" },
  { id: 5, text: "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!", category: "Math" },
  { id: 6, text: "Why don't skeletons fight each other? They don't have the guts!", category: "Halloween" },
  { id: 7, text: "What do you call a fake noodle? An impasta!", category: "Food" },
  { id: 8, text: "How does a penguin build its house? Igloos it together!", category: "Animals" },
  { id: 9, text: "Why did the bicycle fall over? Because it was two tired!", category: "Puns" },
  { id: 10, text: "What do you call a bear with no teeth? A gummy bear!", category: "Animals" },
  { id: 11, text: "Why did the coffee file a police report? It got mugged!", category: "Food" },
  { id: 12, text: "What do you call a factory that makes good products? A satisfactory!", category: "Puns" },
  { id: 13, text: "Why don't eggs tell jokes? They'd crack each other up!", category: "Food" },
  { id: 14, text: "What do you call a fish wearing a crown? King mackerel!", category: "Animals" },
  { id: 15, text: "Why couldn't the leopard play hide and seek? Because he was always spotted!", category: "Animals" },
];

export async function GET(request: NextRequest) {
  // Get search params
  const category = request.nextUrl.searchParams.get('category');
  const countParam = request.nextUrl.searchParams.get('count');
  
  // Parse count with default of 1
  const count = countParam ? parseInt(countParam) || 1 : 1;
  
  // Filter jokes by category if provided
  let filteredJokes = category 
    ? jokesDatabase.filter(joke => joke.category.toLowerCase() === category.toLowerCase())
    : [...jokesDatabase];
  
  // If no jokes match the category, return all jokes
  if (filteredJokes.length === 0) {
    filteredJokes = [...jokesDatabase];
  }
  
  // Randomly select the requested number of jokes
  const selectedJokes: Joke[] = [];
  const jokesCopy = [...filteredJokes];
  
  for (let i = 0; i < Math.min(count, jokesCopy.length); i++) {
    const randomIndex = Math.floor(Math.random() * jokesCopy.length);
    selectedJokes.push(jokesCopy[randomIndex]);
    // Remove the selected joke to avoid duplicates
    jokesCopy.splice(randomIndex, 1);
  }
  
  // If only one joke is requested, return a single joke object
  if (count === 1) {
    return Response.json(selectedJokes[0]);
  }
  
  // Otherwise return an array of jokes
  return Response.json(selectedJokes);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, category = "General" } = body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return Response.json(
        { error: 'Joke text is required and must be a string' },
        { status: 400 }
      );
    }

    // Create new joke
    const newJoke: Joke = {
      id: jokesDatabase.length + 1,
      text,
      category
    };

    // Add to database (in a real app, this would go to a real database)
    jokesDatabase.push(newJoke);

    return Response.json(newJoke, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Failed to add joke' },
      { status: 500 }
    );
  }
}