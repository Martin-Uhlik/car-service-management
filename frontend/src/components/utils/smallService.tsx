import { NavItem } from "../utils/NavItem";
import {mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant, mdiAccountCog} from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import React, {useEffect} from "react";
import axios from "axios";

interface IProps {
    acceptedAt: string,
    acceptedId: string,
    carId: string,
    createdAt: string,
    description: string,
    id: string,
    invoiceId?: string,
    kmCount: string,
    updatedAt: string
}

export const SmallService = (props: IProps) => {

    const [sum, setSum] = React.useState([]);

    const partPath = `http://localhost:4000/service-records/` + props.id+ `/parts?authToken=` + useRecoilValue(loginStatusAtom).token
    useEffect(() => {
        axios
            .get(partPath)
            .then((response) => {
                setSum(response.data.data.map( (item: any) => (Number(item.price))).reduce((partialSum, a) => partialSum + a, 0))

            })
            .then(() => {
                // setLoading(false);
            })
            .catch((error) => {
                // setLoading(false);
                // setError(error);
            });
    }, []);

    return (
        <div className="profile-editor__form small-vehicle">
            <div className="small-banner">
            </div>
            <h2>{props.createdAt}</h2>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Stav km:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.kmCount + " km"}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Popis:
                </label>
                <textarea
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.description}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Celková cena:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={sum}
                    disabled
                />
            </div>
            <Link className="profile-editor__submit button small-vehicle__button" to={`/serviceinfo?id=` + props.id}>
                Detail
            </Link>
        </div>
    );
}