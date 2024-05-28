import {ChangeEvent, useState} from "react";
import {SignupInput} from "@korada76/common"

const Signup = () => {
  const [sign, setSign] = useState(false)
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  });

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:h-screen bg-[#97BE5A] font-man">
      <div className="p-8 lg:p-16 lg:w-1/2 m-3 md:m-0">
        
        <h1 className="font-bold font-grace text-center mt-2 text-[2rem] lg:text-[2.5rem] text-green-900">
          {!sign ? "Create an account" : "Welcome back"}
        </h1>
        { !sign &&
        <p className="text-gray-100 text-center lg:text-left mt-2">
          Have an account?
          <span className="text-white font-bold underline ml-2 cursor-pointer hover:text-green-600" onClick={()=>setSign(true)}>Login</span>
        </p>
        }
        <div className="mt-4">
          <label className="mb-2 font-grace block">UserName</label>
          <input
            className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 p-3 w-full"
            placeholder="Enter your username"
          />
          {!sign && <label className="mb-2 font-grace block">Email</label>}
          {!sign && <input
            className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 p-3 w-full"
            placeholder="Enter your mail"
            type="text"
          />}
          <LabelledInput label="Password" placeholder="Enter your password" onChange={(e)=>{
            setPostInputs({
             ...postInputs,
              password: e.target.value
            }) 
          }}/>
          <button className="border-pink-200 border p-3 bg-[#504845] rounded-md w-full mt-3 font-semibold text-[#9F9289] font-grace text-xl hover:bg-[#CB6018] hover:text-white duration-300">
            Signup
          </button>
          {sign && <p className="text-white mt-3">No Account?<span className="underline cursor-pointer hover:text-green-600 ml-1" onClick={()=>setSign(false)}>Register Now</span></p>}
        </div>
      </div>
      
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4 font-grace">{label}</label>
      <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
  </div>
}

export default Signup;
