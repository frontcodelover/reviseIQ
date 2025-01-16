export const EndCard = ({ onRestart }: { onRestart: () => void }) => (
  <div className="min-h-[60vh] w-[calc(100%-10vw)]">
    <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-white p-6 shadow">
      <h3 className="mb-6 text-xl font-bold">Félicitations !</h3>
      <p className="mb-8 text-center text-lg">Vous avez terminé toutes les flashcards</p>
      <button
        onClick={onRestart}
        className="rounded-lg bg-blue-500 px-6 py-3 text-white transition-colors hover:bg-blue-600"
      >
        Recommencer
      </button>
    </div>
  </div>
);
