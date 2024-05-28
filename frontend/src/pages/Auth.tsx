import {ChangeEvent, useState} from "react";
import {SignupInput} from "@korada76/common"
import {BACKEND_URL} from "../constants"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"

export const Auth = ({type}: { type: "signup" | "sign" }) => {
  const [sign, setSign] = useState(false)
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });

  const send = async()=>{
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type == "sign" ? "signin":"signup"}`, postInputs)
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    }catch(err){
      console.log("There is some error", err)
      alert("Error while signing up")
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:h-screen bg-[#97BE5A] font-man">
      <div className="p-8 lg:p-16 lg:w-1/2 m-3 md:m-0">
        
        <h1 className="font-bold font-grace text-center mt-2 text-[2rem] lg:text-[2.5rem] text-green-900">
          {type == "signup" ? "Create an account" : "Welcome back"}
        </h1>
        { type == "signup" &&
        <p className="text-gray-100 text-center lg:text-left mt-2">
          Have an account?
          <span className="text-white font-bold underline ml-2 cursor-pointer hover:text-green-600" onClick={()=>{
            setSign(true)
            navigate("/signin")
          }
            }>Login</span>
        </p>
        }
        <div className="mt-4">
          <label className="mb-2 font-grace block">Email</label>
          <input
            className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 p-3 w-full"
            placeholder="Enter your email"
            type="text"
            onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })

            }}
            
          />
          {type == "signup" && !sign && <label className="mb-2 font-grace block">Username</label>}
          {type == "signup" && !sign && <input
            className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3 p-3 w-full"
            placeholder="Enter your Username"
            type="text"
            onChange={(e)=>{
              setPostInputs({
                ...postInputs,
                name: e.target.value
              })
            }}
          />}
          <LabelledInput label="Password" type="password" placeholder="Enter your password" onChange={(e)=>{
            setPostInputs({
             ...postInputs,
              password: e.target.value
            }) 
          }}/>
          <button className="border-pink-200 border p-3 bg-[#504845] rounded-md w-full mt-3 font-semibold text-[#9F9289] font-grace text-xl hover:bg-[#CB6018] hover:text-white duration-300" onClick={()=>send()}>
            {(type == "sign" && sign) ? "signin" : "signup"}
          </button>
          {type == "sign" && sign && <p className="text-white mt-3">No Account?<span className="underline cursor-pointer hover:text-green-600 ml-1" onClick={()=>setSign(false)}>Register Now</span></p>}
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


