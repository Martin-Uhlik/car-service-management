import { NavItem } from "../utils/NavItem";
import {mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant, mdiAccountCog} from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";

interface IProps {
    id?:	string,
    VIN?:	string,
    VRP?:	string,
    manufacturer?:	string,
    model?:	string,
    createdAt?:	string,
    updatedAt?:	string,
    deletedAt?:	string,
    fuel?:	string,
    capacity?:	string,
    engineCode?:	string,
    production?:	string,
    customerId?:	string,
    owner?: string
}

export const SmallVehicle = (props: IProps) => {
    const [customerName, setCustomerName] = React.useState([]);
    const [customerSurname, setCustomerSurname] = React.useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const path = `http://localhost:4000/customers/` + props.customerId + `/?authToken=` + useRecoilValue(loginStatusAtom).token
    useEffect(() => {
        axios
            .get(path)
            .then((response) => {
                setCustomerName(response.data.data.name);
                setCustomerSurname(response.data.data.surname)
                // console.log(response)
            })
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    }, []);
    if (loading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="profile-editor__form small-vehicle">
            <div className="small-banner">
            </div>
            <h2>{props.manufacturer} {props.model} ({props.production})</h2>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    SPZ:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.VRP}
                    disabled
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
                    defaultValue={props.VIN}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Majitel:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={customerName + " " + customerSurname}
                    disabled
                />
            </div>
            <Link className="profile-editor__submit button small-vehicle__button" to={`/carinfo?id=` + props.id}>
                Detail
            </Link>
        </div>
    );
}