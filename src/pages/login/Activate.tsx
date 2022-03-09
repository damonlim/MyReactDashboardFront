import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as userAction from '../../redux/actions/userActions';


interface Props {
  match: any;
  activateUserRequest: (token:string)=>void;
}
interface FormData {
  token: string;
}

const Activate = ({ match, activateUserRequest }:Props) => {
  const [formData, setFormData] = useState<FormData>({
    token: ''
  });

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, [match.params]);

  const { token } = formData;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    activateUserRequest(token);
  };

  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>      
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Damon Account Activation
            </h1>

            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
                  <span className='ml-3'>Activate this account</span>
                </button>
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
};

const mapStateToProps = ()=>({
});

const mapDispatchToProps = (dispatch:any)=>({
  activateUserRequest(token:string){
      dispatch(userAction.activateUserRequest(token));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activate);
