export function SavedBanner({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
      Modifications enregistrées.
    </div>
  );
}
