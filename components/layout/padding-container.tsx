interface Props {
  children: React.ReactNode;
}

const PaddingContainer: React.FC<Props> = ({ children }) => {
  return <div className="px-8 w-full max-w-7xl mx-auto">{children}</div>;
};

export default PaddingContainer;
