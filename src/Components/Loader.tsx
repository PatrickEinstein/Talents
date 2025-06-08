import { ClipLoader } from "react-spinners";

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <ClipLoader
          color="white"
          loading={isLoading}
          speedMultiplier={0.5}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </section>
    )
  );
};

export default Loader;
