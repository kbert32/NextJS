import { useContext } from "react";
import MainHeader from "./main-header";
import Notification from "../ui/notification";
import NotificationContext from "@/store/notification-context";

export default function Layout(props) {
  useContext();
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <Notification title="Test" message="This is a test." status="pending" />
    </>
  );
}
