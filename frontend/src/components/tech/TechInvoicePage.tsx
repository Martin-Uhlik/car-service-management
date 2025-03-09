import { TechNav } from "./TechNav";

export const TechInvoicePage = () => {
  return (
    <div className='outer_box'>
      <div className='middle_box'>
        <div className="v-flex">
          <TechNav />
          <div className="content-holder">
            <div className="main-channel__header header">
              <h1>Faktury</h1>
            </div>
            <div className="main-settings__content padd">
              <div className="profile-editor max-width">
                <div className="profile-editor__controls">
                  <span>Vyhledat fakturu</span>
                  <form className="profile-editor__form" action="./userVehicles.html">
                    <label className="profile-editor__label label" htmlFor="email-field">
                      SPZ
                    </label>
                    <input
                      type="text"
                      className="profile-editor__input"
                      name="email"
                      id="email-field"
                      placeholder="Zadejte E-mail"
                    />

                    <label className="profile-editor__label label" htmlFor="email-field">
                      VIN
                    </label>
                    <input
                      type="text"
                      className="profile-editor__input"
                      name="email"
                      id="email-field"
                      placeholder="Zadejte E-mail"
                    />
                    <input
                      type="submit"
                      className="profile-editor__submit button"
                      value="Vyhledat"
                    />
                  </form>
                </div>
              </div>
              <div className="profile-editor max-width max-height">
                <div className="profile-editor__controls">
                  <div className="invoice">
                    <div className="profile-editor__banner_good">
                    </div>
                    <div className="profile-editor__form">
                      Faktura
                      <input
                        type="submit"
                        className="profile-editor__submit button"
                        value="Detail"
                      />
                    </div>
                  </div>
                  <div className="invoice">
                    <div className="profile-editor__banner_bad">
                    </div>
                    <div className="profile-editor__form">
                      Faktura
                      <input
                        type="submit"
                        className="profile-editor__submit button"
                        value="Detail"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}