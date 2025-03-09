import { Nav } from "./Nav";
import { mdiAccountCog, mdiInformationOutline } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
import { Link } from "react-router-dom";

export const RoleSelection = () => {

  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <Nav elements={[]} showInfo={true}/>
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Zvolte svoji roli:</h1>
            </div>
            <div className="box_bordered">
              <Link className="box--item" to='/login/customer'>
                <div className="profile-editor__banner"></div>
                <div className="login-box">
                  <svg className="image" viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiAccount} />
                  </svg>
                  <span className="login__label">Zákazník</span>
                </div>
              </Link>
              <Link className="box--item" to={`/login/technician`}>
                <div className="profile-editor__banner"></div>
                <div className="login-box">
                  <svg className="image" viewBox="0 0 24 24">
                    <path fill="currentColor" d={mdiAccountCog} />
                  </svg>
                  <span className="login__label">Technik</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}