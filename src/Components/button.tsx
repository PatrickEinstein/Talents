interface IButton {
  background: string;
  label: string;
  extra: string;
  onClick: () => void;
}

const Button = ({ background, label, extra }: IButton) => {
  return (
    <div>
      <button className={`h-[50px] ${background} rounded-3xl  ${extra}`}>
        {label}
      </button>
    </div>
  );
};

export default Button;
