import { TechNav } from "./TechNav";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";
import {mdiAccount, mdiAccountCog} from "@mdi/js";


export const TechSettings = () => {
  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <TechNav />
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Nastavení</h1>
            </div>
            <div className="main-settings__content">
              <div className="profile-editor">
                <div className="profile-editor__banner">
                </div>
                <div className="profile-editor__controls settings-form">
                  <div className="profile-editor__profile profile-info">
                    <div className="profile-editor__profile-picture profile-picture">
                      {/*
                      <!--                                        <img-->
                      <!--                                          src="./images/user.jpg"-->
                      <!--                                          alt="X's profile picture"-->
                      <!--                                          class="profile-editor__pfp-image profile-picture__image img"-->
                      <!--                                        />-->
                      */}
                      <svg className="profile-editor__pfp-image profile-picture__image img image background-white" viewBox="0 0 24 24">
                        {useRecoilValue(loginStatusAtom).role === 'technician' ?
                          <path fill="currentColor" d={mdiAccountCog} />
                          : <path fill="currentColor" d={mdiAccount} />}
                      </svg>
                    </div>
                    <div className="profile-info__account-info">
                      <h2 className="profile-info__name heading heading--2">
                        {useRecoilValue(loginStatusAtom).name}
                      </h2>
                    </div>
                  </div>

                  {/*<form className="settings-form">*/}
                  {/*  <span>Barevné schéma</span>*/}
                  {/*  <div className="profile-editor__form">*/}
                  {/*    <label className="profile-editor__label label" htmlFor="theme-field">*/}
                  {/*      Schéma*/}
                  {/*    </label>*/}
                  {/*    <select id="theme-field" name="theme-field" className="profile-editor__input">*/}
                  {/*      <option value="light">Světlé</option>*/}
                  {/*      <option value="dark">Tmavé</option>*/}
                  {/*    </select>*/}
                  {/*    <input*/}
                  {/*      type="submit"*/}
                  {/*      className="profile-editor__submit button"*/}
                  {/*      value="Potvrdit"*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</form>*/}

                  <form className="settings-form">
                    <span>Uživatelské údaje</span>
                    {/* <!-- <div className="profile-editor__form">
                        <span>Současné přihlašovací údaje</span>
                        <label className="profile-editor__label label" for="email-field">
                            E-mail
                          </label>
                        <input
                          type="email"
                          className="profile-editor__input"
                          name="email"
                          id="email-field"
                          placeholder="Zadejte E-mail"
                        />

                        <label className="profile-editor__label label" for="password-field"
                          >Heslo</label
                        >
                        <input
                          type="password"
                          className="profile-editor__input"
                          name="password"
                          id="password-field"
                          placeholder="Zadejte heslo"
                        />
                    </div>

                    <span>Nové údaje</span> --> */}
                    <div className="profile-editor__form">
                      <label className="profile-editor__label label" htmlFor="new-email-field">
                        Jméno
                      </label>
                      <input
                        type="username"
                        className="profile-editor__input"
                        name="username"
                        id="new-name-field"
                        placeholder="Zadejte nové jméno"
                      />
                      <input
                        type="username"
                        className="profile-editor__input"
                        name="username"
                        id="repeat-new-name-field"
                        placeholder="Zopakujte nové jméno"
                      />
                      <label className="profile-editor__label label" htmlFor="new-email-field">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="profile-editor__input"
                        name="email"
                        id="new-email-field"
                        placeholder="Zadejte nový E-mail"
                      />
                      <input
                        type="email"
                        className="profile-editor__input"
                        name="email"
                        id="repeat-new-email-field"
                        placeholder="Zopakujte nový E-mail"
                      />
                      <label className="profile-editor__label label" htmlFor="new-password-field">
                        Heslo
                      </label>
                      <input
                        type="password"
                        className="profile-editor__input"
                        name="password"
                        id="new-password-field"
                        placeholder="Zadejte nové heslo"
                      />
                      <input
                        type="password"
                        className="profile-editor__input"
                        name="password"
                        id="repeat-new-password-field"
                        placeholder="Zopakujte nové heslo"
                      />
                      <input
                        type="submit"
                        className="profile-editor__submit button"
                        value="Potvrdit"
                      />
                    </div>
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