import "./Loader.css";
type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
