interface SpinnerProps {
    size?: number;
  }
  
  const Spinner: React.FC<SpinnerProps> = () => {
    return (
      <div className="flex justify-center items-center py-10 min-h-[80vh]">
        <div
          className={`w-20 h-20 border-4 border-solid border-blue-500 border-t-transparent rounded-full animate-spin`}
        />
      </div>
    );
  };

  export default Spinner;