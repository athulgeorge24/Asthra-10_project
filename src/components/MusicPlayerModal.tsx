type Props = {
  mood: string;
  onClose: () => void;
};

const moodToTrack: Record<string, string> = {
  Happy: "4uLU6hMCjMI75M1A2tKUQC",     // Example Spotify track IDs
  Sad: "1301WleyT98MSxVHPZCA6M",
  Relaxed: "0VjIjW4GlUZAMYd2vXMi3b",
  Energetic: "6habFhsOp2NvshLv26DqMb",
  Romantic: "3AJwUDP919kvQ9QcozQPxg",
  Focused: "7qiZfU4dY1lWllzX7mPBI3",
};

export default function MusicPlayerModal({ mood, onClose }: Props) {
  const trackId = moodToTrack[mood] || moodToTrack["Happy"];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Now Playing: {mood}</h2>
        <iframe
          src={`https://open.spotify.com/embed/track/${trackId}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
