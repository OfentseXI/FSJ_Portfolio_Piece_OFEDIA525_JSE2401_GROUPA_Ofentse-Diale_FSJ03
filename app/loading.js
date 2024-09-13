/**
 * Loading component to display a spinner while data is being fetched or the page is loading.
 * 
 * This component renders a centered loading spinner that animates using Tailwind CSS utilities.
 * It is designed to fill the screen and center the spinner both vertically and horizontally.
 *
 * @returns {JSX.Element} The rendered loading spinner component.
 */
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}
