import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;

//$2a$12$8emkX5hsHaVZVYMEzRpCYuT4QsQkfSK0VZSTR7l55vadffnzXD6T2
