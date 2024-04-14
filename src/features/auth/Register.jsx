import register from "../../assets/register.png";
const Register = ({ children }) => {
  return (
    <div className="flex items-center justify-center gap-x-10  py-11 md:items-start md:justify-normal lg:items-center lg:gap-x-20">
      <div className="hidden w-1/2 md:inline-flex xl:w-[600px]">
        <img
          className="w-full object-cover"
          src={register}
          alt="register picture"
        />
      </div>
      <div className="flex w-[95%]  flex-col sm:max-w-[370px] md:w-[370px]">
        {children}
      </div>
    </div>
  );
};

export default Register;
