type Props = {
  message: string;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="error-message" role="alert" aria-live="polite">
      <span className="error-message__icon" aria-hidden="true">
        !
      </span>
      <div className="error-message__content">
        <p className="error-message__title">Щось пішло не так</p>
        <p className="error-message__text">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
