import { mdiCarSide, mdiFileOutline, mdiCar2Plus, mdiAccountPlus, mdiAccountMultiplePlus, mdiCogOutline, mdiLogoutVariant, mdiInformationOutline, mdiAccount } from "@mdi/js";
import { ImgElement } from "../utils/ImgElement";
import { NavItem } from "../utils/NavItem";
import {useRecoilValue} from "recoil";
import {loginStatusAtom} from "../../state/atoms";

export const TechNav = () => {
  const elements: JSX.Element[] = [
    // <NavItem key='Vozidla' text='Vozidla' to='/techvehicle' img={<ImgElement svg={mdiCarSide} />} />,
    // <NavItem key='Faktury' text='Faktury' to='/techinvoice' img={<ImgElement svg={mdiFileOutline} />} />,

    <NavItem key='Přidat vozidlo' text='Přidat vozidlo' to='/addvehicle' img={<ImgElement svg={mdiCar2Plus} />} />,
    <NavItem key='Přidat zákazníka' text='Přidat zákazníka' to='/addcustomer' img={<ImgElement svg={mdiAccountPlus} />} />,
    <NavItem key='Přidat technika' text='Přidat technika' to='/addtech' img={<ImgElement svg={mdiAccountMultiplePlus} />} />,
    <NavItem key='Zákazníci' text='Zákazníci' to='/customers' img={<ImgElement svg={mdiAccount} />} />,
  ];

  return (
    <div className="aside">
      <div className="aside_spacer">
        <div>
          <h1 className="aside_header header">Servisní kniha</h1>
          <NavItem key='Vozidla' text='Vozidla' to='/techvehicle' img={<ImgElement svg={mdiCarSide} />} />
          {useRecoilValue(loginStatusAtom).role === 'technician' ? elements : undefined}

        </div>
        <div className="aside_footer">
          <NavItem key='Nastavení' text='Nastavení' to='/techsettings' img={<ImgElement svg={mdiCogOutline} />} />
          <NavItem key='Odhlásit se' text='Odhlásit se' logout={true} img={<ImgElement svg={mdiLogoutVariant} />} />
          <hr className="aside_line" />
          <NavItem key={'Info'} img={<ImgElement svg={mdiInformationOutline} />} to='/info' text='Info'></NavItem>
        </div>
      </div>
    </div>
  );
}