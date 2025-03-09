import axios from "axios";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginStatusAtom } from "../../state/atoms";
import {TechNav} from "./TechNav";

export const AddComponent = () => {
    const { register, getValues, handleSubmit, reset, formState: {errors} } = useForm();

    const [searchParams, setSearchParams] = useSearchParams();
    const vehicleId = searchParams.get("id")
    const statusAtom = useRecoilValue(loginStatusAtom);

    const submit = () => {
        const name = getValues('name');
        const description = getValues('description');
        const price = getValues('price');
        const partNo = getValues('partNumber');
        reset();

        const body = {
            name: name,
            price: price,
            partNumber: partNo,
            description: description,
          }
        
        const path = `http://localhost:4000/service-records/${vehicleId}/parts?authToken=` + statusAtom.token;
        axios
        .post(path, body)
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
        <div className='outer_box'>
            <div className='middle_box'>
                <div className="v-flex">
                    <TechNav />
                    <div className="content-holder">
                        <div className="main-channel__header header">
                            <h1>Přidat servis vozidla</h1>
                        </div>
                        <div className="main-settings__content padd">
                            <div className="profile-editor max-width">
                                <div className="profile-editor__controls">
                                    <span>Informace o servisu vozidla</span>
                                    <form className="profile-editor__form" onSubmit={handleSubmit(submit)}>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Název:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                
                                                id="email-field"
                                                {...register('name', { required: true })}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Popis:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                
                                                id="email-field"
                                                {...register('description', { required: true })}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                kód produktu:
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                
                                                id="email-field"
                                                {...register('partNumber', { required: true })}
                                            />
                                        </div>
                                        <div className="small-vehicle__line">
                                            <label className="profile-editor__label small-vehicle__label" htmlFor="email-field">
                                                Cena (s DPH):
                                            </label>
                                            <input
                                                type="text"
                                                className="profile-editor__input small-vehicle__field"
                                                
                                                id="email-field"
                                                {...register('price', { required: true })}
                                            />
                                        </div>
                                        <input
                                            type="submit"
                                            className="profile-editor__submit button"
                                            value="Přidat"
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="profile-editor max-width max-height">
                                <div className="profile-editor__controls">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}