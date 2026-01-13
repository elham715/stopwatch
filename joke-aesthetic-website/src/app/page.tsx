'use client';

import { useState, useEffect } from 'react';

// Type definition for jokes
type Joke = {
  id: number;
  text: string;
  category: string;
};

export default function Home() {
  const [currentJoke, setCurrentJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Joke[]>([]);
  const [showAestheticElements, setShowAestheticElements] = useState<boolean>(true);

  // Function to get a random joke from API
  const getRandomJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/jokes');
      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }
      const joke: Joke = await response.json();
      setCurrentJoke(joke.text);
    } catch (error) {
      console.error('Error fetching joke:', error);
      // Fallback to a default message
      setCurrentJoke("Oops! Couldn't fetch a joke. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // Function to add current joke to favorites
  const addToFavorites = () => {
    if (currentJoke) {
      const newFavorite: Joke = {
        id: Date.now(),
        text: currentJoke,
        category: "User Favorite"
      };
      setFavorites([...favorites, newFavorite]);
    }
  };

  // Function to remove from favorites
  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter(joke => joke.id !== id));
  };

  // Load a sample joke on initial render
  useEffect(() => {
    getRandomJoke();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 md:p-8">
      {/* Aesthetic Background Elements */}
      {showAestheticElements && (
        <>
          <div className="fixed top-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="fixed top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="fixed bottom-20 left-1/3 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </>
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Joke Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover hilarious jokes and enjoy beautiful aesthetics
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Joke Generator Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Random Jokes</h2>
              <button 
                onClick={() => setShowAestheticElements(!showAestheticElements)}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {showAestheticElements ? 'Hide Effects' : 'Show Effects'}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 min-h-48 flex items-center justify-center border border-purple-100 mb-6">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Generating laughter...</p>
                </div>
              ) : currentJoke ? (
                <p className="text-xl text-center text-gray-800 font-medium">{currentJoke}</p>
              ) : (
                <p className="text-gray-500 text-center">Click the button to get a joke!</p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={getRandomJoke}
                disabled={loading}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  loading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? 'Loading...' : 'Generate Joke'}
              </button>
              
              {currentJoke && (
                <button
                  onClick={addToFavorites}
                  className="px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:from-pink-600 hover:to-rose-600 transition-all"
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>

          {/* Favorites Section */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Favorite Jokes</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {favorites.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No favorite jokes yet</p>
                  <p className="text-sm mt-2">Add jokes you like to see them here</p>
                </div>
              ) : (
                favorites.map((joke) => (
                  <div 
                    key={joke.id} 
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 flex justify-between items-start"
                  >
                    <p className="text-gray-800">{joke.text}</p>
                    <button 
                      onClick={() => removeFromFavorites(joke.id)}
                      className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

        {/* Aesthetic Showcase Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Aesthetic Showcase</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-500 rounded-lg mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Joke Generator</h3>
              <p className="text-gray-600">Randomly generated jokes to brighten your day</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-500 rounded-lg mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Favorites</h3>
              <p className="text-gray-600">Save your favorite jokes for later enjoyment</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-500 rounded-lg mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Aesthetics</h3>
              <p className="text-gray-600">Beautiful UI with smooth animations and gradients</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-gray-600 border-t border-gray-200/50">
          <p>Made with ❤️ and lots of laughs</p>
          <p className="text-sm mt-2">© {new Date().getFullYear()} Joke Generator. All rights reserved.</p>
        </footer>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}