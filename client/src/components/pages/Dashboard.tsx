import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [topic, setTopic] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState<boolean>(false);
  const [ideaError, setIdeaError] = useState<string>("");

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
      setIdeaError("Please enter a topic to generate ideas.");
      return;
    }

    setLoadingIdeas(true);
    setGeneratedIdeas([]);
    setIdeaError("");

    try {
      let chatHistory = [];
      const prompt = `Generate 5 creative and engaging content ideas (e.g., blog post titles, video topics, article outlines) related to the topic: "${topic}". Provide them as a numbered list.`;
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });

      const payload = { contents: chatHistory };
      const apiKey = ""; // Leave as empty string, Canvas will provide it at runtime
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (
        result.candidates &&
        result.candidates.length > 0 &&
        result.candidates[0].content &&
        result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0
      ) {
        const text = result.candidates[0].content.parts[0].text;
        // Parse the numbered list into an array of strings
        const ideas = text
          .split("\n")
          .filter((line: string) => line.trim().match(/^\d+\./))
          .map((line: string) => line.replace(/^\d+\.\s*/, "").trim());
        setGeneratedIdeas(ideas);
      } else {
        setIdeaError("Failed to generate ideas. Please try again.");
        console.error("Gemini API response structure unexpected:", result);
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
      setIdeaError(
        "An error occurred while generating ideas. Please try again."
      );
    } finally {
      setLoadingIdeas(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-2xl w-full max-w-2xl text-center mb-8">
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome to Your Dashboard!
        </h2>
        {user ? (
          <>
            <p className="text-xl mb-2">
              Hello, <span className="font-semibold">{user.name}</span>!
            </p>
            <p className="text-lg mb-6">Your email: {user.email}</p>
          </>
        ) : (
          <p className="text-lg mb-6">User information not available.</p>
        )}

        <p className="text-md mb-8">
          This is your personalized dashboard. Here you can manage your
          settings, view your content, and access exclusive features.
        </p>

        <button className="bg-white text-purple-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:text-purple-800 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75">
          Logout
        </button>
      </div>

      {/* New LLM Feature: Content Idea Generator */}
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-10 rounded-xl shadow-2xl w-full max-w-2xl text-center">
        <h3 className="text-3xl font-bold mb-6">Content Idea Generator ✨</h3>
        <p className="text-md mb-4">
          Enter a topic and get creative content ideas!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'sustainable living' or 'AI in education'"
            className="w-full sm:w-2/3 px-4 py-2 rounded-md border border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <button
            onClick={handleGenerateIdeas}
            disabled={loadingIdeas}
            className="w-full sm:w-1/3 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loadingIdeas ? "Generating..." : "Generate Ideas ✨"}
          </button>
        </div>

        {ideaError && <p className="text-red-300 text-sm mb-4">{ideaError}</p>}

        {generatedIdeas.length > 0 && (
          <div className="mt-6 text-left bg-white bg-opacity-10 p-6 rounded-lg">
            <h4 className="text-xl font-semibold mb-3">Your Ideas:</h4>
            <ul className="list-disc list-inside space-y-2">
              {generatedIdeas.map((idea, index) => (
                <li key={index} className="text-md">
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
