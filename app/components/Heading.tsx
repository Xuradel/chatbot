interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? `text-center` : `text-start`}>
      <div
        className="        font-bold
        text-base
        sm:text-lg
        md:text-xl
        lg:text-2xl
        xl:text-3xl"
      >
        {title}
      </div>
      <div
        className="        text-xs
        sm:text-sm
        md:text-base
        lg:text-lg
        xl:text-xl text-neutral-500 mt-2"
      >
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
