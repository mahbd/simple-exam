const Spinner = ({ color }: { color: string }) => {
  return <span className={"loading loading-spinner " + color}></span>;
};

export default Spinner;
