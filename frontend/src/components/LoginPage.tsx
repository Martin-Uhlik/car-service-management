import { mdiArrowLeft, mdiAxisLock } from '@mdi/js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Role } from '../models/types';
import { loginStatusAtom } from '../state/atoms';
import { Nav } from './Nav';
import { NavItem } from './utils/NavItem';

export const LoginPage = () => {

  const { role: roleString } = useParams();
  if (roleString !== 'technician' && roleString !== 'customer') {
    return (
      <p>Unknown login role</p>
    );
  }

  const [showError, setShowError] = useState(false);

  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusAtom);

  const { register, getValues, handleSubmit } = useForm();

  const navigate = useNavigate();

  let pageRole: Role;
  switch(roleString) {
    case('customer'):
      pageRole = 'customer'
      break;
    case('technician'):
    default:
      pageRole = 'technician';
      break;
  }

  useEffect(() => {
    if (pageRole === loginStatus.role) {
      navigate('/techvehicle');
    }
  }, []);

  const onSubmit = async () => {
    let path: string = '';
    if (pageRole === 'technician') {
      path = 'http://localhost:4000/technicians/login';
    } else {
      path = 'http://localhost:4000/technicians/login';
      // return;
    }
    const username: string = getValues('username');
    const password: string = getValues('password');
    const requestData = {
      username: username,
      password: password,
    }
    await axios
      .post(path, requestData)
      .then((response) => {
        // console.log(response.data.data);
        setLoginStatus({
          ...response.data.data,
          // name: response.data.name,
          token: response.data.data.authToken,
          role: pageRole,
        });
        navigate('/techvehicle');
      })
      .catch((error) => {
        ////////////////////////////////// for testing - delete
        // setLoginStatus({
        //   role: pageRole,
        //   name: 'abc',
        //   surname: 'def',
        //   token: 'abcdefgh',
        //   phone: '123456789',
        //   email: 'ameil@email.com',
        // });
        // navigate('/techvehicle');
        ///////////////////////////////////

        setShowError(true);
        if (error.response) {
          console.log('Response: ', error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      });
  }

  const backImg: JSX.Element = <svg className="icon" viewBox="0 0 24 24">
    <path fill="currentColor" d={ mdiArrowLeft } />
  </svg>
  const navElements: JSX.Element[] = [
    <NavItem key={'Zpět'} text='Zpět' to='/' img={backImg}></NavItem>
  ];

  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <Nav elements={navElements} showInfo={true}/>
          <div className="content-holder">
            <div className="main-channel__header header">
                <h1>{`Přihlásit se jako ${ pageRole === 'customer' ? 'zákazník' : 'technik'}`}</h1>
            </div>
            <div className="main-settings__content">
              <div className="profile-editor">
                <div className="profile-editor__banner"></div>
                <div className="profile-editor__controls">
                  <form className="profile-editor__form" onSubmit={handleSubmit(onSubmit)}>
                    <label className="profile-editor__label label" htmlFor="login-field">
                      Login
                    </label>
                    <input
                      type="text"
                      className="profile-editor__input"
                      id="login-field"
                      placeholder="Zadejte login"
                      {...register('username', {required: true })}
                    />
                    <label className="profile-editor__label label" htmlFor="password-field">
                      Heslo
                    </label>
                    <input
                      type="password"
                      className="profile-editor__input"
                      id="password-field"
                      placeholder="Zadejte heslo"
                      {...register('password', {required: true })}
                    />
                    { showError && <p>Login failed</p>}
                    <input
                      type="submit"
                      className="profile-editor__submit button"
                      value="Přihlásit se"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}