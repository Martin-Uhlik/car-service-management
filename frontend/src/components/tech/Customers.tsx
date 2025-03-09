import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { loginStatusAtom } from "../../state/atoms";
import { SmallCustomer, SmallCustomerProps } from "../utils/SmallCustomer";
import { TechNav } from "./TechNav";

export const Customers = () => {
  const path = `http://localhost:4000/customers?authToken=` + useRecoilValue(loginStatusAtom).token;
  const [customers, setCustomers] = useState<SmallCustomerProps[]>([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios
      .get(path)
      .then((response) => {
        setCustomers(response.data.data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  },[]);

  const msg = () => {
    if (error) {
      return (<p>Failed to load customers</p>);
    } else if (loading) {
      return (<p>Loading</p>);
    }
  }

    return (
        <div className='outer_box'>
          <div className='middle_box'>
            <div className="v-flex">
              <TechNav />
              <div className="content-holder">
                <div className="main-channel__header header">
                  <h1>Zákazníci</h1>
                </div>
                <div className="main-settings__content padd">
                  
    
                    <div className="profile-editor max-width max-height">
    
                      <div className="profile-editor__controls">
                        {/*TODO load cars from database*/}
                        {msg()}
                        {/*
                        <SmallCustomer id={'asdfghjkl'} name={'John'} surname={'Doe'}></SmallCustomer>
                        <SmallCustomer id={'asdfghjkl'} name={'John'} surname={'Doe'}></SmallCustomer>
                        <SmallCustomer id={'asdfghjkl'} name={'John'} surname={'Doe'}></SmallCustomer>
                        */}
                        {customers.map((customer) => (
                        <SmallCustomer key={customer.id} {...customer}/>
                        ))}
                      </div>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}