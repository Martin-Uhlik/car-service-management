import { NavItem } from "../utils/NavItem";
import {mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant, mdiAccountCog} from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link} from "react-router-dom";

export interface SmallCustomerProps {
    id:	string,
    surname: string,
    name: string
}

export const SmallCustomer = (props: SmallCustomerProps) => {
    return (
        <div className="profile-editor__form small-vehicle">
            <div className="small-banner">
            </div>
            <h2>Zákazník</h2>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    ID:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    value={props.id}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Jméno
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    value={props.name}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Příjmeni:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    value={props.surname}
                    disabled
                />
            </div>
            {/*
            <Link className="profile-editor__submit button small-vehicle__button" to={`/carinfo?id=` + props.id}>
                Detail
            </Link>
            */}
        </div>
    );
}