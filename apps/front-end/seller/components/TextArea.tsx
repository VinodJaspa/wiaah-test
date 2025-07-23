interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
  }
  
  export default function TextArea({ label, ...props }: TextAreaProps) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-900">{label}</label>
        <textarea
          {...props}
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
        />
      </div>
    );
  }
  