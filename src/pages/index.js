import Head from "next/head"; //the Head component allows us to inject meta data into the html document

// import { getFeaturedEvents } from "../../dummy-data";
import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function HomePage(props) {
  return (
    //Head allows us to create a title for the page, and add meta data for search engine optimization
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

//installed:
//
//npm install swr
//npm install mongodb
