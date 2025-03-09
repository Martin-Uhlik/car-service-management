import { mdiAccountCog } from "@mdi/js";
import { useForm } from "react-hook-form";
import { TechNav } from "./TechNav";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const AddTechPage = () => {
  const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();

  const statusAtom = useRecoilValue(loginStatusAtom);

  const submit = () => {
    const email = getValues('email');
    const name = getValues('name');

    const password = Math.random().toString(36).slice(-8);

    const path = `http://localhost:4000/technicians/?authToken=` + statusAtom.token;
    
    axios
      .post(path,{
        username: name,
        "password": password,
        name: name,
        "surname": "string",
        "phone": "string",
        email: email
        },{
          headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
            },
        },)
        .then((response) => {
          alert("Technik s heslem " + password +" přidán úspěšne.\n"+
          "Vygenerované heslo si po přihlášení z bezpečnostných dúvodú změnte")
         })
        .then(() => {
          setLoading(false);
         })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });

      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(true);

      alert(error);

      if (loading) {
      return <div className="App">Loading...</div>;
      }

    reset();
    
    // TODO
    // alert("added \n customer")
  }

  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <TechNav />
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Přidat technika</h1>
            </div>
            <div className="main-settings__content">
              <div className="profile-editor">
                <div className="profile-editor__banner">
                </div>
                <div className="profile-editor__controls">
                  <div className="profile-editor__profile profile-info">
                    <div className="profile-editor__profile-picture profile-picture">
                      <svg className="profile-editor__pfp-image profile-picture__image img image background-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiAccountCog} />
                      </svg>
                    </div>
                    <div className="profile-info__account-info">
                      <h2 className="profile-info__name heading heading--2">
                        Přidat technika
                      </h2>
                    </div>
                  </div>
                  <form className="profile-editor__form" onSubmit={ handleSubmit(submit)}>
                    <label className="profile-editor__label label" htmlFor="name">
                      Jméno
                    </label>
                    <input
                        type="text"
                        className="profile-editor__input"
                        
                        id="manufacturer-field"
                        placeholder="Zadejte Jméno"
                        {...register('name', { required: true })}
                    />

                    <label className="profile-editor__label label" htmlFor="email-field">
                      E-Mail
                    </label>
                    <input
                        type="email"
                        className="profile-editor__input"
                        
                        id="email-field"
                        placeholder="Zadejte E-mail"
                        {...register('email', { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
                    />
                    

                    {/*<label className="profile-editor__label label" htmlFor="password-field">Heslo</label>*/}
                    {/*<input*/}
                    {/*  type="password"*/}
                    {/*  className="profile-editor__input"*/}
                    {/*  name="password"*/}
                    {/*  id="password-field"*/}
                    {/*  placeholder="Zadejte heslo"*/}
                    {/*/>*/}

                    <input
                        type="submit"
                        className="profile-editor__submit button"
                        value="Přidat"
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