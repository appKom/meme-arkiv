const MemeCardSkeleton = () => {
  return (
    <article className="flex w-full max-w-4xl flex-col items-center gap-4 border rounded-lg border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-4 py-3 shadow-lg animate-pulse">
      <div className="flex w-full flex-row justify-between px-2">
        <div className="flex flex-row gap-5">
          <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 rounded-lg" />

      <div className="grid w-full grid-cols-2 gap-2 p-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {[...Array(2)].map((_, index) => (
          <div
            key={index}
            className="flex items-center py-2 gap-2 flex-row justify-center rounded-full border border-gray-200 dark:border-gray-700"
          >
            <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-600" />
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    </article>
  );
};

export default MemeCardSkeleton;
