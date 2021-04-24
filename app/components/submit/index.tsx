interface ISubmitProps {
  children: any,
  disabled: boolean
}

const Submit = ({ children, disabled }: ISubmitProps) => {
  return (
    <button
      className="w-full p-2 bg-blue-500 text-white rounded"
      disabled={disabled}
      type="submit"
      data-testid="submit"
    >
      {children}
    </button>
  )
}

export default Submit;