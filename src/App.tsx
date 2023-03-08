import "./App.scss";
import classNames from "classnames";
import MaskedInput from "react-text-mask";
import { useEffect, useState } from "react";

import bgCardBack from "./assets/bg-card-back.png";
import bgCardFront from "./assets/bg-card-front.png";
import bgMainDesktop from "./assets/bg-main-desktop.png";
import bgMainMobile from "./assets/bg-main-mobile.png";
import cardLogo from "./assets/card-logo.svg";
import iconComplete from "./assets/icon-complete.svg";

export function App() {
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber]: any = useState("");
  const [mm, setMm]: any = useState("");
  const [yy, setYy]: any = useState("");
  const [cvc, setCvc]: any = useState("");

  const [blankCardholder, setBlankCardholder] = useState(false);
  const [blankCardNumber, setBlankCardNumber] = useState(false);
  const [blankMm, setBlankMm] = useState(false);
  const [blankYy, setBlankYy] = useState(false);
  const [blankCvc, setBlankCvc] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [complete, setcomplete] = useState(false);

  useEffect(() => {
    if (
      cardholder.length > 0 &&
      cardNumber.length >= 19 &&
      mm.length === 2 &&
      yy.length === 2 &&
      cvc.length === 3
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setcomplete(true);

    if (cardholder.length === 0) {
      setBlankCardholder(true);
    } else {
      setBlankCardholder(false);
    }

    if (cardNumber.length === 0) {
      setBlankCardNumber(true);
    } else {
      setBlankCardNumber(false);
    }

    if (mm.length === 0) {
      setBlankMm(true);
    } else {
      setBlankMm(false);
    }

    if (yy.length === 0) {
      setBlankYy(true);
    } else {
      setBlankYy(false);
    }

    if (cvc.length === 0) {
      setBlankCvc(true);
    } else {
      setBlankCvc(false);
    }
  };

  const handleComlete = () => {
    setcomplete(false);
    setCardholder("");
    setCardNumber("");
    setMm("");
    setYy("");
    setCvc("");
  };

  return (
    <main>
      <div className="form">
        <div className="form__container">
          <div className="form__up">
            <img
              src={bgMainMobile}
              alt={bgMainMobile}
              className="form__up__bgMainMobile"
            />
            <img
              src={bgMainDesktop}
              alt={bgMainDesktop}
              className="form__up__bgMainDesktop"
            />

            <img src={bgCardBack} alt={bgCardBack} className="form__cardBack" />
            <img
              src={bgCardFront}
              alt={bgCardFront}
              className="form__cardFront"
            />

            <img
              src={cardLogo}
              alt={cardLogo}
              className="form__cardFront__circleBig"
            />
            <div className="form__cardFront__circleSmall"></div>

            <p className="form__cardBack__cvc">{cvc}</p>
            {!cvc && <p className="form__cardBack__cvc">000</p>}

            {!cardNumber ? (
              <h1 className="form__cardFront__cardNumber">
                0000 0000 0000 0000
              </h1>
            ) : (
              <h1 className="form__cardFront__cardNumber">{cardNumber}</h1>
            )}

            {!cardholder ? (
              <p className="form__cardFront__cardholder">Jane Appleseed</p>
            ) : (
              <p className="form__cardFront__cardholder">{cardholder}</p>
            )}

            <p className="form__cardFront__mmyy">
              {!mm && "00"}
              {mm}/{!yy && "00"}
              {yy}
            </p>
          </div>

          {complete ? (
            <div className="complete__container">
              <img src={iconComplete} alt={iconComplete} />
              <p className="complete__container__thanks">THANK YOU!</p>
              <p className="complete__container__details">
                We've added your card details
              </p>
              <button
                onClick={handleComlete}
                className="complete__container__btn"
              >
                Continue
              </button>
            </div>
          ) : (
            <form className="form__form" action="/">
              <label htmlFor="cardHolder" className="form__text">
                CARDHOLDER NAME
              </label>
              <input
                size={9}
                type="text"
                inputMode="text"
                id="cardHolder"
                autoComplete="cc-name"
                placeholder="e.g. JANE APPLESEED"
                maxLength={23}
                required
                className={classNames("form__input form__input__width327", {
                  // form__input__red: blankCardholder && !cardholder,
                  form__input__red:
                    (cardNumber || mm || yy || cvc) && !cardholder,
                })}
                value={cardholder}
                onChange={(e) =>
                  setCardholder(e.target.value.toLocaleUpperCase())
                }
              />

              <div className="form__blank">
                {/* {blankCardholder && !cardholder && <p>Cant't be blank</p>} */}
                {(cardNumber || mm || yy || cvc) && !cardholder && (
                  <p>Cant't be blank</p>
                )}
              </div>

              <label htmlFor="cardNumber" className="form__text">
                CARD NUMBER
              </label>
              <MaskedInput
                guide={false}
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                type="text"
                inputMode="numeric"
                id="cardNumber"
                autoComplete="cc-number"
                placeholder="e.g. 1234 5678 9123 0000"
                // minLength={15}
                // maxLength={19}
                required
                className={classNames("form__input form__input__width327", {
                  form__input__red:
                    (blankCardNumber && !cardNumber) ||
                    (cardNumber.length >= 1 && cardNumber.length < 19),
                })}
                value={cardNumber}
                onChange={(e: any) => {
                  // if (e.target.value.length > 16) {
                  //   e.target.value = e.target.value.slice(0, 16);
                  // }
                  setCardNumber(e.target.value);
                }}
              />

              <div className="form__blank">
                {blankCardNumber && !cardNumber && <p>Cant't be blank</p>}
                {cardNumber.length >= 1 && cardNumber.length < 19 && (
                  <p>At least 16 digits.&nbsp;</p>
                )}
                {/* {isNaN(cardNumber) && <p>Wrong format, digits only</p>} */}
              </div>

              <div className="form__text form__text__mmyy">
                <label htmlFor="expDateMm" className="form__text">
                  EXP. DATE (MM/YY)
                </label>
                <label htmlFor="cvc" className="form__text">
                  CVC
                </label>
              </div>

              <div className="form__input__date__container form__input__date__container">
                <input
                  type="number"
                  inputMode="numeric"
                  id="expDateMm"
                  autoComplete="cc-exp-month"
                  placeholder="MM"
                  minLength={2}
                  maxLength={2}
                  required
                  className={classNames("form__input form__input__date", {
                    "form__input form__input__red":
                      (blankMm && !mm) || (mm.length >= 1 && mm.length < 2),
                  })}
                  value={mm}
                  onChange={(e) => setMm(e.target.value.slice(0, 2))}
                />

                <input
                  type="number"
                  inputMode="numeric"
                  id="expDateYy"
                  autoComplete="cc-exp-year"
                  placeholder="YY"
                  minLength={2}
                  maxLength={2}
                  required
                  className={classNames("form__input form__input__date", {
                    "form__input form__input__red":
                      (blankYy && !yy) || (yy.length >= 1 && yy.length < 2),
                  })}
                  value={yy}
                  onChange={(e) => setYy(e.target.value.slice(0, 2))}
                />

                <input
                  type="number"
                  inputMode="numeric"
                  id="cvc"
                  autoComplete="cc-csc"
                  placeholder="e.g. 123"
                  minLength={3}
                  maxLength={3}
                  required
                  className={classNames("form__input form__input__date__cvc", {
                    "form__input form__input__red":
                      (blankYy && !cvc) || (cvc.length >= 1 && cvc.length < 3),
                  })}
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.slice(0, 3))}
                />

                <div className="form__blank">
                  {blankMm && !mm && <p>Cant't be blank</p>}
                  {mm.length >= 1 && mm.length < 2 && <p>At least 2 digits.</p>}
                </div>
                <div className="form__blank">
                  {blankYy && !yy && <p>Cant't be blank</p>}
                  {yy.length >= 1 && yy.length < 2 && <p>At least 2 digits.</p>}
                </div>
                <div className="form__blank">
                  {blankCvc && !cvc && <p>Cant't be blank</p>}
                  {cvc.length >= 1 && cvc.length < 3 && (
                    <p>At least 3 digits.</p>
                  )}
                </div>
              </div>

              <input
                type="submit"
                className={classNames("form__btn form__input__width327", {
                  "form__btn form__btn_disabled": !submit,
                })}
                value={
                  !submit
                    ? "Please fill in credit card details"
                    : "Confirm"
                }
                disabled={!submit}
                onClick={handleSubmit}
              ></input>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
