import { NavItem } from "../utils/NavItem";
import {mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant, mdiAccountCog} from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import React, {useEffect, useState} from "react";
import axios from "axios";

interface IProps {

    createdAt: string,
    description: string,
    id: string,
    name: string,
    partNumber: string,
    price: string,
    serviceRecord: any,
    serviceRecordId: string,
    updatedAt: string
}

export const SmallPart = (props: IProps) => {

    const statusAtom = useRecoilValue(loginStatusAtom);

    const delete_part = () => {
        
        const path = `http://localhost:4000/parts/${props.id}?authToken=` + statusAtom.token;
        axios
        .delete(path)
        .then((response) => {
            alert('OK');
        })
        .catch((error) => {
          console.log(error);
          alert('FAIL');
        });


        // TODO
        // alert("added \n customer")
    }
    return (
        <div className="profile-editor__form small-vehicle">
            <div className="small-banner">
            </div>
            <h2>{props.name}</h2>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Název:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.name}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Výrobce:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.description}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    kód produktu:
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.partNumber}
                    disabled
                />
            </div>
            <div className="small-vehicle__line">
                <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                    Cena (s DPH):
                </label>
                <input
                    type="text"
                    className="profile-editor__input small-vehicle__field"
                    name="email"
                    id="email-field"
                    defaultValue={props.price + " czk"}
                    disabled
                />
            </div>
            {useRecoilValue(loginStatusAtom).role === 'technician' ?
                <div className="small-vehicle__button small-part__buttons">
                    <button className="profile-editor__submit button">
                        Upravit
                    </button>
                    <button className="profile-editor__submit button" onClick={delete_part}>
                        Smazat
                    </button>
                </div>
            : undefined}
        </div>
    );
}