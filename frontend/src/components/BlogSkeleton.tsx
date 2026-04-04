export const BlogSkeleton = () => {
  return (
    <div className="py-8 border-b border-gray-100">

      {/* Author row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse" />
        <div className="w-20 h-3 rounded bg-gray-100 animate-pulse" />
      </div>

      {/* Title */}
      <div className="w-3/4 h-6 rounded bg-gray-100 animate-pulse mb-3" />

      {/* Content */}
      <div className="space-y-2 mb-4">
        <div className="w-full h-4 rounded bg-gray-100 animate-pulse" />
        <div className="w-5/6 h-4 rounded bg-gray-100 animate-pulse" />
      </div>

      {/* Tag */}
      <div className="w-16 h-5 rounded-full bg-gray-100 animate-pulse" />

    </div>
  );
};