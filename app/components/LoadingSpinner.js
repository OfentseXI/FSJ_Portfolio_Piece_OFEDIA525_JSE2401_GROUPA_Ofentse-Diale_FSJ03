/**
 * Loading state to display a spinner while content is loading.
 *
 * @returns {JSX.Element} The rendered loading state.
 */
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
