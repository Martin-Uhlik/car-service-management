import { mdiArrowLeft } from '@mdi/js';
import { Nav } from './Nav';
import { NavItem } from './utils/NavItem';
import {SmallService} from "./utils/smallService";
import {Link} from "react-router-dom";

export const InfoPage = () => {
  const backImg: JSX.Element = <svg className="icon" viewBox="0 0 24 24">
    <path fill="currentColor" d={ mdiArrowLeft } />
  </svg>
  const navElements: JSX.Element[] = [
    <NavItem key='Zpět' text='Zpět' to='/' img={backImg} logout={true}></NavItem>
  ];

  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <Nav elements={navElements} showInfo={false}></Nav>
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Info</h1>
            </div>
              <div className="main-settings__content padd">
                  <div className="profile-editor max-width max-height">
                      <div className="profile-editor__controls padding-3">
                          <h1>FAQ</h1>
                          <h2>Kde jsem?</h2>
                          <p>
                            Toto je servisni kniha, kde jsou uchovávána a zpracovávána data o servisních záznamech vozů našich zákazníků.<br/>
                            Nejste ještě jedním z našich zákazníků? Neváhejte se obrátit na některého z našich techniků!<br/><br/>
                          </p>
                          <h2>Jsem technik, jak se přihlásím?</h2>
                          <p>
                              Pomocí přihlašovacích údajů od vašeho nadřízeného.<br/><br/>
                          </p>
                          <h2>Jsem zákazník, jak se přihlásím?</h2>
                          <p>
                              Pomocí přihlašovacích údajů od vašeho technika.<br/><br/>
                          </p>

                          <h2>Jak přidám servisní záznam?</h2>
                          <p>
                              Servisní záznamy mohou přidávat pouze naši technici. Pomocí tlačítka "Přidat servis" v detailech vozidla.<br/>
                              Neváhejte se obrátit na některého z našich techniků!<br/><br/>
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}