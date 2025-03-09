import { TechNav } from "./TechNav"
import {SmallVehicle} from "../utils/smallVehicle";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import React, {useEffect, useState} from "react";


export const TechVehiclePage = () => {
  const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();
  const submit = () => {
    const spz = getValues('spz');
    const vin = getValues('vin');
    reset();
    // TODO
    // alert("added \n customer")
  }

  const path = `http://localhost:4000/cars?authToken=` + useRecoilValue(loginStatusAtom).token
  useEffect(() => {
    axios
        .get(path)
        .then((response) => {
          setVehicles(response.data.data);
        })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
  }, []);

  const [vehicles, setVehicles] = React.useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div className="App">Loading...</div>;
  }


  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <TechNav />
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Vozidla</h1>
            </div>
            <div className="main-settings__content padd">
              <div className="profile-editor max-width">
                <div className="profile-editor__controls">
                  <span>Vyhledat vozidlo</span>
                  <form className="profile-editor__form" onSubmit={handleSubmit(submit)}>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label label small-vehicle__label" htmlFor="email-field">
                        SPZ:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          
                          id="email-field"
                          defaultValue="Zadejte SPZ"
                          {...register('spz')}
                      />
                    </div>
                    <div className="small-vehicle__line">
                      <label className="profile-editor__label label small-vehicle__label" htmlFor="email-field">
                        VIN:
                      </label>
                      <input
                          type="text"
                          className="profile-editor__input small-vehicle__field"
                          
                          id="email-field"
                          defaultValue="Zadejte VIN"
                          {...register('vin')}
                      />
                    </div>
                    <input
                      type="submit"
                      className="profile-editor__submit button"
                      value="Vyhledat"
                    />
                  </form>
                </div>
              </div>

                <div className="profile-editor max-width max-height">

                  <div className="profile-editor__controls">
                    {vehicles.map((vehicle) => (
                        <SmallVehicle  {...vehicle}/>
                    ))}
                    {/*<SmallVehicle {...{manufacturer: "Audi", model: "A4", production: "2006", VRP: "3B3 3333", VIN: "JN1DA31A52T300757", id: "1234", owner: "John Doe"}} />*/}
                    {/*<SmallVehicle {...{manufacturer: "Skoda", model: "Octavia", production: "2004", VRP: "A00 1235", VIN: "JH4KA8162MC010197", id: "1234", owner: "John Doe"}}/>*/}
                    {/*<SmallVehicle {...{manufacturer: "Skoda", model: "Superb", production: "2004", VRP: "A00 1235", VIN: "JH4KA8162MC010197", id: "1234", owner: "John Doe"}}/>*/}
                    {/*<SmallVehicle {...{manufacturer: "Skoda", model: "Felicia", production: "1990", VRP: "A00 1235", VIN: "JH4KA8162MC010197", id: "1234", owner: "John Doe"}}/>*/}
                    {/*<SmallVehicle {...{manufacturer: "Skoda", model: "Rapid", production: "2004", VRP: "A00 1235", VIN: "JH4KA8162MC010197", id: "1234", owner: "John Doe"}}/>*/}
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}