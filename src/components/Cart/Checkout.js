import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};

const isSixChar = (value) => {
  return value.trim().length === 6;
};

function Checkout(props) {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    address: true,
    pincode: true,
  });

  const NameInputRef = useRef();
  const AddressInputRef = useRef();
  const PincodeInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = NameInputRef.current.value;
    const address = AddressInputRef.current.value;
    const pincode = PincodeInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const addressIsValid = !isEmpty(address);
    const pincodeIsValid = isSixChar(pincode);

    setFormInputIsValid({
      name: nameIsValid,
      address: addressIsValid,
      pincode: pincodeIsValid,
    });

    const formIsValid = nameIsValid && addressIsValid && pincodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({ name, address, pincode });
  };

  const NameControlClasses = `${classes.control} ${
    formInputIsValid.name ? "" : classes.invalid
  }`;
  const AddressControlClasses = `${classes.control} ${
    formInputIsValid.address ? "" : classes.invalid
  }`;
  const PincodeControlClasses = `${classes.control} ${
    formInputIsValid.pincode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={NameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input ref={NameInputRef} type="text" id="name" />
        {!formInputIsValid.name && (
          <p className={classes.invalid}>Please Enter a valid name!</p>
        )}
      </div>
      <div className={AddressControlClasses}>
        <label htmlFor="address">Address</label>
        <input ref={AddressInputRef} type="text" id="address" />
        {!formInputIsValid.address && (
          <p className={classes.invalid}>Please Enter a valid address!</p>
        )}
      </div>
      <div className={PincodeControlClasses}>
        <label htmlFor="pincode">PinCode</label>
        <input ref={PincodeInputRef} type="text" id="pincode" />
        {!formInputIsValid.pincode && (
          <p className={classes.invalid}>
            Please Enter a valid 6-digit pincode!
          </p>
        )}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit} onClick={props.onConfirm}>
          Place Order
        </button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Checkout;
