interface SessionStatsProps {
  total: number;
  reviewed: number;
  currentStreak: number;
}

export function SessionStats({ total, reviewed, currentStreak }: SessionStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-lg bg-muted p-3 text-center">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="rounded-lg bg-muted p-3 text-center">
        <p className="text-sm text-muted-foreground">Révisées</p>
        <p className="text-2xl font-bold">{reviewed}</p>
      </div>
      <div className="rounded-lg bg-muted p-3 text-center">
        <p className="text-sm text-muted-foreground">Série</p>
        <p className="text-2xl font-bold">{currentStreak} 🔥</p>
      </div>
    </div>
  );
}
