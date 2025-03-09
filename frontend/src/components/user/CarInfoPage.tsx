import { NavItem } from "../utils/NavItem";
import { mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant } from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SmallService} from "../utils/smallService";
import {TechNav} from "../tech/TechNav";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import axios from "axios";
import {SmallVehicle} from "../utils/smallVehicle";
import {useForm} from "react-hook-form";

export const CarInfoPage = () => {

  //getting car id from URL
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams.get("id")


  // TODO load car data from database
  const car = {
    id: searchParams.get("id"),
    VIN:"JN1DA31A52T300757",
    VRP:"3B3 3333",
    manufacturer:"Audi",
    model:"A4",
    createdAt:(new Date).toLocaleString("cs-CZ", {year: "numeric"}),
    updatedAt:(new Date).toLocaleString("cs-CZ", {year: "numeric"}),
    deletedAt:(new Date).toLocaleString("cs-CZ", {year: "numeric"}),
    fuel:"petrol",
    capacity:"1600",
    engineCode:"AEB",
    production:"2006",
    customerId:"123"
  }

  const [disabled, setDisabled] = useState(true);
  const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();
  const submit = () => {
    const spz = getValues('spz');
    const vin = getValues('vin');
    // reset();
    // TODO
    alert("added \n customer")
    setDisabled(true)
  }

  // const path = `http://localhost:4000/cars?authToken=` + useRecoilValue(loginStatusAtom).token
  const path = `http://localhost:4000/cars/` + searchParams.get("id") + `?authToken=` + useRecoilValue(loginStatusAtom).token
  useEffect(() => {
    axios
        .get(path)
        .then((response) => {
          setVehicle(response.data.data);
          // console.log(response.data.data)
        })
        .then(() => {
          // setLoading(false);
        })
        .catch((error) => {
          // setLoading(false);
          // setError(error);
        });
  }, []);

  const [vehicle, setVehicle] = React.useState([]);

  const servicePath = `http://localhost:4000/cars/` + searchParams.get("id") + `/service-records?authToken=` + useRecoilValue(loginStatusAtom).token
  useEffect(() => {
    axios
        .get(servicePath)
        .then((response) => {
          setServices(response.data.data);
          console.log(response.data.data)
        })
        .then(() => {
          // setLoading(false);
        })
        .catch((error) => {
          // setLoading(false);
          // setError(error);
        });
  }, []);
  const [services, setServices] = React.useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div className="App">Loading...</div>;
  // }



  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <TechNav />
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Detail vozidla</h1>
            </div>
            <div className="main-settings__content padd">
              <div className="profile-editor max-width">
                <div className="profile-editor__controls">
                  <span>Informace o vozidle</span>
                  <form className="profile-editor__form" onSubmit={handleSubmit(submit)}>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Výrobce:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.manufacturer}
                          disabled={disabled}
                      />
                    </div>

                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Model:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.model}
                          disabled={disabled}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Rok výroby:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.production}
                          disabled={disabled}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Objem (cm3):
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.capacity}
                          disabled={disabled}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        Kód motoru:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.engineCode}
                          disabled={disabled}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        VIN:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.VIN}
                          disabled={disabled}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                        SPZ:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          name="email"
                          id="email-field"
                          defaultValue={vehicle.VRP}
                          disabled={disabled}
                      />
                    </div>

                    {/*<input*/}
                    {/*  type="button"*/}
                    {/*  className="profile-editor__submit button"*/}
                    {/*  value="Upravit"*/}
                    {/*  onClick={() => setDisabled(false)}*/}
                    {/*/>*/}
                    {useRecoilValue(loginStatusAtom).role === 'technician' ?
                      <div className="small-part__buttons">
                        <Link className="profile-editor__submit button" to={`/addservice?id=` + searchParams.get("id")}>
                          Přidat servis
                        </Link>
                        {disabled ?
                        <a className="profile-editor__submit button" onClick={ () => setDisabled(false)}>
                          Upravit
                        </a>
                        :
                        <button className="profile-editor__submit button" onClick={ () => submit}>
                          Použít
                        </button>}
                      </div>
                        : undefined}
                  </form>
                </div>
              </div>
              <div className="profile-editor max-width max-height">
                <div className="profile-editor__controls">
                  {/*TODO load services from database*/}
                  {services.map((service) => (
                      <SmallService  {...service}/>
                  ))}
                  {/*<SmallService {...{createdAt: (new Date).toLocaleDateString("cs-CZ"), km: "420 69", description: "Pravidelná údržba"}}/>*/}
                  {/*<SmallService {...{createdAt: (new Date).toLocaleDateString("cs-CZ"), km: "420 68", description: "Pravidelná údržba 1"}}/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}