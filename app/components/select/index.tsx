import ReactSelect from 'react-select';

interface ISelectProps {
  isMulti?: boolean
  label: string
  name: string
  onChange: (any) => void,
  options: Array<{ value: string, label: string }>
}

const Select = ({ name, label, options, onChange, isMulti = false }: ISelectProps) => {
  return (
    <>
      <label htmlFor={name} className="block mb-2">{label}</label>

      <ReactSelect
        id={name}
        instanceId={name}
        isMulti={isMulti}
        name={name}
        onChange={e => onChange(e)}
        options={options}
        placeholder="Selecione..."
        isClearable={true}
        data-testid="select"
      />
    </>
  )
}

export default Select;