import { ChangeEvent } from 'react';
import Style from './FormInputStyle.module.css'

interface IProps {
  label: string;
  value: string;
  type? : string;
  onChange : (e: ChangeEvent<HTMLInputElement>) => {};
}

export const FormInput = (props: IProps) => {
  const { label, value, type, onChange } = props;
  return (
    <>
      <div className={Style.container}>
        <label>{label} : </label>
        <div>
          <input type={type} value={value} placeholder="Enter You Full Name" className={Style.input} onChange={onChange}/>
        </div>
      </div>
    </>
  );
};
