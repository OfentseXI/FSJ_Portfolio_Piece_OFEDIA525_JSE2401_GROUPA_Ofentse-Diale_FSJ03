/**
 * LoadingSpinner component to display a spinner while content is loading.
 *
 * @returns {JSX.Element} The rendered loading spinner component.
 */
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
