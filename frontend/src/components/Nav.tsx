import { mdiInformationOutline } from '@mdi/js'
import { ImgElement } from './utils/ImgElement';
import { NavItem } from './utils/NavItem';

export interface NavProps {
  elements: JSX.Element[];
  showInfo: boolean;
}

export const Nav = ({ elements, showInfo }: NavProps) => {
  return (
    <div className="aside">
      <div className="aside_spacer">
        <h1 className="aside_header header">Servisní kniha</h1>
        <div className="aside_footer">
          {elements}
          {showInfo &&
            <>
              <hr className="aside_line" />
              <NavItem key={'Info'} img={<ImgElement svg={mdiInformationOutline} />} to='/info' text='Info'></NavItem>
            </>
          }
        </div>
      </div>
    </div>
  );
}