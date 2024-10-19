interface LogoProps {
  className?: string;
}
export const Logo = ({ className }: LogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <h1 className={`text-3xl uppercase text-primary font-bold ${className}`}>
        CRMS
      </h1>
    </div>
  );
};
