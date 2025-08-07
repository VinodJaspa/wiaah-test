import { useFormikContext } from 'formik';

const memberTypes = ["Owner", "Executive", "Representative", "Director"];

export function MemberTypeCheckboxes({ name = "members[0].memberType" }) {
  const { values, setFieldValue } = useFormikContext<any>();
  const selected = values.members?.[0]?.memberType || [];

  const handleChange = (type: string) => {
    const newSelected = selected.includes(type)
      ? selected.filter((t: string) => t !== type)
      : [...selected, type];

    setFieldValue(name, newSelected);
  };

  return (
    <div className="flex gap-4 flex-wrap space-y-1">

      {memberTypes.map((type) => {
        const isChecked = selected.includes(type);
        return (
          <label
            key={type}
            className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition ${
              isChecked ? 'text-black' : 'bg-gray-100'
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={type}
              checked={isChecked}
              onChange={() => handleChange(type)}
              className="accent-black"
            />
            {type}
          </label>
        );
      })}
    </div>

  );
}
export * from "./Index";