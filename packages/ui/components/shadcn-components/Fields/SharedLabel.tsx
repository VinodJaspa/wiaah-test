const SharedLabel = ({ htmlFor, children }: any) => (
    <label htmlFor={htmlFor} className="text-sm font-medium block mb-1">
      {children}
    </label>
  );
  export default SharedLabel;