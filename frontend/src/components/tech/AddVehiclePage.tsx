import { TechNav } from "./TechNav";
import {mdiCarSide} from "@mdi/js";
import { useForm } from "react-hook-form";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import React, {useEffect, useState} from "react";
import axios from "axios";

export const AddVehiclePage = () => {
  const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();

  const statusAtom = useRecoilValue(loginStatusAtom);

  const submit = () => {
    
    const model = getValues('model');
    const manufacturer = getValues('manufacturer');
    const production = getValues('production');
    const capacity = getValues('capacity');
    const customer = getValues('customer');
    const spz = getValues('spz');
    const vin = getValues('vin');
    const engineCode = getValues('engine-code');
    console.log(model, manufacturer, production, capacity, customer, spz, vin, engineCode);

    const path = `http://localhost:4000/cars?authToken=` + statusAtom.token;
    
    axios
      .post(path,{
        VIN: vin,
        VRP: spz,
        manufacturer: manufacturer,
        model: model,
        fuel: "string",
        capacity: capacity,
        engineCode: engineCode,
        production: production + "-01-01",
        customerId: customer
        },{
          headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
            },
        },)
        .then((response) => {
          alert("Vozidlo přidáno úspěšne")
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
              <h1>Přidat vozidlo</h1>
            </div>
            <div className="main-settings__content">
              <div className="profile-editor">
                <div className="profile-editor__banner">
                </div>
                <div className="profile-editor__controls">
                  <div className="profile-editor__profile profile-info">
                    <div className="profile-editor__profile-picture profile-picture">
                      <svg className="profile-editor__pfp-image profile-picture__image img image background-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiCarSide} />
                      </svg>
                    </div>
                    <div className="profile-info__account-info">
                      <h2 className="profile-info__name heading heading--2">
                        Přidat vozidlo
                      </h2>
                    </div>
                  </div>
                  <form className="profile-editor__form" onSubmit={handleSubmit(submit)}>
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Výrobce:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"

                          id="email-field"
                          placeholder="Zadejte výrobce"
                          {...register('manufacturer', { required: true })}
                      />
                      

                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Model:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          id="email-field"
                          placeholder="Zadejte model"
                          {...register('model', { required: true })}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Rok výroby:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          id="email-field"
                          placeholder="Zadejte rok výroby"
                          {...register('production', { required: true, min: 1900, pattern: /^[0-9]*$/})}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Objem (cm3):
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          id="email-field"
                          placeholder="Zadejte objem motoru v cm3"
                          {...register('capacity', { required: true, pattern: /^[0-9]*$/, min: 0 })}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Kód motoru:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          id="email-field"
                          placeholder="Zadejte kód motoru"
                          {...register('engine-code', { required: true })}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        VIN:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          id="email-field"
                          placeholder="Zadejte VIN"
                          {...register('vin', { required: true })}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        SPZ:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input "
                          placeholder="Zadejte SPZ"
                          {...register('spz', { required: true })}
                      />
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Zákazník:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input"
                          
                          placeholder="Zadejte Id zákazníka"
                          {...register('customer', { required: true })}
                      />

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