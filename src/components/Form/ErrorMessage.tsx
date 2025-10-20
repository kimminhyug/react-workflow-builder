interface IErrorMessageProps {
  message: string;
}
export const ErrorMessage = ({ message }: IErrorMessageProps) => {
  return <span style={{ color: '#ff5555', fontSize: 12 }}>{message}</span>;
};
