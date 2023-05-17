import { useRef, useContext } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "@/store/notification-context";

function NewsletterRegistration() {
  const emailInput = useRef();
  const notCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInput.current.value;

    notCtx.showNotification({
      title: "Signing up.",
      message: "Registering for the newsletter.",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) => {
        notCtx.showNotification({
          title: "Success.",
          message: "Successfully registered for the newsletter.",
          status: "success",
        });
      })
      .catch((err) => {
        notCtx.showNotification({
          title: "Error",
          message: err.message || "Something went wrong.",
          status: "error",
        });
      });
  }
  // fetch user input (state or refs)
  // optional: validate input
  // send valid data to API

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailInput}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
