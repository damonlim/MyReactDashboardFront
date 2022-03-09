import React, { useState } from "react";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import * as userAction from '../../redux/actions/userActions';


interface Props {
  forgetPasswordRequest: (email: string) => void;
}

function ForgetPassword({forgetPasswordRequest}: Props) {

  const [formData, setFormData] = useState({
    email: ''
  });  
  const {email} = formData;

  const handleChange = (text: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [text]:e.target.value})
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (email) {
      forgetPasswordRequest(email);
    } else {
      toast.error('Please fill all fields');
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 text-gray-900 flex justify-center'>      
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-gray-100'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Forget Password
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='text'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />              
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 ' />
                  <span className='ml-3'>Submit</span>
                </button>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/login'
                  target='_self'
                >
                  <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Back to login page</span>
                </a>
              </div>              
            </form>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: "url(/logo512.png)" }}
          ></div>
        </div>
      </div>
      ;
    </div>
  );
}

const mapStateToProps = ()=>({
});

const mapDispatchToProps = (dispatch: any)=>({
  forgetPasswordRequest(email: string){
      dispatch(userAction.forgetPasswordRequest(email));

  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgetPassword);
