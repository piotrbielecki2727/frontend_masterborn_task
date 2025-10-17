export const ErrorAlert = ({ error }: { error: string }) => {
  if (!error) return null;
  return (
    <div className="rounded-md bg-red-50 p-4">
      <p className="text-sm text-red-800">{error}</p>
    </div>
  );
};
