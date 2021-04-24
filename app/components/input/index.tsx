interface IInputProps {
  label: string
  name: string
  onChange: (any, string) => void
  type: 'text' | 'number'
}

const Input = ({ label, name, type, onChange }: IInputProps) => {
  return (
    <>
      <label htmlFor={name} className="block mb-2">{label}</label>

      <input
        className="w-full p-1.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        data-testid="input"
        id={name}
        name={name}
        onChange={e => onChange(e, name)}
        type={type}
      />
    </>
  )
}

export default Input;