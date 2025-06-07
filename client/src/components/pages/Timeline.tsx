import React from "react";

// Interfaces for data types
interface User {
  id: number;
  name: string;
  avatarUrl: string; // URL for the user's profile image
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number; // Links to the User ID
  createdAt: Date;
}

// --- Mock Data ---
// In a real application, this data would be fetched from your backend API
const mockUsers: User[] = [
  {
    id: 1,
    name: "Alice Smith",
    avatarUrl: "https://placehold.co/40x40/ADD8E6/000000?text=AS",
  }, // Light blue background
  {
    id: 2,
    name: "Bob Johnson",
    avatarUrl: "https://placehold.co/40x40/FFB6C1/000000?text=BJ",
  }, // Light pink background
  {
    id: 3,
    name: "Charlie Brown",
    avatarUrl: "https://placehold.co/40x40/90EE90/000000?text=CB",
  }, // Light green background
  {
    id: 4,
    name: "Diana Prince",
    avatarUrl: "https://placehold.co/40x40/FFD700/000000?text=DP",
  }, // Gold background
  {
    id: 5,
    name: "Eve Adams",
    avatarUrl: "https://placehold.co/40x40/FFA07A/000000?text=EA",
  }, // Light salmon background
];

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Exploring New Horizons",
    content:
      "Embarking on new adventures is always a thrilling experience. Every step forward unveils a world of possibilities and growth. Let's embrace the unknown!",
    userId: 1,
    createdAt: new Date("2024-05-01T10:00:00Z"),
  },
  {
    id: 2,
    title: "The Power of Consistency",
    content:
      "Small, consistent efforts accumulate into massive results over time. It's not about perfection, but persistence in the right direction.",
    userId: 2,
    createdAt: new Date("2024-05-02T11:30:00Z"),
  },
  {
    id: 3,
    title: "Mindfulness in Daily Life",
    content:
      "Integrating mindfulness into everyday activities can significantly reduce stress and improve focus. Even a few minutes a day can make a difference.",
    userId: 1,
    createdAt: new Date("2024-05-03T14:00:00Z"),
  },
  {
    id: 4,
    title: "Recipe: Delicious Vegan Burgers",
    content:
      "Tried a new plant-based burger recipe today. It was incredibly flavorful and satisfying! Highly recommend trying it out.",
    userId: 3,
    createdAt: new Date("2024-05-04T16:45:00Z"),
  },
  {
    id: 5,
    title: "Reflections on Learning",
    content:
      "The journey of continuous learning is endless and rewarding. Every new piece of knowledge opens up more doors and perspectives.",
    userId: 4,
    createdAt: new Date("2024-05-05T09:00:00Z"),
  },
  {
    id: 6,
    title: "Fitness Journey Updates",
    content:
      "Reached a new personal best in my workout routine this week! Consistency and dedication are key to achieving fitness goals.",
    userId: 2,
    createdAt: new Date("2024-05-06T07:15:00Z"),
  },
  {
    id: 7,
    title: "A Guide to Better Sleep",
    content:
      "Prioritizing sleep is crucial for overall well-being. Simple habits like a consistent schedule and a dark room can make a huge impact.",
    userId: 5,
    createdAt: new Date("2024-05-07T13:00:00Z"),
  },
  {
    id: 8,
    title: "Creative Writing Prompts",
    content:
      "Feeling stuck? Here are some prompts to spark your imagination and get your creative juices flowing. Let your words paint a picture!",
    userId: 3,
    createdAt: new Date("2024-05-08T18:00:00Z"),
  },
  {
    id: 9,
    title: "The Importance of Digital Detox",
    content:
      "Taking breaks from screens can improve mental clarity and presence. Disconnect to reconnect with yourself and your surroundings.",
    userId: 1,
    createdAt: new Date("2024-05-09T10:30:00Z"),
  },
  {
    id: 10,
    title: "Future of Sustainable Energy",
    content:
      "Innovations in renewable energy are shaping a greener future. It's exciting to see the progress being made in this critical area.",
    userId: 4,
    createdAt: new Date("2024-05-10T12:00:00Z"),
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">Latest Posts</h3>
      <div className="grid grid-cols-1 gap-6">
        {mockPosts.map((post) => {
          const author = mockUsers.find((user) => user.id === post.userId);
          const formattedDate = new Date(post.createdAt).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return (
            <div
              key={post.id}
              className="bg-white mb-3  p-6 rounded-lg shadow-md max-w-xl mx-auto w-full" // Solid white background, center align
            >
              {author && (
                <div className="flex items-center mb-4">
                  {" "}
                  {/* Horizontal layout for user details */}
                  <img
                    src={author.avatarUrl}
                    alt={author.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover mr-3" // Slightly smaller, less border
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/48x48/CCCCCC/000000?text=${author.name
                        .charAt(0)
                        .toUpperCase()}`;
                    }} // Fallback
                  />
                  <div>
                    <span className="font-semibold text-gray-800 text-lg">
                      {author.name}
                    </span>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                  </div>
                </div>
              )}
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h4>
              <p className="text-gray-700 text-base">{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
