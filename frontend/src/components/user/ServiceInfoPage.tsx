import { NavItem } from "../utils/NavItem";
import { mdiCarSide, mdiFileOutline, mdiCogOutline, mdiLogoutVariant } from '@mdi/js';
import { ImgElement } from "../utils/ImgElement";
import { Nav } from "../Nav";
import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {SmallService} from "../utils/smallService";
import {TechNav} from "../tech/TechNav";
import {SmallPart} from "../utils/smallPart";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import axios from "axios";
import {useForm} from "react-hook-form";

export const ServiceInfoPage = () => {

    const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();
    const submit = () => {
        const spz = getValues('spz');
        const vin = getValues('vin');
        // reset();
        // TODO
        alert("added \n customer")
        setDisabled(true)
    }
    //getting car id from URL
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.get("id")


    // TODO load car data from database
    const serv = {
        id: searchParams.get("id"),
        createdAt:(new Date).toLocaleDateString("cs-CZ", ),
        tech:"John Doe",
        km:	"42069",
        description:	"string \nlong \nlong",
        state: "Dokončeno"
    }

    const [disabled, setDisabled] = useState(true);
    const addComponent = () => {
        // e.preventDefault();
        // setDisabled(false)
    }

    const path = `http://localhost:4000/service-records/` + searchParams.get("id") + `?authToken=` + useRecoilValue(loginStatusAtom).token
    useEffect(() => {
        axios
            .get(path)
            .then((response) => {
                setService(response.data.data);
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

    const [service, setService] = React.useState([]);
    const [sum, setSum] = React.useState([]);

    const partPath = `http://localhost:4000/service-records/` + searchParams.get("id") + `/parts?authToken=` + useRecoilValue(loginStatusAtom).token
    useEffect(() => {
        axios
            .get(partPath)
            .then((response) => {
                setParts(response.data.data);
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
    const [parts, setParts] = React.useState([]);
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
                            <h1>Detail servisu vozidla</h1>
                        </div>
                        <div className="main-settings__content padd">
                            <div className="profile-editor max-width">
                                <div className="profile-editor__controls">
                                    <span>Informace o servisu vozidla</span>
                                    <form className="profile-editor__form" onSubmit={handleSubmit(submit)}>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Přijato:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                name="email"
                                                id="email-field"
                                                defaultValue={service.createdAt + " km"}
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Stav:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                name="email"
                                                id="email-field"
                                                defaultValue={service.updatedAt}
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Počet km:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                name="email"
                                                id="email-field"
                                                defaultValue={service.kmCount + " km"}
                                                disabled={disabled}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Zodpovědný technik:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                name="email"
                                                id="email-field"
                                                defaultValue={service.acceptedId}
                                                disabled={disabled}
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
                                                defaultValue={service.description}
                                                disabled={disabled}
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
                                                disabled={disabled}
                                            />
                                        </div>

                                        {useRecoilValue(loginStatusAtom).role === 'technician' ?
                                            <div className="small-part__buttons">
                                                <Link className="profile-editor__submit button" to={`/addcomponent?id=` + searchParams.get("id")}>
                                                    Přidat komponentu
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
                                    {parts.map((part) => (
                                        <SmallPart  {...part}/>
                                    ))}
                                    {/*<SmallPart {...{id: "1234", name: "Olejový filtr", manufacturer: "Bosh", code: "4E0 953 513 E", price: "69"}}/>*/}
                                    {/*<SmallPart {...{id: "1234", name: "Olej 5W40", manufacturer: "Q8", code: "4E0 953 513 E", price: "420"}}/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}