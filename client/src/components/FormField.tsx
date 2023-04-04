type Props = {
  type: string;
  labelName: string;
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
};

const FormField = ({
  type,
  labelName,
  name,
  value,
  placeholder,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}: Props) => {
  return (
    <div className="mb-1 mt-1">
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semi-bold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        required
        type={type}
        value={value}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] block w-full shadow-sm sm:text-sm outline-none p-3 mt-2"
      />
    </div>
  );
};

export default FormField;
