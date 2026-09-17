type ButtonType = {
  title: string;
  variant?: "default" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ title, variant = "default", ...props }: ButtonType) => {
  const buttonVariant = () => {
    if (variant === "default") {
      return "w-full cursor-pointer rounded-md border-2 border-green-700 bg-green-700 py-2 text-sm font-bold text-white";
    } else if (variant === "outline") {
      return "w-full cursor-pointer rounded-md border-2 border-red-600 bg-white py-2 text-sm font-bold text-red-600";
    }
  };

  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  );
};

export default Button;
